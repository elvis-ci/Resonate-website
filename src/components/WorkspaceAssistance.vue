<script setup>
import PhoneIcon from 'vue-material-design-icons/Phone.vue'
import EmailIcon from 'vue-material-design-icons/Email.vue'
import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue'
</script>

<template>
  <section class="bg-gray-50 py-12 sm:py-16 md:pb-28 md:pt-20">
    <div class="mx-auto max-w-7xl px-4">
      <h2 class="mb-8 text-center">Need Assistance?</h2>

      <div class="grid gap-8 md:grid-cols-3">
        <div class="rounded-lg bg-white p-6 text-center shadow">
          <div class="mx-auto flex items-center justify-center gap-2">
            <PhoneIcon class="mb-2 text-primary" size="36" />
            <h3 class="mb-2 font-semibold text-text">Call Us</h3>
          </div>
          <a class="font-bold text-primary" href="tel:+2348001234567">+234 800 123 4567</a>
        </div>

        <div class="rounded-lg bg-white p-6 text-center shadow">
          <div class="mx-auto flex items-center justify-center gap-2">
            <EmailIcon class="mb-2 text-primary" size="36" />
            <h3 class="mb-2 font-semibold text-text">Email Us</h3>
          </div>
          <a class="font-bold text-primary" href="mailto:support@reboot.org">
            support@reboot.org
          </a>
        </div>

        <div class="rounded-lg bg-white p-6 text-center shadow">
          <div class="mx-auto flex items-center justify-center gap-2">
            <MapMarkerIcon class="mb-2 text-primary" size="36" />
            <h3 class="mb-2 font-semibold text-text">Visit Us</h3>
          </div>
          <p>Reboot Hub, Victoria Island, Lagos</p>
        </div>
      </div>
    </div>
  </section>
</template>
