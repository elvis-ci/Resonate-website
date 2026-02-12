import { supabase } from '@/lib/supabaseClient'

/**
 * Send OTP to guest email for booking verification
 * Calls Supabase Edge Function directly
 */
export async function sendGuestOtp({
  email,
  workspaceType,
  locationId,
  bookingDate,
  startTime,
  endTime,
}) {
  try {
    // Validate required parameters
    if (!email || !workspaceType || !locationId || !bookingDate || !startTime || !endTime) {
      return { success: false, error: 'Missing required OTP parameters' }
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send_guest_otp', {
      body: {
        email,
        workspace_type: workspaceType,
        location_id: locationId,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
      },
    })

    // Handle errors returned by Supabase
    if (error) {
      let parsedError = error.message || 'Failed to send OTP'
      let retryAfter = null

      try {
        if (error.context) {
          const body = await error.context.json()
          parsedError = body.error || parsedError
          retryAfter = body.retry_after_seconds ?? body.retryAfter ?? null
        }
      } catch {
        // Parsing failed, keep parsedError as is
      }

      // Handle network failures separately
      if (parsedError.includes('Failed to send a request')) {
        parsedError = 'Network error: Unable to reach server. Please check your connection.'
      }

      return { success: false, error: parsedError, retryAfter }
    }

    // Success: return cooldown from server
    return { success: true, cooldown: data?.cooldown_seconds ?? 60 }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? `Network error: ${err.message}` : 'Unexpected error sending OTP',
    }
  }
}
