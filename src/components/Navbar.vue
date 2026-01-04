<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// -----------------------------
// Route configuration
// -----------------------------
const navRoutes = [
  { path: '/', title: 'Home', children: [] },
  {
    path: '/about',
    title: 'About',
    children: [],
  },
  {
    path: '/workspaces',
    title: 'Workspaces',
    children: [
      { path: '/workspaces/General-workspace', title: 'General Workspace' },
      { path: '/workspaces/private-rooms', title: 'Private Rooms' },
      { path: '/workspaces/team-sprint-rooms', title: 'Team Sprint Rooms' },
      { path: '/workspaces/conference-rooms', title: 'Conference Rooms' },
      { path: '/workspaces/seminar-halls', title: 'Seminar Halls' },
    ],
  },
  {
    path: '/community',
    title: 'Events',

    // title: 'Community',
    children: [
      // { path: '/community/events', title: 'Events' },
      // { path: '/community/opportunities', title: 'Opportunities' },
      // { path: '/community/resources', title: 'Resources' },
      // { path: '/community/mentorship', title: 'Mentorship' },
      // { path: '/community/stories', title: 'Stories' },
    ],
  },
  { path: '/contact', title: 'Contact', children: [] },
]

// -----------------------------
// Mobile menu state
// -----------------------------
const isMobileOpen = ref(false)
const mobileSubmenu = ref({})

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const toggleSubmenu = (path) => {
  mobileSubmenu.value[path] = !mobileSubmenu.value[path]
}

const closeMobile = () => {
  isMobileOpen.value = false
}

// -----------------------------
// Scroll-based nav visibility
// -----------------------------
const isNavVisible = ref(true)
const lastScrollY = ref(window.scrollY)

const SCROLL_THRESHOLD = 10 // prevents flicker
const HIDE_AFTER = 80 // keeps nav visible near top

const handleScroll = () => {
  // Do not hide nav when mobile menu is open
  if (isMobileOpen.value) return

  const currentScroll = window.scrollY
  const delta = currentScroll - lastScrollY.value

  // Ignore tiny scroll movements but still update lastScrollY
  if (Math.abs(delta) < SCROLL_THRESHOLD) {
    lastScrollY.value = currentScroll
    return
  }

  // Scroll down → hide nav (after offset)
  if (delta > 0 && currentScroll > HIDE_AFTER) {
    isNavVisible.value = false
  }
  // Scroll up → show nav
  else if (delta < 0) {
    isNavVisible.value = true
  }

  lastScrollY.value = currentScroll
}

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Close mobile menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileOpen.value) {
      closeMobile()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    id="topnav"
    class="fixed top-0 z-1000 w-full backdrop-blur-xs transition-nav bg-gray-900/90"
    :class="{ 'nav-hidden': !isNavVisible }"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <a href="#maincontent" ref="skipLink" class="skip-link text-black bg-secondary"
        >Skip to main content</a
      >

      <!-- Logo -->
      <div class="flex-shrink-0">
        <RouterLink to="/" class="text-xl white font-bold">Resonate</RouterLink>
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden lg:flex space-x-8 flex-1 justify-center">
        <li
          v-for="route in navRoutes"
          :key="route.path"
          class="relative group py-4"
          :class="{ 'has-children': route.children.length }"
        >
          <RouterLink :to="route.path">{{ route.title }}</RouterLink>

          <!-- Dropdown for children -->
          <ul
            v-if="route.children.length"
            class="submenu hidden absolute left-0 mt-4 w-40 border rounded shadow-lg z-10 group-hover:block hover:block group-focus-within:block"
          >
            <li v-for="child in route.children" :key="child.path">
              <RouterLink :to="child.path" class="block px-4 py-2 text-text">
                {{ child.title }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
      <RouterLink to="/bookings" class="primary hidden lg:inline-block"> Bookings</RouterLink>
      <!-- Mobile Toggle -->
      <div class="lg:hidden">
        <button
          type="button"
          @click="toggleMobile"
          class="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <span class="sr-only">Open menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <nav v-if="isMobileOpen" class="lg:hidden absolute w-full bg-gray-900">
        <ul class="pr-4 py-2 space-y-1">
          <li v-for="route in navRoutes" :key="`m-${route.path}`">
            <div class="flex">
              <RouterLink
                :to="route.path"
                @click="closeMobile"
                class="block w-full px-3 py-2 group router-link-active:text-primary"
              >
                {{ route.title }}
              </RouterLink>
              <button
                v-if="route.children.length"
                @click.prevent="toggleSubmenu(route.path)"
                class="w-10"
                aria-label="toggle submenu"
              >
                <span
                  aria-hidden="true"
                  class="inline-block transition-transform duration-200 text-lg text-white"
                  :class="!mobileSubmenu[route.path] ? '' : 'rotate-180'"
                  >▴</span
                >
              </button>
            </div>

            <!-- Mobile children -->
            <transition name="slide-down" class="">
              <ul v-if="mobileSubmenu[route.path]" class="mobile-submenu pl-4 group-hover">
                <li v-for="child in route.children" :key="`m-${child.path}`">
                  <RouterLink
                    :to="child.path"
                    @click="closeMobile"
                    class="block px-3 py-2 router-link-active:text-primary"
                  >
                    {{ child.title }}
                  </RouterLink>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
header {
  font-family: 'Nunito', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: medium;
}

.skip-links {
  list-style: none;
}

.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.skip-link:focus{
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}

/* Transparent state (top of page) - white text */
#topnav nav > ul > li > a,
#topnav nav > ul > li > div > a {
  color: white;
}

#topnav nav > ul > li > a:hover,
#topnav nav > ul > li > a:focus-within,
#topnav nav > ul > li > div > a:hover,
#topnav nav > ul > li > div > a:focus-within {
  color: var(--color-primary-hover);
}

