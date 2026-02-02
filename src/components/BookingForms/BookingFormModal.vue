<script setup>
import { ref, toRef, watch, computed, onBeforeUnmount, onMounted, defineExpose } from 'vue'
import { useWorkspaceLocations } from '@/composables/useWorkspaceLocations'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'
import {
  attemptReservation,
  formatAlternatives,
  cancelReservationHold,
} from '@/services/reservationService.js'

const props = defineProps({
  workspaceType: { type: String, required: true },
})

const emit = defineEmits(['close', 'reservation-confirmed'])
const today = new Date().toISOString().split('T')[0]

// --- Form Steps ---
const currentStep = ref(1) // 1: Booking Details, 2: Confirmation
const showCloseConfirmation = ref(false)
const isPaymentStarted = ref(false)

// --- Form Fields ---
const selectedDate = ref(null)
const selectedStartTime = ref(null)
const selectedEndTime = ref(null)
const selectedLocation = ref(null)
const selectedWorkspaceType = toRef(props, 'workspaceType')
const { availableLocations, isLoadingLocations, error, fetchLocations } = useWorkspaceLocations()
// --- Contact Info ---
const fullName = ref('')
const email = ref('')
const phone = ref('')

// --- UI State ---
const isReserving = ref(false)
const isCancelling = ref(false)
const availabilityMessage = ref('')
const alternativeSlots = ref([])
const availabilityState = ref(null) // 'available' | 'unavailable' | 'selected'
const reservationData = ref(null)
const loadError = ref(null) // Error loading locations

// --- Validation ---
const validationError = ref(false)
const timeRangeError = ref(false)

// --- Countdown Timer State ---
const timeRemaining = ref(0)
const holdExpired = ref(false)
const countdownInterval = ref(null)
const reservationCancelled = ref(false)

// Office hours
const OFFICE_START = '08:00'
const OFFICE_END = '18:00'
const HOLD_DURATION_MINUTES = 15

// Once locations load, optionally set a default:
// --- Helpers ---
function formatTo12Hour(time) {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

function formatSlot(slot) {
  return `${formatTo12Hour(slot.start_time)} – ${formatTo12Hour(slot.end_time)}`
}

function selectAlternativeSlot(slot) {
  selectedStartTime.value = slot.start_time
  selectedEndTime.value = slot.end_time
  availabilityState.value = 'selected'
  availabilityMessage.value = 'New time slot selected'
}

// Validate time range
function isValidTimeRange(start, end) {
  if (!start || !end) return false
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return eh > sh || (eh === sh && em > sm)
}

// --- Countdown Timer Functions ---
function startCountdown(expiresAt) {
  // Clear any existing interval
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }

  holdExpired.value = false

  // Ensure the timestamp is treated as UTC (append Z if missing)
  const utcExpiresAt = expiresAt.endsWith('Z') ? expiresAt : expiresAt + 'Z'

  function updateCountdown() {
    const now = new Date().getTime()
    const expireTime = new Date(utcExpiresAt).getTime()
    const difference = expireTime - now

    if (difference <= 0) {
      timeRemaining.value = 0
      holdExpired.value = true
      clearInterval(countdownInterval.value)
      return
    }

    const minutes = Math.floor(difference / 1000 / 60)
    const seconds = Math.floor((difference / 1000) % 60)
    timeRemaining.value = { minutes, seconds }
  }

  updateCountdown()
  countdownInterval.value = setInterval(updateCountdown, 1000)
}

function stopCountdown() {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
    countdownInterval.value = null
  }
}

