<template>
  <main>
    <!-- Hero Section -->
    <section class="py-20 bg-linear-to-b from-primary/10 to-primary/0">
      <div class="container px-4 text-center">
        <h1 class="mb-4">Discover Our Features</h1>
        <p class="max-w-2xl mx-auto mb-8">
          Explore the key features that make Resonate the ideal coworking space for professionals and teams.
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="container px-4">
        <div class="text-center mb-12">
          <h2 class="mb-4">Why Choose Resonate?</h2>
          <p class="max-w-2xl mx-auto">
            Experience a coworking space designed to foster productivity, collaboration, and growth.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="flex flex-col items-center text-center p-6 rounded-lg shadow-sm bg-card-bg hover:shadow-xl transition"
          >
            <!-- <component :is="feature.icon" class="text-primary-text mb-4" :size="40" /> -->
            <h3 class="mb-2">{{ feature.title }}</h3>
            <p class="text-body text-sm">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const features = [
  {
    title: 'Modern Workspaces',
    description: 'Ergonomically designed workstations with high-speed internet and all essential amenities.',
  },
  {    title: 'Reliable Connectivity',
    description: 'Stay connected with our robust Wi-Fi infrastructure, ensuring seamless online experiences.',
  },
  {
    title: 'Refreshment Zones',
    description: 'Enjoy complimentary coffee and snacks in our dedicated refreshment areas to keep you energized.',
  },
  {
    title: 'Secure Environment',
    description: '24/7 security and surveillance to ensure a safe and secure working atmosphere for all members.',
  },
  {
    title: 'Community Events',
    description: 'Engage in regular networking events, workshops, and social gatherings to connect with like-minded professionals.',
  },
  {
    title: 'Flexible Booking',
    description: 'Easily book workspaces and meeting rooms through our user-friendly online platform.',
  },
]
</script>