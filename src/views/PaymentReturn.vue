<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const route = useRoute()
const router = useRouter()

// Paystack adds ?trxref=&reference=, Flutterwave adds ?tx_ref=&status=.
// If a value is repeated, Vue Router returns an array, so take the first one.
function firstValue(v) {
  return String(Array.isArray(v) ? (v[0] ?? '') : (v ?? '')).trim()
}
const reference =
  firstValue(route.query.reference) ||
  firstValue(route.query.trxref) ||
  firstValue(route.query.tx_ref)

const view = ref('checking') // checking | success | review | failed | cancelled | timeout
const bookingCode = ref('')
const copyState = ref('idle') // idle | copied | failed
let timer
let copyTimer
let stopped = false

const statusMeta = computed(() => {
  const styles = {
    checking: {
      badge: 'Processing',
      title: 'Confirming your payment',
      description: 'Please keep this tab open while we verify your booking status.',
      accent: 'text-amber-700 bg-amber-100',
      icon: '⏳',
      tone: 'bg-amber-100 text-amber-700',
    },
    success: {
      badge: 'Confirmed',
      title: 'Payment received',
      description: 'Your booking has been confirmed and is now secured.',
      accent: 'text-emerald-700 bg-emerald-100',
      icon: '✓',
      tone: 'bg-emerald-100 text-emerald-700',
    },
    review: {
      badge: 'Under review',
      title: 'Payment received',
      description: 'We are finalising your booking and will confirm it shortly.',
      accent: 'text-orange-700 bg-orange-100',
      icon: '!',
      tone: 'bg-orange-100 text-orange-700',
    },
    cancelled: {
      badge: 'Cancelled',
      title: 'Payment cancelled',
      description: 'No charge was completed for this booking.',
      accent: 'text-slate-700 bg-slate-200',
      icon: '−',
      tone: 'bg-slate-200 text-slate-700',
    },
    failed: {
      badge: 'Failed',
      title: 'Payment could not be completed',
      description: 'We were unable to complete your payment. Please try again or contact support.',
      accent: 'text-red-700 bg-red-100',
      icon: '✕',
      tone: 'bg-red-100 text-red-700',
    },
    timeout: {
      badge: 'Waiting',
      title: 'Still waiting on confirmation',
      description: 'If your payment was successful, please quote your reference to support.',
      accent: 'text-sky-700 bg-sky-100',
      icon: '…',
      tone: 'bg-sky-100 text-sky-700',
    },
  }

  return styles[view.value] || styles.checking
})

function finish(next) {
  stopped = true
  clearTimeout(timer)
  view.value = next
}

async function check(attempt = 0) {
  if (stopped) return

  const { data, error } = await supabase.rpc('get_payment_status', { p_reference: reference })
  if (stopped) return

  if (!error && data) {
    if (data.found === false) return finish('failed')
    if (data.needs_review) return finish('review')
    if (data.status === 'success' && data.booking_code) {
      bookingCode.value = data.booking_code
      localStorage.removeItem('activeReservation')
      return finish('success')
    }
    if (data.status === 'failed' || data.status === 'refunded') return finish('failed')
  }

  if (attempt + 1 >= 40) return finish('timeout')
  timer = setTimeout(() => check(attempt + 1), 3000)
}

onMounted(() => {
  if (!reference) return finish('failed')
  if (route.query.status === 'cancelled') return finish('cancelled') // display hint only
  check()
})

onBeforeUnmount(() => {
  stopped = true
  clearTimeout(timer)
  clearTimeout(copyTimer)
})

async function copyBookingCode() {
  try {
    await navigator.clipboard.writeText(bookingCode.value)
    copyState.value = 'copied'
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copyState.value = 'idle'
    }, 2500)
  } catch (error) {
    console.error('Unable to copy booking code:', error)
    copyState.value = 'failed'
  }
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <main class="min-h-screen flex items-center  px-4 py-5 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl" role="status" aria-live="polite">
      <section class="overflow-hidden rounded-[28px] border border-border bg-card-bg shadow-elev">
        <div class="border-b border-border bg-card-bg2 px-6 py-5 sm:px-8">
          <span
            :class="[
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
              statusMeta.accent,
            ]"
          >
            {{ statusMeta.badge }}
          </span>
        </div>

        <div class="px-6 py-7 sm:px-8 sm:py-8">
          <div class="mb-6 flex items-start gap-4">
            <div
              :class="[
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold shadow-sm',
                statusMeta.tone,
              ]"
              aria-hidden="true"
            >
              <span v-if="view === 'checking'" class="spinner"></span>
              <span v-else>{{ statusMeta.icon }}</span>
            </div>

            <div class="min-w-0">
              <h1 class="text-2xl font-bold text-heading sm:text-3xl">{{ statusMeta.title }}</h1>
              <p class="mt-2 text-sm leading-6 text-muted sm:text-base">
                {{ statusMeta.description }}
              </p>
            </div>
          </div>

          <div
            v-if="view === 'success' && bookingCode"
            class="mb-6 rounded-2xl border border-border bg-card-bg2 p-4"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Booking code</p>
            <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p class="text-2xl font-bold text-heading">{{ bookingCode }}</p>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full bg-card-bg px-4 py-2 text-sm font-semibold text-heading transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                :aria-label="copyState === 'copied' ? 'Booking code copied' : 'Copy booking code'"
                @click="copyBookingCode"
              >
                <svg
                  v-if="copyState !== 'copied'"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  class="h-4 w-4"
                >
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
                </svg>
                <svg
                  v-else
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="h-4 w-4"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
                {{ copyState === 'copied' ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <p v-if="copyState === 'failed'" class="mt-2 text-sm text-red-600" role="alert">
              Could not copy the booking code. Please select and copy it manually.
            </p>
            <p v-else-if="copyState === 'copied'" class="sr-only" aria-live="polite">
              Booking code copied to clipboard.
            </p>
          </div>

          <div
            v-if="reference && ['review', 'failed', 'timeout', 'cancelled'].includes(view)"
            class="mb-6 rounded-2xl border border-border bg-card-bg2 p-4"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Reference</p>
            <p class="mt-2 break-all font-mono text-sm text-heading">{{ reference }}</p>
          </div>

          <p v-if="view === 'review'" class="mb-6 text-sm text-muted">
            Please contact support and quote this reference so we can complete your booking.
          </p>

          <p v-else-if="view === 'timeout'" class="mb-6 text-sm text-muted">
            If you were charged, please keep your reference handy and contact support for a manual check.
          </p>

          <div class="flex flex-wrap gap-3">
            <button @click="goHome" class="primary">Return home</button>
            <RouterLink to="/contact" class="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 py-3 font-semibold text-heading transition hover:border-primary hover:text-primary">
              Contact support
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(160, 90, 0, 0.2);
  border-top-color: rgba(160, 90, 0, 0.9);
  border-radius: 50%;
  animation: spin 0.85s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
section {
  padding-block: 20px;
}
</style>