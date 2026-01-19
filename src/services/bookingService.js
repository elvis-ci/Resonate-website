import { supabase } from '@/lib/supabaseClient'

/**
 * check workspace availability for selected location, date and timerange
 * @param {string} workspaceType
 * @param {number} locationId
 * @param {string} date - 'YYYY-MM-DD'
 * @param {string} startTime - 'HH:MM'
 * @param {string} endTime - 'HH:MM'
 * @returns {Promise<Array>} overlapping bookings
 */
export async function checkWorkspaceAvailability(
  workspaceType,
  locationId,
  date,
  startTime,
  endTime,
) {
  //
  const { data, error } = await supabase.rpc('check_workspace_availability', {
    p_workspace_type: workspaceType,
    p_location_id: locationId,
    p_booking_date: date,
    p_start_time: startTime,
    p_end_time: endTime,
  })
  if (error) {
    console.error(error)
    return
  }

  if (data.available) {
    // Slot is free, allow user to proceed
    console.log('Workspace is available!')
  } else {
    // Slot taken, show alternative time slots
    console.log('Workspace taken. Alternatives:', data.available_slots)
  }
  return { data, error }
}

/**
 * Convert 'HH:MM' string into minutes since 00:00
 */
function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

/**
 * Convert minutes since 00:00 into 'HH:MM' string
 */
function formatTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}
