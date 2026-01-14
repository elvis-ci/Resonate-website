import { supabase } from '@/lib/supabaseClient'

/**
 * Fetch bookings that overlap a given date & time range
 */
export async function getOverlappingWorkspaceBookings(
  locationId,
  workspaceType,
  date,
  startTime,
  endTime,
) {
  const { data, error } = await supabase
    .from('workspace_bookings')
    .select('*')
    .eq('location_id', locationId)
    .eq('workspace_type', workspaceType) // if stored
    .eq('booking_date', date)
    .lt('start_time', endTime)
    .gt('end_time', startTime)
    .in('status', ['pending', 'confirmed'])

  if (error) throw error
  return data
}

/**
 * Fetch available booking slots for a workspace based on its booking interval
 */
export async function getAvailableBookingSlots(
  workspaceId,
  date,
  workingHours = { start: '08:00', end: '18:00' },
) {
  // 1. Fetch the workspace's booking interval
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .select('booking_interval_minutes')
    .eq('id', workspaceId)
    .single()

  if (workspaceError || !workspace) {
    console.error('Error fetching workspace interval:', workspaceError)
    throw workspaceError || new Error('Workspace not found')
  }

  const slotDurationMinutes = workspace.booking_interval_minutes || 60

  // 2. Fetch existing bookings
  const { data: bookings, error: bookingsError } = await supabase
    .from('workspace_bookings')
    .select('start_time, end_time')
    .eq('workspace_id', workspaceId)
    .eq('booking_date', date)
    .in('status', ['pending', 'confirmed'])
    .order('start_time', { ascending: true })

  if (bookingsError) {
    console.error('Error fetching bookings:', bookingsError)
    throw bookingsError
  }

  // 3. Prepare available slots
  const slots = []
  let previousEnd = workingHours.start

  for (const booking of bookings) {
    if (booking.start_time > previousEnd) {
      slots.push({ start: previousEnd, end: booking.start_time })
    }
    previousEnd = booking.end_time
  }

  if (previousEnd < workingHours.end) {
    slots.push({ start: previousEnd, end: workingHours.end })
  }

  // 4. Split slots into intervals based on workspace booking interval
  const intervalSlots = []
  for (const slot of slots) {
    let slotStart = parseTime(slot.start)
    const slotEnd = parseTime(slot.end)

    while (slotStart + slotDurationMinutes <= slotEnd) {
      intervalSlots.push({
        start: formatTime(slotStart),
        end: formatTime(slotStart + slotDurationMinutes),
      })
      slotStart += slotDurationMinutes
    }
  }

  return intervalSlots
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
