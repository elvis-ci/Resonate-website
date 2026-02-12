import { ref, onUnmounted } from 'vue'
import { sendGuestOtp } from '@/services/guestOtpService'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'

export function useGuestOtp() {
  const otpLoading = ref(false)
  const otpSent = ref(false)
  const otpError = ref(null)
  const otpCoolDown = ref(0)

  let interval = null

  function startCooldown(seconds) {
    otpCoolDown.value = seconds

    if (interval) {
      clearInterval(interval)
      interval = null
    }

    interval = setInterval(() => {
      if (otpCoolDown.value > 1) {
        otpCoolDown.value--
      } else {
        otpCoolDown.value = 0
        if (interval) clearInterval(interval)
        interval = null

        // Automatically clear rate-limit error
        if (otpError.value && otpError.value.includes('OTP recently sent')) {
          otpError.value = null
        }
      }
    }, 1000)
  }

  async function requestOtp({
    email,
    workspaceType,
    locationId,
    bookingDate,
    startTime,
    endTime,
  }) {
    if (otpLoading.value) return
    if (otpCoolDown.value > 0) return

    otpLoading.value = true
    otpError.value = null
    otpSent.value = false

    try {
      const mappedWorkspaceType = workspaceTypeMap[workspaceType]
      if (!mappedWorkspaceType) throw new Error('Invalid workspace type')

      const result = await sendGuestOtp({
        email,
        workspaceType: mappedWorkspaceType,
        locationId,
        bookingDate,
        startTime,
        endTime,
      })

      if (result.success) {
        otpSent.value = true
        startCooldown(result.cooldown || 60)
      } else {
        otpError.value = result.error || 'Failed to send OTP'

        if (result.retryAfter) {
          startCooldown(result.retryAfter)
          otpError.value = `${result.error} `
        }
      }
    } catch (err) {
      otpError.value = err?.message || 'Failed to send OTP. Try again or contact support'
    } finally {
      otpLoading.value = false
    }
  }

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  })

  return {
    otpLoading,
    otpSent,
    otpError,
    otpCoolDown,
    requestOtp,
  }
}
