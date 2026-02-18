<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="article in newsArticles"
      :key="article.id"
      class="bg-card-bg2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        :src="article.image"
        class="w-full h-48 object-cover"
        role="presentation"
        alt=""
        loading="lazy"
        width="400"
        height="200"
      />
      <div class="py-6 px-2 sm:py-8 sm:px-4">
        <span class="text-lg text-primary font-semibold">{{ article.category }}</span>
        <h3 class="my-3">{{ article.title }}</h3>
        <p class="mb-4">
          {{ article.excerpt }}
        </p>
        <RouterLink

          to="community/events"
          class="text-primary-text font-semibold hover:text-primary-hover transition-colors"
        >
          Read More →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const newsArticles = ref([
  {
    id: 1,
    title: 'New Accessibility Features Launch at Resonate',
    excerpt:
      'We are excited to announce the launch of our enhanced accessibility features designed to make coworking more inclusive for everyone.',
    category: 'Announcements',
    image: '/images/coworking/about.webp',
    link: '/',
  },
  {
    id: 2,
    title: 'Community Spotlight: Success Stories from Our Members',
    excerpt:
      'Meet the inspiring entrepreneurs and professionals who have built thriving businesses from their workspace at Resonate.',
    category: 'Community',
    image: '/images/coworking/about.webp',
    link: '/',
  },
  {
    id: 3,
    title: 'Upcoming Networking Event: Connect & Collaborate',
    excerpt:
      'Join us for our monthly networking mixer where you can connect with fellow coworkers and explore new collaboration opportunities.',
    category: 'Events',
    image: '/images/coworking/about.webp',
    link: '/',
  },
])
</script>

<style scoped>
p {
  padding-inline: 0px;
}
</style>
