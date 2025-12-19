<script setup>
import { ref } from 'vue'

const events = ref([
  {
    id: 1,
    title: 'Web Development Summit 2025',
    description:
      'Join industry leaders to explore the latest trends in web development, modern frameworks, and best practices for building scalable applications.',
    image: '/images/coworking/about.webp',
    date: 'January 15, 2025',
    time: '9:00 AM - 5:00 PM',
    venue: 'Tech Innovation Center, Downtown',
    sponsors: ['TechCorp', 'DevSolutions', 'CloudBase'],
    speakers: [
      {
        name: 'Ronny Jofra',
        designation: 'Senior Developer',
        image: '/images/client/01.jpg',
        linkedin: 'https://linkedin.com/in/ronny-jofra',
      },
      {
        name: 'Micheal Carlo',
        designation: 'Tech Lead',
        image: '/images/client/04.jpg',
        linkedin: 'https://linkedin.com/in/micheal-carlo',
      },
      {
        name: 'Aliana Rosy',
        designation: 'UX Designer',
        image: '/images/client/02.jpg',
        linkedin: 'https://linkedin.com/in/aliana-rosy',
      },
    ],
  },
  {
    id: 2,
    title: 'Business Networking Breakfast',
    description:
      'Connect with fellow entrepreneurs, professionals, and business owners over breakfast. Perfect for building lasting relationships and exploring collaboration opportunities.',
    image: '/images/coworking/about.webp',
    date: 'January 22, 2025',
    time: '7:30 AM - 10:00 AM',
    venue: 'Grand Ballroom, City Hotel',
    sponsors: ['BusinessHub', 'Entrepreneur Magazine', 'StartupFund'],
    speakers: [
      {
        name: 'Sofia Razaq',
        designation: 'Business Strategist',
        image: '/images/client/03.jpg',
        linkedin: 'https://linkedin.com/in/sofia-razaq',
      },
      {
        name: 'Ronny Jofra',
        designation: 'Entrepreneur',
        image: '/images/client/01.jpg',
        linkedin: 'https://linkedin.com/in/ronny-jofra',
      },
    ],
  },
  {
    id: 3,
    title: 'AI & Machine Learning Workshop',
    description:
      'Hands-on workshop exploring artificial intelligence applications, machine learning models, and practical implementations in real-world business scenarios.',
    image: '/images/coworking/about.webp',
    date: 'February 5, 2025',
    time: '2:00 PM - 6:00 PM',
    venue: 'Innovation Lab, Tech Park',
    sponsors: ['AI Solutions Ltd', 'ML Academy', 'DataSystems'],
    speakers: [
      {
        name: 'Micheal Carlo',
        designation: 'AI Expert',
        image: '/images/client/04.jpg',
        linkedin: 'https://linkedin.com/in/micheal-carlo',
      },
      {
        name: 'Aliana Rosy',
        designation: 'ML Engineer',
        image: '/images/client/02.jpg',
        linkedin: 'https://linkedin.com/in/aliana-rosy',
      },
      {
        name: 'Sofia Razaq',
        designation: 'Data Scientist',
        image: '/images/client/03.jpg',
        linkedin: 'https://linkedin.com/in/sofia-razaq',
      },
    ],
  },
  {
    id: 4,
    title: 'Startup Pitch Competition',
    description:
      'Showcase your innovative business ideas to investors and industry experts. Present your vision and compete for funding and mentorship opportunities.',
    image: '/images/coworking/about.webp',
    date: 'February 20, 2025',
    time: '10:00 AM - 4:00 PM',
    venue: 'Convention Center, Main Auditorium',
    sponsors: ['Venture Capital Fund', 'Innovation Partners', 'Future Investments'],
    speakers: [
      {
        name: 'Ronny Jofra',
        designation: 'Venture Capitalist',
        image: '/images/client/01.jpg',
        linkedin: 'https://linkedin.com/in/ronny-jofra',
      },
      {
        name: 'Micheal Carlo',
        designation: 'Business Mentor',
        image: '/images/client/04.jpg',
        linkedin: 'https://linkedin.com/in/micheal-carlo',
      },
      {
        name: 'Aliana Rosy',
        designation: 'Industry Analyst',
        image: '/images/client/02.jpg',
        linkedin: 'https://linkedin.com/in/aliana-rosy',
      },
      {
        name: 'Sofia Razaq',
        designation: 'Startup Consultant',
        image: '/images/client/03.jpg',
        linkedin: 'https://linkedin.com/in/sofia-razaq',
      },
    ],
  },
])
</script>