#topnav nav > ul > li > a.router-link-active,
#topnav nav > ul > li > div > a.router-link-active {
  color: var(--color-primary-hover);
  font-weight: bolder;
}

/* Hamburger icon - white */
#topnav button svg {
  color: white;
}

/* Sticky state */
#topnav.nav-sticky nav > ul > li > a:hover,
#topnav.nav-sticky nav > ul > li > a:focus-within,
#topnav.nav-sticky nav > ul > li > div > a:hover,
#topnav.nav-sticky nav > ul > li > div > a:focus-within {
  color: var(--color-primary-hover);
}

#topnav.nav-sticky nav > ul > li > a.router-link-active,
#topnav.nav-sticky nav > ul > li > div > a.router-link-active {
  color: var(--color-primary-hover);
  /* text-shadow:
    -2px -2px 0 black,
    2px -2px 0 black,
    -2px 2px 0 black,
    2px 2px 0 black,
    0 -2px 0 black,
    0 2px 0 black,
    -2px 0 0 black,
    2px 0 0 black; */
}

/* Smooth slide-down for mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 1000px;
  opacity: 1;
}

/* Dropdown styling */
.submenu {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  z-index: 1000;
}
.mobile-submenu {
  font-size: 0.875rem;
  z-index: 1000;
}
.mobile-submenu a {
  color: rgb(215, 214, 214);
}
.has-children > a {
  position: relative;
  padding-right: 1rem;
}

.has-children > a::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(-135deg);
  border: solid currentColor;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.2s;
}

.has-children:hover > a::after,
.has-children:focus-within > a::after {
  transform: translateY(-50%) rotate(45deg);
}

.submenu a {
  color: var(--color-text);
}
.submenu a:hover,
.submenu a:focus {
  color: var(--color-primary);
}
.submenu a.router-link-active {
  color: var(--color-primary);
  font-weight: bold;
}

.communitynav {
  position: relative;
  background: transparent;
  overflow: visible;
}

/* Decorative clipped background */
.communitynav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-alternate);
  /* clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%); */
  z-index: 0;
}

/* Keep nav content above clip */
.communitynav > * {
  position: relative;
  z-index: 1;
}

/* Slide nav on scroll */
.transition-nav {
  transition: transform 0.35s ease-in-out;
}

.nav-hidden {
  transform: translateY(-100%);
}
</style>