function formatTimeRemaining() {
  if (!timeRemaining.value) return '00:00'
  const { minutes, seconds } = timeRemaining.value
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
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

function attemptToCloseForm() {
  // If we're on step 2 with a reservation and it hasn't been cancelled, show confirmation
  if (currentStep.value === 2 && reservationData.value && !reservationCancelled.value) {
    showCloseConfirmation.value = true
  } else {
    // If cancelled, reset the form silently before closing
    if (reservationCancelled.value) {
      restartBooking()
    }
    emit('close')
  }
}

function cancelReservation() {
  // Show close confirmation modal
  attemptToCloseForm()
}

async function confirmCancelReservation() {
  if (!reservationData.value || !reservationData.value.reservationId) {
    restartBooking()
    return
  }

  isCancelling.value = true

  try {
    console.log('Cancelling reservation:', reservationData.value.reservationId)
    const result = await cancelReservationHold(reservationData.value.reservationId)
    console.log('Cancellation result:', result)
    // Stop countdown and show cancelled state
    stopCountdown()
    reservationCancelled.value = true
    showCloseConfirmation.value = false
  } catch (err) {
    console.error('Error cancelling reservation:', err)
    // Still show cancelled state on error
    stopCountdown()
    reservationCancelled.value = true
    showCloseConfirmation.value = false
  } finally {
    isCancelling.value = false
  }
}

function confirmClose() {
  stopCountdown()
  confirmCancelReservation()
}

function goBack() {
  currentStep.value = 1
  showCloseConfirmation.value = false
}

function restartBooking() {
  // Clear all form data
  selectedDate.value = null
  selectedStartTime.value = null
  selectedEndTime.value = null
  selectedLocation.value = null
  fullName.value = ''
  email.value = ''
  phone.value = ''

  // Reset UI states
  availabilityMessage.value = ''
  availabilityState.value = null
  validationError.value = false
  timeRangeError.value = false
  alternativeSlots.value = []
  reservationData.value = null
  loadError.value = null

  // Reset timers
  stopCountdown()
  timeRemaining.value = 0
  holdExpired.value = false
  isPaymentStarted.value = false
  reservationCancelled.value = false

  // Return to step 1
  currentStep.value = 1
  showCloseConfirmation.value = false
}

function handlePaymentStart() {
  isPaymentStarted.value = true
}

// --- Computed Properties ---
const minStartTime = computed(() => {
  if (!selectedDate.value) return OFFICE_START
  if (selectedDate.value === today) {
    const nextHour = new Date().getHours() + 1
    if (nextHour >= Number(OFFICE_END.split(':')[0])) return null
    return `${String(nextHour).padStart(2, '0')}:00`
  }
  return OFFICE_START
})

const minEndTime = computed(() => {
  if (!selectedStartTime.value)
    return String(Number(OFFICE_START.split(':')[0]) + 1).padStart(2, '0') + ':00'
  let endHour = Number(selectedStartTime.value.split(':')[0]) + 1
  if (endHour > Number(OFFICE_END.split(':')[0])) endHour = Number(OFFICE_END.split(':')[0])
  return `${String(endHour).padStart(2, '0')}:00`
})

const officeClosedMessage = computed(() => {
  if (!selectedDate.value || !selectedStartTime.value) return ''
  const startHour = Number(selectedStartTime.value.split(':')[0])
  if (selectedDate.value === today) {
    const nextHour = new Date().getHours() + 1
    if (startHour < nextHour)
      return `Spaces only open from ${String(nextHour).padStart(2, '0')}:00 today`
    if (startHour > Number(OFFICE_END.split(':')[0]))
      return `Spaces only open until ${OFFICE_END}. Please choose another day.`
  } else if (
    startHour < Number(OFFICE_START.split(':')[0]) ||
    startHour > Number(OFFICE_END.split(':')[0])
  ) {
    return `Spaces only open from ${OFFICE_START} to ${OFFICE_END}`
  }
  return ''
})

const sortedAlternativeSlots = computed(() =>
  [...alternativeSlots.value].sort((a, b) => a.start_time.localeCompare(b.start_time)),
)

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

const hasError = computed(
  () => timeRangeError.value || officeClosedMessage.value || validationError.value,
)

const hasLoadError = computed(() => loadError.value !== null)

const holdCountdownClass = computed(() => {
  if (!timeRemaining.value) return ''
  const { minutes, seconds } = timeRemaining.value
  const totalSeconds = minutes * 60 + seconds
  // Warn when less than 5 minutes remain
  if (totalSeconds < 300) return 'text-red-600 font-bold'
  return 'text-primary font-semibold'
})

// --- Watchers ---
watch([selectedStartTime, selectedEndTime, selectedDate], () => {
  availabilityMessage.value = ''
  availabilityState.value = null
  timeRangeError.value = !isValidTimeRange(selectedStartTime.value, selectedEndTime.value)
})

// --- RPC: Attempt Reservation (Write-First) ---
async function attemptReservationSlot() {
  // --- Validate Form Completion ---
  if (!isAvailabilityFormComplete.value) {
    validationError.value = true
    availabilityMessage.value = 'Please fill in all required fields before reserving.'
    return
  }

  validationError.value = false
  isReserving.value = true
  availabilityMessage.value = ''
  availabilityState.value = null
  alternativeSlots.value = []

  try {
    // Map workspace type to DB type
    const dbType = workspaceTypeMap[selectedWorkspaceType.value]
    if (!dbType) throw new Error('Invalid workspace type selected.')

    // Ensure location is a number
    const locationId = Number(selectedLocation.value)
    if (isNaN(locationId)) throw new Error('Invalid location selected.')

    // Call the reservation service
    const result = await attemptReservation({
      workspaceType: dbType,
      locationId: locationId,
      bookingDate: selectedDate.value,
      startTime: selectedStartTime.value,
      endTime: selectedEndTime.value,
      fullName: fullName.value,
      email: email.value,
      phone: phone.value,
    })

    if (!result.success) {
      availabilityState.value = 'unavailable'
      if (result.alternatives?.length) {
        alternativeSlots.value = formatAlternatives(result.alternatives)
        availabilityMessage.value = 'Selected time is taken. See alternatives below.'
      } else {
        availabilityMessage.value = result.error || 'Slot unavailable. Please choose another time.'
      }
      return
    }

    // Success: store reservation info
    reservationData.value = {
      reservationId: result.reservationId,
      workspaceId: result.workspaceId,
      holdExpiresAt: result.holdExpiresAt,
    }

    availabilityState.value = 'available'
    availabilityMessage.value = 'Reservation successful! Proceeding to confirmation...'

    // Start countdown timer
    startCountdown(result.holdExpiresAt)

    // Transition to Step 2 after a short delay for UX
    setTimeout(() => {
      currentStep.value = 2
    }, 500)

    emit('reservation-confirmed', reservationData.value)
  } catch (err) {
    console.error('Reservation attempt failed', err)
    availabilityState.value = 'unavailable'
    availabilityMessage.value = err.message || 'Failed to reserve slot. Try again.'
  } finally {
    isReserving.value = false
  }
}

const officeHoursError = computed(() => {
  if (!selectedStartTime.value || !selectedEndTime.value) return ''

  const startHour = Number(selectedStartTime.value.split(':')[0])
  const endHour = Number(selectedEndTime.value.split(':')[0])

  const officeStart = Number(OFFICE_START.split(':')[0])
  const officeEnd = Number(OFFICE_END.split(':')[0])

  if (startHour < officeStart || endHour > officeEnd) {
    return `Spaces are only available from ${OFFICE_START} to ${OFFICE_END}`
  }

  return ''
})

// --- Cleanup ---
onBeforeUnmount(async () => {
  stopCountdown()

  // Auto-cancel active reservation on unmount (safety net)
  if (
    reservationData.value &&
    reservationData.value.reservationId &&
    !reservationCancelled.value &&
    !holdExpired.value &&
    !isPaymentStarted.value
  ) {
    try {
      await cancelReservationHold(reservationData.value.reservationId)
    } catch (err) {
      console.warn('Failed to auto-cancel reservation on unmount', err)
    }
  }

  availableLocations.value = []
  isLoadingLocations.value = false
})

// --- Expose methods for parent component ---
defineExpose({
  attemptToCloseForm,
  restartBooking,
})
async function retryLoadLocations() {
  loadError.value = null
  try {
    await fetchLocations(selectedWorkspaceType.value)
    if (error.value) {
      loadError.value = 'Failed to load locations. Please try again.'
    }
  } catch (err) {
    loadError.value = err?.message || 'Failed to load locations. Please try again.'
  }
}

onMounted(async () => {
  availableLocations.value = []
  try {
    await fetchLocations(selectedWorkspaceType.value)
    if (error.value) {
      loadError.value = 'Failed to load locations. Please try again.'
    }
  } catch (err) {
    loadError.value = err?.message || 'Failed to load locations. Please try again.'
  }

const handleEsc = (e) => {
    if (e.key !== 'Escape') return

    e.preventDefault()
    e.stopPropagation()

    if (reservationData.value && reservationData.value.reservationId) {
      // Reservation exists
      if (!showCloseConfirmation.value) {
        // First press → show confirmation
        showCloseConfirmation.value = true
      } else {
        // Second press → hide confirmation without cancelling reservation
        showCloseConfirmation.value = false
      }
    } else {
      // No reservation → close modal immediately
      attemptToCloseForm()
    }
  }

  document.addEventListener('keydown', handleEsc)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEsc)
  })})
