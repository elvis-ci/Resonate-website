// composables/useWorkspaceLocations.js
import { ref } from 'vue'
import { getLocationsPerWorkspace } from '@/services/locationsService'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'

export function useWorkspaceLocations() {
  const availableLocations = ref([])
  const isLoadingLocations = ref(false)
  const error = ref(null)

  async function fetchLocations(workspaceType) {
    if (!workspaceType) {
      availableLocations.value = []
      error.value = null
      return
    }

    const dbWorkspaceType = workspaceTypeMap[workspaceType]

    if (!dbWorkspaceType) {
      availableLocations.value = []
      error.value = new Error(`Unknown workspace type: ${workspaceType}`)
      return
    }

    isLoadingLocations.value = true
    error.value = null

    try {
      const response = await getLocationsPerWorkspace(dbWorkspaceType)

      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format from server')
      }

      const locations = response.data ?? response

      // Ensure it's an array
      if (!Array.isArray(locations)) {
        throw new Error('Expected locations to be an array')
      }

      availableLocations.value = locations
      console.log('Fetched available locations:', availableLocations.value)
    } catch (err) {
      console.error('Error fetching locations:', err)
      error.value = err
      availableLocations.value = []
    } finally {
      isLoadingLocations.value = false
    }
  }

  return {
    availableLocations,
    isLoadingLocations,
    error,
    fetchLocations,
  }
}
