<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="testimonial in testimonialData"
      :key="testimonial.id"
      class="bg-white rounded-lg shadow-md p-6 sm:p-8"
    >
      <div class="flex items-center mb-6">
        <img
          :src="testimonial.profile"
          class="w-16 h-16 rounded-full object-cover mr-4"
          :alt="testimonial.name"
        />
        <div>
          <h6 class="text-lg font-semibold text-text">{{ testimonial.name }}</h6>
          <p class="text-sm text-gray-500">{{ testimonial.designation }}</p>
        </div>
      </div>
      <p class="text-gray-600 italic">"{{ testimonial.message }}"</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  testimonialData: {
    type: Array,
    required: true,
  },
})
</script>
