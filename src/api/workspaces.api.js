import { supabase } from '../lib/supabaseClient.js'

const cacheDuration = 60 * 60 * 1000
let cachedWorkspaces = null
let lastFetchedTimeStamp = null

/**
 * Validates and transforms a fragrance object
 * @param {Object} fragrance - Raw fragrance data
 * @returns {Object} - Validated fragrance object
 */

function validateWorkspaces(workspace) {
  return {
    id: String(workspace.id),
    type: String(workspace.type),
    location_id: String(workspace.location_id),
    // status: String(workspace.status),
    base_price: Number(workspace.base_price),
    booking_price: Number(workspace.booking_price),
    reservation_price: workspace.reservation_price ?? 'Not Available For Reservation',
  }
}

/**
 * Fetches fragrances from the database with caching
 * @param {boolean} [force=false] - Force fetch from database, ignoring cache
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */

export async function getWorkspaces() {
  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .order('type', { ascending: false })

  if (error) {
    throw new Error(`supabase error: ${error.message}`)
  }

  const validatedData = data.map(validateWorkspaces)
  cachedWorkspaces = validatedData
  lastFetchedTimeStamp = Date.now()

  return {
    data: validatedData,
    error: null,
  }
}

export async function getLocationsWithWorkspaces() {
  const { data, error } = await supabase.from('locations').select(`
      id,
      location,
      city, 
      workspaces:workspaces(
        id,
        type,
        status,
        booking_price,
      reservation_price
    )`)
  if (error) throw error
  return data
}

export async function getLocationsPerWorkspace(selectedWorkspaceType) {
  console.log('workspaceType passed to API:', selectedWorkspaceType)

  const { data, error } = await supabase
    .from('available_workspace_locations')
    .select('*')
    .eq('type', selectedWorkspaceType)

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  console.log('Supabase returned data:', data)
  return data
}
// clear cache
export function clearWorkspaceCache() {
  cachedWorkspaces = null
  lastFetchedTimeStamp = null
}
