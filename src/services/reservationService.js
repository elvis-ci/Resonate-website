import { supabase } from '@/lib/supabaseClient'

/**
 * Attempt to reserve a workspace
 *
 * @param {number} locationId
 * @param {string} workspaceType
 * @param {string} bookingDate - 'YYYY-MM-DD'
 * @param {string} startTime - 'HH:MM'
 * @param {string} endTime - 'HH:MM'
 * @returns {Promise<Object>} {
 *   success: boolean,
 *   reservationId?: string,
 *   workspaceId?: string,
 *   holdExpiresAt?: string,
 *   expiresInSeconds?: number,
 *   alternatives?: Array<{ start_time: string, end_time: string }>,
 *   error?: string
 * }
 */
export async function attemptReservation(payload) {
  try {
    // Get logged-in user (if any)
    const { data: { user } = {} } = await supabase.auth.getUser()

    // Prepare RPC parameters (names must exactly match DB)
    const rpcParams = {
      p_workspace_type: payload.workspaceType,
      p_location_id: payload.locationId,
      p_booking_date: payload.bookingDate,   // 'YYYY-MM-DD'
      p_start_time: payload.startTime,       // 'HH:MM'
      p_end_time: payload.endTime,           // 'HH:MM'
      p_full_name: user ? null : payload.fullName || null,
      p_email: user ? null : payload.email || null,
      p_guest_phone: user ? null : payload.phone || null  // <-- added
    }

    const { data, error } = await supabase.rpc('attempt_reservation', rpcParams)

    if (error) throw error

    // data is an array of rows because it's a TABLE return type
    const result = data[0]

    return {
      success: result.success,
      reservationId: result.reservation_id,
      workspaceId: result.out_workspace_id,
      holdExpiresAt: result.out_hold_expires_at,
      expiresInSeconds: result.expires_in_seconds,   // new field from RPC
      alternatives: result.alternatives || [],
      error: null,
    }
  } catch (err) {
    console.error('Attempt reservation failed', err)
    return {
      success: false,
      error: err.message || 'Reservation failed',
      alternatives: [],
      expiresInSeconds: null,
    }
  }
}
/**
 * Utility: format alternatives into human-readable array (HH:MM)
 *
 * @param {Array} alternatives
 * @param {boolean} to12Hour - if true, converts to 12-hour format
 * @returns {Array<{start_time: string, end_time: string}>}
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

/**
 * Convert 'HH:MM' to 12-hour format
 * @param {string} time
 * @returns {string} e.g., '2:00 PM'
 */
function formatTo12Hour(time) {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

/**
 * Check if a reservation has expired
 *
 * @param {string} holdExpiresAt - timestamp string
 * @returns {boolean}
 */
export function isReservationExpired(holdExpiresAt) {
  return new Date() > new Date(holdExpiresAt)
}

/**
 * Cancel a reservation
 *
 * @param {string} reservationId - UUID of the reservation
 * @returns {Promise<Object>} {
 *   success: boolean,
 *   finalStatus?: string ('cancelled', 'expired', 'consumed', etc.),
 *   message?: string,
 *   error?: string
 * }
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
      console.log('No response from cancel_reservation RPC')
      return { success: false, error: 'No response from server' }
    }

    const row = data[0]
    console.log('Reservation cancellation result:', {
      success: row.success,
      finalStatus: row.final_status,
      message: row.message,
    })

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
