<script setup>
import { ref } from 'vue'

import ArrowUpIcon from 'vue-material-design-icons/ArrowUp.vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import PrinterIcon from 'vue-material-design-icons/Printer.vue'
import SilverwareForkKnifeIcon from 'vue-material-design-icons/SilverwareForkKnife.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import EmailOutlineIcon from 'vue-material-design-icons/EmailOutline.vue'
import CalendarMonthOutlineIcon from 'vue-material-design-icons/CalendarMonthOutline.vue'
import AccountGroupOutlineIcon from 'vue-material-design-icons/AccountGroupOutline.vue'
import CoffeeOutlineIcon from 'vue-material-design-icons/CoffeeOutline.vue'

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

const services = [
  {
    name: 'Fast Internet',
    icon: WifiIcon,
  },
  {
    name: 'Printer & Fax',
    icon: PrinterIcon,
  },
  {
    name: 'Modern Kitchen',
    icon: SilverwareForkKnifeIcon,
  },
  {
    name: '24 Hour Access',
    icon: ClockOutlineIcon,
  },
  {
    name: 'Mail Service',
    icon: EmailOutlineIcon,
  },
  {
    name: 'Event Space',
    icon: CalendarMonthOutlineIcon,
  },
  {
    name: 'Conference Rooms',
    icon: AccountGroupOutlineIcon,
  },
  {
    name: 'Tea & Coffee',
    icon: CoffeeOutlineIcon,
  },
]
const plans = [
  {
    name: 'Member',
    price: 19,
    period: 'mo',
    description: 'Perfect for flexible access to a professional coworking environment.',
    cta: 'Buy Now',
    featured: false,
    icon: '/images/icon/lightbulb.svg',
  },
  {
    name: 'Desk',
    price: 39,
    period: 'mo',
    description: 'A dedicated desk in a shared space designed for daily productivity.',
    cta: 'Get Started',
    featured: true,
    icon: '/images/icon/table.svg',
  },
  {
    name: 'Dedicated',
    price: 49,
    period: 'mo',
    description: 'Your own reserved workspace with added privacy and consistency.',
    cta: 'Get Started',
    featured: false,
    icon: '/images/icon/star.svg',
  },
  {
    name: 'Office',
    price: 59,
    period: 'mo',
    description: 'A private office ideal for teams and focused work sessions.',
    cta: 'Try It Now',
    featured: false,
    icon: '/images/icon/start-up.svg',
  },
]
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main class="my-0 py-0">
    <!-- Hero Start -->
    <section class="relative my-0 py-0 w-full h-screen text-white">
      <div
        class="flex items-center justify-center h-full"
        :style="{
          'background-image': 'url(/images/coworking/bg01.jpg)',
          'background-size': 'cover',
          'background-position': 'center',
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
                Enjoy flexible offices, accessible facilities, and a vibrant community all at an
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
    <section class="bg-gray-50">
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

    <!-- about -->
    <section class="">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center">
          <!-- Image column -->
          <div class="w-full md:w-6/12 lg:w-5/12">
            <img src="/images/coworking/about.jpg" class="w-full rounded" alt="" />
          </div>

          <!-- Text column -->
          <div class="w-full md:w-6/12 lg:w-7/12 mt-4 sm:mt-0 pt-2 sm:pt-0">
            <div class="lg:ml-4">
              <h4 class="text-xl font-semibold mb-4 text-text">About Our Community</h4>

              <p class="text-gray-500">
                Start working with
                <span class="text-primary font-bold">Resonate</span>, a coworking community designed
                to help ideas grow and people thrive. Whether you need a quiet space to focus or a
                collaborative environment to connect, Resonate offers flexible, accessible
                workspaces that support productivity—without the premium price tag.
              </p>

              <a
                href="javascript:void(0)"
                class="inline-block mt-3 px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition"
              >
                Join now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- services -->
    <section class="bg-gray-50 text-text">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h4 class="text-2xl font-semibold mb-4">Your Comfort Is Our Priority</h4>
          <p class="text-gray-500">
            Build your best workday at
            <span class="text-primary font-bold">Resonate</span> — a coworking space thoughtfully
            designed for comfort, focus, and connection.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="text-center bg-white rounded-lg py-6 shadow-sm hover:shadow-md transition"
          >
            <div class="flex justify-center">
              <component :is="service.icon" class="text-primary" :size="40" />
            </div>
            <h5 class="mt-3 font-medium">
              {{ service.name }}
            </h5>
          </div>
        </div>
      </div>
    </section>

    
    <!-- Testimonials -->
    <section class="bg-gray-50">
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
    <section class="">
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

<style scoped></style>
