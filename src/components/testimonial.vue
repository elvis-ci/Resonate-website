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
import { ref } from 'vue'

const testimonialData = ref([
  {
    id: 1,
    profile: 'images/client/01.jpg',
    message:
      "Resonate has completely changed how I work. The environment is calm, well-designed, and genuinely inclusive. I don't feel like accessibility was added as an afterthought — it's clearly built into every part of the space.",
    name: 'Thomas Israel',
    designation: 'Virtual Assistant',
  },
  {
    id: 2,
    profile: 'images/client/02.jpg',
    message:
      'As a wheelchair user, ease of access matters a lot to me. From wide doorways and step-free entrances to adjustable desks and clearly marked pathways, everything here just works. The availability of assistive technologies made it easy for me to settle in and stay productive.',
    name: 'Barbara McIntosh',
    designation: 'Product Manager',
  },
  {
    id: 3,
    profile: 'images/client/03.jpg',
    message:
      "What stood out to me at Resonate was the attention to detail. Quiet rooms, good lighting, accessible restrooms, and staff who actually understand inclusive design. It's one of the few coworking spaces where I can focus without unnecessary barriers.",
    name: 'Carl Oliver',
    designation: 'UX Designer',
  },
])
</script>
