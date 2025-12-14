<script setup>
import { ref } from 'vue'

import ArrowUpIcon from 'vue-material-design-icons/ArrowUp.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Testimonial from '@/components/testimonial.vue'
import News from '@/components/news.vue'

const testimonialData = ref([
  {
    id: 1,
    profile: 'images/client/01.jpg',
    message:
      'Resonate has completely changed how I work. The environment is calm, well-designed, and genuinely inclusive. I don’t feel like accessibility was added as an afterthought — it’s clearly built into every part of the space.',
    name: 'Thomas Israel',
    designation: 'Virtual Assistant',
  },
  {
    id: 2,
    profile: 'images/client/02.jpg',
    message:
      'As a wheelchair user, ease of access matters a lot to me. From wide doorways and step-free entrances to adjustable desks and clearly marked pathways, everything here just works. The availability of assistive technologies made it easy for me to settle in and stay productive.',
    name: 'Barbara McIntosh',
    designation: 'Product Manager',
  },
  {
    id: 3,
    profile: 'images/client/03.jpg',
    message:
      'What stood out to me at Resonate was the attention to detail. Quiet rooms, good lighting, accessible restrooms, and staff who actually understand inclusive design. It’s one of the few coworking spaces where I can focus without unnecessary barriers.',
    name: 'Carl Oliver',
    designation: 'UX Designer',
  },
])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main>
    <!-- Hero Start -->
    <section class="relative w-full h-screen text-white">
      <div
        class="flex items-center justify-center h-full"
        :style="{
          'background-image': 'url(/images/coworking/bg01.jpg)',
          'background-size': 'cover',
          'background-position': 'center',
          'min-height': '600px',
        }"
      >
        <div class="absolute inset-0 bg-[rgba(60,72,88,0.7)] h-full"></div>
        <div class="relative container py-20 h-full">
          <div class="text-center flex h-full items-center justify-center">
            <div class="mb-6 title-heading">
              <p class="text-white text-lg sm:text-xl">
                Your private, accessible, and inspiring workspace starts at
                <span class="text-green-500 font-bold">$19/day</span>
              </p>
              <h1 class="heading mt-4">Boost Productivity in Comfort & Privacy</h1>
              <p class="text-gray-100 mt-4 max-w-2xl mx-auto">
                Discover a coworking space designed to keep you focused, creative, and connected.
                Enjoy flexible offices, accessible facilities, and a vibrant community—all at an
                affordable price.
              </p>
              <div class="mt-8">
                <button class="primary">Reserve Your Space</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero End -->

    <!-- Partners -->
    <section class="py-12 border-t border-b border-gray-200">
      <div class="container">
        <h5 class="text-lg sm:text-xl font-semibold text-text">
          Trusted client by over 10,000+ of the world's
        </h5>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-8">
          <div v-for="logo in 6" :key="logo" class="flex justify-center">
            <img
              :src="`images/client/${logo}.svg`"
              class="h-12 w-12 sm:h-16 sm:w-16 object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-gray-50 py-16 sm:py-20 md:py-24">
      <div class="container">
        <div class="text-center mb-12">
          <h4 class="text-2xl sm:text-3xl md:text-4xl font-bold text-text">Trusted Co-workers</h4>
          <p class="text-gray-600 mt-4">
            Start working with
            <span class="text-primary font-bold">Resonate</span>
          </p>
        </div>
        <Testimonial :testimonialData="testimonialData" />
      </div>
    </section>

    <!-- Blog -->
    <section class="py-16 sm:py-20 md:py-24">
      <div class="container">
        <div class="text-center mb-12">
          <h4 class="text-2xl sm:text-3xl md:text-4xl font-bold text-text">Latest News & Events</h4>
        </div>
        <News />
      </div>
    </section>

    <!-- Back to top -->
    <button
      class="primary fixed bottom-8 right-8 rounded-full p-3 shadow-lg z-10"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <ArrowUpIcon class="w-6 h-6" />
    </button>
  </main>
</template>

<style scoped>

</style>
