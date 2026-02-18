<script setup>
import { RouterLink } from 'vue-router'
import { ref, nextTick, onMounted } from 'vue'
import { formatNaira } from '@/utils/currency'
import BookingFormModal from '@/components/BookingForms/BookingFormModal.vue'

const workspaces = [
  {
    title: 'Shared Workspace',
    description:
      'Perfect for freelancers, consultants, and remote workers. Each workspace includes high-speed internet, comfortable ergonomic seating, adjustable desks and lighting, and access to all Resonate amenities.',
    image: '/images/coworking/shared_workspace 2.png',
    alt: 'Shared Workspace',
    pricing: 3000,
    features: [
      'Dedicated desk with storage',
      'High-speed WiFi and power outlets',
      'Access to meeting rooms',
      'Coffee and refresh station',
    ],
    route: '/workspaces/shared-workspace',
  },
  {
    title: 'Private Office Suite',
    description:
      'Ideal for small teams, startups, or client meetings. Our private office suites offer complete privacy, professional ambiance, and full control of your workspace.',
    image: '/images/coworking/private_office 3.png',
    alt: 'Private Office Suite',
    pricing: 13000,
    features: [
      '1–3 person capacity',
      'Soundproof walls for confidentiality',
      'Video conferencing setup',
      'Flexible lease terms',
    ],
    altBg: true,
    route: '/workspaces/private-office-suites',
  },
  {
    title: 'Team Collaboration Room',
    description:
      'Designed for collaborative work sessions and intensive team projects. These rooms accommodate 4–8 people and include all the tools needed for productive teamwork.',
    image: '/images/coworking/team_room 2.png',
    alt: 'Team Collaboration Room',
    pricing: 7800,
    features: [
      'Capacity for 4–8 people',
      'Large collaboration tables and whiteboards',
      'Projector and presentation equipment',
      'Comfortable seating and standing options',
    ],
    route: '/workspaces/team-collaboration-rooms',
  },
  {
    title: 'Executive Conference Room',
    description:
      'Impress clients and stakeholders with our premium conference rooms, designed for professional meetings and presentations with seating for up to 16 people.',
    image: '/images/coworking/executive 1.png',
    alt: 'Executive Conference Room',
    pricing: 19500,
    features: [
      'Seating for up to 16 people',
      'Advanced AV system with 4K projection',
      'High-quality video conferencing technology',
      'Catering and beverage service available',
    ],
    altBg: true,
    route: '/workspaces/executive-conference-rooms',
  },
  {
    title: 'Event & Seminar Hall',
    description:
      'Host large events, workshops, and seminars in our fully-equipped halls. Ideal for training sessions, conferences, and community gatherings.',
    image: '/images/coworking/seminar 1.png',
    alt: 'Event & Seminar Hall',
    pricing: 32500,
    features: [
      'Flexible seating arrangements',
      'Professional stage with lighting and sound system',
      'Breakout rooms for workshops and sessions',
      'Full catering and event coordination services',
    ],
    route: '/workspaces/event-seminar-halls',
  },
]

const bookingDialog = ref(null)
const bookingFormRef = ref(null)

const selectedWorkspace = ref('')
const isBookingOpen = ref(false)
const bookingError = ref(null) // Track booking modal errors

/**
 * OPEN
 */
const openBooking = async (workspaceTitle) => {
  bookingError.value = null
  selectedWorkspace.value = workspaceTitle
  isBookingOpen.value = true

  try {
    await nextTick()
    const dialog = bookingDialog.value
    if (!dialog) {
      bookingError.value = 'Failed to open booking dialog. Please try again.'
      isBookingOpen.value = false
      return
    }
    dialog.showModal()
  } catch (err) {
    console.error('Error opening booking dialog:', err)
    bookingError.value = 'Failed to open booking dialog. Please try again.'
    isBookingOpen.value = false
  }
}

/**
 * CLOSE (correct order)
 */
const closeBooking = () => {
  bookingDialog.value?.close()
  isBookingOpen.value = false
  selectedWorkspace.value = ''
  bookingError.value = null
}

/**
 * Backdrop click
 * Delegates responsibility to the modal
 */
