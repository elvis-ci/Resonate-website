<script setup>
import { ref, toRef, watch, computed } from 'vue'
import { getLocationsPerWorkspace } from '@/services/locationsService.js'
import { checkWorkspaceAvailability } from '@/services/bookingService.js'

const props = defineProps({
  workspaceType: {
    type: String,
    required: true,
  },
})

const stepCount = ref(1) // 1 or 2

const emit = defineEmits(['close'])
const isLoading = ref(false)
const availableLocations = ref([])
const selectedWorkspaceType = toRef(props, 'workspaceType')
const selectedLocation = ref(null)
const selectedDate = ref(null)
const selectedStartTime = ref(null)
const selectedEndTime = ref(null)

const availabilityMessage = ref('') // <-- simple string for UI
const alternativeSlots = ref([])
const isAvailable = ref(false)
const availabilityState = ref(null) // 'available' | 'unavailable' | 'selected'

const workspaceTypeMap = {
  'Shared Workspace': 'shared_workspace',
  'Private Office Suite': 'private_office_suite',
  'Team Collaboration Room': 'team_collaboration_room',
  'Executive Conference Room': 'executive_conference_room',
  'Event & Seminar Hall': 'event_seminar_hall',
}

// time formatters
function formatTo12Hour(time) {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

function formatSlot(slot) {
  return `${formatTo12Hour(slot.start_time)} – ${formatTo12Hour(slot.end_time)}`
}

const sortedAlternativeSlots = computed(() =>
  [...alternativeSlots.value].sort((a, b) => a.start_time.localeCompare(b.start_time)),
)

/* ---------------- SLOT SELECTION ---------------- */

function selectAlternativeSlot(slot) {
  selectedStartTime.value = slot.start_time
  selectedEndTime.value = slot.end_time
  availabilityState.value = 'selected'
  availabilityMessage.value = 'New time slot selected'
}

function nextStep() {
  stepCount.value = 2
}
function prevStep() {
  stepCount.value = 1
}

// Load available locations when workspace type changes
watch(
  () => selectedWorkspaceType.value,
  async (type) => {
    if (!type) return
    const dbType = workspaceTypeMap[type]
    if (!dbType) {
      availableLocations.value = []
      return
    }
    isLoading.value = true
    try {
      const result = await getLocationsPerWorkspace(dbType)
      availableLocations.value = result && result.length ? result : []
      console.log('Available locations:', availableLocations.value)
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true },
)

const isAvailabilityFormComplete = computed(() => {
  return (
    !!selectedLocation.value &&
    !!selectedDate.value &&
    !!selectedStartTime.value &&
    !!selectedEndTime.value
  )
})

const validationError = ref(false)

// --- CHECK AVAILABILITY ---
async function checkAvailability() {
  validationError.value = false

  if (!isAvailabilityFormComplete.value) {
    validationError.value = true
    availabilityState.value = null
    availabilityMessage.value = ''
    return
  }

  const dbWorkspaceType = workspaceTypeMap[selectedWorkspaceType.value]
  if (!dbWorkspaceType) {
    availabilityMessage.value = 'Invalid workspace type'
    return
  }

  try {
    isLoading.value = true

    const { data, error } = await checkWorkspaceAvailability(
      dbWorkspaceType,
      selectedLocation.value,
      selectedDate.value,
      selectedStartTime.value,
      selectedEndTime.value,
    )

    if (error) throw error

    if (data.available) {
      isAvailable.value = true
      availabilityState.value = 'available'
      alternativeSlots.value = []
    } else {
      isAvailable.value = false
      availabilityState.value = 'unavailable'
      alternativeSlots.value = data.available_slots || []
    }
  } catch (err) {
    availabilityMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
// --- SUBMIT HANDLER ---
async function submitBooking() {
  await checkAvailability()
  if (
    availabilityMessage.value === 'Space not available for this time period' ||
    availabilityMessage.value.startsWith('Please')
  )
    return

  // proceed with booking logic
  console.log('Booking can proceed!')
}
</script>
<template>
  <div
    class="relative max-w-3xl mx-auto bg-bg rounded-lg shadow-lg p-4 md:p-8 border-2 border-primary/20"
  >
    <button
      @click="emit('close')"
      class="absolute top-4 right-4 text-heading font-bold hover:text-primary/70"
    >
      X
    </button>

    <h2 class="mb-8 text-center">{{ selectedWorkspaceType }} Booking Form</h2>

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
        <div v-if="stepCount == 1" class="space-y-6">
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
              <option
                v-for="location in availableLocations"
                :key="location.location_id"
                :value="location.location_id"
              >
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

          <div class="flex justify-center flex-col items-center mt-1 text-center">
            <!-- Show availability result -->
            <!-- this p-tags are not dynamically rendered to ensure screen reader alert compatibility by ensuring re-render based on availability state -->
            <div aria-live="polite" aria-atomic="true" class="">
              <p
                v-if="validationError"
                key="validation"
                role="alert"
                class="font-semibold text-red-600 error"
              >
                Please fill in all required fields before checking availability.
              </p>
              <p
                v-if="availabilityState === 'available'"
                :key="'available'"
                role="status"
                class="font-semibold text-green-600 error"
              >
                selected time is available, click proceed to confirm.
              </p>

              <p
                v-if="availabilityState === 'unavailable'"
                :key="'unavailable'"
                role="status"
                class="font-semibold text-red-600 error"
              >
                Selected time is already taken. Choose an option below.
              </p>

              <p
                v-if="availabilityState === 'selected'"
                :key="'selected'"
                role="status"
                class="font-semibold"
              >
                New time slot selected.
              </p>
            </div>
            
            <div
              v-if="sortedAlternativeSlots.length"
              class="flex flex-wrap gap-2 mb-4 justify-center"
            >
              <button
                v-for="(slot, index) in sortedAlternativeSlots"
                :key="index"
                type="button"
                @click="() => (selectAlternativeSlot(slot), checkAvailability())"
                class="px-2 py-2 rounded-full border border-primary/40 text-xs md:text-sm font-medium bg-white hover:bg-primary/80 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {{ formatSlot(slot) }}
              </button>
            </div>

            <button type="button" @click="checkAvailability" class="primary">
              Check Availability
            </button>
          </div>

          <div class="flex items-center justify-center">
            <button
              type="button"
              @click.prevent="nextStep"
              class="primary disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="availabilityState !== 'available' && availabilityState !== 'selected'"
            >
              Proceed to Contact Info
            </button>
          </div>
        </div>

        <!--step 2 Contact Info -->
        <div v-else class="space-y-6">
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
          <div class="md:flex md:gap-4 mt-4 justify-center items-center space-y-4 md:space-y-0">
            <button type="button" @click.prevent="prevStep" class="secondary w-full md:w-1/2">
              Previous Step
            </button>
            <button type="submit" class="primary w-full md:w-1/2">Proceed to payment</button>
          </div>
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
