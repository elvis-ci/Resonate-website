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
  name: 'Private Office',
  pricePerDay: 15000,
  highlights: {
    capacity: '1 person',
  },
  features: ['24/7 Power Supply', 'High-speed Internet', 'Ergonomic Chairs', 'Adjustable Screens'],
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
    <section class="hero py-16">
      <div class="container">
        <div class="flex justify-between items-center">
          <div class="max-w-2xl">
            <h1 class="main-heading flex">{{ space.name }}</h1>
            <p class="flex flex-wrap gap-x-4 mb-4">
              <span>Capacity: {{ space.highlights.capacity }}</span>
              <span>Best for: Focused work</span>
              <span>Noise level: Quiet</span>
            </p>
            <p class="mt-2">
              Available in (
              <span v-for="(loc, i) in locations" :key="loc">
                {{ loc }}<span v-if="i < locations.length - 1">, </span>
              </span>
              )
            </p>
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
            </div>
          </div>
          <!-- Pricing Box -->
          <div class="bg-bg shadow rounded-xl p-6 w-full md:w-80 justify-self-end text-text">
            <p class="body font-bold">{{ formattedPrice }}</p>
            <p class="text-xs text-muted mt-1">Available</p>
            <button class="primary w-full mt-4">Book Now</button>
          </div>
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
        class="rounded-xl overflow-hidden"
      >
        <SwiperSlide v-for="(img, index) in currentLocationData.images" :key="index">
          <img
            :src="img"
            :alt="`${space.name} workspace image ${index + 1}`"
            class="object-cover w-full h-64 rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- FEATURES & ACCESSIBILITY -->
    <section class="mt-16">
      <div class="container">
        <h2 class="mb-4">Workspace Features & Accessibility</h2>

        <!-- Quick facts row -->
        <p class="flex flex-wrap gap-x-4 mb-6">
          <span>Capacity: {{ space.highlights.capacity }}</span>
          <span>Best for: Focused work</span>
          <span>Noise level: Quiet</span>
        </p>

        <!-- Grid for features and accessibility -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Workspace Features -->
          <div>
            <h3 class="mb-3">Workspace Features</h3>
            <ul class="space-y-2">
              <li v-for="f in space.features" :key="f" class="flex gap-x-3">
                <p><span class="text-primary font-bold">✓</span> {{ f }}</p>
              </li>
            </ul>
          </div>

          <!-- Accessibility Features -->
          <div>
            <h3 class="mb-3">Accessibility Features</h3>
            <ul class="space-y-2">
              <li v-for="a in space.accessibility" :key="a" class="flex gap-x-3">
                <p><span class="text-primary font-bold">♿</span> {{ a }}</p>
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
        <div class="mb-4">
          <p>
            ⭐ {{ averageRating }} from {{ currentReviews.length }} reviews · Most users mention
            quietness & fast Wi-Fi
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <article v-for="r in currentReviews" :key="r.id" class="border rounded-lg p-4">
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
              <span>{{ faq.question }}</span>
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

    <!-- Form Section -->
    <section class="py-12 sm:py-16 md:py-28 bg-linear-to-t from-primary/20 to-primary/0">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl font-semibold mb-4">For More Inquiries</h2>
        <p class="text-sm text-muted mb-6">
          Have questions or need more information about this workspace? Our team is here to help.
        </p>

        <!-- contact form -->
        <form class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
          <!-- Name -->
          <div class="flex flex-col">
            <label for="name" class="mb-1 font-semibold text-sm">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              class="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <!-- Email -->
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

          <!-- Message -->
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

          <!-- Submit -->
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
