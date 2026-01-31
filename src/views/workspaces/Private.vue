<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import SwiperCore from 'swiper'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { useWorkspaceLocations } from '@/composables/useWorkspaceLocations'
import BookingFormModal from '@/components/BookingForms/BookingFormModal.vue'
import { formatNaira } from '@/utils/currency'

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow])

const space = ref({
  name: 'Private Office Suite',
  pricePerDay: 25000,
  highlights: { capacity: '1 person' },
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
        { id: 2, name: 'Tunde', rating: 4, comment: 'Great workspace, fast internet.' },
        { id: 3, name: 'Ikenna', rating: 4, comment: 'Great workspace, fast internet.' },
      ],
    },
  },
  faqs: [
    {
      id: 1,
      question: 'Can I book this space for just a few hours?',
      answer: 'Yes. Hourly bookings are available depending on the location.',
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

const workspaceType = computed(() => space.value.name)

const { availableLocations, isLoadingLocations, error, fetchLocations } = useWorkspaceLocations()

const availableAt = computed(() => availableLocations.value.map((l) => `${l.location}`))
const locations = computed(() => availableLocations.value.map((l) => `${l.location} - ${l.city}`))

const selectedLocation = ref('')

watch(
  locations,
  (newLocations) => {
    if (!selectedLocation.value && newLocations.length) {
      selectedLocation.value = newLocations[0]
    }
  },
  { immediate: true },
)

const currentDbLocation = computed(() => {
  if (!selectedLocation.value) return null

  const [location, city] = selectedLocation.value.split(' - ')

  return availableLocations.value.find((l) => l.location === location && l.city === city) ?? null
})

const currentLocationData = computed(() => {
  if (!selectedLocation.value) return null

  const [, city] = selectedLocation.value.split(' - ')
  if (!city) return null

  return space.value.locations[city.replace(' ', '_')] ?? null
})

const currentReviews = computed(() => currentLocationData.value?.reviews ?? [])

const averageRating = computed(() => {
  if (!currentReviews.value.length) return '0.0'
  const total = currentReviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / currentReviews.value.length).toFixed(1)
})

const bookingDialog = ref(null)
const bookingFormRef = ref(null)
const selectedWorkspace = ref('')

const hasLoadError = computed(() => error.value)

const openBooking = (workspaceTitle) => {
  selectedWorkspace.value = workspaceTitle
  bookingDialog.value.showModal()
}

const closeBooking = () => {
  bookingDialog.value.close()
  selectedWorkspace.value = ''
}

const handleBackdropClick = () => {
  if (bookingFormRef.value) {
    bookingFormRef.value.attemptToCloseForm()
  }
}

async function retryLoadLocations() {
  await fetchLocations(workspaceType.value)
}

onMounted(async () => {
  try {
    await fetchLocations(workspaceType.value)
    if (error.value) {
      loadError.value = 'Failed to load locations. Please try again.'
    }
  } catch (err) {
    loadError.value = err?.message || 'Failed to load locations. Please try again.'
  }
})
</script>

<template>
  <main id="maincontent">
    <!-- HERO & LOCATION + PRICING -->
    <section class="heading">
      <div class="container">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div class="max-w-2xl">
            <h1 class="main-heading text-heading mb-4">
              {{ space.name }}
            </h1>

            <div class="mb-4">
              <p class="flex flex-wrap gap-x-4 tight">
                <span>Capacity: {{ space.highlights.capacity }}</span>
              </p>
              <p class="flex flex-wrap gap-x-4 tight">
                <span>Best for: Focused work</span>
              </p>
              <p class="flex flex-wrap gap-x-4 tight">
                <span>Noise level: Moderate</span>
              </p>
            </div>

            <div>
              <p class="tight">Available in Lagos at:</p>
              <ul class="flex flex-wrap">
                <li v-for="(loc, i) in availableAt" :key="loc" class="inline">
                  <p class="tight">
                    {{ loc }}<span v-if="i < availableAt.length - 1">,&nbsp;</span>
                  </p>
                </li>
              </ul>
            </div>
            <label class="flex flex-col gap-2 mt-6 font-medium text-heading">
              Explore available locations
              <!-- Loading State -->
              <div v-if="isLoadingLocations" class="h-10 bg-gray-200 rounded animate-pulse"></div>

              <!-- Error State -->
              <div v-else-if="hasLoadError" class="bg-red-50 border-2 border-red-300 rounded p-3">
                <p class="text-red-700 text-sm">⚠ Failed to load locations</p>
                <p class="text-red-700 text-xs">{{ error?.message || 'Unknown error' }}</p>
                <button @click="retryLoadLocations">Retry</button>
              </div>

              <!-- Loaded State -->
              <select
                v-else
                v-model="selectedLocation"
                class="py-3 px-3 bg-card-bg2 rounded-md border border-text focus:ring-primary focus:border-primary"
              >
                <option v-for="loc in locations" :key="loc">
                  {{ loc }}
                </option>
              </select>
            </label>
          </div>

          <div class="order-2 md:order-none bg-bg shadow rounded-xl p-6 w-full md:w-80 text-text">
            <!-- Loading State -->
            <div v-if="isLoadingLocations" class="space-y-4 animate-pulse">
              <div class="h-8 bg-gray-200 rounded w-3/4"></div>
              <div class="h-6 bg-gray-200 rounded w-1/2"></div>
              <div class="h-10 bg-gray-200 rounded w-full"></div>
              <div class="h-10 bg-gray-200 rounded w-full"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasLoadError" class="bg-red-50 border-2 border-red-300 rounded p-4">
              <p class="text-red-800 font-semibold mb-3 text-sm">⚠ Unable to Load Pricing</p>
              <p class="text-red-700 text-xs mb-4">{{ loadError }}</p>
              <button
                type="button"
                class="primary w-full text-sm"
                @click="retryLoadLocations"
                :disabled="isLoadingLocations"
              >
                {{ isLoadingLocations ? 'Retrying...' : 'Retry' }}
              </button>
            </div>

            <!-- Loaded State -->
            <div v-else>
              <p class="font-bold">
                {{ formatNaira(currentDbLocation?.max_booking_price || 0) }} per hour
              </p>
              <p class="mt-1">
                <span v-if="currentDbLocation">
                  {{ currentDbLocation.total_units }} spaces available
                </span>
              </p>
              <button class="secondary w-full mt-4">Make Reservation</button>
              <button class="primary w-full mt-4" @click="openBooking(workspaceType)">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IMAGE CAROUSEL -->
    <section class="mt-12 md:mt-16 relative z-0 isolate">
      <Swiper
        v-if="currentLocationData"
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
    </section>

    <!-- FEATURES & ACCESSIBILITY -->
    <section class="">
      <div class="container">
        <div class="mb-4"><h2 class="mb-4 text-center">Workspace Features</h2></div>

        <!-- Grid for features and accessibility -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <!-- Workspace Features -->
          <div>
            <h3 class="mb-4 text-lg md:text-xl">Regular Features</h3>
            <ul class="space-y-0">
              <li
                v-for="f in space.features"
                :key="f"
                class="flex items-start gap-x-3 text-sm sm:text-base"
              >
                <span class="text-primary font-bold mt-0.5" aria-hidden="true"> ✓ </span>
                <p class="">
                  {{ f }}
                </p>
              </li>
            </ul>
          </div>

          <!-- Accessibility Features -->
          <div>
            <h3 class="mb-4">Accessibility Features</h3>
            <ul class="space-y-0">
              <li v-for="a in space.accessibility" :key="a" class="flex items-start gap-x-3">
                <span class="text-primary font-bold mt-0.5" aria-hidden="true"> ✓ </span>
                <p>
                  <span>{{ a }}</span>
                </p>
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

        <!-- Reviews Grid -->
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <article
            v-for="r in currentReviews"
            :key="r.id"
            class="border rounded-lg p-4 bg-bg shadow-sm"
          >
            <div class="flex items-start justify-between gap-1">
              <h3 class="font-semibold">
                {{ r.name }}
              </h3>

              <div class="flex text-xs md:text-sm shrink-0">
                <span v-for="n in r.rating" :key="n">⭐</span>
              </div>
            </div>

            <p class="mt-2 leading-relaxed tight">
              {{ r.comment }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQS -->
    <section class="py-12 sm:py-16 md:py-28 bg-linear-to-t from-primary/20 to-primary/0">
      <div class="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 class="mb-6 text-center">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div
            v-for="faq in space.faqs"
            :key="faq.id"
            class="border-b rounded-lg overflow-hidden bg-card-bg2/80"
          >
            <div
              @click="faq.open = !faq.open"
              class="has-accordion w-full flex justify-between items-center p-2 text-left focus:outline-none focus-visible:ring"
              :aria-expanded="faq.open"
            >
              <p class="tight">{{ faq.question }}</p>
              <button
                @click.stop="faq.open = !faq.open"
                class="transition-transform w-4 h-4 duration-200 accordion text-primary"
                :class="{ 'rotate-180': faq.open }"
              ></button>
            </div>
            <div v-show="faq.open" class="px-4 py-2 text-text">
              <p class="tight">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BOOKING MODAL -->
    <dialog
      @click.self="handleBackdropClick"
      ref="bookingDialog"
      class="rounded-xl backdrop:bg-black/40 mx-auto my-auto p-0"
    >
      <BookingFormModal ref="bookingFormRef" :workspaceType="space.name" @close="closeBooking" />
    </dialog>
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
