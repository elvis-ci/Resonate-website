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
  // function closeModalOnEscape(event) {
  //   if (event.key === 'Escape' && showModal.value) {
  //     showModal.value = false
  //   }
  // }
})
</script>

<template>
  <main id="maincontent">
    <!-- Hero Start -->
    <section class="hero premium-hero">
      <div class="hero-backdrop">
        <div class="hero-overlay"></div>

        <div class="container relative z-10 flex min-h-[680px] items-center py-20 lg:py-24">
          <div class="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="text-white text-left">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.24em] uppercase text-white/80 backdrop-blur-sm"
              >
                <span class="h-2 w-2 rounded-full bg-secondary"></span>
                Premium workspace
              </div>

              <h1 class="main-heading mt-6 max-w-xl leading-[0.95] tracking-[-0.04em] text-white">
                Boost Productivity in Comfort & Privacy
              </h1>

              <p class="white mt-5 max-w-xl text-base md:text-lg text-white/80">
                Discover a coworking space designed to keep you focused, creative, and connected.
                Enjoy flexible offices, accessible facilities, and a vibrant community all at an
                affordable price.
              </p>

              <div class="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <RouterLink to="/workspaces/categories-workspace" class="primary premium-btn">
                  Space Pricing
                </RouterLink>
                <RouterLink to="/bookings" class="secondary premium-btn secondary-btn">
                  Book a space
                </RouterLink>
              </div>

              <div class="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
                <div>
                  <span class="block text-2xl font-bold text-white">24/7</span>
                  <span>Access</span>
                </div>
                <div>
                  <span class="block text-2xl font-bold text-white">5k+</span>
                  <span>Members</span>
                </div>
                <div>
                  <span class="block text-2xl font-bold text-white">4.9/5</span>
                  <span>Rating</span>
                </div>
              </div>
            </div>

            <div class="relative flex justify-center lg:justify-end">
              <div class="hero-card">
                <div class="hero-card-header">
                  <span class="hero-card-badge">Available now</span>
                  <span class="hero-card-price">From ₦3,000/hr</span>
                </div>

                <div class="hero-card-image-wrap">
                  <img src="/images/coworking/community.jpeg" alt="Reboot workspace" />
                </div>

                <div class="hero-card-meta">
                  <div>
                    <p class="meta-label">Workspace</p>
                    <p class="meta-value">Private Office</p>
                  </div>
                  <div>
                    <p class="meta-label">Capacity</p>
                    <p class="meta-value">1–12 people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero End -->

    <!-- services -->
    <section class="bg-alt-bg">
      <div class="container px-4">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="">Your Comfort Is Our Priority</h2>
          <p class="">
            Build your best workday at
            <span class="text-primary-text font-bold">Reboot</span> — a coworking space thoughtfully
            designed for comfort, focus, and connection.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="text-center bg-card-bg rounded-lg py-6 shadow-lg shadow-text/10 hover:shadow-xl transition"
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

    <!-- about -->
    <section>
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between">
          <!-- Image column -->
          <div class="w-full md:w-6/12 lg:w-6/12">
            <img
              src="/images/coworking/community.jpeg"
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
              <h2 class="">The Reboot Community</h2>

              <p class="">
                Start working with
                <span class="text-primary-text font-bold">Reboot</span>, a coworking community
                designed to help ideas grow and people thrive. Whether you need a quiet space to
                focus or a collaborative environment to connect, Reboot offers flexible, accessible
                workspaces that support productivity—without the premium price tag.
              </p>

              <!-- <RouterLink to="/workspaces" class="primary"> Join Now </RouterLink> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Testimonials -->
    <section class="bg-alt-bbg">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="">What Our Coworkers have to say</h2>
          <p class="">
            Start working with
            <span class="text-primary-text font-bold">Reboot</span>
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

    <!-- Partners -->
    <!-- <section class="py-12 sm:py-16 md:py-28 bg-alt-bg text-text">
      <div>
        <h2 class="text-center mb-6 text-2xl sm:text-3xl font-bold">
          Trusted by over 100+ companies NationWide
        </h2>
        <div class="overflow-hidden">
          <div class="flex space-x-12 justify-center">
            <div v-for="logo in 4" :key="'logo1-' + logo" class="flex-shrink-0">
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
    </section> -->

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
              <span class="text-secondary font-bold">Reboot</span> that can provide everything you
              need to generate awareness, drive traffic, connect.
            </p>

            <div class="flex justify-center items-center gap-4">
              <!-- <button
                class="primary transition"
              >
                Install Now
              </button> -->

              <button
                aria-label="Play Video of Reboot Coworking Space"
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
  </main>
</template>

<style scoped>
p {
  padding-inline: 0px;
}

.premium-hero {
  position: relative;
  overflow: hidden;
  background: #0f172a;
}

.hero-backdrop {
  position: relative;
  min-height: 680px;
  background-color: rgba(17, 24, 39, 0.9);
  background-image: url('/images/coworking/bg01.webp');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.6);
}

.premium-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 0.95rem 1.5rem;
  border-radius: 9999px;
  font-weight: 700;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.premium-btn:hover {
  transform: translateY(-2px);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
}

.hero-card {
  position: relative;
  width: min(100%, 420px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(14, 21, 34, 0.72);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.45);
  padding: 1rem;
}

.hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.hero-card-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  background: rgba(45, 212, 191, 0.12);
  border: 1px solid rgba(45, 212, 191, 0.3);
  color: #b7ffef;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-card-price {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.hero-card-image-wrap {
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #111827;
}

.hero-card-image-wrap img {
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.hero-card-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding-top: 1rem;
}

.meta-label {
  margin: 0 0 0.25rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.6);
}

.meta-value {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
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

@media (max-width: 767px) {
  .hero-backdrop {
    min-height: 620px;
  }

  .hero-card {
    margin-top: 1.5rem;
  }

  .premium-btn {
    width: 100%;
  }
}
</style>
