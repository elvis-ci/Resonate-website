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
    '/images/private-office-1.jpg',
    '/images/private-office-2.jpg',
    '/images/private-office-3.jpg',
  ],
  highlights: {
    capacity: '2–6 people',
    internet: '300 Mbps',
    noise: 'Low',
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
      <div class="container">
        <div>
          <h1 class="main-heading">
            {{ space.name }}
          </h1>

          <label class="block mt-4 text-sm font-medium text-gray-700">
            Location
            <select
              v-model="selectedLocation"
              class="mt-1 block w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary"
            >
              <option v-for="loc in locations" :key="loc">
                {{ loc }}
              </option>
            </select>
          </label>
        </div>

        <div class="bg-white shadow rounded-xl p-6 w-full md:w-80">
          <p class="text-2xl font-semibold text-gray-900">
            {{ formattedPrice }}
          </p>
          <button
            class="mt-4 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 focus:outline-none focus-visible:ring"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>

    <!-- IMAGE GALLERY -->
    <section>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          v-for="(img, index) in space.images"
          :key="index"
          :src="img"
          :alt="`${space.name} workspace image ${index + 1}`"
          class="rounded-xl object-cover h-64 w-full"
        />
      </div>
    </section>

    <!-- HIGHLIGHTS -->
    <section class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="p-4 border rounded-lg">
        <p class="text-sm text-gray-500">Capacity</p>
        <p class="font-semibold">{{ space.highlights.capacity }}</p>
      </div>
      <div class="p-4 border rounded-lg">
        <p class="text-sm text-gray-500">Internet</p>
        <p class="font-semibold">{{ space.highlights.internet }}</p>
      </div>
      <div class="p-4 border rounded-lg">
        <p class="text-sm text-gray-500">Noise Level</p>
        <p class="font-semibold">{{ space.highlights.noise }}</p>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-semibold mb-4">Workspace Features</h2>
        <ul class="space-y-2">
          <li v-for="f in space.features" :key="f">✓ {{ f }}</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4">Accessibility Features</h2>
        <ul class="space-y-2">
          <li v-for="a in space.accessibility" :key="a" class="flex gap-2">
            ♿ <span>{{ a }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- REVIEWS -->
    <section>
      <h2 class="text-xl font-semibold mb-4">User Reviews</h2>
      <div class="space-y-4">
        <article v-for="r in space.reviews" :key="r.id" class="border rounded-lg p-4">
          <p class="font-semibold">{{ r.name }} — ⭐ {{ r.rating }}</p>
          <p class="text-gray-700 mt-2">
            {{ r.comment }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