const handleBackdropClick = () => {
  if (bookingFormRef.value) {
    bookingFormRef.value.attemptToCloseForm()
  }
}

function handleEscCancel(event) {
  // If confirmation modal is showing inside BookingFormModal, prevent default
  // to avoid closing the dialog. The confirmation modal will handle Esc itself.
  if (bookingFormRef.value?.showCloseConfirmation) {
    event.preventDefault()
    return
  }

  // Otherwise, allow the dialog to close and attempt to close the form normally
  bookingFormRef.value?.attemptToCloseForm()
}

onMounted(() => {
  const dialog = bookingDialog.value
  if (!dialog) return

  dialog.addEventListener('cancel', (e) => {
    // Prevent default dialog closing behavior if confirmation is shown
    if (bookingFormRef.value?.showCloseConfirmation) {
      e.preventDefault()
    }
  })
})
</script>

<template>
  <!-- Hero Section -->
  <section class="heading bg-linear-to-b from-primary/20 to-primary/0 text-center">
    <div class="container">
      <h1 class="main-heading text-heading mb-4">Our Workspaces</h1>
      <p class="mb-8 max-w-4xl mx-auto">
        Explore our flexible workspace solutions designed for every professional. From solo work to
        large team gatherings, we have the perfect space for you.
      </p>
      <p>Find the perfect workspace in your location.</p>
    </div>
  </section>

  <!-- Workspace Sections -->
  <section
    v-for="(workspace, index) in workspaces"
    :key="workspace.title"
    :class="index % 2 === 0 ? 'bg-alt-bg' : ''"
  >
    <div class="container px-4">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center lg:py-12">
        <div class="order-1" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
          <h2 class="mb-4 text-center lg:text-start">{{ workspace.title }}</h2>
          <div class="md:hidden mb-4">
            <img
              :src="workspace.image"
              :alt="workspace.alt"
              class="w-full rounded-lg shadow-lg"
            />
          </div>

          <p>
            <span class="font-bold text-primary">Pricing</span>: from
            {{ formatNaira(workspace.pricing) }} per hour
          </p>

          <p class="mb-4">{{ workspace.description }}</p>

          <ul class="space-y-3 mb-8 text-body">
            <li v-for="feature in workspace.features" :key="feature" class="flex items-start">
              <span class="text-primary-text font-bold mr-3">✓</span>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink :to="workspace.route" class="secondary w-full sm:w-auto text-center">
              View Details
            </RouterLink>

            <button class="primary w-full sm:w-auto" @click="openBooking(workspace.title)">
              Book Now
            </button>
          </div>
        </div>

        <div class="hidden md:block">
          <img :src="workspace.image" :alt="workspace.alt" class="w-full max-h-[70vh] rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-12 sm:py-16 md:py-28 bg-linear-to-t from-primary/20 to-primary/0">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">Ready to Find Your Perfect Space?</h2>
      <p class="text-lg mb-8 opacity-90">
        Book a tour today and discover why Resonate is the best coworking solution for your needs.
      </p>
      <RouterLink to="/workspaces" class="inline-block primary"> Book a Tour </RouterLink>
    </div>
  </section>

  <!-- Booking Error Toast -->
  <Transition name="fade">
    <div
      v-if="bookingError"
      class="fixed bottom-4 right-4 bg-red-50 border-2 border-red-300 rounded-lg p-4 shadow-lg max-w-sm"
      role="alert"
    >
      <p class="text-red-800 font-semibold">⚠ {{ bookingError }}</p>
      <button
        @click="bookingError = null"
        class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
      >
        Dismiss
      </button>
    </div>
  </Transition>

  <!-- Booking Dialog -->
  <dialog
    v-if="isBookingOpen"
    ref="bookingDialog"
    @cancel.prevent="handleEscCancel"
    @click.self="handleBackdropClick"
    class="rounded-xl backdrop:bg-black/40 mx-auto my-auto p-0"
  >
    <BookingFormModal
      ref="bookingFormRef"
      :workspaceType="selectedWorkspace"
      @close="closeBooking"
    />
  </dialog>
</template>

<style scoped>
dialog {
  overscroll-behavior: contain;
}
</style>
