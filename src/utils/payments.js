export class PaymentError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

const MESSAGES = {
  reservation_expired: 'Your reservation hold has expired. Please start a new reservation.',
  reservation_cancelled: 'This reservation was cancelled.',
  reservation_consumed: 'This reservation has already been paid for.',
  reservation_not_found: 'We could not find that reservation.',
  forbidden: 'Please sign in with the account that made this reservation.',
  provider_unavailable: 'The payment provider is not responding. Please try again.',
  slot_unavailable: 'That time is no longer available. Please choose another slot.',
  slot_in_past: 'That time has already passed.',
  outside_opening_hours: 'That time is outside opening hours.',
  invalid_time_range: 'The end time must be after the start time.',
  invalid_input: 'Please check your details and try again.',
  unauthorized: 'Please verify your email again to continue.',
  otp_required: 'Please enter the verification code sent to your email.',
  invalid_or_expired_otp: 'That code is invalid or has expired. Request a new one.',
}


// input: { reservation_id, provider?: 'paystack' | 'flutterwave' }
// returns: { checkout_url, reference, amount, currency, expires_in_seconds }
export async function startPayment(supabase, input) {
  const { data, error } = await supabase.functions.invoke('initiate-payment', { body: input })

  if (error) {
    let payload = null
    try { payload = await error.context?.json() } catch { /* not JSON */ }
    const code = payload?.error ?? 'unknown'
    throw new PaymentError(code, payload?.message ?? MESSAGES[code] ?? 'Something went wrong. Please try again.')
  }
  return data
}