import { ref, computed } from 'vue'
import {
  attemptReservation,
  formatAlternatives,
  cancelReservationHold,
  restoreReservation,
} from '@/services/reservationService.js'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'

export function useReservationHold(workspaceType) {
  // --- Reservation Data ---
  const reservationData = ref(null)
  const isReserving = ref(false)
  const isCancelling = ref(false)
  const isPaymentStarted = ref(false)
  const reservationError = ref(null)
  const cancellationError = ref(null)
  const alternativeSlots = ref([])
  const availabilityState = ref(null)
  const availabilityMessage = ref('')

  // --- Countdown Timer State ---
  const timeRemaining = ref(null)
  const holdExpired = ref(false)
  const countdownInterval = ref(null)
  const reservationCancelled = ref(false)

  // --- Configuration ---
  const HOLD_DURATION_MINUTES = 15

  // --- Timer Functions ---
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
        timeRemaining.value = null
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

  // --- Reservation Functions ---
  async function reserveSlot(payload) {
    reservationError.value = null
    alternativeSlots.value = []
    availabilityState.value = null
    availabilityMessage.value = ''

    // Validate payload
    if (
      !payload.workspaceType ||
      !payload.locationId ||
      !payload.bookingDate ||
      !payload.startTime ||
      !payload.endTime ||
      !payload.fullName ||
      !payload.email ||
      !payload.phone
    ) {
      reservationError.value = 'Missing required fields'
      return
    }

    isReserving.value = true
    try {
      // Map workspace type to DB type
      const dbType = workspaceTypeMap[payload.workspaceType]
      if (!dbType) {
        reservationError.value = 'Invalid workspace type selected.'
        return
      }

      // Ensure location is a number
      const locationId = Number(payload.locationId)
      if (isNaN(locationId)) {
        reservationError.value = 'Invalid location selected.'
        return
      }

      // Call the reservation service
      const result = await attemptReservation({
        workspaceType: dbType,
        locationId: locationId,
        bookingDate: payload.bookingDate,
        startTime: payload.startTime,
        endTime: payload.endTime,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        otp: payload.otp || '',
      })

      if (!result.success) {
        availabilityState.value = 'unavailable'
        availabilityMessage.value =
          'Selected Time is taken, select from available alternative below'
        alternativeSlots.value = formatAlternatives(result.alternatives)
        return
      }

      // Success: store reservation info and start countdown
      availabilityState.value = 'available'
      availabilityMessage.value = 'space is available, proceeding to confirmation'
      reservationData.value = {
        reservationId: result.reservationId,
        workspaceId: result.workspaceId,
        holdExpiresAt: result.holdExpiresAt,
      }

      // Persist minimal restore data
      localStorage.setItem(
        'activeReservation',
        JSON.stringify({
          reservation_id: result.reservationId,
          workspace_type: payload.workspaceType,
        }),
      )

      // Start countdown timer
      startCountdown(result.holdExpiresAt)

      // return {
      //   success: true,
      //   reservationId: result.reservationId,
      //   workspaceId: result.workspaceId,
      //   holdExpiresAt: result.holdExpiresAt,
      // }
    } catch (err) {
      console.error('Reservation attempt failed', err)
      availabilityState.value = null
      availabilityMessage.value = ''
      reservationError.value = err.message
    } finally {
      isReserving.value = false
    }
  }

  async function restoreFromStorage(workspaceType) {
    console.log('checking for local storage reservation')

    const savedRaw = localStorage.getItem('activeReservation')

    if (!savedRaw) {
      console.log('no saved reservation found')
      return
    }

    const saved = JSON.parse(savedRaw)

    if (saved.workspace_type !== workspaceType) {
      console.log('workspace type mismatch')
      return
    }

    try {
      const result = await restoreReservation(saved.reservation_id)

      if (!result) {
        // Reservation doesn't exist or invalid status
        localStorage.removeItem('activeReservation')
        return
      }

      console.log(result)
      // Always populate reservation data if it exists
      reservationData.value = {
        reservationId: result.id,
        workspaceId: result.workspace_id,
        bookingDate: result.booking_date,
        startTime: result.start_time,
        endTime: result.end_time,
        holdExpiresAt: result.hold_expires_at,
        fullName: result.full_name,
        email: result.email,
        phone: result.guest_phone,
        status: result.status,
      }

      // Handle status logic
      if (result.status === 'expired') {
        holdExpired.value = true
        reservationCancelled.value = false
        console.log('expired block:', result.status)
        return
      }

      if (result.status === 'pending' || result.status === 'payment_started') {
        holdExpired.value = false
        reservationCancelled.value = false
        console.log('pending block:', result.status)

        startCountdown(result.hold_expires_at)
        return
      }

      // Any other unexpected status
      // localStorage.removeItem('activeReservation')
    } catch (err) {
      console.error('Failed to restore reservation', err)
    }
  }

  async function cancelHold() {
    if (!reservationData.value || !reservationData.value.reservationId) {
      return
    }

    isCancelling.value = true

    try {
      console.log('Cancelling reservation:', reservationData.value.reservationId)
      const result = await cancelReservationHold(reservationData.value.reservationId)
      console.log('Cancellation result:', result)

      // Stop countdown and mark as cancelled
      stopCountdown()
      reservationCancelled.value = true
      localStorage.removeItem('activeReservation')

      return result
    } catch (err) {
      console.error('Error cancelling reservation:', err)
      cancellationError.value = err.message
    } finally {
      isCancelling.value = false
    }
  }

  function handlePaymentStart() {
    isPaymentStarted.value = true
  }

  function restartHold() {
    // Clear all timer and reservation data
    stopCountdown()
    timeRemaining.value = null
    holdExpired.value = false
    isPaymentStarted.value = false
    reservationCancelled.value = false
    reservationData.value = null
  }

  // function cleanup() {
  //   stopCountdown()

  //   // Auto-cancel active reservation (safety net)
  //   if (
  //     reservationData.value &&
  //     reservationData.value.reservationId &&
  //     !reservationCancelled.value &&
  //     !holdExpired.value &&
  //     !isPaymentStarted.value
  //   ) {
  //     return cancelReservationHold(reservationData.value.reservationId).catch((err) => {
  //       console.warn('Failed to auto-cancel reservation on cleanup', err)
  //     })
  //   }
  // }

  // --- Computed Properties ---
  const holdCountdownClass = computed(() => {
    if (!timeRemaining.value) return ''
    const { minutes, seconds } = timeRemaining.value
    const totalSeconds = minutes * 60 + seconds
    // Warn when less than 5 minutes remain
    if (totalSeconds < 300) return 'text-red-600 font-bold'
    return 'text-primary font-semibold'
  })

  // --- Expose public API ---
  return {
    // Methods
    reserveSlot,
    cancelHold,
    restartHold,
    handlePaymentStart,
    // cleanup,
    restoreFromStorage,

    // State - Reactive refs
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
    // Utilities
    formatTimeRemaining,
    holdCountdownClass,
    HOLD_DURATION_MINUTES,
  }
}
