<script setup>
import { ref, defineAsyncComponent } from 'vue'

// Async load icons to reduce bundle size and improve performance
const FacebookIcon = defineAsyncComponent(() => import('vue-material-design-icons/Facebook.vue'))
const InstagramIcon = defineAsyncComponent(() => import('vue-material-design-icons/Instagram.vue'))
const TwitterIcon = defineAsyncComponent(() => import('vue-material-design-icons/Twitter.vue'))
const LinkedinIcon = defineAsyncComponent(() => import('vue-material-design-icons/Linkedin.vue'))
const MailIcon = defineAsyncComponent(() => import('vue-material-design-icons/Email.vue'))

const email = ref('')
const currentYear = new Date().getFullYear()

const subscribe = (e) => {
  e.preventDefault()
  alert(`Subscribed with ${email.value}`)
}
</script>

<template>
  <div class="hidden md:block relative w-full bg-red-900 -mt-12">
    <svg
      class="w-full absolute -top-12 h-12"
      preserveAspectRatio="none"
      viewBox="0 0 1440 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#111827" />
    </svg>
  </div>

  <footer class="bg-gray-900 text-gray-200">
    <div class="container mx-auto px-4 py-12">
      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        <!-- About / Social -->
        <div>
          <p class="white mb-4">
            Start working with <span class="text-primary-text font-bold">Resonate</span> that can provide everything you need to generate awareness,
            drive traffic, connect.
          </p>
          <div class="flex space-x-3 mt-4">
            <a
              href="#"
              class="text-gray-400 hover:text-primary transition duration-300"
              aria-label="Visit Resonate on Facebook"
            >
              <FacebookIcon class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-primary transition duration-300"
              aria-label="Visit Resonate on Instagram"
            >
              <InstagramIcon class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-primary transition duration-300"
              aria-label="Visit Resonate on Twitter"
            >
              <TwitterIcon class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-primary transition duration-300"
              aria-label="Visit Resonate on LinkedIn"
            >
              <LinkedinIcon class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="white mb-4">Company</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-300 hover:text-primary transition"
                >Home</router-link
              >
            </li>
            <li>
              <router-link to="/about" class="text-gray-300 hover:text-primary transition"
                >About Us</router-link
              >
            </li>
            <li>
              <router-link to="/workspaces" class="text-gray-300 hover:text-primary transition"
                >Workspaces</router-link
              >
            </li>
            <li>
              <router-link to="/community" class="text-gray-300 hover:text-primary transition"
                >Community</router-link
              >
            </li>
            <li>
              <router-link to="/contact" class="text-gray-300 hover:text-primary transition"
                >Contact</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Useful Links -->
        <div>
          <h3 class="white mb-4">Resources</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/community/blog" class="text-gray-300 hover:text-primary transition"
                >Blog</router-link
              >
            </li>
            <li>
              <router-link
                to="/community/events"
                class="text-gray-300 hover:text-primary transition"
                >Events</router-link
              >
            </li>
            <li>
              <router-link
                to="/community/workshops"
                class="text-gray-300 hover:text-primary transition"
                >Workshops</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="white mb-4">Newsletter</h3>
          <p class="white mb-4">Stay updated with our latest news and events.</p>
          <form @submit="subscribe" class="space-y-3">
            <div class="relative flex items-center">
              <MailIcon
                class="absolute top-1/2 left-3 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none"
              />
              <input
                v-model="email"
                type="email"
                placeholder="Your email"
                required
                class="w-full pl-10 pr-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-200 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-primary hover:bg-primary-hover transition text-white py-2 rounded font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="bg-gray-800 py-4">
      <div class="container mx-auto px-4 text-center text-gray-400 text-sm">
        © {{ currentYear }} Resonate. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Optimize critical styles */
footer {
  contain: layout style paint;
}
</style>
