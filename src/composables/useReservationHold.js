import { ref, computed } from 'vue'
import {
  attemptReservation,
  formatAlternatives,
  cancelReservationHold,
} from '@/services/reservationService.js'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'

export function useReservationHold(workspaceType) {
  // --- Reservation Data ---
  const reservationData = ref(null)
  const isReserving = ref(false)
  const isCancelling = ref(false)
  const isPaymentStarted = ref(false)

  // --- Countdown Timer State ---
  const timeRemaining = ref(0)
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

  // --- Reservation Functions ---
  async function reserveSlot(payload) {
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
      throw new Error('Missing required reservation fields')
    }

    isReserving.value = true

    try {
      // Map workspace type to DB type
      const dbType = workspaceTypeMap[payload.workspaceType]
      if (!dbType) throw new Error('Invalid workspace type selected.')

      // Ensure location is a number
      const locationId = Number(payload.locationId)
      if (isNaN(locationId)) throw new Error('Invalid location selected.')

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
        return {
          success: false,
          error: result.error || 'Slot unavailable. Please choose another time.',
          alternatives: result.alternatives ? formatAlternatives(result.alternatives) : [],
        }
      }

      // Success: store reservation info and start countdown
      reservationData.value = {
        reservationId: result.reservationId,
        workspaceId: result.workspaceId,
        holdExpiresAt: result.holdExpiresAt,
      }

      // Start countdown timer
      startCountdown(result.holdExpiresAt)

      return {
        success: true,
        reservationId: result.reservationId,
        workspaceId: result.workspaceId,
        holdExpiresAt: result.holdExpiresAt,
      }
    } catch (err) {
      console.error('Reservation attempt failed', err)
      throw err
    } finally {
      isReserving.value = false
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

      return result
    } catch (err) {
      console.error('Error cancelling reservation:', err)
      // Still show cancelled state on error
      stopCountdown()
      reservationCancelled.value = true
      throw err
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
    timeRemaining.value = 0
    holdExpired.value = false
    isPaymentStarted.value = false
    reservationCancelled.value = false
    reservationData.value = null
  }

  function cleanup() {
    stopCountdown()

    // Auto-cancel active reservation (safety net)
    if (
      reservationData.value &&
      reservationData.value.reservationId &&
      !reservationCancelled.value &&
      !holdExpired.value &&
      !isPaymentStarted.value
    ) {
      return cancelReservationHold(reservationData.value.reservationId).catch((err) => {
        console.warn('Failed to auto-cancel reservation on cleanup', err)
      })
    }
  }

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
    cleanup,

    // State - Reactive refs
    reservationData,
    timeRemaining,
    holdExpired,
    reservationCancelled,
    isPaymentStarted,
    isReserving,
    isCancelling,

    // Utilities
    formatTimeRemaining,
    holdCountdownClass,
    HOLD_DURATION_MINUTES,
  }
}
