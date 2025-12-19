<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const start = ref('')
const end = ref('')
const interval = ref('')
const days = ref('')
const minutes = ref('')
const hours = ref('')
const seconds = ref('')

const starttime = 'October 11, 2021 15:37:25'
const endtime = 'Dec 31, 2021 16:37:25'

const modules = []

const communityTabs = [
  { name: 'Events', route: 'community-events' },
  { name: 'Blog', route: 'community-blog' },
  { name: 'Workshops', route: 'community-workshops' },
  { name: 'Networking', route: 'community-networking' },
]

const activeTab = computed(() => {
  return route.name
})

const navigateTo = (routeName) => {
  router.push({ name: routeName })
}

const calcTime = (dist) => {
  days.value = Math.floor(dist / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((dist % (1000 * 60)) / 1000)
}

const timerCount = (startTime, endTime) => {
  const now = Date.now()
  const distance = startTime - now
  const passTime = endTime - now

  if (distance < 0 && passTime < 0) clearInterval(interval.value)
  else if (distance < 0 && passTime > 0) calcTime(passTime)
  else if (distance > 0 && passTime > 0) calcTime(distance)
}

onMounted(() => {
  start.value = new Date(starttime).getTime()
  end.value = new Date(endtime).getTime()
  timerCount(start.value, end.value)
  interval.value = setInterval(() => {
    timerCount(start.value, end.value)
  }, 1000)

  
})

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>

<template>
  <main id="maincontent">
    <div class="relative overflow-x-hidden">
      <!-- COMMUNITY NAVIGATION -->
      <section
        class="communitynav top-16 py-2 px-8 rounded-b-full w-fit left-1/2 -translate-x-1/2 absolute z-200 bg-white"
      >
        <div class="flex justify-center gap-4 flex-wrap">
          <button
            v-for="tab in communityTabs"
            :key="tab.route"
            @click="navigateTo(tab.route)"
            :class="[
              'px-6 py-2 rounded-full font-semibold transition',
              activeTab === tab.route
                ? 'bg-[#a05a00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
        <!-- <div class="hidden md:block relative w-full bg-red-900 -mt-12">
        <svg
          class="w-full absolute bg-red-500 -top-20 h-12"
          preserveAspectRatio="none"
          viewBox="0 0 1440 100"
          fill="#111827"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#ffff" />
        </svg>
      </div> -->
      </section>

      <!-- ROUTER VIEW FOR CHILD ROUTES -->
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.communitynav {
  clip-path: polygon(
    0 0,
    /* top-left (normal) */ 100% 0,
    /* top-right (normal) */ 95% 100%,
    /* bottom-right inward */ 5% 100% /* bottom-left inward */
  );
}
</style>
