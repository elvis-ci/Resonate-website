<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import SwiperCore from 'swiper'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow])

const locations = computed(() => {
  return Object.entries(space.value.locations).flatMap(([city, locs]) =>
    locs.map((loc) => `${loc} - ${city.replace('_', ' ')}`),
  )
})

const selectedLocation = ref(locations[0])

const space = ref({
  name: 'Private Office',
  locations: {
    Lagos: ['Victoria Island', 'Yaba', 'Ikeja'],
    Abuja: ['Central'],
    Port_Harcourt: ['GRA'],
  },
  pricePerDay: 15000,
  images: [
    '/images/coworking/private-office-1.webp',
    '/images/coworking/private-office-2.webp',
    '/images/coworking/private-office-3.webp',
    '/images/coworking/private-office-3.webp',
    '/images/coworking/private-office-3.webp',
  ],
  highlights: {
    capacity: '2 – 6 persons',
  },
  features: ['24/7 Power Supply', 'High-speed Internet', 'Ergonomic Chairs', 'Meeting Rooms'],
  accessibility: [
    'Wheelchair Accessible Entrance',
    'Adjustable Height Desks',
    'Accessible Restroom',
    'Clear Signage',
  ],
  reviews: [
    {
      id: 1,
      name: 'Amina',
      rating: 5,
      comment: 'Very accessible and quiet. Staff were helpful.',
    },
    {
      id: 2,
      name: 'Tunde',
      rating: 4,
      comment: 'Great workspace, fast internet.',
    },
    {
      id: 3,
      name: 'Ikenna',
      rating: 4,
      comment: 'Great workspace, fast internet.',
    },
  ],
  faqs: [
    {
      id: 1,
      question: 'Can I book this space for just a few hours?',
      answer:
        'Yes. Although the displayed price is per day, hourly bookings are available depending on the location.',
      open: false,
    },
    {
      id: 2,
      question: 'Is this workspace wheelchair accessible?',
      answer:
        'Yes. All locations offering this space include step-free access and accessible restrooms.',
      open: false,
    },
    {
      id: 3,
      question: 'What happens if there is a power outage?',
      answer: 'All our coworking spaces have 24/7 backup power to ensure uninterrupted work.',
      open: false,
    },
  ],
})

const formattedPrice = computed(() => `₦${space.value.pricePerDay.toLocaleString()} / day`)
</script>

<template>
  <main id="maincontent">
    <!-- HERO & QUICK FACTS -->
    <section class="hero mt-6">
      <div class="container">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h1 class="main-heading flex">{{ space.name }}</h1>
            <p class="flex flex-wrap gap-x-4 mb-4">
              <span>Capacity: {{ space.highlights.capacity }}</span>
              <span>Noise level: Quiet</span>
              <span>Best for: Focused work</span>
            </p>
            <p class="mt-2 text-sm text-muted">
              Available in (
              <span v-for="(loc, i) in locations" :key="loc">
                {{ loc }}<span v-if="i < locations.length - 1">, </span>
              </span>
              )
            </p>
          </div>
          <button class="primary">Book Now</button>
        </div>
        <!-- Swiper Carousel -->
      </div>
<Swiper
  :slides-per-view="3"
  :space-between="20"
  :centered-slides="true"
  :loop="true"
  :autoplay="{ delay: 3000, disableOnInteraction: false }"
  navigation
  pagination
  class="mt-6 rounded-xl overflow-hidden"
>
  <SwiperSlide v-for="(img, index) in space.images" :key="index">
    <img
      :src="img"
      :alt="`${space.name} workspace image ${index + 1}`"
      class="object-cover w-full h-64 rounded-xl transition-transform duration-300"
    />
  </SwiperSlide>
</Swiper>
    </section>

    <section>
      <div class="container">
        <div>
          <!-- Location Selector -->
          <label class="flex items-center gap-x-2 mt-4 text-sm font-medium text-heading mb-2">
            Choose a Location
            <select
              v-model="selectedLocation"
              class="mt-1 py-3 px-2 bg-card-bg2 block rounded-md border border-text focus:ring-primary focus:border-primary"
            >
              <option v-for="loc in locations" :key="loc">
                {{ loc }}
              </option>
            </select>
          </label>

          <!-- Pricing Box -->
          <div class="bg-bg shadow rounded-xl p-6 w-full md:w-80 justify-self-end text-text">
            <p class="body">{{ formattedPrice }}</p>
            <p class="text-xs text-muted mt-1">Includes Wi-Fi, power, and basic amenities</p>
            <p class="text-xs text-muted mt-1">Available today · Instant confirmation</p>

            <div class="mt-2 flex gap-x-2">
              <p>Capacity:</p>
              <p class="font-semibold">{{ space.highlights.capacity }}</p>
            </div>

            <button class="primary w-full mt-4">Book Now</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES & ACCESSIBILITY -->
    <section class="mt-10">
      <div class="container">
        <h2 class="">Workspace Features</h2>
        <p class="flex flex-wrap gap-x-4 mb-4">
          <span>Capacity: {{ space.highlights.capacity }}</span>
          <span>Noise level: Quiet</span>
          <span>Internet: 250 Mbps</span>
          <span>Best for: Focused work</span>
        </p>

        <div>
          <ul class="space-y-2">
            <li v-for="f in space.features" :key="f" class="flex gap-x-3">
              <span class="text-primary font-bold">✓</span> {{ f }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4">Accessibility Features</h2>
          <ul class="space-y-2">
            <li v-for="a in space.accessibility" :key="a" class="flex gap-x-3">
              <span class="text-primary font-bold">♿</span> {{ a }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- GOOD TO KNOW -->
    <section class="mt-10">
      <div class="container max-w-3xl">
        <h2 class="mb-4">Good to Know</h2>
        <ul class="space-y-1 text-sm text-muted">
          <li>📞 Calls allowed in designated areas</li>
          <li>🍽️ Food allowed (no strong odors)</li>
          <li>⚡ Power backup available</li>
        </ul>
      </div>
    </section>

    <!-- REVIEWS -->
    <section class="mt-10">
      <div class="container">
        <h2 class="mb-4">User Reviews</h2>
        <div class="text-sm text-muted mb-4">
          ⭐ 4.6 from {{ space.reviews.length }} reviews · Most users mention quietness & fast Wi-Fi
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <article v-for="r in space.reviews" :key="r.id" class="border rounded-lg p-4">
            <div class="flex justify-between">
              <h3 class="font-semibold">{{ r.name }}</h3>
              <div class="flex">
                <span v-for="n in r.rating" :key="n">⭐</span>
              </div>
            </div>
            <p class="mt-2">{{ r.comment }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQS -->
    <section class="mt-10">
      <div class="container max-w-3xl">
        <h2 class="mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="faq in space.faqs" :key="faq.id" class="border rounded-lg overflow-hidden">
            <h3
              @click="faq.open = !faq.open"
              class="has-accordion w-full flex justify-between items-center px-4 py-4 text-left font-medium focus:outline-none focus-visible:ring bg-card-bg2/60"
              :aria-expanded="faq.open"
            >
              <span>{{ faq.question }}</span>
              <button
                @click.stop="faq.open = !faq.open"
                class="transition-transform w-4 h-4 duration-200 accordion text-primary"
                :class="{ 'rotate-180': faq.open }"
              ></button>
            </h3>
            <div v-show="faq.open" class="p-4 pb-4 text-text">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.swiper-slide {
  transform: scale(0.8);
  opacity: 0.6;
  transition: all 0.3s ease;
}
.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
}
</style>
