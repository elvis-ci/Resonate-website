<script setup>
import { ref, toRef, watch } from 'vue'
import { getLocationsPerWorkspace } from '@/services/locationsService.js'
import {
  getOverlappingWorkspaceBookings,
  getAvailableBookingSlots,
} from '@/services/bookingService.js'

const props = defineProps({
  workspaceType: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close'])
const isFocused = ref(false)
const isLoading = ref(false)
const availableLocations = ref([])
const selectedWorkspaceType = toRef(props, 'workspaceType')
const selectedLocation = ref(null)
const selectedDate = ref(null)
const selectedStartTime = ref(null)
const selectedEndTime = ref(null)

// Map frontend workspace labels to normalized DB values
const workspaceTypeMap = {
  'Shared Workspace': 'shared_workspace',
  'Private Office Suite': 'private_office_suite',
  'Team Collaboration Room': 'team_collaboration_room',
  'Executive Conference Room': 'executive_conference_room',
  'Event & Seminar Hall': 'event_seminar_hall',
}
async function checkAvailability(){
  
}
// Watch workspace type changes and fetch locations
watch(
  () => selectedWorkspaceType.value,
  async (type) => {
    if (!type) return

    const dbType = workspaceTypeMap[type]
    if (!dbType) {
      console.warn(`No matching DB value for workspace type: "${type}"`)
      availableLocations.value = []
      return
    }

    isLoading.value = true
    try {
      const result = await getLocationsPerWorkspace(dbType)
      availableLocations.value = result || []
    } catch (err) {
      console.error(err)
      availableLocations.value = []
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true },
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
      <div class="h-10 bg-gray-200 rounded w-1/3"></div>
      <div class="h-10 bg-gray-200 rounded w-full"></div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="h-10 bg-gray-200 rounded w-full"></div>
        <div class="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div class="h-10 bg-gray-200 rounded w-full"></div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="h-10 bg-gray-200 rounded w-full"></div>
        <div class="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div class="h-24 bg-gray-200 rounded w-full"></div>
      <div class="flex gap-4">
        <div class="h-10 bg-gray-200 rounded w-1/2"></div>
        <div class="h-10 bg-gray-200 rounded w-1/2"></div>
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
            v-model="selectedLocation"
          >
            <option value="">Select location</option>
            <option v-for="location in availableLocations" :key="location.id" :value="location.id">
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
              v-model="selectedDate"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Start Time -->
            <div>
              <label for="start_time" class="block text-lg font-semibold mb-1">
                From <span>(hours)</span>
              </label>
              <input
                id="start_time"
                type="time"
                v-model="selectedStartTime"
                step="3600"
                min="08:00"
                max="18:00"
                pattern="^([01]\\d|2[0-3]):00$"
                title="Please select a full hour (e.g. 10:00)"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <!-- End Time -->
            <div>
              <label for="end_time" class="block text-lg font-semibold mb-1">
                To <span>(hours)</span>
              </label>
              <input
                id="end_time"
                type="time"
                v-model="selectedEndTime"
                step="3600"
                min="09:00"
                max="19:00"
                pattern="^([01]\\d|2[0-3]):00$"
                title="Please select a full hour (e.g. 12:00)"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <!-- <div v-if="isFocused" aria-labelledby="time" role="alert" aria-live="assertive">
            <span class="text-red-500">Select time in full hours</span>
          </div> -->
        </div>
        <div class="flex justify-center "><button @click="checkAvailability" class="primary">Check Availability</button></div>

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
          <label for="special-requests" class="block text-lg font-semibold mb-1">
            Special Requests
          </label>
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
