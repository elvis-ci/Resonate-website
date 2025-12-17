<script setup>
import { ref } from 'vue'

const plans = ref([
  {
    name: 'Member',
    price: 19,
    period: 'mo',
    description: 'Perfect for flexible access to a professional coworking environment.',
    cta: 'Buy Now',
    featured: false,
    icon: '/images/icon/lightbulb.svg',
  },
  {
    name: 'Desk',
    price: 39,
    period: 'mo',
    description: 'A dedicated desk in a shared space designed for daily productivity.',
    cta: 'Get Started',
    featured: true,
    icon: '/images/icon/table.svg',
  },
  {
    name: 'Dedicated',
    price: 49,
    period: 'mo',
    description: 'Your own reserved workspace with added privacy and consistency.',
    cta: 'Get Started',
    featured: false,
    icon: '/images/icon/star.svg',
  },
  {
    name: 'Office',
    price: 59,
    period: 'mo',
    description: 'A private office ideal for teams and focused work sessions.',
    cta: 'Try It Now',
    featured: false,
    icon: '/images/icon/start-up.svg',
  },
])
</script>

<template>
  <section>
    <div class="container mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl font-semibold mb-4">Choose the Right Plan for You</h2>
        <p class="text-gray-500">
          Flexible and affordable pricing at
          <span class="text-primary font-bold">Resonate</span>, designed to support how you work.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="relative flex flex-col h-full box-border rounded-lg shadow-sm text-center p-8 border transition-all duration-300 motion-safe:hover:-translate-y-1"
          :class="
            plan.featured
              ? 'bg-white border-primary  hover:shadow-lg'
              : 'bg-gray-50 border-gray-200 hover:shadow-lg'
          "
        >
          <div v-if="plan.featured" class="ribbon">
            <span aria-label="Best plan">Best</span>
          </div>

          <img
            :src="plan.icon"
            :alt="`${plan.name} plan icon`"
            class="mx-auto mb-4 h-12"
            loading="lazy"
            width="48"
            height="48"
          />

          <h3 class="text-lg uppercase tracking-wide font-bold text-text mb-4">
            {{ plan.name }}
          </h3>

          <div class="flex justify-center items-end mb-4">
            <span class="text-xl mt-1">$</span>
            <span class="text-5xl font-bold mx-1">
              {{ plan.price }}
            </span>
            <span class="text-xl mb-1"> /{{ plan.period }} </span>
          </div>

          <p class="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
            {{ plan.description }}
          </p>

          <a
            href="javascript:void(0)"
            class="inline-block px-6 py-2 text-sm font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors mt-auto"
          >
            {{ plan.cta }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  contain: layout style paint;
}
</style>
