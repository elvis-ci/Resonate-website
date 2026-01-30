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
      return
    }

    const dbWorkspaceType = workspaceTypeMap[workspaceType]

    if (!dbWorkspaceType) {
      availableLocations.value = []
      return
    }

    isLoadingLocations.value = true
    error.value = null

    try {
      const locations = await getLocationsPerWorkspace(dbWorkspaceType)
      availableLocations.value = locations ?? []
      console.log('Fetched locations:', locations)
    } catch (err) {
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
