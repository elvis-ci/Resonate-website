<script setup>
import PhoneIcon from 'vue-material-design-icons/Phone.vue'
import EmailIcon from 'vue-material-design-icons/Email.vue'
import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue'
</script>
<template>
  <main id="maincontent" class="view bookings">
    <!-- Hero -->
    <section class="heading bg-gradient-to-b from-primary/10 to-transparent">
      <div class="container">
        <h1 class="text-4xl sm:text-5xl md:text-6xl text-center font-bold text-text mb-4">
          Book Your Space
        </h1>
        <p class="max-w-2xl mx-auto text-center">
          Reserve a workspace that fits your needs. Flexible booking, modern facilities, and a
          seamless experience from start to finish.
        </p>
      </div>
    </section>

    <!-- Booking Form -->
    <section class="">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-lg shadow-lg p-8 border-2 border-primary/20">
          <h2 class="text-3xl font-bold text-text mb-2">Reservation Details</h2>
          <p class="text-gray-600 mb-8">Complete the form below to secure your booking.</p>

          <form class="space-y-8">
            <!-- Space Type -->
            <div>
              <label for="space-type" class="block text-lg font-semibold text-text mb-2">
                Space Type <span class="text-red-500">*</span>
              </label>
              <select
                id="space-type"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Choose a space type</option>
                <option value="single">Single Workspace</option>
                <option value="private">Private Room</option>
                <option value="team-sprint">Team Sprint Room (4–8 people)</option>
                <option value="conference">Conference Room (up to 16 people)</option>
                <option value="seminar">Seminar Hall</option>
              </select>
            </div>

            <!-- Date & Time -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-lg font-semibold text-text mb-2">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label class="block text-lg font-semibold text-text mb-2"> End Date & Time </label>
                <input
                  type="datetime-local"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <!-- Guests -->
            <div>
              <label class="block text-lg font-semibold text-text mb-2"> Number of Guests </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 4"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <!-- Contact Info -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-lg font-semibold text-text mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label class="block text-lg font-semibold text-text mb-2">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label class="block text-lg font-semibold text-text mb-2"> Phone Number </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <!-- Special Requests -->
            <div>
              <label class="block text-lg font-semibold text-text mb-2"> Special Requests </label>
              <textarea
                rows="4"
                placeholder="Accessibility needs, equipment, seating arrangement, etc."
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              ></textarea>
            </div>

            <!-- Pricing Summary -->
            <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-text mb-2">Estimated Cost</h3>
              <p class="text-gray-600">Final pricing will be confirmed after review.</p>
              <p class="text-2xl font-bold text-primary mt-2">₦25,000 – ₦80,000</p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                type="reset"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-text font-semibold py-3 px-6 rounded-lg transition"
              >
                Clear Form
              </button>
              <button
                type="submit"
                class="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Confirm Reservation
              </button>
            </div>

            <!-- Policy -->
            <p class="text-sm text-gray-500 text-center">
              Free cancellation up to 24 hours before your booking. Secure payment processing.
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- Support -->
    <section class="py-12 sm:py-16 md:pt-20 md:pb-28 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-center">Need Assistance?</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Call Us -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="flex items-center gap-2 justify-center mx-auto">
              <PhoneIcon class="mb-2 text-primary" size="36" />
              <h3 class="mb-2 font-semibold text-text">Call Us</h3>
            </div>
            <a class="text-primary font-bold" href="tel:+2348001234567"> +234 800 123 4567 </a>
          </div>

          <!-- Email Us -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="flex items-center gap-2 justify-center mx-auto">
              <EmailIcon class="mb-2 text-primary" size="36" />
              <h3 class="mb-2 font-semibold text-text">Email Us</h3>
            </div>
            <a class="text-primary font-bold" href="mailto:support@resonate.org">
              support@resonate.org
            </a>
          </div>

          <!-- Visit Us -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="flex items-center gap-2 justify-center mx-auto">
              <MapMarkerIcon class="mb-2 text-primary" size="36" />
              <h3 class="mb-2 font-semibold text-text">Visit Us</h3>
            </div>

            <p>Resonate Hub, Victoria Island, Lagos</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
