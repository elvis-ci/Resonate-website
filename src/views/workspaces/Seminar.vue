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
  ],
})

const formattedPrice = computed(() => `₦${space.value.pricePerDay.toLocaleString()} / day`)
</script>

<template>
  <main id="maincontent" class="">
    <!-- HERO -->
    <section class="">
      <div class="container grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h1 class="main-heading">
            {{ space.name }}
          </h1>

          <label class="flex items-center gap-x-2 mt-4 text-sm font-medium text-heading mb-2">
            Location
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

        <div class="bg-bg shadow rounded-xl p-6 w-full md:w-80 justify-self-end">
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
            <li v-for="f in space.features" :key="f">✓ {{ f }}</li>
          </ul>
        </div>

        <div>
          <h2 class="mb-4">Accessibility Features</h2>
          <ul class="space-y-2">
            <li v-for="a in space.accessibility" :key="a" class="flex gap-2">
              ♿ <span>{{ a }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- REVIEWS -->
    <section>
      <div class="container">
        <h2 class="mb-4">User Reviews</h2>
        <div class="grid md:grid-cols-2 gap-8 ">
          <article v-for="r in space.reviews" :key="r.id" class="border rounded-lg p-4">
            <p class="font-semibold">{{ r.name }} — ⭐ {{ r.rating }}</p>
            <p class="mt-2">
              {{ r.comment }}
            </p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
