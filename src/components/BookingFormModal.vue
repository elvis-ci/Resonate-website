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
  <div class="max-w-4xl mx-auto">
    <div class="bg-black rounded-lg shadow-lg p-8 border-2 border-primary/20">
      <h2 class="mb-8">
        Booking Form <span class="text-primary">({{ workspaceType }})</span>
      </h2>

      <form class="space-y-6">
        <!-- Space Type Selection -->
        <div>
          <label for="space-type" class="block text-lg font-semibold text-text mb-2">
            Select Space Type
          </label>
          <select
            id="space-type"
            class="text-body w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option :value="workspaceType">{{workspaceType}}</option>
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
            <label for="start-date" class="block text-lg font-semibold text-text mb-2">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label for="end-date" class="block text-lg font-semibold text-text mb-2">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <!-- Contact Information -->
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label for="full-name" class="block text-lg font-semibold text-text mb-2">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your full name"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label for="email" class="block text-lg font-semibold text-text mb-2">
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

        <!-- Phone Number -->
        <div>
          <label for="phone" class="block text-lg font-semibold text-text mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <!-- Special Requests -->
        <div>
          <label for="special-requests" class="block text-lg font-semibold text-text mb-2">
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
        <div class="flex gap-4">
          <button type="reset" class="secondary w-1/2">Clear Form</button>

          <button
            type="submit"
            class="primary w-1/2"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
