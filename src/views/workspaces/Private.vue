<script setup>
import { ref, computed } from 'vue'

const locations = [
  'Lagos - Victoria Island',
  'Lagos - Yaba',
  'Lagos - Ikeja',
  'Abuja - Central',
  'Port Harcourt - GRA',
]
const selectedLocation = ref(locations[0])

const space = ref({
  name: 'Private Office',
  pricePerDay: 15000,
  images: [
    '/images/coworking/private-office-1.webp',
    '/images/coworking/private-office-2.webp',
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
      id: 2,
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
  <main id="maincontent" class="">
    <section class="">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:p-24 grid md:grid-cols-2 gap-8 lg:gap-12"
      >
        <div>
          <h1 class="main-heading">
            {{ space.name }}
          </h1>
          <p>
            Available in (<span v-for="loc in locations" :key="loc">{{ loc }}, </span>)
          </p>

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

        <div class="bg-bg shadow rounded-xl p-6 w-full md:w-80 justify-self-end text-text">
          <p class="body">
            {{ formattedPrice }}
          </p>
          <div class="mt-2 flex gap-x-2">
            <p class="">Capacity:</p>
            <p class="font-semibold">{{ space.highlights.capacity }}</p>
          </div>

          <button class="primary w-full mt-4">Book Now</button>
        </div>
      </div>
    </section>

    <!-- IMAGE GALLERY -->
    <section>
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            v-for="(img, index) in space.images"
            :key="index"
            :src="img"
            :alt="`${space.name} workspace image ${index + 1}`"
            class="rounded-xl object-cover h-64 w-full"
          />
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="">
      <div class="container grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="mb-4">Workspace Features</h2>
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

    <!-- REVIEWS -->
    <section>
      <div class="container">
        <h2 class="mb-4">User Reviews</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <article v-for="r in space.reviews" :key="r.id" class="border rounded-lg p-4">
            <div class="flex justify-between">
              <h3 class="font-semibold">{{ r.name }}</h3>
              <div class="flex"><p v-for="rating in r.rating" :key="rating">⭐</p></div>
            </div>
            <p class="mt-2">
              {{ r.comment }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQS -->
    <section>
      <div class="container max-w-3xl">
        <h2 class="mb-6">Frequently Asked Questions</h2>

        <div class="space-y-4">
          <div v-for="faq in space.faqs" :key="faq.id" class="border rounded-lg overflow-hidden">
            <!-- Accordion Header -->
            <h3
              class="has-accordion w-full flex justify-between items-center px-4 py-4 text-left font-medium focus:outline-none focus-visible:ring bg-card-bg2/60"
              :aria-expanded="faq.open"
            >
              <span>{{ faq.question }}</span>
            </h3>

            <!-- Accordion Panel -->
            <div v-show="faq.open" class="p-4 pb-4 text-text ">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.has-accordion {
  position: relative;
  padding-right: 1rem;
}
.accordion{
position: relative;
}

.accordion::after {
  content: '';
  top: -10%;
  transform: translateY(-80%) rotate(-135deg);
  border: solid var(--color-primary);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.2s;
  z-index: 100;
}
</style>
