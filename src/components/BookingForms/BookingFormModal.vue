<script setup>
import { ref, toRef, watch, computed, onBeforeUnmount, onMounted, defineExpose } from 'vue'
import { useWorkspaceLocations } from '@/composables/useWorkspaceLocations'
import { useReservationHold } from '@/composables/useReservationHold'
import { useBookingForm } from '@/composables/useBookingForm'
import { useGuestOtp } from '@/composables/useGuestOtp'

const props = defineProps({
  workspaceType: { type: String, required: true },
})

const { otpLoading, otpSent, otpError, otpCoolDown, requestOtp } = useGuestOtp()

// Initialize workspace locations composable first
const { availableLocations, isLoadingLocations, error, fetchLocations } = useWorkspaceLocations()

// Initialize booking form composable with office hours
const {
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
  resetForm: resetFormData,
  isValidTimeRange,
  formattedHelpers: {
    formatTo12Hour,
    formatSlot,
    getSelectedLocationName,
    getSelectedLocationPrice,
    getSelectedDateFormatted,
  },
} = useBookingForm(availableLocations, '08:00', '18:00')

// Initialize reservation composable - handles all timer and reservation logic
const {
  reserveSlot,
  cancelHold,
  restartHold,
  handlePaymentStart: composableHandlePaymentStart,
  // cleanup,
  restoreFromStorage,
  reservationData,
  timeRemaining,
  holdExpired,
  reservationCancelled,
  isPaymentStarted,
  isReserving,
  isCancelling,
  reservationError,
  alternativeSlots,
  availabilityState,
  availabilityMessage,
  formatTimeRemaining,
  holdCountdownClass,
  HOLD_DURATION_MINUTES,
} = useReservationHold()

const emit = defineEmits(['close', 'reservation-confirmed'])
const today = new Date().toISOString().split('T')[0]
const selectedWorkspaceType = toRef(props, 'workspaceType')

// --- Form Steps ---
const currentStep = ref(1) // 1: Booking Details, 2: Confirmation
const showCloseConfirmation = ref(false)

// --- UI State ---
const loadError = ref(null) // Error loading locations

// Office hours
const OFFICE_START = '08:00'
const OFFICE_END = '18:00'

async function handleRequestOtp() {
  await requestOtp({
    email: email.value,
    workspaceType: selectedWorkspaceType.value,
    locationId: Number(selectedLocation.value),
    bookingDate: selectedDate.value,
  })
}

function selectAlternativeSlot(slot) {
  selectedStartTime.value = slot.start_time
  selectedEndTime.value = slot.end_time
  availabilityState.value = null
  reservationError.value = null
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

  try {
    await cancelHold()
    showCloseConfirmation.value = false
  } catch (err) {
    console.error('Error cancelling reservation:', err)
    showCloseConfirmation.value = false
  }
}

function restartBooking() {
  // Reset form fields via composable
  localStorage.removeItem('activeReservation')
  resetFormData({ otpSent, otpError, otpCoolDown })

  // Reset UI states
  availabilityMessage.value = ''
  availabilityState.value = null
  alternativeSlots.value = []
  loadError.value = null

  // Reset reservation state via composable
  restartHold()

  // Return to step 1
  currentStep.value = 1
  showCloseConfirmation.value = false
}

