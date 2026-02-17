import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* -------------------- CORS -------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* -------------------- Environment -------------------- */
function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const SUPABASE_URL = requireEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = requireEnv("RESEND_API_KEY");
const FROM_EMAIL = requireEnv("FROM_EMAIL");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/* -------------------- Helper -------------------- */
function jsonResponse(data: Record<string, any>, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

/* -------------------- Edge Function -------------------- */
serve(async (req: Request) => {
  if (req.method === "OPTIONS") return jsonResponse({ message: "ok" });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const { email, workspace_type, location_id, booking_date } = body;

    if (!email || !workspace_type || !location_id || !booking_date) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    const emailLower = email.toLowerCase().trim();

    /* -------------------- Scoped Rate Limiting -------------------- */
    const { data: recentOtp } = await supabase
      .from("guest_otps")
      .select("created_at")
      .eq("email", emailLower)
      .eq("location_id", location_id)
      .eq("booking_date", booking_date)
      .eq("workspace_type", workspace_type)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recentOtp) {
      const lastSent = new Date(recentOtp.created_at).getTime();
      const now = Date.now();
      const cooldown = 60; // seconds
      const remaining = cooldown - Math.floor((now - lastSent) / 1000);

      if (remaining > 0) {
        return jsonResponse(
          { error: "OTP recently sent", retry_after_seconds: remaining },
          429
        );
      }
    }

    /* -------------------- Generate OTP -------------------- */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    /* -------------------- Store OTP via RPC -------------------- */
    const { error: rpcError } = await supabase.rpc("create_guest_otp", {
      p_email: emailLower,
      p_workspace_type: workspace_type,
      p_location_id: location_id,
      p_booking_date: booking_date,
      p_otp: otp,
    });

    if (rpcError) {
      console.error("[DB ERROR] RPC create_guest_otp failed:", rpcError);
      return jsonResponse({ error: "Failed to create OTP" }, 500);
    }

    /* -------------------- Send OTP Email -------------------- */
    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: emailLower,
        subject: "Your Booking OTP",
        text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      }),
    });

    if (!resendResp.ok) {
      const text = await resendResp.text();
      console.error("[EMAIL ERROR] Resend API failed:", text);
      return jsonResponse({ error: "Failed to send OTP email" }, 500);
    }

    return jsonResponse({ message: "OTP sent successfully", cooldown_seconds: 60 });

  } catch (err) {
    console.error("[EXCEPTION] send_guest_otp error:", err);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
});
