<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import WifiIcon from 'vue-material-design-icons/Wifi.vue'
import PrinterIcon from 'vue-material-design-icons/Printer.vue'
import SilverwareForkKnifeIcon from 'vue-material-design-icons/SilverwareForkKnife.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import EmailOutlineIcon from 'vue-material-design-icons/EmailOutline.vue'
import CalendarMonthOutlineIcon from 'vue-material-design-icons/CalendarMonthOutline.vue'
import AccountGroupOutlineIcon from 'vue-material-design-icons/AccountGroupOutline.vue'
import CoffeeOutlineIcon from 'vue-material-design-icons/CoffeeOutline.vue'
import PlayIcon from 'vue-material-design-icons/Play.vue'
import videoModal from '@/components/videoModal.vue'
import { getLocationsPerWorkspace } from '@/services/locationsService'
import { workspaceTypeMap } from '@/utils/workspaceTypeMap'

import Testimonial from '@/components/testimonial.vue'
const News = defineAsyncComponent(() => import('@/components/news.vue'))
const Plans = defineAsyncComponent(() => import('@/components/plans.vue'))

const showModal = ref(false)

const spaceOptions = [
  {
    name: 'Shared Workspace',
    image: '/images/coworking/shared_workspace 2.png',
    route: '/workspaces/shared-workspace',
  },
  {
    name: 'Private Office Suite',
    image: '/images/coworking/private_office 3.png',
    route: '/workspaces/private-office-suites',
  },
  {
    name: 'Team Collaboration Room',
    image: '/images/coworking/team_room 2.png',
    route: '/workspaces/team-collaboration-rooms',
  },
  {
    name: 'Executive Conference Room',
    image: '/images/coworking/executive 1.png',
    route: '/workspaces/executive-conference-rooms',
  },
  {
    name: 'Event & Seminar Hall',
    image: '/images/coworking/seminar 1.png',
    route: '/workspaces/event-seminar-halls',
  },
]

const availableSpaces = ref(
  spaceOptions.map((space) => ({ ...space, locations: [], status: 'loading' })),
)

async function loadAvailableSpaces() {
  availableSpaces.value = await Promise.all(
    spaceOptions.map(async (space) => {
      try {
        const response = await getLocationsPerWorkspace(workspaceTypeMap[space.name])
        const rows = response?.data ?? response

        if (!Array.isArray(rows)) throw new Error('Invalid locations response')

        const locations = [
          ...new Set(
            rows.map((row) => [row.location, row.city].filter(Boolean).join(', ')).filter(Boolean),
          ),
        ]

        return { ...space, locations, status: locations.length ? 'ready' : 'empty' }
      } catch {
        return { ...space, locations: [], status: 'error' }
      }
    }),
  )
}

const services = [
  {
    name: 'Fast Internet',
    icon: WifiIcon,
  },
  {
    name: 'Printer & Fax',
    icon: PrinterIcon,
  },
  {
    name: 'Modern Kitchen',
    icon: SilverwareForkKnifeIcon,
  },
  {
    name: '24 Hour Access',
    icon: ClockOutlineIcon,
  },
  {
    name: 'Mail Service',
    icon: EmailOutlineIcon,
  },
  {
    name: 'Event Space',
    icon: CalendarMonthOutlineIcon,
  },
  {
    name: 'Conference Rooms',
    icon: AccountGroupOutlineIcon,
  },
  {
    name: 'Tea & Coffee',
    icon: CoffeeOutlineIcon,
  },
]

onMounted(loadAvailableSpaces)
</script>