</script>

<template>
  <div
    class="relative md:w-2xl mx-auto bg-bg rounded-lg shadow-lg p-4 md:p-8 border-2 border-primary/20"
  >
    <!-- Close Button -->
    <button
      @click="attemptToCloseForm"
      class="absolute top-4 right-4 text-heading font-bold hover:text-primary/70"
    >
      X
    </button>

    <!-- Step Indicator -->
    <div class="flex justify-center items-center gap-3 mb-8">
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center font-bold',
          currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600',
        ]"
      >
        1
      </div>
      <div :class="['h-1 flex-1', currentStep >= 2 ? 'bg-primary' : 'bg-gray-300']"></div>
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center font-bold',
          currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600',
        ]"
      >
        2
      </div>
    </div>

    <!-- Step Transitions with Animation -->
    <Transition name="fade-slide" mode="out-in">
      <!-- STEP 1: Booking Details -->
      <div v-if="currentStep === 1" key="step1">
        <h2 class="mb-8 text-center">{{ selectedWorkspaceType }} Booking Form</h2>

        <!-- Load Error State -->
        <div v-if="hasLoadError" class="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
          <p class="text-center text-red-800 font-semibold mb-3 text-lg">
            ⚠ Unable to Load Locations
          </p>
          <p class="text-center text-red-700 text-sm mb-4">
            {{ loadError }}
          </p>
          <div class="flex gap-3 justify-center">
            <button
              type="button"
              class="primary"
              @click="retryLoadLocations"
              :disabled="isLoadingLocations"
            >
              <span v-if="isLoadingLocations" class="spinner" aria-hidden="true"></span>
              <span>{{ isLoadingLocations ? 'Retrying...' : 'Retry' }}</span>
            </button>
            <button type="button" class="secondary" @click="emit('close')">Close</button>
          </div>
        </div>

        <!-- Skeleton Loader -->
        <div v-else-if="isLoadingLocations" class="space-y-6 animate-pulse">
          <div class="h-10 bg-gray-200 rounded w-1/3"></div>
          <div class="h-10 bg-gray-200 rounded w-full"></div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="h-10 bg-gray-200 rounded w-full"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div class="h-10 bg-gray-200 rounded w-full"></div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="h-10 bg-gray-200 rounded w-full"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div class="h-24 bg-gray-200 rounded w-full"></div>
          <div class="flex gap-4">
            <div class="h-10 bg-gray-200 rounded w-1/2"></div>
            <div class="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Booking Form -->
        <form v-else class="text-text space-y-6 pt-4">
          <fieldset
            :disabled="isReserving"
            :class="{ 'opacity-70 pointer-events-none': isReserving }"
            class="space-y-6 transition-opacity"
          >
            <!-- Contact Info -->
            <div class="space-y-4">
              <div>
                <label for="full-name" class="block text-lg font-semibold mb-1">Full Name</label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Enter your full name"
                  v-model="fullName"
                  class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="email" class="block text-lg font-semibold mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    v-model="email"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-lg font-semibold mb-1">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    v-model="phone"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <!-- Location Selection -->
            <div>
              <label for="location" class="block text-lg font-semibold">Select Location</label>
              <select
                v-if="!isLoadingLocations"
                v-model="selectedLocation"
                id="location"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select location</option>
                <option
                  v-for="location in availableLocations || []"
                  :key="location.location_id"
                  :value="location.location_id"
                >
                  {{ `${location.location} - ${location.city}` }}
                </option>
              </select>
              <p><span class="font-bold">Price</span>: {{ getSelectedLocationPrice() }} per hour</p>
            </div>

            <!-- Date & Time -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="date" class="block text-lg font-semibold mb-1">Date</label>
                <input
                  id="date"
                  type="date"
                  :min="today"
                  v-model="selectedDate"
                  class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Start Time -->
                <div>
                  <label for="start_time" class="block text-lg font-semibold mb-1">Start</label>
                  <input
                    id="start_time"
                    type="time"
                    v-model="selectedStartTime"
                    step="3600"
                    :min="minStartTime || OFFICE_START"
                    max="18:00"
                    :disabled="!minStartTime"
                    pattern="^([01]\\d|2[0-3]):00$"
                    title="Please select a full hour (e.g. 10:00)"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <!-- End Time -->
                <div>
                  <label for="end_time" class="block text-lg font-semibold mb-1">End</label>
                  <input
                    id="end_time"
                    type="time"
                    v-model="selectedEndTime"
                    step="3600"
                    :min="minEndTime"
                    :disabled="!minStartTime"
                    pattern="^([01]\\d|2[0-3]):00$"
                    title="Please select a full hour (e.g. 12:00)"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <!-- Error / Availability Messages -->
            <div aria-live="polite" aria-atomic="true" class="text-center mt-2">
              <p
                v-if="validationError"
                class="font-semibold text-red-600 bg-red-50 p-3 rounded"
                role="alert"
              >
                ⚠ Please fill in all required fields before checking availability.
              </p>

              <p
                v-else-if="timeRangeError"
                class="font-semibold text-red-600 bg-red-50 p-3 rounded"
                role="alert"
              >
                Enter a valid time range between 08:00 and 18:00.
              </p>

              <p
                v-else-if="officeHoursError"
                class="font-semibold text-red-600 bg-red-50 p-3 rounded"
                role="alert"
              >
                ⚠ {{ officeHoursError }}
              </p>

              <p
                v-else-if="availabilityState === 'available'"
                class="font-semibold text-green-600 bg-green-50 p-3 rounded"
                role="status"
              >
                ✓ Selected time is available.
              </p>

              <p
                v-else-if="availabilityState === 'unavailable'"
                class="font-semibold text-red-600 bg-red-50 p-3 rounded"
                role="status"
              >
                ✗ Selected time is already taken.
              </p>
            </div>

            <!-- Alternative Slots -->
            <div
              v-if="sortedAlternativeSlots.length"
              class="flex flex-wrap gap-2 mb-4 justify-center"
            >
              <button
                v-for="(slot, index) in sortedAlternativeSlots"
                :key="index"
                type="button"
                @click="selectAlternativeSlot(slot)"
                class="px-2 py-2 rounded-full border border-primary/40 text-xs md:text-sm font-medium bg-white hover:bg-primary/80 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {{ formatSlot(slot) }}
              </button>
            </div>

            <div class="flex justify-center gap-4 mt-2">
              <button
                type="button"
                class="primary disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!isAvailabilityFormComplete || hasError || isReserving"
                @click="attemptReservationSlot"
              >
                <span v-if="isReserving" class="spinner" aria-hidden="true"></span>
                <span>
                  {{ isReserving ? 'Reserving…' : 'Reserve Slot & Continue' }}
                </span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <!-- STEP 2: Confirmation Screen -->
      <div v-else-if="currentStep === 2" key="step2" v-show="reservationData">
        <h2 class="mb-8 text-center">Confirm Your Booking</h2>

        <div class="text-text space-y-6 pt-4">
          <!-- Hold Countdown Timer -->
          <div
            v-if="!holdExpired && !reservationCancelled"
            class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6"
          >
            <p class="text-center text-yellow-900 font-semibold mb-2">
              ⏱ Your Time is Temporarily Reserved
            </p>
            <p class="text-center text-yellow-800 text-sm mb-4">
              Your selected time slot has been held for {{ HOLD_DURATION_MINUTES }} minutes.
              Complete your payment now to secure the booking.
            </p>
            <div class="text-center mb-4">
              <div :class="['text-5xl font-bold font-mono', holdCountdownClass]">
                {{ formatTimeRemaining() }}
              </div>
              <p class="text-yellow-700 text-xs mt-2">
                <span
                  v-if="timeRemaining && timeRemaining.minutes * 60 + timeRemaining.seconds < 300"
                  class="text-red-600 font-semibold"
                >
                  ⚠ Hurry! Time running out
                </span>
              </p>
            </div>
          </div>

          <!-- Hold Expired UI -->
          <div
            v-else-if="!reservationCancelled"
            class="bg-red-50 border-2 border-red-300 rounded-lg p-6"
          >
            <p class="text-center text-red-800 font-semibold mb-2 text-lg">
              ✗ Reservation Hold Expired
            </p>
            <p class="text-center text-red-700 text-sm mb-6">
              Your 15-minute hold period has ended. To book this time slot, you'll need to start a
              new reservation.
            </p>
            <div class="text-center">
              <button type="button" class="primary" @click="restartBooking">
                Start New Reservation
              </button>
            </div>
          </div>

          <!-- Reservation Cancelled UI -->
          <div
            v-else-if="reservationCancelled"
            class="bg-green-50 border-2 border-green-300 rounded-lg p-6"
          >
            <p class="text-center text-green-800 font-semibold mb-2 text-lg">
              ✓ Reservation Cancelled
            </p>
            <p class="text-center text-green-700 text-sm mb-6">
              Your reservation hold has been cancelled. You can start a new booking whenever you're
              ready.
            </p>
            <div class="text-center">
              <button type="button" class="primary" @click="restartBooking">
                Start New Booking
              </button>
            </div>
          </div>

          <!-- Booking Summary (Hidden when expired or cancelled) -->
          <div
            v-if="!holdExpired && !reservationCancelled"
            class="space-y-4 bg-gray-50 rounded-lg px-2 md:p-6"
          >
            <h3 class="font-semibold text-lg mb-4">Booking Summary</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p class="">Name</p>
                <p class="text-text font-semibold">{{ fullName }}</p>
              </div>
              <div>
                <p class="">Email</p>
                <p class="text-text font-semibold">{{ email }}</p>
              </div>
              <div>
                <p class="">Phone</p>
                <p class="font-semibold">{{ phone }}</p>
              </div>
              <div>
                <p class="">Location</p>
                <p class="font-semibold">{{ getSelectedLocationName() }}</p>
              </div>
              <div>
                <p class="">Date</p>
                <p class="font-semibold">{{ getSelectedDateFormatted() }}</p>
              </div>
              <div>
                <p class="">Time</p>
                <p class="font-semibold">
                  {{ formatTo12Hour(selectedStartTime) }} – {{ formatTo12Hour(selectedEndTime) }}
                </p>
              </div>
              <div>
                <p class="">Workspace Type</p>
                <p class="font-semibold">{{ selectedWorkspaceType }}</p>
              </div>
              <div>
                <p class="">Reservation ID</p>
                <p class="font-semibold text-xs">{{ reservationData?.reservationId }}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons (Hidden when expired or cancelled) -->
          <div
            v-if="!holdExpired && !reservationCancelled"
            class="flex flex-col md:flex-row gap-3 md:gap-4 mt-6"
          >
            <!-- Proceed to Payment Button -->

            <!-- Cancel Reservation Button -->
            <button
              v-if="!isPaymentStarted"
              type="button"
              class="cancel"
              @click="cancelReservation"
              :disabled="isPaymentStarted"
            >
              Cancel Reservation
            </button>
            <button
              type="button"
              class="primary flex-1"
              :disabled="isPaymentStarted"
              @click="handlePaymentStart"
            >
              <span v-if="isPaymentStarted" class="spinner" aria-hidden="true"></span>
              <span>
                {{ isPaymentStarted ? 'Processing Payment...' : 'Proceed to Payment' }}
              </span>
            </button>
          </div>

          <!-- Payment Started Warning -->
          <div v-if="isPaymentStarted" class="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <p class="text-center text-blue-800 text-sm">
              💳 Payment processing... Please do not close this window.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <!-- Close Confirmation Modal -->
  <Transition name="fade">
    <div
      v-if="showCloseConfirmation"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showCloseConfirmation = false"
      @keydown.esc.capture.stop.prevent="showCloseConfirmation = false"
    >
      <div class="bg-bg rounded-lg shadow-xl p-6 md:p-8 max-w-sm mx-4 border-2 border-primary/20">
        <h3 class="text-xl font-semibold mb-4">Close Booking Form?</h3>
        <p class="text-text mb-6">
          You have an active reservation with {{ formatTimeRemaining() }} remaining on your hold.
          Are you sure you want to close? Your reservation will be cancelled.
        </p>
        <div class="flex gap-4">
          <button
            type="button"
            class="secondary flex-1"
            @click="showCloseConfirmation = false"
            :disabled="isCancelling"
          >
            Keep Booking
          </button>
          <button
            type="button"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="confirmCancelReservation"
            :disabled="isCancelling"
          >
            <span v-if="isCancelling" class="spinner" aria-hidden="true"></span>
            <span>
              {{ isCancelling ? 'Cancelling...' : 'Cancel Reservation' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
input,
select,
textarea {
  background-color: var(--color-card-bg2);
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 9999px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Step Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Modal Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
