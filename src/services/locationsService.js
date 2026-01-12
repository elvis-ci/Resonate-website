import { getLocationsPerWorkspace } from '@/api/workspaces.api'

export async function fetchAvailableLocations(selectedWorkspaceType) {
  try {
    return await getLocationsPerWorkspace(selectedWorkspaceType)
  } catch (error) {
    console.log('error fetching locations:', error)
    throw error
  }
}
// try {
//   // return cached data if valid
//   if (
//     !force &&
//     cachedWorkspaces &&
//     lastFetchedTimeStamp &&
//     Date.now() - lastFetchedTimeStamp < cacheDuration
//   ) {
//     return {
//       data: cachedWorkspaces,
//       error: null,
//     }
//   }
// } catch (error) {
//   console.log('error fetching workspaces:', error)
//   return {
//     data: null,
//     error: error instanceof Error ? error : new Error('Unknown error occurred'),
//   }
// }
