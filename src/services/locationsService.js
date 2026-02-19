import { supabase } from '../lib/supabaseClient.js'

const CACHE_KEY_PREFIX = 'locations_per_workspace_'

/**
 * Generates a unique cache key per workspace type
 */
function getCacheKey(workspaceType) {
  return `${CACHE_KEY_PREFIX}${workspaceType}`
}

/**
 * Checks if a timestamp is from the same calendar day
 */
function isSameDay(timestamp) {
  const cachedDate = new Date(timestamp).toDateString()
  const today = new Date().toDateString()
  return cachedDate === today
}

/**
 * Clears all cached workspace-location entries
 */
export function clearLocationsPerWorkspaceCache() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(CACHE_KEY_PREFIX))
    .forEach((key) => localStorage.removeItem(key))
}

/**
 * Optional: clear cache for a single workspace type
 */
export function clearLocationsCacheForWorkspaceType(workspaceType) {
  localStorage.removeItem(getCacheKey(workspaceType))
}

/**
 * Fetch workspace locations per type, with same-day caching
 * @param {string} selectedWorkspaceType
 * @returns {Promise<Array>} locations
 */
export async function getLocationsPerWorkspace(selectedWorkspaceType) {
  const cacheKey = `locations_${selectedWorkspaceType}`

  // Try cache first
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (new Date(timestamp).toDateString() === new Date().toDateString()) {
      console.log('Returning cached locations for', selectedWorkspaceType)
      return data
    }
    localStorage.removeItem(cacheKey)
  }

  // Fetch from Supabase
  const { data, error } = await supabase
    .from('available_workspace_locations')
    .select('*')
    .eq('workspace_type', selectedWorkspaceType) // Note workspace_type

  if (error) throw error
  console.log(data)
  // Cache for today
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }))

  console.log('Fetched and cached locations for', selectedWorkspaceType)
  return { data, error }
}
