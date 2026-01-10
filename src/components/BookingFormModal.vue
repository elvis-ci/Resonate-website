<script setup>
defineProps({
  workspaceType: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="relative max-w-4xl mx-auto bg-bg rounded-lg shadow-lg p-8 border-2 border-primary/20">
    <button @click="emit('close')" class="absolute top-4 right-4 text-heading font-bold hover:text-primary/70">X </button>
    <h2 class="mb-8">
      Booking Form <span class="text-primary">({{ workspaceType }})</span>
    </h2>

    <form class="text-text">
      <div class="space-y-4">
        <!-- Space Type Selection -->
        <div>
          <label for="space-type" class="block text-lg font-semibold mb-1">
            Select Space Type
          </label>
          <select
            id="space-type"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option :value="workspaceType">{{ workspaceType }}</option>
            <option value="single">Single Workspace</option>
            <option value="private">Private Room</option>
            <option value="team-sprint">Team Sprint Room (4-8 persons)</option>
            <option value="conference">Conference Room (up to 16 persons)</option>
            <option value="seminar">Seminar Hall</option>
          </select>
        </div>
        <!-- location -->
        <div>
          <label for="space-type" class="block text-lg font-semibold mb-1">
            Select location
          </label>
          <select
            id="space-type"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option :value="workspaceType">{{ workspaceType }}</option>
            <option value="single">Single Workspace</option>
            <option value="private">Private Room</option>
            <option value="team-sprint">Team Sprint Room (4-8 persons)</option>
            <option value="conference">Conference Room (up to 16 persons)</option>
            <option value="seminar">Seminar Hall</option>
          </select>
        </div>

        <!-- Date Selection -->
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label for="date" class="block text-lg font-semibold text-text mb-1"> Date </label>
            <input
              id="date"
              type="date"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label for="time" class="block text-lg font-semibold text-text mb-1"> Time </label>
            <input
              id="time"
              type="time"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div class="mt-5 pt-7 border-t-[0.5px] border-t-primary/30">
        <!-- Contact Information -->
        <p class="mx-auto w-fit font-bold">Contact Information</p>
      </div>
      <div class="space-y-4">
        <div>
          <label for="full-name" class="block text-lg font-semibold text-text mb-1">
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="Enter your full name"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-lg font-semibold text-text mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label for="email" class="block text-lg font-semibold text-text mb-1">
              Email Address
            </label>
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
        <label for="special-requests" class="block text-lg font-semibold text-text mb-1">
          Special Requests
        </label>
        <textarea
          id="special-requests"
          placeholder="Any special requirements or requests?"
          rows="4"
          class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-4 mt-4">
        <button type="reset" class="secondary w-1/2">Clear Form</button>

        <button type="submit" class="primary w-1/2">Confirm Booking</button>
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
