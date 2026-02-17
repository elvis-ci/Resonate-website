import { supabase } from '@/lib/supabaseClient'

/**
 * Attempt to reserve a workspace (guest or logged-in user)
 * Checks active session first for guest, otherwise verifies OTP
 */

// this attempt reservation fucntion uses supabase otp and is only meant for teh mvp. it will be removed. the relevant rpc is stored in a .txt file in the api folder
export async function attemptReservation(payload) {
  // Get current session and user
  const {
    data: { session, user },
  } = await supabase.auth.getSession()

  let guestSession = null

  // Guest check: if no logged-in user
  if (!user) {
    if (!session) {
      // No session → must verify OTP
      if (!payload.otp || !payload.email) {
        throw new Error('OTP and email are required for guests')
      }

      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        email: payload.email,
        token: payload.otp,
        type: 'email',
      })

      if (verifyError) throw verifyError;
      if (!verifyData.session) throw new Error('OTP verification failed')

      guestSession = verifyData.session
    } else {
      // Session exists → use existing session, skip OTP
      guestSession = session
    }
  }

  // Prepare RPC parameters
  const rpcParams = {
    p_workspace_type: payload.workspaceType,
    p_location_id: Number(payload.locationId),
    p_booking_date: payload.bookingDate,
    p_start_time: payload.startTime + ':00',
    p_end_time: payload.endTime + ':00',
    p_full_name: payload.fullName || null,
    p_email: payload.email || null,
    p_guest_phone: payload.phone || null,
  }

  // Call the unified RPC
  const { data: rpcData, error: rpcError } = await supabase.rpc('attempt_reservation', rpcParams)
  if (rpcError) throw rpcError

  const result = rpcData[0]

  return {
    success: result.success,
    reservationId: result.reservation_id,
    workspaceId: result.out_workspace_id,
    holdExpiresAt: result.out_hold_expires_at,
    expiresInSeconds: result.expires_in_seconds,
    alternatives: result.alternatives || [],
    error: null,
    session: guestSession, // return session so alternative clicks can skip OTP
  }
}

// the commented attempReservation function works with the production grade otp verification. it will be integrated when the project acquires a domain
// export async function attemptReservation(payload) {
//   // Get logged-in user (if any)
//   const { data: { user } = {} } = await supabase.auth.getUser()

//   // Prepare RPC parameters (names & types must match DB exactly)
//   const rpcParams = {
//     p_workspace_type: payload.workspaceType,
//     p_location_id: Number(payload.locationId),
//     p_booking_date: payload.bookingDate, // 'YYYY-MM-DD' string
//     p_start_time: payload.startTime + ':00', // 'HH:MM:SS' string
//     p_end_time: payload.endTime + ':00', // 'HH:MM:SS' string
//     p_full_name: user ? null : payload.fullName || null,
//     p_email: user ? null : payload.email || null,
//     p_guest_phone: user ? null : payload.phone || null,
//     p_otp: user ? null : String(payload.otp || ''),
//   }

//   const rpcName = user ? 'attempt_reservation' : 'attempt_reservation_with_otp'

//   const { data, error } = await supabase.rpc(rpcName, rpcParams)

//   if (error) throw error
//       console.log("reservation result:", data)
//       console.log("reservation error:", error)

//   const result = data[0]

//   return {
//     success: result.success,
//     reservationId: result.reservation_id,
//     workspaceId: result.out_workspace_id,
//     holdExpiresAt: result.out_hold_expires_at,
//     expiresInSeconds: result.expires_in_seconds,
//     alternatives: result.alternatives || [],
//     error: null,
//   }
// }

/**
 * Format alternative slots into HH:MM or 12-hour format
 */
export function formatAlternatives(alternatives, to12Hour = false) {
  if (!alternatives || !Array.isArray(alternatives)) return []

  return alternatives.map((slot) => {
    const start = slot.start_time.slice(0, 5)
    const end = slot.end_time.slice(0, 5)

    if (to12Hour) {
      return {
        start_time: formatTo12Hour(start),
        end_time: formatTo12Hour(end),
      }
    }
    return { start_time: start, end_time: end }
  })
}

function formatTo12Hour(time) {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

export function isReservationExpired(holdExpiresAt) {
  return new Date() > new Date(holdExpiresAt)
}

/**
 * Cancel a reservation hold
 */
export async function cancelReservationHold(reservationId) {
  try {
    const { data, error } = await supabase.rpc('cancel_reservation', {
      p_reservation_id: reservationId,
    })

    if (error) {
      console.error('RPC error cancelling reservation', error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: 'No response from server' }
    }

    const row = data[0]
    return {
      success: row.success,
      finalStatus: row.final_status,
      message: row.message,
    }
  } catch (err) {
    console.error('Unexpected error cancelling reservation', err)
    return { success: false, error: err.message }
  }
}

/**
 * Restore a pending reservation from localStorage
 * Validates saved data structure, checks expiration, and restores user to Step 2
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function restoreReservation(reservationId) {
  const { data, error } = await supabase.rpc('get_reservation_details', {
    p_reservation_id: reservationId,
  })

  if (error) throw error

  return data // either object or null
}
