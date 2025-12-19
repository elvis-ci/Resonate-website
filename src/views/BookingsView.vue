<template>
  <main id="maincontent" class="view bookings pt-24">
    <section class="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-primary/10 to-transparent">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-4">Book Your Space</h1>
        <p class="text-gray-600 text-lg">
          Reserve your ideal workspace at Resonate. Choose from our flexible options and secure your
          spot today.
        </p>
      </div>
    </section>

    <!-- Booking Form Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-lg shadow-lg p-8 border-2 border-primary/20">
          <h2 class="text-3xl font-bold text-text mb-8">Booking Form</h2>

          <form class="space-y-6">
            <!-- Space Type Selection -->
            <div>
              <label for="space-type" class="block text-lg font-semibold text-text mb-2">
                Select Space Type
              </label>
              <select
                id="space-type"
                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Choose a space type</option>
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
              <button
                type="submit"
                class="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Confirm Booking
              </button>
              <button
                type="reset"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-text font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Contact Support Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-text mb-8 text-center">Need Assistance?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <h3 class="text-xl font-semibold text-text mb-2">Call Us</h3>
            <p class="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <h3 class="text-xl font-semibold text-text mb-2">Email Us</h3>
            <p class="text-gray-600">bookings@resonate.com</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <h3 class="text-xl font-semibold text-text mb-2">Visit Us</h3>
            <p class="text-gray-600">123 Business Plaza, Suite 100</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup></script>

<style scoped>
</style>
