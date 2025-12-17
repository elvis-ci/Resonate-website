<script setup>
import {ref} from 'vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import PrinterIcon from 'vue-material-design-icons/Printer.vue'
import SilverwareForkKnifeIcon from 'vue-material-design-icons/SilverwareForkKnife.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import EmailOutlineIcon from 'vue-material-design-icons/EmailOutline.vue'
import CalendarMonthOutlineIcon from 'vue-material-design-icons/CalendarMonthOutline.vue'
import AccountGroupOutlineIcon from 'vue-material-design-icons/AccountGroupOutline.vue'
import CoffeeOutlineIcon from 'vue-material-design-icons/CoffeeOutline.vue'

import Testimonial from '@/components/testimonial.vue'
import News from '@/components/news.vue'
const showModal = ref(false)

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
</script>

<template>
  <main class="my-0 py-0">
    <!-- Hero Start -->
    <section class="relative my-0 py-0 w-full h-screen text-white">
      <div
        class="flex items-center justify-center h-full"
        :style="{
          'background-image': 'url(/images/coworking/bg01.webp)',
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
          <div class="w-full md:w-6/12 lg:w-0/12">
            <img src="/images/coworking/about.webp" class="w-full rounded" alt="" />
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

    <!-- pricing -->
    <section class="">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h4 class="text-2xl font-semibold mb-4">Choose the Right Plan for You</h4>
          <p class="text-gray-500">
            Flexible and affordable pricing at
            <span class="text-primary font-bold">Resonate</span>, designed to support how you work.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          <div
            v-for="(plan, index) in plans"
            :key="index"
            class="relative flex flex-col h-full box-border rounded-lg shadow-sm text-center p-8 border transition-all duration-300 motion-safe:hover:-translate-y-1"
            :class="
              plan.featured
                ? 'bg-white border-primary  hover:shadow-lg'
                : 'bg-gray-50 border-gray-200 hover:shadow-lg'
            "
          >
            <div v-if="plan.featured" class="ribbon">
              <span aria-label="Best plan">Best</span>
            </div>

            <img :src="plan.icon" alt="" class="mx-auto mb-4 h-12" />

            <h6 class="uppercase tracking-wide font-medium mb-4">
              {{ plan.name }}
            </h6>

            <div class="flex justify-center items-end mb-4">
              <span class="text-xl mt-1">$</span>
              <span class="text-5xl font-bold mx-1">
                {{ plan.price }}
              </span>
              <span class="text-xl mb-1"> /{{ plan.period }} </span>
            </div>

            <p class="text-gray-500 text-sm mb-8 flex-grow">
              {{ plan.description }}
            </p>

            <a
              href="javascript:void(0)"
              class="inline-block px-6 py-2 text-sm font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors mt-auto"
            >
              {{ plan.cta }}
            </a>
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
        <Testimonial />
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

    <!-- Start Form -->
    <section
      class="relative pb-28 text-center"
      style="background: url('/images/coworking/bg01.webp') center center / cover no-repeat"
    >
        <div class="absolute inset-0 bg-[rgba(60,72,88,0.7)] h-full"></div>

      <div class="relative container mx-auto px-4">
        <div class="items-center">
          <div class=" text-white">
            <h4 class="text-3xl font-semibold mb-4">
              We are Built for Business – Explore Us Today!
            </h4>
            <p class="text-gray-200 mb-6">
              Start working with
              <span class="text-primary font-bold">Resonate</span> that can provide everything you
              need to generate awareness, drive traffic, connect.
            </p>

            <div class="flex justify-center items-center gap-4">
              <button
                class="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition"
              >
                Install Now
              </button>

              <button
                @click="showModal = true"
                class="bg-white text-primary flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-200 transition"
              >
                <VideoIcon class="w-6 h-6" />
              </button>
              <span class="uppercase text-sm font-bold">Watch Now</span>
            </div>

            <div
              v-if="showModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            >
              <div class="bg-white rounded-lg overflow-hidden w-full max-w-3xl">
                <div class="relative pb-[56.25%]">
                  <iframe
                    class="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/jNTZpfXYJa4"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
                <button
                  @click="showModal = false"
                  class="absolute top-2 right-2 text-gray-700 hover:text-black font-bold text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- Back to top -->
    <!-- <button
      class="primary fixed bottom-8 right-8 rounded-full p-3 shadow-lg z-10"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <ArrowUpIcon class="w-6 h-6" />
    </button> -->
  </main>
</template>

<style scoped></style>
