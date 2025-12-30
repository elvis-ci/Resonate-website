<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// 🔹 Countdown values
const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

let timer = null

// 🔹 Set your event date (match the HERO content)
const eventDate = new Date('March 11, 2026 00:00:00').getTime()

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = eventDate - now

  if (distance <= 0) {
    days.value = hours.value = minutes.value = seconds.value = '00'
    clearInterval(timer)
    return
  }

  days.value = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0')
  hours.value = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(
    2,
    '0',
  )
  minutes.value = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
  seconds.value = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- HERO -->
    <div class="overflow-x-hidden">
      <!-- HERO -->
      <section
        class="relative min-h-screen flex items-center bg-cover bg-center"
        :style="{
          backgroundImage: 'url(/images/coworking/about.webp)',
        }"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60"></div>

        <!-- Content -->
        <div class="relative z-10 container px-4 text-center">
          <p class="white bold">Upcoming Event</p>

          <h1 class="main-heading text-white mb-4">Digital Conference 2025</h1>

          <p class="white mb-2 font-bold">11th October, 2025</p>

          <p class="white max-w-2xl mx-auto mb-8">
            Launch your campaign and benefit from our expertise on designing and managing
            conversion-centered pages.
          </p>

          <!-- COUNTDOWN -->
          <div class="flex flex-wrap justify-center gap-6 mb-10">
            <div class="text-white text-center">
              <div class="text-3xl sm:text-4xl font-bold">{{ days }}</div>
              <div class="text-sm mt-1">Days</div>
            </div>

            <div class="text-white text-center">
              <div class="text-3xl sm:text-4xl font-bold">{{ hours }}</div>
              <div class="text-sm mt-1">Hours</div>
            </div>

            <div class="text-white text-center">
              <div class="text-3xl sm:text-4xl font-bold">{{ minutes }}</div>
              <div class="text-sm mt-1">Minutes</div>
            </div>

            <div class="text-white text-center">
              <div class="text-3xl sm:text-4xl font-bold">{{ seconds }}</div>
              <div class="text-sm mt-1">Seconds</div>
            </div>
          </div>

          <!-- CTA -->
          <button @click="navigateTo('community-events')" class="primary tracking-wider font-bold">
            Register Now
          </button>
        </div>
      </section>
    </div>
    <!-- EVENTS SECTIONS -->
    <section class="bg-alt-bg">
      <div class="container mx-auto max-w-7xl px-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="mb-16 rounded-lg shadow-lg overflow-hidden"
        >
          <!-- EVENT HEADER WITH IMAGE -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <!-- IMAGE -->
            <div class="flex items-start justify-center">
              <img
                :src="event.image"
                :alt="event.title"
                class="rounded-lg object-cover w-full h-80 shadow-md"
              />
            </div>

            <!-- EVENT DETAILS -->
            <div class="flex flex-col justify-center">
              <h2 class="text-heading mb-4">{{ event.title }}</h2>
              <p class="mb-6">{{ event.description }}</p>

              <!-- DATE & TIME -->
              <div class="mb-4">
                <p class="mb-2"><span class="text-primary-text">📅 Date:</span> {{ event.date }}</p>
                <p class=""><span class="text-primary-text">⏰ Time:</span> {{ event.time }}</p>
              </div>

              <!-- VENUE -->
              <div class="mb-6">
                <p class=""><span class="text-primary-text">📍 Venue:</span> {{ event.venue }}</p>
              </div>

              <!-- REGISTER BUTTON -->
              <button class="w-full primary">Register Now</button>
            </div>
          </div>

          <!-- SPONSORS & SPEAKERS SECTION -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-8 border-t pt-8">
            <!-- SPONSORS -->
            <div>
              <h3 class="mb-4">Sponsors</h3>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="(sponsor, idx) in event.sponsors"
                  :key="idx"
                  class="bg-primary/15 text-primary-text px-4 py-2 rounded-full font-semibold"
                >
                  {{ sponsor }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="mb-4">Guest Speakers</h3>
              <div class="space-y-1 flex flex-wrap gap-2">
                <div
                  v-for="speaker in event.speakers"
                  :key="speaker.name"
                  class="w-fit flex items-center min-w-fit gap-3 p-2 bg-card-bg2 rounded-lg hover:bg-card-bg2/70 transition"
                >
                  <img
                    :src="speaker.image"
                    :alt="speaker.name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <p class="font-semibold text-body">{{ speaker.name }}</p>
                      <a
                        v-if="speaker.linkedin"
                        :href="speaker.linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary-text hover:text-primary transition"
                        title="Visit LinkedIn profile"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          />
                        </svg>
                      </a>
                    </div>
                    <span class="text-body text-sm">{{ speaker.designation }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="py-12 sm:py-16 md:py-28 bg-linear-to-b from-alt-bg to-primary/30">
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
