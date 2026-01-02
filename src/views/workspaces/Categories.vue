<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import BookingFormModal from '@/components/BookingFormModal.vue'

const workspaces = [
  {
    title: 'General Workspace',
    description:
      'Perfect for freelancers, consultants, and remote workers. Each workspace includes high-speed internet, comfortable ergonomic seating, adjustable desks and lighting, and access to all Resonate amenities.',
    image: '/images/coworking/about.webp',
    alt: 'General Workspace',
    features: [
      'Dedicated desk with storage',
      'High-speed WiFi and power outlets',
      'Access to meeting rooms',
      'Coffee and refresh station',
    ],
    route: '/workspaces/general-workspace',
  },
  {
    title: 'Private Rooms',
    description:
      'Ideal for small teams, startups, or client meetings. Our private rooms offer complete privacy, professional ambiance, and full control of your workspace.',
    image: '/images/coworking/about.webp',
    alt: 'Private Room',
    features: [
      '1-3 person capacity',
      'Soundproof walls for confidentiality',
      'Video conferencing setup',
      'Flexible lease terms',
    ],
    altBg: true,
    route: '/workspaces/private-rooms',
  },
  {
    title: 'Team Sprint Rooms',
    description:
      'Perfect for collaborative work sessions and intensive team projects. These spacious rooms accommodate 4-8 people and feature all the tools needed for productive collaboration.',
    image: '/images/coworking/about.webp',
    alt: 'Team Sprint Room',
    features: [
      'Capacity for 4-8 people',
      'Large collaboration tables and whiteboards',
      'Projector and presentation equipment',
      'Comfortable seating and standing options',
    ],
    route: '/workspaces/team-sprint-rooms',
  },
  {
    title: 'Conference Rooms',
    description:
      'Impress your clients and stakeholders with our state-of-the-art conference rooms. Designed for professional meetings and presentations with capacity up to 16 people.',
    image: '/images/coworking/about.webp',
    alt: 'Conference Room',
    features: [
      'Seating for up to 16 people',
      'Advanced AV system with 4K projection',
      'High-quality video conferencing technology',
      'Catering and beverage service available',
    ],
    altBg: true,
    route: '/workspaces/conference-rooms',
  },
  {
    title: 'Seminar Halls',
    description:
      'Host large events, workshops, and seminars with our spacious, fully-equipped seminar halls. Perfect for training sessions, conferences, and community gatherings.',
    image: '/images/coworking/about.webp',
    alt: 'Seminar Hall',
    features: [
      'Flexible seating arrangements (theater, classroom, banquet)',
      'Professional stage with lighting and sound system',
      'Breakout rooms for workshops and sessions',
      'Full catering and event coordination services',
    ],
    route: '/workspaces/seminar-halls',
  },
]

const bookingDialog = ref(null)
const selectedWorkspace = ref('')

const openBooking = (workspaceTitle) => {
  selectedWorkspace.value = workspaceTitle
  bookingDialog.value.showModal()
}

const closeBooking = () => {
  bookingDialog.value.close()
  selectedWorkspace.value = ''
}
</script>

<template>
  <!-- Hero Section -->
  <section class="sm:py-16 md:py-20 bg-linear-to-b from-primary/20 to-primary/0 text-center">
    <div class="container">
      <h1 class="main-heading text-heading mb-4">Our Workspaces</h1>
      <p class="mb-8 max-w-4xl mx-auto">
        Explore our flexible workspace solutions designed for every professional. From solo work to
        large team gatherings, we have the perfect space for you.
      </p>
      <p>Find the perfect workspace in your location.</p>
      <!-- <RouterLink class="primary" :to="'/bookings'">Go to Booking</RouterLink> -->
    </div>
  </section>

  <!-- Workspace Sections (Dynamic) -->
  <section
    v-for="(workspace, index) in workspaces"
    :key="workspace.title"
    :class="index % 2 === 0 ? 'bg-alt-bg' : ''"
  >
    <div class="container px-4">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Content Column -->
        <div class="order-1" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
          <h2 class="mb-4">{{ workspace.title }}</h2>

          <!-- Image (mobile placement) -->
          <div class="md:hidden mb-4">
            <img :src="workspace.image" :alt="workspace.alt" class="w-full rounded-lg shadow-lg" />
          </div>

          <p class="mb-4">
            {{ workspace.description }}
          </p>

          <ul class="space-y-3 mb-8 text-body">
            <li v-for="feature in workspace.features" :key="feature" class="flex items-start">
              <span class="text-primary-text font-bold mr-3">✓</span>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="flex flex-col sm:flex-row gap-1 md:gap-4">
            <RouterLink :to="workspace.route" class="secondary w-full sm:w-auto text-center">
              View Details
            </RouterLink>

            <button class="primary w-full sm:w-auto" @click="openBooking(workspace.title)">
              Book Now
            </button>
          </div>
        </div>

        <!-- Image Column (desktop only) -->
        <div class="hidden md:block" >
          <img :src="workspace.image" :alt="workspace.alt" class="w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-12 sm:py-16 md:py-28 bg-linear-to-t from-primary/20 to-primary/0">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">Ready to Find Your Perfect Space?</h2>
      <p class="text-lg mb-8 opacity-90">
        Book a tour today and discover why Resonate is the best coworking solution for your needs.
      </p>
      <RouterLink to="/workspaces" class="inline-block primary"> Start Booking Now </RouterLink>
    </div>
  </section>

  <dialog
    @click.self="closeBooking"
    ref="bookingDialog"
    class="rounded-xl backdrop:bg-black/40 mx-auto my-auto p-0"
  >
    <BookingFormModal :workspaceType="selectedWorkspace" @close="closeBooking" />
  </dialog>
</template>
<style scoped>
dialog {
  overscroll-behavior: contain;
}
</style>
