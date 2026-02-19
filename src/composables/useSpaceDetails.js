import { ref, computed, watch, onMounted } from 'vue'
import { useWorkspaceLocations } from './useWorkspaceLocations'

export function useSpaceDetails(space) {
  const workspaceType = computed(() => space.value.name)

  const { availableLocations, isLoadingLocations, error, fetchLocations } = useWorkspaceLocations()
  const selectedLocation = ref('')

  // Location options for select dropdown
  const locations = computed(() =>
    availableLocations.value.map((l) => `${l.location} - ${l.city}`)
  )

  // Default selection
  watch(
    locations,
    (newLocations) => {
      if (!selectedLocation.value && newLocations.length) {
        selectedLocation.value = newLocations[0]
      }
    },
    { immediate: true },
  )

  // DB location info
  const currentDbLocation = computed(() => {
    if (!selectedLocation.value) return null
    const [location, city] = selectedLocation.value.split(' - ')
    return availableLocations.value.find((l) => l.location === location && l.city === city) ?? null
  })

  // Location-specific space data (images, reviews)
  const currentLocationData = computed(() => {
    if (!selectedLocation.value) return null
    const [, city] = selectedLocation.value.split(' - ')
    if (!city) return null
    return space.value.locations[city.replace(' ', '_')] ?? null
  })

  const currentReviews = computed(() => currentLocationData.value?.reviews ?? [])
  const averageRating = computed(() => {
    if (!currentReviews.value.length) return '0.0'
    const total = currentReviews.value.reduce((sum, r) => sum + r.rating, 0)
    return (total / currentReviews.value.length).toFixed(1)
  })

  const availableAt = computed(() =>
    availableLocations.value.map((l) => `${l.location}`)
  )

  const hasLoadError = computed(() => !!error.value)

  // Booking modal refs
  const bookingDialog = ref(null)
  const bookingFormRef = ref(null)
  const selectedWorkspace = ref('')

  const openBooking = (workspaceTitle) => {
    selectedWorkspace.value = workspaceTitle
    bookingDialog.value.showModal()
  }
  const closeBooking = () => {
    bookingDialog.value.close()
    selectedWorkspace.value = ''
  }
  const handleBackdropClick = () => {
    bookingFormRef.value?.attemptToCloseForm()
  }

  // Retry fetching locations
  const retryLoadLocations = async () => {
    await fetchLocations(workspaceType.value)
  }

  // Initial fetch
  onMounted(async () => {
    await fetchLocations(workspaceType.value)
  })

  return {
    selectedLocation,
    locations,
    availableAt,
    currentDbLocation,
    currentLocationData,
    currentReviews,
    averageRating,
    isLoadingLocations,
    hasLoadError,
    bookingDialog,
    bookingFormRef,
    selectedWorkspace,
    openBooking,
    closeBooking,
    handleBackdropClick,
    retryLoadLocations,
  }
}
