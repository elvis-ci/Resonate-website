<script setup>
import { RouterLink } from 'vue-router'
import { ref, nextTick, onMounted } from 'vue'
import { formatNaira } from '@/utils/currency'
import BookingFormModal from '@/components/BookingForms/BookingFormModal.vue'

const workspaces = [
  {
    title: 'Shared Workspace',
    description:
      'Perfect for freelancers, consultants, and remote workers. Each workspace includes high-speed internet, comfortable ergonomic seating, adjustable desks and lighting, and access to all Reboot amenities.',
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
  <section class="heading bg-alt-bg text-center">
    <div class="container">
      <h1 class="main-heading text-heading mb-4">Our Workspaces</h1>
      <p class="mb-6 max-w-4xl mx-auto">
        Explore our flexible workspace solutions designed for every professional. From solo work to
        large team gatherings, we have the perfect space for you.
      </p>
      <p class="mb-0">Find the perfect workspace in your location.</p>
    </div>
  </section>

  <!-- Workspace Sections -->
  <section
    v-for="(workspace, index) in workspaces"
    :key="workspace.title"
    :class="index % 2 === 0 ? 'bg-alt-bg' : 'bg-alt-bbg'"
  >
    <div class="container">
      <div class="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div class="workspace-info order-1" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
          <div class="workspace-heading">
            <span class="workspace-kicker">Workspace {{ String(index + 1).padStart(2, '0') }}</span>
            <h2>{{ workspace.title }}</h2>
          </div>

          <div class="md:hidden workspace-image workspace-image-mobile">
            <img :src="workspace.image" :alt="workspace.alt" />
          </div>

          <div class="workspace-price" aria-label="Starting hourly price">
            <span class="price-label">Starting at</span>
            <span class="price-value">{{ formatNaira(workspace.pricing) }}</span>
            <span class="price-unit">per hour</span>
          </div>

          <p class="workspace-description">{{ workspace.description }}</p>

          <div class="workspace-features">
            <h3>Included with this space</h3>
            <ul>
              <li v-for="feature in workspace.features" :key="feature">
                <span class="feature-check" aria-hidden="true">✓</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="workspace-actions">
            <RouterLink :to="workspace.route" class="secondary w-full sm:w-auto text-center">
              View Details
            </RouterLink>

            <button class="primary w-full sm:w-auto" @click="openBooking(workspace.title)">
              Book Now
            </button>
          </div>
        </div>

        <div class="workspace-image workspace-image-desktop hidden md:block">
          <img :src="workspace.image" :alt="workspace.alt" />
          <span class="image-caption">{{ workspace.title }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-alt-bg">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">Ready to Find Your Perfect Space?</h2>
      <p class="text-lg mb-7 opacity-90">
        Book a tour today and discover why Reboot is the best coworking solution for your needs.
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

.workspace-info {
  min-width: 0;
  padding: clamp(1.25rem, 2.2vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  background: var(--color-card-bg);
  box-shadow: var(--shadow-elev);
}

.workspace-heading {
  margin-bottom: 1.25rem;
}

.workspace-kicker,
.price-label,
.price-unit {
  color: var(--color-muted);
  font-size: 0.8rem;
  font-weight: 700;
}

.workspace-kicker {
  display: block;
  margin-bottom: 0.45rem;
  text-transform: uppercase;
}

.workspace-heading h2 {
  margin: 0;
  text-align: left;
}

.workspace-price {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem 0.55rem;
  margin-bottom: 1.15rem;
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--color-primary);
  border-radius: 0 0.6rem 0.6rem 0;
  background: var(--color-card-bg2);
}

.price-label {
  flex-basis: 100%;
}

.price-value {
  color: var(--color-primary-text);
  font-size: 1.35rem;
  font-weight: 800;
}

.workspace-description {
  margin: 0 0 1.35rem;
  color: var(--color-body);
  line-height: 1.7;
}

.workspace-features {
  margin-bottom: 1.5rem;
}

.workspace-features h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.workspace-features ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.workspace-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  min-width: 0;
  padding: 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 0.65rem;
  color: var(--color-body);
  font-size: 0.9rem;
  line-height: 1.45;
}

.feature-check {
  display: inline-grid;
  flex: 0 0 1.2rem;
  width: 1.2rem;
  height: 1.2rem;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary-text);
  font-size: 0.75rem;
  font-weight: 800;
}

.workspace-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.workspace-image {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  background: var(--color-card-bg2);
  box-shadow: var(--shadow-elev);
}

.workspace-image img {
  display: block;
  width: 100%;
  height: clamp(20rem, 35vw, 32rem);
  object-fit: cover;
}

.image-caption {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  width: fit-content;
  max-width: calc(100% - 2rem);
  padding: 0.55rem 0.8rem;
  border-radius: 0.5rem;
  background: var(--color-card-bg);
  color: var(--color-heading);
  font-size: 0.85rem;
  font-weight: 700;
}

@media (max-width: 767px) {
  .workspace-heading h2 {
    text-align: center;
  }

  .workspace-image-mobile {
    margin-bottom: 1.25rem;
  }

  .workspace-image-mobile img {
    height: clamp(13rem, 60vw, 20rem);
  }

  .workspace-features ul {
    grid-template-columns: 1fr;
  }

  .workspace-actions {
    flex-direction: column;
  }
}
</style>
