<script setup>
import { ref } from 'vue'
import WheelchairAccessibility from 'vue-material-design-icons/WheelchairAccessibility.vue'
import Elevator from 'vue-material-design-icons/Elevator.vue'
import VolumeHigh from 'vue-material-design-icons/VolumeHigh.vue'
import LightbulbOn from 'vue-material-design-icons/LightbulbOn.vue'
import SignDirection from 'vue-material-design-icons/SignDirection.vue'
import DoorOpen from 'vue-material-design-icons/DoorOpen.vue'
import Desk from 'vue-material-design-icons/Desk.vue'
import Eye from 'vue-material-design-icons/Eye.vue'

const showVideoModal = ref(false)

const teamData = [
  {
    image: 'images/coworking/about.webp',
    name: 'Ronny Jofra',
    designation: 'C.E.O',
  },
  {
    image: 'images/coworking/about.webp',
    name: 'Micheal Carlo',
    designation: 'Director',
  },
  {
    image: 'images/coworking/about.webp',
    name: 'Aliana Rosy',
    designation: 'Manager',
  },
  {
    image: 'images/coworking/about.webp',
    name: 'Sofia Razaq',
    designation: 'Developer',
  },
]

const features = [
  {
    icon: WheelchairAccessibility,
    title: 'Wheelchair Accessible Spaces',
    description: 'Step-free access, wide corridors, and clear pathways designed for mobility aids.',
  },
  {
    icon: Elevator,
    title: 'Accessible Elevators',
    description:
      'Spacious elevators with tactile buttons and visual indicators for easy navigation.',
  },
  {
    icon: DoorOpen,
    title: 'Automatic & Wide Doorways',
    description: 'Doors designed for smooth entry and exit, including automatic access points.',
  },
  {
    icon: Desk,
    title: 'Adjustable Workstations',
    description:
      'Height-adjustable desks and flexible seating to support different physical needs.',
  },
  {
    icon: Eye,
    title: 'High Visual Contrast',
    description: 'Clear signage, readable typography, and strong contrast for low-vision users.',
  },
  {
    icon: LightbulbOn,
    title: 'Accessible Lighting',
    description: 'Even, glare-free lighting that supports neurodivergent and low-vision users.',
  },
  {
    icon: VolumeHigh,
    title: 'Sound-Aware Design',
    description: 'Quiet zones, acoustic treatments, and controlled noise levels.',
  },
  {
    icon: SignDirection,
    title: 'Clear Wayfinding',
    description: 'Intuitive layouts, visual cues, and consistent navigation across the space.',
  },
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-4">About Us</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about Resonate and our mission to create the perfect coworking space
          </p>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="relative w-full overflow-hidden">
      <svg
        class="w-full block"
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#f9fafb" />
      </svg>
    </div>

    <!-- Our Story Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Image Column -->
          <div class="relative group">
            <img
              src="/images/coworking/about.webp"
              class="w-full rounded-lg shadow-lg"
              alt="About Resonate"
            />
            <button
              @click="showVideoModal = true"
              class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
              aria-label="Play video"
            >
              <div class="bg-primary text-white p-4 rounded-full hover:bg-primary-hover transition">
                <Play :size="32" />
              </div>
            </button>
          </div>

          <!-- Text Column -->
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-6">Our Story</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-4">
              Resonate was born from a vision to create a coworking space that truly understands the
              needs of modern professionals. We believe that productivity isn't just about having a
              desk—it's about creating an environment where people can thrive.
            </p>
            <p class="text-gray-600 text-base leading-relaxed mb-6">
              From freelancers to startup teams, our community is built on the foundation of
              collaboration, innovation, and mutual growth. We're committed to providing accessible,
              affordable, and inspiring workspace solutions.
            </p>
            <a
              href="javascript:void(0)"
              class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition font-medium"
            >
              Learn More
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Why Choose Resonate</h2>
          <p class="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
            We've designed every aspect of our coworking space to support your success and
            well-being
          </p>
        </div>

        <!-- Features Section -->
        <section class="py-12 sm:py-16 md:py-20">
          <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
              <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Why Choose Resonate</h2>
              <p class="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
                We've designed every aspect of our coworking space to support accessibility,
                comfort, and productivity for everyone.
              </p>
            </div>

            <!-- Media-style feature grid -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
              >
                <!-- Icon -->
                <div
                  class="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 shrink-0"
                  aria-hidden="true"
                >
                  <component :is="feature.icon" class="text-primary" :size="28" />
                </div>

                <!-- Text -->
                <div>
                  <h3 class="text-base font-semibold text-text leading-tight">
                    {{ feature.title }}
                  </h3>
                  <!-- <p class="text-sm text-gray-600 mt-1">
                    {{ feature.description }}
                  </p> -->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Meet Our Team</h2>
          <p class="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
            Passionate professionals dedicated to creating the best coworking experience
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(member, index) in teamData" :key="index" class="text-center">
            <div class="mb-4 overflow-hidden rounded-lg shadow-md">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-64 object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <h3 class="text-xl font-semibold text-text mb-1">{{ member.name }}</h3>
            <p class="text-primary font-medium">{{ member.designation }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-6">Our Mission & Vision</h2>
            <div class="space-y-4">
              <div class="bg-white border-l-4 border-primary p-6 rounded shadow-sm">
                <h3 class="text-xl font-semibold text-text mb-2">Mission</h3>
                <p class="text-gray-600">
                  To provide affordable, accessible, and inspiring coworking spaces where
                  entrepreneurs and professionals can collaborate, grow, and succeed together.
                </p>
              </div>
              <div class="bg-white border-l-4 border-secondary p-6 rounded shadow-sm">
                <h3 class="text-xl font-semibold text-text mb-2">Vision</h3>
                <p class="text-gray-600">
                  A world where location and circumstance don't limit opportunity; where work is
                  flexible, community is thriving, and everyone has a place to achieve their goals.
                </p>
              </div>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <img
              src="/images/coworking/about.webp"
              class="w-full rounded-lg shadow-lg"
              alt="Mission Vision"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-secondary text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
        <p class="text-gray-200 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
          Experience the difference a thoughtfully designed coworking space can make in your
          professional journey
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="javascript:void(0)"
            class="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-hover transition font-medium"
          >
            Schedule a Tour
          </a>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <div
      v-if="showVideoModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
    >
      <div class="bg-white rounded-lg overflow-hidden max-w-3xl w-full">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-semibold">About Resonate</h3>
          <button
            @click="showVideoModal = false"
            class="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>
        <div class="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/jNTZpfXYJa4"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </main>
</template>
