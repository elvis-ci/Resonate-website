<template>
  <div class="overflow-x-hidden">
    <!-- COMING SOON BANNER -->
    <section class="py-24 bg-gradient-to-r from-[#a05a00] to-[#1a1f2e] text-white">
      <div class="container mx-auto max-w-7xl px-4 text-center">
        <div class="mb-6">
          <svg
            class="w-20 h-20 mx-auto text-white/80 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m0 0h6m-6 0V0m0 0V-6"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Coming Soon</h1>
        <p class="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto mb-8">
          Our blog is currently being prepared with insightful articles, industry updates, and
          expert perspectives. Stay tuned!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="$router.push({ name: 'community-events' })"
            class="bg-white text-[#a05a00] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Events
          </button>
          <button
            @click="$router.push({ name: 'community-networking' })"
            class="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/40"
          >
            Join Networking
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
