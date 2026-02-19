import { ref, computed } from 'vue'

export function useBookingForm(availableLocations, officeStart = '08:00', officeEnd = '18:00') {
  // --- Form Field State ---
  const selectedDate = ref(null)
  const selectedStartTime = ref(null)
  const selectedEndTime = ref(null)
  const selectedLocation = ref(null)
  const fullName = ref('')
  const email = ref('')
  const phone = ref('')
  const otp = ref('')

  // --- Error State ---
  const validationError = ref(false)
  const timeRangeError = ref(false)

  // --- Formatting Helpers ---
  function formatTo12Hour(time) {
    if (!time) return ''
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
  }

  function formatSlot(slot) {
    return `${formatTo12Hour(slot.start_time)} – ${formatTo12Hour(slot.end_time)}`
  }

  function getSelectedLocationName() {
    if (!selectedLocation.value) return ''

    const location = availableLocations.value.find(
      (loc) => loc.location_id === selectedLocation.value,
    )

    return location ? `${location.location} - ${location.city}` : ''
  }

  function getSelectedLocationPrice() {
    if (!selectedLocation.value) return 0

    const location = availableLocations.value.find(
      (loc) => loc.location_id === selectedLocation.value,
    )

    return location?.min_booking_price ?? 0
  }

  function getSelectedDateFormatted() {
    if (!selectedDate.value) return ''
    const date = new Date(selectedDate.value)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // --- Validation Functions ---
  function isValidTimeRange(start, end) {
    if (!start || !end) return false
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    return eh > sh || (eh === sh && em > sm)
  }

  // --- Computed Properties ---
  const officeHoursError = computed(() => {
    if (!selectedStartTime.value || !selectedEndTime.value) return ''

    const startHour = Number(selectedStartTime.value.split(':')[0])
    const endHour = Number(selectedEndTime.value.split(':')[0])

    const officeStartHour = Number(officeStart.split(':')[0])
    const officeEndHour = Number(officeEnd.split(':')[0])

    if (startHour < officeStartHour || endHour > officeEndHour) {
      return `Spaces are only available from ${officeStart} to ${officeEnd}`
    }

    return ''
  })

  const isAvailabilityFormComplete = computed(
    () =>
      selectedLocation.value &&
      selectedDate.value &&
      selectedStartTime.value &&
      selectedEndTime.value &&
      !timeRangeError.value &&
      !officeHoursError.value &&
      fullName.value.trim() &&
      email.value.trim() &&
      phone.value.trim(),
  )

  // --- Reset Form ---
  function resetForm(otpState = null) {
    selectedDate.value = null
    selectedStartTime.value = null
    selectedEndTime.value = null
    selectedLocation.value = null
    fullName.value = ''
    email.value = ''
    phone.value = ''
    otp.value = ''
    validationError.value = false
    timeRangeError.value = false

    // Reset OTP state if passed in
    if (otpState) {
      otpState.otpSent = false
      otpState.otpError = ''
      otpState.otpCoolDown = 0
    }
  }

  // --- Expose public API ---
  return {
    // Form field state
    formState: {
      selectedDate,
      selectedStartTime,
      selectedEndTime,
      selectedLocation,
      fullName,
      email,
      phone,
      otp,
    },

    // Error state
    errors: {
      validationError,
      timeRangeError,
      officeHoursError,
    },

    // Validation & computed
    isValid: isAvailabilityFormComplete,

    // Methods
    resetForm,
    isValidTimeRange,

    // Formatting helpers
    formattedHelpers: {
      formatTo12Hour,
      formatSlot,
      getSelectedLocationName,
      getSelectedLocationPrice,
      getSelectedDateFormatted,
    },

    // Direct refs for template binding
    selectedDate,
    selectedStartTime,
    selectedEndTime,
    selectedLocation,
    fullName,
    email,
    phone,
    otp,
    validationError,
    timeRangeError,
    officeHoursError,
    isAvailabilityFormComplete,
  }
}
