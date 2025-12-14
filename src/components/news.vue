<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="news in 3"
      :key="news"
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img :src="`images/news/${news}.jpg`" class="w-full h-48 object-cover" alt="News" />
      <div class="p-6 sm:p-8">
        <p class="text-sm text-primary font-semibold mb-2">Featured News</p>
        <h5 class="text-lg sm:text-xl font-bold text-text mb-3">Lorem Ipsum Dolor Sit Amet</h5>
        <p class="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel luctus nibh.
        </p>
        <RouterLink
          to="/"
          class="text-primary font-semibold hover:text-primary-hover transition-colors"
        >
          Read More →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
