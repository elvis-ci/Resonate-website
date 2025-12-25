<template>
  <main id="maincontent" class="single-workspace-booking py-12 max-w-4xl mx-auto px-4">
    <div class="container">
      <h1 class="text-3xl font-bold mb-6 text-center main-heading text-heading">
        Book Your Workspace
      </h1>

      <form
        @submit.prevent="submitBooking"
        class="space-y-6 bg-gray-100/10 border border-primary/50 text-text p-6 rounded-lg shadow-lg"
      >
        <!-- Location -->
        <div>
          <label for="location" class="block mb-2 font-semibold">Location</label>
          <select
            id="location"
            v-model="form.location"
            class="w-full border border-gray-300 bg-bg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option disabled value="">Select a location</option>
            <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>

        <!-- Date -->
        <div>
          <label for="date" class="block mb-2 font-semibold">Date</label>
          <input
            type="date"
            id="date"
            v-model="form.date"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Time -->
        <div>
          <label for="time" class="block mb-2 font-semibold">Time</label>
          <input
            type="time"
            id="time"
            v-model="form.time"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Duration -->
        <div>
          <label for="duration" class="block mb-2 font-semibold">Duration (Hours)</label>
          <div class="flex items-center space-x-2">
            <input
              type="number"
              id="duration"
              v-model.number="form.duration"
              min="1"
              max="8"
              class="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <span class="text-body">hours</span>
            <button
              type="button"
              @click="extendDuration"
              class="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              + Extend (max 2 hrs)
            </button>
          </div>
        </div>

        <!-- Special Requests -->
        <div>
          <label for="requests" class="block mb-2 font-semibold">Special Requests</label>
          <textarea
            id="requests"
            v-model="form.requests"
            rows="4"
            placeholder="Any additional requests or requirements..."
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <!-- Submit -->
        <div class="text-center">
          <button type="submit" class="px-6 py-3 primary">Confirm Booking</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

// Example locations
const locations = ['Lagos - Victoria Island', 'Abuja - Central', 'Port Harcourt - GRA']

// Form state
const form = reactive({
  location: '',
  date: '',
  time: '',
  duration: 1,
  requests: '',
})

// Extend duration by max 2 hours
function extendDuration() {
  if (form.duration < 3) {
    form.duration += 1
  } else {
    alert('You can only extend a maximum of 2 additional hours.')
  }
}

// Handle form submission
function submitBooking() {
  console.log('Booking submitted:', { ...form })
  alert('Your booking has been submitted!')
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(30%) sepia(80%) saturate(400%) hue-rotate(10deg);
}
</style>