function handlePaymentStart() {
  composableHandlePaymentStart()
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

const hasError = computed(
  () => timeRangeError.value || officeClosedMessage.value || validationError.value,
)

const hasLoadError = computed(() => loadError.value !== null)

// --- Watchers ---
watch([selectedStartTime, selectedEndTime, selectedDate], () => {
  availabilityMessage.value = ''
  availabilityState.value = null
  timeRangeError.value = !isValidTimeRange(selectedStartTime.value, selectedEndTime.value)
})

// --- RPC: Attempt Reservation (Write-First) ---
async function attemptReservationSlot() {
  currentStep.value = 1
  // --- Validate Form Completion ---
  if (!isAvailabilityFormComplete.value) {
    validationError.value = 'Please fill required fields.'
    return
  }
  // Call the reservation composable
  await reserveSlot({
    workspaceType: selectedWorkspaceType.value,
    locationId: Number(selectedLocation.value),
    bookingDate: selectedDate.value,
    startTime: selectedStartTime.value,
    endTime: selectedEndTime.value,
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    otp: otp.value,
  })

  if (reservationError.value) return
  
  console.log('availability state:', availabilityState.value)

  if (availabilityState.value === 'unavailable') return

  // Transition to Step 2 after a short delay for UX
  setTimeout(() => {
    currentStep.value = 2
  }, 500)

  emit('reservation-confirmed', reservationData.value)
}

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
  // availableLocations.value = []
  console.log('is hold expired?:', holdExpired)

  try {
    await restoreFromStorage(selectedWorkspaceType.value)

    if (reservationData.value) {
      // 👇 THIS is what you're missing
      fullName.value = reservationData.value.fullName
      email.value = reservationData.value.email
      phone.value = reservationData.value.phone
      selectedDate.value = reservationData.value.bookingDate
      selectedStartTime.value = reservationData.value.startTime
      selectedEndTime.value = reservationData.value.endTime

      currentStep.value = 2
      return
    }

    await fetchLocations(selectedWorkspaceType.value)

    if (error.value) {
      loadError.value = 'Failed to load locations. Please try again.'
    }
  } catch (err) {
    loadError.value = err?.message || 'Failed to initialize booking. Please try again.'
  }

  const handleEsc = (e) => {
    if (e.key !== 'Escape') return

    e.preventDefault()
    e.stopPropagation()

    if (reservationData.value?.reservationId) {
      showCloseConfirmation.value = !showCloseConfirmation.value
    } else {
      attemptToCloseForm()
    }
  }

  document.addEventListener('keydown', handleEsc)
})
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
        <div v-if="hasLoadError" class="bg-red-100 border-2 border-red-300 rounded-lg p-6 mb-6">
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
                    pattern="^([01]\d|2[0-3]):00$"
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
                    pattern="^([01]\d|2[0-3]):00$"
                    title="Please select a full hour (e.g. 12:00)"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <!-- OTP Field -->
            <div>
              <label for="otp" class="block text-lg font-semibold mb-1">Enter OTP</label>
              <div class="">
                <div class="grid grid-cols-5 gap-3">
                  <input
                    type="text"
                    id="otp"
                    v-model="otp"
                    maxlength="6"
                    pattern="\d{6}"
                    inputmode="numeric"
                    class="col-span-3 w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <button
                    class="bg-primary text-white col-span-2 text-xs sm:text-base font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="otpCoolDown > 0 || otpLoading"
                    @click.prevent="handleRequestOtp"
                  >
                    <span v-if="otpLoading" class="spinner"></span>
                    <span>{{ otpLoading ? 'Sending...' : 'Request OTP' }}</span>
                  </button>
                </div>
                <div aria-live="polite">
                  <p v-if="otpSent" class="text-green-600 text-sm">
                    OTP sent to your email,
                    <span v-if="otpCoolDown > 0"> resend in {{ otpCoolDown }} secs</span>
                  </p>
                  <p v-if="otpError" class="text-red-500">
                    {{ otpError }}
                    <span v-if="otpCoolDown > 0">
                      (check email or try again in {{ otpCoolDown }}s)</span
                    >
                  </p>
                </div>
              </div>
            </div>

            <!-- Error / Availability Messages -->
            <div aria-live="polite" aria-atomic="true" class="text-center mt-2">
              <p
                v-if="validationError"
                class="font-semibold text-red-600 bg-red-100 p-3 rounded"
                role="alert"
              >
                ⚠ Please fill in all required fields
              </p>

              <p
                v-else-if="timeRangeError"
                class="font-semibold text-red-600 bg-red-100 p-3 rounded"
                role="alert"
              >
                Enter a valid time range between 08:00 and 18:00.
              </p>

              <p
                v-else-if="officeHoursError"
                class="font-semibold text-green-600 bg-red-100 p-3 rounded"
                role="alert"
              >
                ⚠ {{ officeHoursError }}
              </p>

              <p
                v-else-if="availabilityState === 'available'"
                class="font-semibold text-green-600 bg-green-50 p-3 rounded"
                role="status"
              >
                ✓ {{ availabilityMessage }}
              </p>
              <p
                v-else-if="availabilityState === 'unavailable'"
                class="font-semibold text-green-600 bg-red-100 p-3 rounded"
                role="status"
              >
                ✓ {{ availabilityMessage }}
              </p>

              <p
                v-else-if="reservationError"
                class="font-semibold text-red-600 bg-red-100 p-3 rounded"
                role="status"
              >
                ✗ {{ reservationError }}
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

          <!-- Hold Expired UI -->
          <div v-if="holdExpired" class="bg-red-100 border-2 border-red-300 rounded-lg p-6">
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

          <div v-else class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <p class="text-center text-yellow-900 font-semibold mb-2">
              ⏱ Your Time is Temporarily Reserved
            </p>
            <p class="text-center text-yellow-800 text-sm mb-4">
              Your selected time slot has been held for {{ HOLD_DURATION_MINUTES }} minutes.
              Complete your payment now to complete your booking.
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

          <!-- Booking Summary (Hidden when expired or cancelled) -->
          <div v-if="reservationData" class="space-y-4 bg-gray-50 rounded-lg px-2 md:p-6">
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