<template>
  <main id="maincontent">
    <!-- Hero Start -->
    <section class="hero premium-hero">
      <div class="hero-backdrop flex">
        <div class="hero-overlay"></div>

        <div class="container relative z-10 flex min-h-[680px] items-center py-20 lg:py-24">
          <div class="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="text-white text-left">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.24em] uppercase text-white/80 backdrop-blur-sm"
              >
                <span class="h-2 w-2 rounded-full bg-secondary"></span>
                Premium workspace
              </div>

              <h1 class="main-heading mt-6 max-w-xl leading-[0.95] tracking-[-0.04em] text-white">
                Boost Productivity in Comfort & Privacy
              </h1>

              <p class="white mt-5 max-w-xl text-base md:text-lg text-white/80">
                Discover a coworking space designed to keep you focused, creative, and connected.
                Enjoy flexible offices, accessible facilities, and a vibrant community all at an
                affordable price.
              </p>

              <div class="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <RouterLink to="/workspaces/categories-workspace" class="primary premium-btn">
                  Book a space
                </RouterLink>
                <RouterLink to="/contact" class="secondary premium-btn secondary-btn">
                  Contact Us
                </RouterLink>
              </div>

              <div class="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
                <div>
                  <span class="block text-2xl font-bold text-white">24/7</span>
                  <span>Access</span>
                </div>
                <div>
                  <span class="block text-2xl font-bold text-white">5k+</span>
                  <span>Members</span>
                </div>
                <div>
                  <span class="block text-2xl font-bold text-white">4.9/5</span>
                  <span>Rating</span>
                </div>
              </div>
            </div>

            <div class="relative flex justify-center lg:justify-end">
              <div class="hero-card">
                <div class="hero-card-header">
                  <span class="hero-card-badge">Available now</span>
                  <span class="hero-card-price">From ₦3,000/hr</span>
                </div>

                <div class="hero-card-image-wrap">
                  <img src="/images/coworking/community.jpeg" alt="Reboot workspace" />
                </div>

                <div class="hero-card-meta">
                  <div>
                    <p class="meta-label">Workspace</p>
                    <p class="meta-value">Private Office</p>
                  </div>
                  <div>
                    <p class="meta-label">Capacity</p>
                    <p class="meta-value">1–12 people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero End -->

    <!-- Available spaces and locations -->
    <section class="availability-section bg-alt-bbg">
      <div class="container">
        <div class="availability-heading">
          <div>
            <span class="availability-eyebrow">Space to do your best work</span>
            <h2>Explore spaces and locations</h2>
            <p>Choose a workspace type and see where it is currently available.</p>
          </div>
          <RouterLink to="/workspaces/categories-workspace" class="secondary availability-link">
            Browse all spaces
          </RouterLink>
        </div>

        <div class="availability-grid">
          <article v-for="space in availableSpaces" :key="space.name" class="availability-card">
            <RouterLink :to="space.route" class="availability-image">
              <img :src="space.image" :alt="space.name" loading="lazy" />
            </RouterLink>
            <div class="availability-card-content flex flex-col justify-between">
              <div class="availability-card-title mb-2">
                <h3 class="">{{ space.name }}</h3>
                <span v-if="space.status === 'ready'" class="availability-count">
                  {{ space.locations.length }}
                  {{ space.locations.length === 1 ? 'location' : 'locations' }}
                </span>
              </div>

              <div v-if="space.status === 'loading'" class="availability-state" aria-live="polite">
                Loading locations…
              </div>
              <ul v-else-if="space.status === 'ready'" class="availability-locations">
                <li v-for="location in space.locations" :key="location" class="bg-primary/10">
                  {{ location }}
                </li>
              </ul>
              <p v-else class="availability-state">
                {{
                  space.status === 'empty'
                    ? 'No locations currently listed.'
                    : 'Availability could not be loaded.'
                }}
              </p>

              <RouterLink
                :to="space.route"
                class="availability-details flex mt-auto hover:border hover:rounded-lg px-2"
              >
                View space details <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- services -->
    <section class="home-services bg-alt-bg">
      <div class="container">
        <div class="home-section-heading">
          <span class="home-eyebrow">Everything you need</span>
          <h2>Your Comfort Is Our Priority</h2>
          <p>
            Build your best workday at
            <span class="text-primary-text font-bold">Reboot</span> — a coworking space thoughtfully
            designed for comfort, focus, and connection.
          </p>
        </div>

        <div class="service-grid">
          <div v-for="(service, index) in services" :key="index" class="service-card">
            <div class="service-icon">
              <component :is="service.icon" class="text-primary" :size="40" />
            </div>
            <p>
              {{ service.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- pricing -->
    <!-- <Suspense>
      <template #default>
        <Plans class="home-pricing bg-alt-bg" />
      </template>
      <template #fallback>
        <div class="home-pricing-fallback bg-alt-bg">
          <div class="container flex min-h-64 items-center justify-center">
            <p class="tight">Loading plans…</p>
          </div>
        </div>
      </template>
    </Suspense> -->

    <!-- about -->
    <section class="home-community">
      <div class="container">
        <div class="community-layout">
          <img
            src="/images/coworking/community.jpeg"
            class="community-image"
            alt="Members working together in the Reboot coworking community"
            loading="lazy"
            width="800"
            height="600"
          />

          <div class="community-copy">
            <span class="home-eyebrow">Work, connect, grow</span>
            <h2>The Reboot Community</h2>
            <p>
              Start working with
              <span class="text-primary-text font-bold">Reboot</span>, a coworking community
              designed to help ideas grow and people thrive. Whether you need a quiet space to focus
              or a collaborative environment to connect, Reboot offers flexible, accessible
              workspaces that support productivity—without the premium price tag.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Testimonials -->
    <section class="home-testimonials bg-alt-bbg">
      <div class="container">
        <div class="home-section-heading">
          <span class="home-eyebrow">Member stories</span>
          <h2>What Our Coworkers Have to Say</h2>
          <p>
            Start working with
            <span class="text-primary-text font-bold">Reboot</span>
          </p>
        </div>
        <Testimonial />
      </div>
    </section>

    <!-- Blog -->
    <section class="home-news">
      <div class="container">
        <div class="home-section-heading">
          <span class="home-eyebrow">From our community</span>
          <h2>Latest News & Events</h2>
          <p class="max-w-2xl md:mx-auto">
            Catch up on what’s happening in our community, from news updates to featured events.
          </p>
        </div>
        <Suspense>
          <template #default>
            <News />
          </template>
          <template #fallback>
            <div class="h-96"></div>
          </template>
        </Suspense>
      </div>
    </section>

    <!-- Partners -->
    <!-- <section class="py-12 sm:py-16 md:py-28 bg-alt-bg text-text">
      <div>
        <h2 class="text-center mb-6 text-2xl sm:text-3xl font-bold">
          Trusted by over 100+ companies NationWide
        </h2>
        <div class="overflow-hidden">
          <div class="flex space-x-12 justify-center">
            <div v-for="logo in 4" :key="'logo1-' + logo" class="flex-shrink-0">
              <img
                src="/images/coworking/about.webp"
                class="h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 object-contain"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Start Form -->
    <section
      class="home-cta text-center"
      style="background: url('/images/coworking/bg01.webp') center center / cover no-repeat"
    >
      <div class="home-cta-overlay"></div>

      <div class="container relative z-10">
        <div class="home-cta-content">
          <div class="text-white">
            <span class="home-eyebrow home-eyebrow-light">A better workday starts here</span>
            <h2 class="white">We are Built for Business – Explore Us Today!</h2>
            <p class="white mb-6">
              Start working with
              <span class="text-secondary font-bold">Reboot</span> that can provide everything you
              need to generate awareness, drive traffic, connect.
            </p>

            <div class="flex justify-center items-center gap-4">
              <!-- <button
                class="primary transition"
              >
                Install Now
              </button> -->

              <button
                aria-label="Play Video of Reboot Coworking Space"
                @click="showModal = true"
                class="bg-white text-primary flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-200 transition"
              >
                <PlayIcon class="w-6 h-6" />
              </button>
              <span class="uppercase text-sm font-bold">Watch Now</span>
            </div>

            <div
              v-if="showModal"
              @keyup="closeModalOnEscape"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            >
              <videoModal @close="showModal = !showModal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
p {
  padding-inline: 0px;
}

.home-section-heading {
  max-width: 44rem;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.home-section-heading h2 {
  margin: 0.4rem 0 0.65rem;
}

.home-section-heading p {
  margin: 0 auto;
  color: var(--color-muted);
}

.home-eyebrow {
  color: var(--color-primary-text);
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.service-card {
  display: flex;
  min-height: 10rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
  background: var(--color-card-bg);
  box-shadow: var(--shadow-elev);
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
}

.service-icon {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.service-card p {
  margin: 0;
  color: var(--color-heading);
  font-weight: 700;
}

.home-pricing,
.home-pricing-fallback {
  background-color: var(--color-alt-bg);
}

.home-community {
  background: var(--color-bg);
}

.community-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
}

.community-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: var(--shadow-elev);
}

.community-copy h2 {
  margin: 0.4rem 0 0.75rem;
}

.community-copy {
  text-align: start;
}

.community-copy p {
  max-width: 38rem;
  margin: 0 auto;
  color: var(--color-body);
}

.home-testimonials {
  background: var(--color-alt-bbg);
}

.home-news {
  background: var(--color-bg);
}

.home-testimonials :deep(.grid > div),
.home-news :deep(.grid > div) {
  height: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
  box-shadow: var(--shadow-elev);
}

.home-news :deep(.grid > div) {
  background: var(--color-card-bg);
}

.home-cta {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.home-cta-overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: rgba(15, 23, 42, 0.72);
}

.home-cta-content {
  max-width: 48rem;
  margin-inline: auto;
}

.home-cta-content h2 {
  margin: 0.6rem 0 0.75rem;
}

.home-cta-content p {
  max-width: 42rem;
  margin: 0 auto 1.5rem;
}

.home-eyebrow-light {
  color: #f4c58a;
}

.availability-heading {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.availability-heading h2 {
  margin: 0.35rem 0 0.5rem;
}

.availability-heading p {
  margin: 0;
  color: var(--color-muted);
}

.availability-eyebrow {
  color: var(--color-primary-text);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.availability-link {
  flex: 0 0 auto;
}

.availability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.availability-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.9rem;
  background: var(--color-card-bg);
  box-shadow: var(--shadow-elev);
}

.availability-image {
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--color-card-bg2);
}

.availability-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.availability-image:hover img {
  transform: scale(1.035);
}

.availability-card-content {
  padding: 1.1rem;
}

.availability-card-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.availability-card-title h3 {
  margin: 0;
  font-size: 1.05rem;
}

.availability-count {
  flex: 0 0 auto;
  color: var(--color-muted);
  font-size: 0.75rem;
}

.availability-label {
  margin: 1rem 0 0.45rem;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.availability-locations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.availability-locations li {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-body);
  font-size: 0.78rem;
}

.availability-state {
  min-height: 1.75rem;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.85rem;
}

.availability-details {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  color: var(--color-primary-text);
  font-size: 0.85rem;
  font-weight: 800;
}

.availability-details span {
  transition: transform 0.2s ease;
}

.availability-details:hover span {
  transform: translateX(3px);
}

.premium-hero {
  position: relative;
  overflow: hidden;
  background: #0f172a;
}

.hero-backdrop {
  position: relative;
  min-height: 100vh;
  background-color: rgba(17, 24, 39, 0.9);
  background-image: url('/images/coworking/bg01.webp');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.6);
}

.premium-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 0.95rem 1.5rem;
  border-radius: 9999px;
  font-weight: 700;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.premium-btn:hover {
  transform: translateY(-2px);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
}

.hero-card {
  position: relative;
  width: min(100%, 420px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(14, 21, 34, 0.72);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.45);
  padding: 1rem;
}

.hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.hero-card-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  background: rgba(45, 212, 191, 0.12);
  border: 1px solid rgba(45, 212, 191, 0.3);
  color: #b7ffef;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-card-price {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.hero-card-image-wrap {
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #111827;
}

.hero-card-image-wrap img {
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.hero-card-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding-top: 1rem;
}

.meta-label {
  margin: 0 0 0.25rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.6);
}

.meta-value {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 15s linear infinite;
}

@media (max-width: 767px) {
  .availability-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-backdrop {
    min-height: 620px;
  }

  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .community-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero-card {
    margin-top: 1.5rem;
  }

  .premium-btn {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .availability-grid {
    grid-template-columns: 1fr;
  }

  .service-grid {
    gap: 0.75rem;
  }

  .service-card {
    min-height: 8.5rem;
    padding: 1rem 0.65rem;
  }
}
</style>
