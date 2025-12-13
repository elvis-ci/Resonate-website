<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// Route configuration
const navRoutes = [
  { path: '/', title: 'Home', children: [] },
  {
    path: '/about',
    title: 'About',
    children: [
      { path: '/about-#our-story', title: 'Our Story' },
      { path: '/about-#mission-vision', title: 'Mission & Vision' },
      { path: '/about-#team', title: 'Team' },
      { path: '/about-#testimonials', title: 'Testimonials' },
    ],
  },
  { path: '/workspaces', title: 'Workspaces', children: [] },
  {
    path: '/community',
    title: 'Community',
    children: [
      { path: '/community/blog', title: 'Blog' },
      { path: '/community/events', title: 'Events' },
      { path: '/community/workshops', title: 'Workshops' },
      { path: '/community/networking', title: 'Networking' },
    ],
  },
  { path: '/contact', title: 'Contact', children: [] },
]
function onwindowScroll() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById('topnav').classList.add('nav-sticky')
  } else {
    document.getElementById('topnav').classList.remove('nav-sticky')
  }

  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById('back-to-top').style.display = 'inline'
  } else {
    document.getElementById('back-to-top').style.display = 'none'
  }
}

window.onscroll = function () {
  onwindowScroll()
}

// Mobile menu state
const isMobileOpen = ref(false)
const toggleMobile = () => (isMobileOpen.value = !isMobileOpen.value)
const closeMobile = () => (isMobileOpen.value = false)

// Close mobile menu on Escape key
const onKey = (e) => {
  if (e.key === 'Escape' && isMobileOpen.value) closeMobile()
}
onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <header id="topnav" class="bg-white shadow">
    <a href="#maincontent" ref="skipLink" class="skip-link">Skip to main content</a>
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <RouterLink to="/" class="text-xl font-bold">Resonate</RouterLink>
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden lg:flex space-x-8 flex-1 justify-center">
        <li v-for="route in navRoutes" :key="route.path" class="relative group">
          <RouterLink :to="route.path" class="">
            {{ route.title }}
          </RouterLink>

          <!-- Dropdown for children -->
          <ul
            v-if="route.children.length"
            class="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          >
            <li v-for="child in route.children" :key="child.path">
              <RouterLink :to="child.path" class="block px-4 py-2 text-text">
                {{ child.title }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Mobile Toggle -->
      <div class="lg:hidden">
        <button
          type="button"
          @click="toggleMobile"
          class="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <span class="sr-only">Open menu</span>
          <!-- Hamburger icon -->
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
      <div v-if="isMobileOpen" class="lg:hidden bg-white border-t">
        <ul class="px-4 py-2 space-y-1">
          <li v-for="route in navRoutes" :key="`m-${route.path}`">
            <RouterLink :to="route.path" @click="closeMobile" class="block px-3 py-2 rounded group">
              {{ route.title }}
            </RouterLink>

            <!-- Mobile children -->
            <ul v-if="route.children.length" class="pl-4 group-hover">
              <li v-for="child in route.children" :key="`m-${child.path}`">
                <RouterLink
                  :to="child.path"
                  @click="closeMobile"
                  class="block px-3 py-2 rounded hover:bg-gray-100"
                >
                  {{ child.title }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style>
.skip-links {
  list-style: none;
}
.skip-link {
  position: absolute;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
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
</style>
