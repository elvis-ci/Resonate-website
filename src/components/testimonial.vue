<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="testimonial in testimonialData"
      :key="testimonial.id"
      class="bg-card-bg rounded-lg shadow-md p-6 sm:p-8"
    >
      <div class="flex items-center mb-6">
        <img
          :src="testimonial.profile"
          class="w-16 h-16 rounded-full object-cover mr-2 self-start"
          :alt="testimonial.name"
          loading="lazy"
        />
        <div>
          <h3 class="">{{ testimonial.name }}</h3>
          <span class="text-md text-primary font-semibold">{{ testimonial.designation }}</span>
        </div>
      </div>
      <p class="">"{{ testimonial.message }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const testimonialData = ref([
  {
    id: 1,
    profile: 'images/coworking/about.webp',
    message:
      "Reboot has completely changed how I work. The environment is calm, well-designed, and genuinely inclusive. I don't feel like accessibility was added as an afterthought — it's clearly built into every part of the space.",
    name: 'Thomas Israel',
    designation: 'Virtual Assistant',
  },
  {
    id: 2,
    profile: 'images/coworking/about.webp',
    message:
      'As a wheelchair user, ease of access matters a lot to me. From wide doorways and step-free entrances to adjustable desks and clearly marked pathways, everything here just works. The availability of assistive technologies made it easy for me to settle in and stay productive.',
    name: 'Barbara McIntosh',
    designation: 'Product Manager',
  },
  {
    id: 3,
    profile: 'images/coworking/about.webp',
    message:
      "What stood out to me at Reboot was the attention to detail. Quiet rooms, good lighting, accessible restrooms, and staff who actually understand inclusive design. It's one of the few coworking spaces where I can focus without unnecessary barriers.",
    name: 'Carl Oliver',
    designation: 'UX Designer',
  },
])
</script>
