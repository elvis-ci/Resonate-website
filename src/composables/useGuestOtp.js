// import { ref, onUnmounted } from 'vue'
// import { sendGuestOtp } from '@/services/guestOtpService'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'
import { ref, onUnmounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export function useGuestOtp() {
  const otpLoading = ref(false)
  const otpSent = ref(false)
  const otpError = ref(null)
  const otpCoolDown = ref(0)

  let interval = null

  function startCooldown(seconds) {
    otpCoolDown.value = seconds

    if (interval) clearInterval(interval)

    interval = setInterval(() => {
      if (otpCoolDown.value > 1) {
        otpCoolDown.value--
      } else {
        otpCoolDown.value = 0
        clearInterval(interval)
        interval = null

        if (otpError.value && otpError.value.includes('OTP recently sent')) {
          otpError.value = null
        }
      }
    }, 1000)
  }

  async function requestOtp({ email, workspaceType }) {
    if (otpLoading.value) return
    if (otpCoolDown.value > 0) return

    otpLoading.value = true
    otpError.value = null
    otpSent.value = false

    try {
      const mappedWorkspaceType = workspaceTypeMap[workspaceType]
      if (!mappedWorkspaceType) throw new Error('Invalid workspace type')

      if (!email || !email.includes('@')) {
        throw new Error('Invalid email address')
      }

      // ----------------- Supabase OTP -----------------
      console.log('Requesting OTP for', email)
      const { data, error } = await supabase.auth.signInWithOtp({ email })
      console.log({ data, error })

      if (error) {
        console.error('[Supabase OTP Error]', error)
        otpError.value = error.message || 'Failed to send OTP'
      } else {
        otpSent.value = true
        startCooldown(60)
      }
    } catch (err) {
      console.error('[requestOtp Exception]', err)
      otpError.value = err?.message || 'Failed to send OTP. Try again.'
    } finally {
      otpLoading.value = false
    }
  }

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  return {
    otpLoading,
    otpSent,
    otpError,
    otpCoolDown,
    requestOtp,
  }
}


//  the code commented below is an otp request function and it works with the guestOtpService.js in the services folder using "Resend" which is an smtp provider.
//  the project will revert to this code when it acquires a domain. 

// export function useGuestOtp() {
//   const otpLoading = ref(false)
//   const otpSent = ref(false)
//   const otpError = ref(null)
//   const otpCoolDown = ref(0)

//   let interval = null

//   function startCooldown(seconds) {
//     otpCoolDown.value = seconds

//     if (interval) {
//       clearInterval(interval)
//       interval = null
//     }

//     interval = setInterval(() => {
//       if (otpCoolDown.value > 1) {
//         otpCoolDown.value--
//       } else {
//         otpCoolDown.value = 0
//         if (interval) {
//           clearInterval(interval)
//           interval = null
//         }

//         // Clear rate-limit error automatically
//         if (otpError.value && otpError.value.includes('OTP recently sent')) {
//           otpError.value = null
//         }
//       }
//     }, 1000)
//   }

//   async function requestOtp({ email, workspaceType, locationId, bookingDate }) {
//     if (otpLoading.value) return
//     if (otpCoolDown.value > 0) return

//     otpLoading.value = true
//     otpError.value = null
//     otpSent.value = false

//     try {
//       // Map workspace type to normalized value for backend
//       const mappedWorkspaceType = workspaceTypeMap[workspaceType]
//       if (!mappedWorkspaceType) throw new Error('Invalid workspace type')

//       const result = await sendGuestOtp({
//         email,
//         workspaceType: mappedWorkspaceType,
//         locationId,
//         bookingDate,
//       })

//       if (result.success) {
//         otpSent.value = true
//         startCooldown(result.cooldown ?? 60)
//       } else {
//         otpError.value = result.error || 'Failed to send OTP'
//         if (result.retryAfter) startCooldown(result.retryAfter)
//       }
//     } catch (err) {
//       otpError.value = err?.message || 'Failed to send OTP. Try again or contact support'
//     } finally {
//       otpLoading.value = false
//     }
//   }

//   onUnmounted(() => {
//     if (interval) {
//       clearInterval(interval)
//       interval = null
//     }
//   })

//   return {
//     otpLoading,
//     otpSent,
//     otpError,
//     otpCoolDown,
//     requestOtp,
//   }
// }
