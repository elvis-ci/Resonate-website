<script setup>
import { ref, computed, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import SwiperCore from 'swiper'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow])

const locations = computed(() => {
  return Object.entries(space.value.locations).flatMap(([city, cityData]) =>
    cityData.areas.map((area) => `${area} - ${city.replace('_', ' ')}`),
  )
})

const selectedLocation = ref('')

const space = ref({
  name: 'Conference Halls',
  pricePerDay: 15000,
  highlights: {
    capacity: '10 - 15 person',
  },
  features: [
    'Large conference table with comfortable seating',
    'Smart TV / Projector with HDMI & wireless screen sharing',
    'Video conferencing setup (camera, microphone & speakers)',
    'Whiteboard and presentation tools',
    'Soundproofed room for private meetings',
    'On-site technical support on request',
  ],
  accessibility: [
    'Wheelchair Accessible Entrance',
    'Adjustable Height Desks',
    'Accessible Restroom',
    'Clear Signage',
  ],
  locations: {
    Lagos: {
      areas: ['Victoria Island', 'Yaba', 'Ikeja'],
      images: [
        '/images/coworking/private-office-1.webp',
        '/images/coworking/private-office-2.webp',
        '/images/coworking/private-office-3.webp',
        '/images/coworking/private-office-3.webp',
        '/images/coworking/private-office-3.webp',
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
    },
    Abuja: {
      areas: ['Central'],
      images: [
        '/images/coworking/private-office-1.webp',
        '/images/coworking/private-office-2.webp',
        '/images/coworking/private-office-3.webp',
        '/images/coworking/private-office-3.webp',
        '/images/coworking/private-office-3.webp',
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
    },
    Port_Harcourt: {
      areas: ['GRA'],
      images: [
        '/images/coworking/private-office-1.webp',
        '/images/coworking/private-office-2.webp',
        '/images/coworking/private-office-3.webp',
        '/images/coworking/private-office-3.webp',
        '/images/coworking/private-office-3.webp',
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
          name: 'Tony',
          rating: 4,
          comment: 'Great workspace, fast internet.',
        },
      ],
    },
  },
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

const currentLocationData = computed(() => {
  const [area, city] = selectedLocation.value.split(' - ')
  return space.value.locations[city.replace(' ', '_')]
})
const currentReviews = computed(() => currentLocationData.value.reviews)

const averageRating = computed(() => {
  const reviews = currentReviews.value
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.length).toFixed(1)
})

const formattedPrice = computed(() => `₦${space.value.pricePerDay.toLocaleString()} / day`)

watch(
  locations,
  (newLocations) => {
    if (!selectedLocation.value && newLocations.length) {
      selectedLocation.value = newLocations[0]
    }
  },
  { immediate: true },
)
</script>

<template>
  <main id="maincontent">
    <!-- HERO & QUICK FACTS -->
    <section class="sm:pt-16 md:pt-20">
      <div class="container">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <!-- Text Content -->
          <div class="max-w-2xl">
            <h1 class="main-heading text-heading mb-4">
              {{ space.name }}
            </h1>

            <p class="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              <span>Capacity: {{ space.highlights.capacity }}</span>
              <span>Best for: Board Conference</span>
              <span>Noise level: Quiet</span>
            </p>

            <p>
              Available in (
              <span v-for="(loc, i) in locations" :key="loc">
                {{ loc }}<span v-if="i < locations.length - 1">, </span>
              </span>
              )
            </p>

            <!-- Location Selector -->
            <label class="flex flex-col gap-2 mt-6 font-medium text-heading">
              Choose a Location
              <select
                v-model="selectedLocation"
                class="py-3 px-3 bg-card-bg2 rounded-md border border-text focus:ring-primary focus:border-primary"
              >
                <option v-for="loc in locations" :key="loc">
                  {{ loc }}
                </option>
              </select>
            </label>
          </div>

          <!-- Pricing Box -->
          <div class="order-2 md:order-none bg-bg shadow rounded-xl p-6 w-full md:w-80 text-text">
            <p class="font-bold">
              {{ formattedPrice }}
            </p>
            <p class="mt-1">Available</p>
            <button class="secondary w-full mt-4">Make Reservation</button>
            <button class="primary w-full mt-4">Book Now</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CAROUSEL -->
    <section>
      <div class="mt-12 md:mt-16 relative z-0 isolate">
        <Swiper
          :slides-per-view="1.1"
          :space-between="16"
          :centered-slides="true"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :breakpoints="{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }"
          navigation
          pagination
          class="rounded-xl overflow-hidden"
        >
          <SwiperSlide v-for="(img, index) in currentLocationData.images" :key="index" class="mb-8">
            <img
              :src="img"
              :alt="`${space.name} workspace image ${index + 1}`"
              class="object-cover w-full h-56 sm:h-64 md:h-72 rounded-xl"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <!-- FEATURES & ACCESSIBILITY -->
    <section class="">
      <div class="container">
        <h2 class="mb-4">Workspace & Accessibility Features</h2>

        <p class="flex flex-wrap gap-x-4 gap-y-2 mb-8">
          <span>Capacity: {{ space.highlights.capacity }}</span>
          <span>Best for: Board Conference</span>
          <span>Noise level: Quiet</span>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <!-- Workspace Features -->
          <div>
            <h3 class="mb-4 text-lg md:text-xl">Workspace Features</h3>
            <ul class="space-y-3">
              <li
                v-for="f in space.features"
                :key="f"
                class="flex items-start gap-x-3 text-sm sm:text-base"
              >
                <span class="text-primary font-bold mt-0.5" aria-hidden="true"> ✓ </span>
                <p>{{ f }}</p>
              </li>
            </ul>
          </div>

          <!-- Accessibility Features -->
          <div>
            <h3 class="mb-4">Accessibility Features</h3>
            <ul class="space-y-3">
              <li v-for="a in space.accessibility" :key="a" class="flex items-start gap-x-3">
                <span class="text-primary font-bold mt-0.5" aria-hidden="true"> ♿ </span>
                <p>{{ a }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section class="">
      <div class="container">
        <h2 class="mb-4">User Reviews</h2>

        <div class="mb-6">
          <p>
            ⭐ {{ averageRating }} from {{ currentReviews.length }} reviews
            <span class="hidden sm:inline"> · Most users mention quietness & fast Wi-Fi </span>
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <article
            v-for="r in currentReviews"
            :key="r.id"
            class="border rounded-lg p-5 bg-bg shadow-sm"
          >
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold">{{ r.name }}</h3>

              <div class="flex text-xs md:text-sm shrink-0">
                <span v-for="n in r.rating" :key="n">⭐</span>
              </div>
            </div>

            <p class="mt-3 leading-relaxed">
              {{ r.comment }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQS -->
    <section class="">
      <div class="container max-w-3xl">
        <h2 class="mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="faq in space.faqs" :key="faq.id" class="border rounded-lg overflow-hidden">
            <h3
              @click="faq.open = !faq.open"
              class="has-accordion w-full flex justify-between items-center px-4 py-4 text-left font-medium focus:outline-none focus-visible:ring bg-card-bg2/60"
              :aria-expanded="faq.open"
            >
              <p>{{ faq.question }}</p>
              <button
                @click.stop="faq.open = !faq.open"
                class="transition-transform w-4 h-4 duration-200 accordion text-primary"
                :class="{ 'rotate-180': faq.open }"
              ></button>
            </h3>
            <div v-show="faq.open" class="p-4 pb-4 text-text">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FORM -->
    <section class="py-12 sm:py-16 md:py-28 bg-linear-to-t from-primary/20 to-primary/0">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="mb-4">For More Inquiries</h2>
        <p class="mb-6">
          Have questions or need more information about this workspace? Our team is here to help.
        </p>

        <form class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
          <div class="flex flex-col">
            <label for="name" class="mb-1 font-semibold">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              class="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div class="flex flex-col">
            <label for="email" class="mb-1 font-semibold text-sm">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              class="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div class="flex flex-col md:col-span-2">
            <label for="message" class="mb-1 font-semibold">Your Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              class="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" class="primary px-6 py-3 w-full md:col-span-2 mt-2">
            Send Inquiry
          </button>
        </form>
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

.accordion::after {
  content: '';
  transform: translateY(-80%) rotate(-135deg);
  border: solid var(--color-primary-hover);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.2s;
}
</style>
