<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap gap-6 justify-center">
      <div v-for="member in teamData" :key="member.name" class="w-full md:w-1/2 lg:w-1/4">
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 text-center"
        >
          <div class="relative overflow-hidden h-64">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <h5 class="text-xl font-bold text-gray-800 mb-1">{{ member.name }}</h5>
            <p class="text-gray-600 text-sm">{{ member.designation }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  teamData: {
    type: Array,
    required: true,
    validator: (arr) => {
      return arr.every((item) => item.image && item.name && item.designation)
    },
  },
})
</script>

<style scoped>
/* Smooth transitions */
.hover\:scale-110:hover {
  transform: scale(1.1);
}
</style>
