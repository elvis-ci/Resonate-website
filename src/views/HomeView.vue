<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import PrinterIcon from 'vue-material-design-icons/Printer.vue'
import SilverwareForkKnifeIcon from 'vue-material-design-icons/SilverwareForkKnife.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import EmailOutlineIcon from 'vue-material-design-icons/EmailOutline.vue'
import CalendarMonthOutlineIcon from 'vue-material-design-icons/CalendarMonthOutline.vue'
import AccountGroupOutlineIcon from 'vue-material-design-icons/AccountGroupOutline.vue'
import CoffeeOutlineIcon from 'vue-material-design-icons/CoffeeOutline.vue'
import PlayIcon from 'vue-material-design-icons/Play.vue'
import videoModal from '@/components/videoModal.vue'

import Testimonial from '@/components/testimonial.vue'
const News = defineAsyncComponent(() => import('@/components/news.vue'))
const Plans = defineAsyncComponent(() => import('@/components/plans.vue'))

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

onMounted(() => {
  function closeModalOnEscape(event) {
    if (event.key === 'Escape' && showModal.value) {
      showModal.value = false
    }
  }
})
</script>

<template>
  <main id="maincontent">
    <!-- Hero Start -->
    <section class="hero">
      <div
        class="relative flex items-center justify-center h-full"
        :style="{
          'background-image': 'url(/images/coworking/bg01.webp)',
          'background-size': 'cover',
          'background-position': 'contain',
        }"
      >
        <div class="absolute inset-0 bg-[rgba(60,72,88,0.7)] h-full"></div>
        <div class="relative container h-full text-center flex items-center justify-center">
          <div class="text-white">
            <p class="white mb-4">
              Your private, accessible, and inspiring workspace starts at
              <span class="text-green-500 font-bold">$19/day</span>
            </p>
            <h1 class="main-heading">Boost Productivity in Comfort & Privacy</h1>
            <p class="white mt-4 max-w-2xl mx-auto">
              Discover a coworking space designed to keep you focused, creative, and connected.
              Enjoy flexible offices, accessible facilities, and a vibrant community all at an
              affordable price.
            </p>
            <div class="mt-10">
              <RouterLink to="/bookings" class="primary" style="padding-block: 15px"
                >Space Pricing</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero End -->

    <!-- about -->
    <section>
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between">
          <!-- Image column -->
          <div class="w-full md:w-6/12 lg:w-6/12">
            <img
              src="/images/coworking/about.webp"
              class="w-[90%] rounded"
              alt=""
              loading="lazy"
              width="500"
              height="500"
            />
          </div>

          <!-- Text column -->
          <div class="w-full md:w-6/12 lg:w-6/12 mt-4 sm:mt-0 pt-2 sm:pt-0">
            <div class="lg:ml-4">
              <h2 class="">The Resonate Community</h2>

              <p class="">
                Start working with
                <span class="text-primary-text font-bold">Resonate</span>, a coworking community
                designed to help ideas grow and people thrive. Whether you need a quiet space to
                focus or a collaborative environment to connect, Resonate offers flexible,
                accessible workspaces that support productivity—without the premium price tag.
              </p>

              <!-- <RouterLink to="/workspaces" class="primary"> Join Now </RouterLink> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- services -->
    <section class="bg-alt-bg">
      <div class="container px-4">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="">Your Comfort Is Our Priority</h2>
          <p class="">
            Build your best workday at
            <span class="text-primary-text font-bold">Resonate</span> — a coworking space
            thoughtfully designed for comfort, focus, and connection.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="text-center bg-card-bg rounded-lg py-6 shadow-lg shadow-elev hover:shadow-xl transition"
          >
            <div class="flex justify-center">
              <component :is="service.icon" class="text-primary" :size="40" />
            </div>
            <p class="my-3 font-semibold">
              {{ service.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- pricing -->
    <Suspense>
      <template #default>
        <Plans />
      </template>
      <template #fallback>
        <div class="h-96 flex items-center justify-center">
          <p>Loading plans…</p>
        </div>
      </template>
    </Suspense>

    <!-- Testimonials -->
    <section class="bg-alt-bg">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="">What Our Coworkers have to say</h2>
          <p class="">
            Start working with
            <span class="text-primary-text font-bold">Resonate</span>
          </p>
        </div>
        <Testimonial />
      </div>
    </section>

    <!-- Blog -->
    <section class="">
      <div class="container">
        <div class="w-full text-center mb-12">
          <h2 class="">Latest News & Events</h2>
          <p class="max-w-2xl md:mx-auto">
            Catch up on what’s happening in our community, from news updates to featured events.
          </p>
        </div>
        <Suspense>
          <template #default>
            <News />
          </template>
          <template #fallback>
            <div class="h-96"></div>
          </template>
        </Suspense>
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
          <div class="text-white">
            <h2 class="white">We are Built for Business – Explore Us Today!</h2>
            <p class="white mb-6">
              Start working with
              <span class="text-secondary font-bold">Resonate</span> that can provide everything you
              need to generate awareness, drive traffic, connect.
            </p>

            <div class="flex justify-center items-center gap-4">
              <!-- <button
                class="primary transition"
              >
                Install Now
              </button> -->

              <button
                aria-label="Play Video of Resonate Coworking Space"
                @click="showModal = true"
                class="bg-white text-primary flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-200 transition"
              >
                <PlayIcon class="w-6 h-6" />
              </button>
              <span class="uppercase text-sm font-bold">Watch Now</span>
            </div>

            <div
              v-if="showModal"
              @keyup="closeModalOnEscape"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            >
              <videoModal @close="showModal = !showModal" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="py-12 sm:py-16 md:py-28 bg-linear-to-t from-primary/20 to-primary/0 text-text">
      <div>
        <h2 class="text-center mb-6 text-2xl sm:text-3xl font-bold">
          Trusted by over 100+ companies worldwide
        </h2>
        <div class="overflow-hidden">
          <div class="flex animate-scroll space-x-12">
            <div v-for="logo in 6" :key="'logo1-' + logo" class="flex-shrink-0">
              <img
                src="/images/coworking/about.webp"
                class="h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 object-contain"
                alt=""
                loading="lazy"
              />
            </div>
            <!-- Repeat logos to make seamless loop -->
            <div v-for="logo in 6" :key="'logo2-' + logo" class="flex-shrink-0">
              <img
                src="/images/coworking/about.webp"
                class="h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 object-contain"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
p {
  padding-inline: 0px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 15s linear infinite;
}
</style>
