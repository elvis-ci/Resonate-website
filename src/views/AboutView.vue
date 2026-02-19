<script setup>
import { ref, defineAsyncComponent } from 'vue'

/* ---------------------------
   Lazy-loaded icons (critical)
---------------------------- */
const WheelchairAccessibility = defineAsyncComponent(
  () => import('vue-material-design-icons/WheelchairAccessibility.vue'),
)
const Elevator = defineAsyncComponent(() => import('vue-material-design-icons/Elevator.vue'))
const VolumeHigh = defineAsyncComponent(() => import('vue-material-design-icons/VolumeHigh.vue'))
const LightbulbOn = defineAsyncComponent(() => import('vue-material-design-icons/LightbulbOn.vue'))
const SignDirection = defineAsyncComponent(
  () => import('vue-material-design-icons/SignDirection.vue'),
)
const DoorOpen = defineAsyncComponent(() => import('vue-material-design-icons/DoorOpen.vue'))
const Desk = defineAsyncComponent(() => import('vue-material-design-icons/Desk.vue'))
const Eye = defineAsyncComponent(() => import('vue-material-design-icons/Eye.vue'))
const PlayIcon = defineAsyncComponent(() => import('vue-material-design-icons/Play.vue'))

/* ---------------------------
   Lazy-loaded modal
---------------------------- */
const VideoModal = defineAsyncComponent(() => import('@/components/videoModal.vue'))

/* ---------------------------
   State
---------------------------- */
const showModal = ref(false)

/* ---------------------------
   Data
---------------------------- */
const teamData = [
  {
    image: '/images/team/ceo.jpeg',
    name: 'Ronny Jofra',
    designation: 'C.E.O',
  },
  {
    image: '/images/team/cto.png',
    name: 'Micheal Carlo',
    designation: 'C.T.O',
  },
  {
    image: '/images/team/manager.jpeg',
    name: 'Aliana Rosy',
    designation: 'Manager',
  },
  {
    image: '/images/team/accessibility director.jpeg',
    name: 'Sofia Razaq',
    designation: 'Accessibility Director',
  },
]

const features = [
  {
    icon: WheelchairAccessibility,
    title: 'Wheelchair Accessible Spaces',
  },
  {
    icon: Elevator,
    title: 'Accessible Elevators',
  },
  {
    icon: DoorOpen,
    title: 'Automatic & Wide Doorways',
  },
  {
    icon: Desk,
    title: 'Adjustable Workstations',
  },
  {
    icon: Eye,
    title: 'High Visual Contrast',
  },
  {
    icon: LightbulbOn,
    title: 'Accessible Lighting',
  },
  {
    icon: VolumeHigh,
    title: 'Sound-Aware Design',
  },
  {
    icon: SignDirection,
    title: 'Clear Wayfinding',
  },
]
</script>

<template>
  <main id="maincontent">
    <!-- Hero -->
    <section
      class="relative py-10 sm:py-16  bg-linear-to-b from-primary/20 to-primary/0 text-center"
    >
      <div class="container text-center">
        <h1 class="main-heading text-heading mb-6">Where Focus Meets Freedom</h1>
        <p class="max-w-2xl mx-auto text-lg leading-relaxed">
          Reboot is more than a coworking space. It’s a thoughtfully designed environment built for
          creators, founders, and teams who value clarity, productivity, and community. We believe
          great work happens when space inspires focus, collaboration feels natural, and every
          detail supports momentum.
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section id="our-story" class="bg-alt-bg">
      <div class="container px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Image -->
          <div class="relative group">
            <img
              src="/images/coworking/about.webp"
              alt="About Reboot"
              width="800"
              height="600"
              decoding="async"
              fetchpriority="high"
              class="w-full rounded-lg shadow-lg"
            />

            <button
              aria-label="Play Reboot introduction video"
              @click="showModal = true"
              class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
            >
              <span
                class="flex items-center bg-primary text-white p-4 rounded-full transition-colors duration-200 hover:bg-primary-hover"
              >
                <PlayIcon class="w-6 h-6" aria-hidden="true" />
              </span>
            </button>
          </div>

          <!-- Modal -->
          <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
          >
            <VideoModal @close="showModal = false" />
          </div>

          <!-- Text -->
          <div>
            <h2 class="mb-4">Our Story</h2>
            <p class="mb-4">
              <span class="text-primary-text font-bold">Reboot</span> was born from a vision to
              create a coworking space that truly understands modern professionals.
            </p>
            <p>
              From freelancers to startup teams, our community thrives on collaboration, innovation,
              and accessibility.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section id="mission-vision">
      <div class="container px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="md:order-1">
            <h2 class="mb-6">Our Mission & Vision</h2>

            <div class="space-y-4">
              <div class="bg-card-bg2 border-l-4 border-primary p-6 rounded shadow-sm">
                <h3 class="mb-2">Mission</h3>
                <p>To provide affordable, accessible, and inspiring coworking spaces.</p>
              </div>

              <div class="bg-card-bg2 border-l-4 border-alternate p-6 rounded shadow-sm">
                <h3 class="mb-2">Vision</h3>
                <p>A world where opportunity is not limited by location or circumstance.</p>
              </div>
            </div>
          </div>

          <img
            src="/images/coworking/reception.jpeg"
            alt="Mission and Vision"
            loading="lazy"
            decoding="async"
            class="w-full h-full rounded-lg shadow-lg md:order-2"
          />
        </div>
      </div>
    </section>

    <!-- Why Choose -->
    <section class="bg-alt-bbg">
      <div class="container px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Why Choose <span class="text-primary-text font-bold">Reboot</span></h2>
          <p class="max-w-2xl mx-auto">Designed for productivity, comfort, and inclusion.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-card-bg transition-shadow duration-200 hover:shadow-lg"
          >
            <div
              class="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 shrink-0"
              aria-hidden="true"
            >
              <component :is="feature.icon" :size="28" class="text-primary-text" />
            </div>

            <p class="font-semibold">{{ feature.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section id="team">
      <div class="container px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Meet Our Team</h2>
          <p class="max-w-2xl mx-auto">Professionals dedicated to the best coworking experience.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(member, index) in teamData" :key="index" class="text-center">
            <div class="mb-4 overflow-hidden rounded-lg shadow-md">
              <img
                :src="member.image"
                :alt="member.name"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                class="w-full h-74 object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 class="mb-1">{{ member.name }}</h3>
            <span class="text-primary-text font-medium">{{ member.designation }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="py-12 md:py-20 bg-linear-to-t from-primary/20 to-primary/0">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="mb-4">For Partnership and Inquiries</h2>
        <p class="text-sm text-muted mb-6">Feel free to reach out — we’d love to hear from you.</p>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
          <input required placeholder="Your Name" class="border rounded-md px-3 py-2" />
          <input
            required
            type="email"
            placeholder="Your Email"
            class="border rounded-md px-3 py-2"
          />
          <textarea
            required
            rows="4"
            placeholder="Your Message"
            class="border rounded-md px-3 py-2 md:col-span-2"
          />
          <button class="primary px-6 py-3 md:col-span-2">Send Inquiry</button>
        </form>
      </div>
    </section>
  </main>
</template>
