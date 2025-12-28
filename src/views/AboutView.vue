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
import PlayIcon from 'vue-material-design-icons/Play.vue'
import videoModal from '@/components/videoModal.vue'

const showModal = ref(false)

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
</script>

<template>
  <main id="maincontent">
    <!-- Hero Section -->
    <!-- <section class="relative bg-linear-to-b from-primary/20 to-primary/15">
      <div class="container">
        <div class="text-center">
          <h1 class="main-heading text-heading mb-4">About Us</h1>
          <p class="max-w-2xl mx-auto">
            Learn more about Resonate and our mission to create the perfect coworking space
          </p>
        </div>
      </div>
    </section> -->
    <!-- Wave Divider -->
    <!-- <div class="relative w-full overflow-hidden bg-linear-to-b from-primary/15 to-primary/5">
      <svg
        class="w-full block text-alt-bg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="currentColor" />
      </svg>
    </div> -->

    <!-- Hero Section -->
    <section
      class="relative sm:py-16 md:py-20 bg-linear-to-b from-primary/20 to-primary/0 text-center"
    >
      <div class="container">
        <div class="text-center">
          <h1 class="main-heading text-heading mb-4">About Us</h1>
          <p class="max-w-2xl mx-auto">
            Learn more about Resonate and our mission to create the perfect coworking space
          </p>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section id="our-story" class="bg-alt-bg">
      <div class="container px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Image Column -->
          <div class="relative group">
            <img
              src="/images/coworking/about.webp"
              class="w-full rounded-lg shadow-lg"
              alt="About Resonate"
            />
            <button
              aria-label="Play Resonate introduction video"
              @click="showModal = true"
              class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
            >
              <div
                class="flex items-center bg-primary text-white p-4 rounded-full hover:bg-primary-hover transition"
              >
                <PlayIcon class="w-6 h-6" aria-hidden="true" />
                <!-- <span class="uppercase text-sm font-bold">Watch Now</span> -->
              </div>
            </button>
          </div>

          <div
            v-if="showModal"
            @keyup="closeModalOnEscape"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          >
            <videoModal @close="showModal = !showModal" />
          </div>

          <!-- Text Column -->
          <div>
            <h2 class="mb-4">Our Story</h2>
            <p class="mb-4">
              <span class="text-primary-text font-bold">Resonate</span> was born from a vision to
              create a coworking space that truly understands the needs of modern professionals. We
              believe that productivity isn't just about having a desk—it's about creating an
              environment where people can thrive.
            </p>
            <p class="mb-4">
              From freelancers to startup teams, our community is built on the foundation of
              collaboration, innovation, and mutual growth. We're committed to providing accessible,
              affordable, and inspiring workspace solutions.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section id="mission-vision" class="">
      <div class="container px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="mb-6">Our Mission & Vision</h2>
            <div class="space-y-4">
              <div class="bg-card-bg2 border-l-4 border-primary p-6 rounded shadow-sm">
                <h3 class="mb-2"><span class="text-primary-text">Mission</span></h3>
                <p class="">
                  To provide affordable, accessible, and inspiring coworking spaces where
                  entrepreneurs and professionals can collaborate, grow, and succeed together.
                </p>
              </div>
              <div class="bg-card-bg2 border-l-4 border-alternate p-6 rounded shadow-sm">
                <h3 class="mb-2"><span class="text-primary-text">Vision</span></h3>
                <p class="">
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

    <!-- Value Section -->
    <section class="bg-alt-bbg">
      <div class="container px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Why Choose <span class="text-primary-text font-bold">Resonate</span></h2>
          <p class="max-w-2xl mx-auto">
            We've designed every aspect of our coworking space to support your success and
            well-being
          </p>
        </div>

        <!-- Why choose resonate -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-card-bg hover:shadow-xl transition"
          >
            <!-- Icon -->
            <div
              class="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 shrink-0"
              aria-hidden="true"
            >
              <component :is="feature.icon" class="text-primary-text" :size="28" />
            </div>

            <!-- Text -->
            <div>
              <h3 class="">
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

    <!-- Team Section -->
    <section id="team" class="pb-20">
      <div class="container px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Meet Our Team</h2>
          <p class="max-w-2xl mx-auto">
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
            <h3 class="mb-1">{{ member.name }}</h3>
            <span class="text-primary-text font-medium">{{ member.designation }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
