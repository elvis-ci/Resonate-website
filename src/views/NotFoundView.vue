<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => router.push('/')
</script>

<template>
  <main class="min-h-screen flex items-center justify-center px-6">
    <section
      class="max-w-xl w-full text-center bg-white rounded-3xl shadow-lg p-10"
    >
      <!-- 404 Number -->
      <h1 class="text-7xl font-extrabold mb-4 text-gray-900">
        404
      </h1>

      <!-- Headline -->
      <h2 class="text-2xl font-semibold mb-3">
        Looks like you took a wrong turn.
      </h2>

      <!-- Copy -->
      <p class="text-gray-600 mb-6 leading-relaxed">
        Even the best teams miss a turn sometimes.
        <br />
        This page wandered off — probably to ask for directions.
      </p>

      <p class="text-gray-600 mb-8 leading-relaxed">
        At our coworking space, getting lost is just another way
        to collaborate, explore, and find something better together.
      </p>

      <!-- Actions -->
      <div class="flex flex-wrap gap-4 justify-center">
        <button
          @click="goHome"
          class="px-6 py-3 rounded-full font-semibold
                 bg-[#a05a00] text-white
                 hover:opacity-90 transition"
        >
          Take Me Home
        </button>

        <RouterLink
          to="/community"
          class="px-6 py-3 rounded-full font-semibold
                 bg-gray-100 text-gray-700
                 hover:bg-gray-200 transition"
        >
          Ask the Community
        </RouterLink>
      </div>

      <!-- Footer Humor -->
      <p class="mt-10 text-sm text-gray-500 italic">
        Pro tip: asking for directions is a productivity skill.
      </p>
    </section>
  </main>
</template>

<style scoped>
/* Optional subtle confidence touch */
h1 {
  letter-spacing: 2px;
}
</style>
