import { supabase } from '@/lib/supabaseClient'
import { startPayment, PaymentError } from '@/utils/payments'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function usePayment() {
  const paying = ref(false)
  const errorMessage = ref('')
  const errorCode = ref('')

  async function pay(input) {
    errorCode.value = ''

    if (paying.value) return // stops double clicks creating two holds
    paying.value = true
    errorMessage.value = ''
    try {
      const res = await startPayment(supabase, input)
      window.location.assign(res.checkout_url)
    } catch (e) {
      if (e instanceof PaymentError) {
        errorMessage.value = e.message
        errorCode.value = e.code
        paying.value = false
      } else {
        errorMessage.value = 'Something went wrong. Please try again.'
        paying.value = false
      }
    }
  }

  // Back button from the provider can restore this page from cache with paying still true
  function onPageShow(e) {
    if (e.persisted) paying.value = false
  }
  onMounted(() => window.addEventListener('pageshow', onPageShow))
  onBeforeUnmount(() => window.removeEventListener('pageshow', onPageShow))

  return { pay, paying, errorMessage, errorCode }
}
