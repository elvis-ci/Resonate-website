<script setup>
import { ref, toRef, watch } from 'vue'
import { fetchAvailableLocations } from '@/services/locationsService.js'

const props = defineProps({
  workspaceType: {
    type: String,
    required: true,
  },
})

const isLoading = ref(false)
const availbaleLocations = ref([])
const selectedWorkspaceType = toRef(props, 'workspaceType')
const emit = defineEmits(['close'])

// Watch workspace type and fetch locations
watch(
  () => props.workspaceType,
  async (type) => {
    if (!type) return

    const dbType = type.replace(/\s+/g, '_').toLowerCase() // "Shared Workspace" → "shared_workspace"
    isLoading.value = true
    try {
      const result = await fetchAvailableLocations(dbType)
      availbaleLocations.value = result
    } catch (err) {
      console.error(err)
      availbaleLocations.value = []
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="relative max-w-4xl mx-auto bg-bg rounded-lg shadow-lg p-8 border-2 border-primary/20">
    <button
      @click="emit('close')"
      class="absolute top-4 right-4 text-heading font-bold hover:text-primary/70"
    >
      X
    </button>

    <h2 class="mb-8">
      Booking Form <span class="text-primary">({{ selectedWorkspaceType }})</span>
    </h2>

    <!-- Skeleton Loader -->
    <div v-if="isLoading" class="space-y-6 animate-pulse">
      <div class="h-10 bg-gray-200 rounded w-1/3"></div> <!-- Select type -->
      <div class="h-10 bg-gray-200 rounded w-full"></div> <!-- Location -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="h-10 bg-gray-200 rounded w-full"></div> <!-- Date -->
        <div class="h-10 bg-gray-200 rounded w-full"></div> <!-- Time -->
      </div>
      <div class="h-10 bg-gray-200 rounded w-full"></div> <!-- Full Name -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="h-10 bg-gray-200 rounded w-full"></div> <!-- Phone -->
        <div class="h-10 bg-gray-200 rounded w-full"></div> <!-- Email -->
      </div>
      <div class="h-24 bg-gray-200 rounded w-full"></div> <!-- Special Requests -->
      <div class="flex gap-4">
        <div class="h-10 bg-gray-200 rounded w-1/2"></div> <!-- Clear Form -->
        <div class="h-10 bg-gray-200 rounded w-1/2"></div> <!-- Confirm Booking -->
      </div>
    </div>

    <!-- Actual Form -->
    <form v-else class="text-text">
      <div class="space-y-4">
        <!-- Space Type Selection -->
        <div>
          <label for="space-type" class="block text-lg font-semibold mb-1">
            Select Space Type
          </label>
          <select
            id="space-type"
            disabled
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option :value="selectedWorkspaceType">{{ selectedWorkspaceType }}</option>
          </select>
        </div>

        <!-- Location Selection -->
        <div>
          <label for="location" class="block text-lg font-semibold mb-1">Select Location</label>
          <select
            id="location"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="">Select location</option>
            <option v-for="location in availbaleLocations" :key="location.id" :value="location.id">
              {{ `${location.location} - ${location.city}` }}
            </option>
          </select>
        </div>

        <!-- Date & Time -->
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label for="date" class="block text-lg font-semibold mb-1">Date</label>
            <input
              id="date"
              type="date"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label for="time" class="block text-lg font-semibold mb-1">Time</label>
            <input
              id="time"
              type="time"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <!-- Contact Info -->
        <div class="mt-5 pt-7 border-t-[0.5px] border-t-primary/30">
          <p class="mx-auto w-fit font-bold">Contact Information</p>
        </div>
        <div class="space-y-4">
          <div>
            <label for="full-name" class="block text-lg font-semibold mb-1">Full Name</label>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your full name"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="phone" class="block text-lg font-semibold mb-1">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label for="email" class="block text-lg font-semibold mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <!-- Special Requests -->
        <div class="mt-4">
          <label for="special-requests" class="block text-lg font-semibold mb-1">Special Requests</label>
          <textarea
            id="special-requests"
            rows="4"
            placeholder="Any special requirements or requests?"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          ></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mt-4">
          <button type="reset" class="secondary w-1/2">Clear Form</button>
          <button type="submit" class="primary w-1/2">Confirm Booking</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input,
select,
textarea {
  background-color: var(--color-card-bg2);
}
</style>
