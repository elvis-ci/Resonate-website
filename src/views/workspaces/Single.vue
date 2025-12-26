<template>
  <main id="maincontent" class="single-workspace-booking py-12 max-w-4xl mx-auto px-4">
    <div class="container">

    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

// Example locations
const locations = ['Lagos - Victoria Island', 'Lagos - Yaba', 'Lagos - Ikeja', 'Abuja - Central', 'Port Harcourt - GRA']

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