<template>
  <div class="overflow-x-hidden">
    
    <!-- HERO -->
    <section
      class="relative min-h-screen flex items-center bg-cover bg-center"
      :style="{
        'background-image': 'url(/images/coworking/about.webp)',
        'background-size': 'cover',
        'background-position': 'center',
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>

      <div class="relative z-10 container mx-auto max-w-7xl px-4 text-center">
        <p class="text-3xl font-bold mb-4 text-white">Upcoming Event</p>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Digital Conference 202021
        </h1>
        <p class=" text-green-400 mb-2">11th October, 2020</p>

        <p class="text-gray-200 max-w-2xl mx-auto mb-8">
          Launch your campaign and benefit from our expertise on designing and managing
          conversion-centered pages.
        </p>

        <!-- COUNTDOWN -->
        <div class="flex flex-wrap justify-center gap-6 mb-10">
          <div
            v-for="(val, label) in { Days: days, Hours: hours, Minutes: minutes, Seconds: seconds }"
            :key="label"
            class="text-white text-center"
          >
            <div class="text-3xl sm:text-4xl font-bold">{{ val }}</div>
            <div class="text-sm mt-1">{{ label }}</div>
          </div>
        </div>

        <button
          @click="navigateTo('community-events')"
          class="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg inline-block font-semibold"
        >
          Register Now
        </button>
      </div>
    </section>

    <!-- EVENTS SECTIONS -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto max-w-7xl px-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="mb-16 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <!-- EVENT HEADER WITH IMAGE -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <!-- IMAGE -->
            <div class="flex items-center justify-center">
              <img
                :src="event.image"
                :alt="event.title"
                class="rounded-lg object-cover w-full h-80 shadow-md"
              />
            </div>

            <!-- EVENT DETAILS -->
            <div class="flex flex-col justify-center">
              <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ event.title }}</h2>
              <p class="text-gray-600 text-lg mb-6">{{ event.description }}</p>

              <!-- DATE & TIME -->
              <div class="mb-4">
                <p class="font-semibold text-gray-700 mb-2">
                  <span class="text-indigo-600">📅 Date:</span> {{ event.date }}
                </p>
                <p class="font-semibold text-gray-700">
                  <span class="text-indigo-600">⏰ Time:</span> {{ event.time }}
                </p>
              </div>

              <!-- VENUE -->
              <div class="mb-6">
                <p class="font-semibold text-gray-700">
                  <span class="text-indigo-600">📍 Venue:</span> {{ event.venue }}
                </p>
              </div>

              <!-- REGISTER BUTTON -->
              <button
                class="w-full bg-[#a05a00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e67e00] transition"
              >
                Register Now
              </button>
            </div>
          </div>

          <!-- SPONSORS & SPEAKERS SECTION -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-8 border-t pt-8">
            <!-- SPONSORS -->
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Sponsors</h3>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="(sponsor, idx) in event.sponsors"
                  :key="idx"
                  class="bg-primary/15 text-primary px-4 py-2 rounded-full font-semibold"
                >
                  {{ sponsor }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-4">Guest Speakers</h3>
              <div class="space-y-3">
                <div
                  v-for="speaker in event.speakers"
                  :key="speaker.name"
                  class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <img
                    :src="speaker.image"
                    :alt="speaker.name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <p class="font-semibold text-gray-800">{{ speaker.name }}</p>
                      <a
                        v-if="speaker.linkedin"
                        :href="speaker.linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-[#a05a00] hover:text-[#e67e00] transition"
                        title="Visit LinkedIn profile"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          />
                        </svg>
                      </a>
                    </div>
                    <p class="text-sm text-gray-600">{{ speaker.designation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="py-16 bg-[#a05a00] text-white">
      <div class="container mx-auto max-w-7xl px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Don't Miss Out!</h2>
        <p class="text-lg mb-8 text-gray-100">
          Register for our events and connect with industry leaders and professionals.
        </p>
        <button
          class="bg-white text-[#a05a00] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          View All Events
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
