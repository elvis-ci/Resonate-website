<template>
  <main id="maincontent" class="workspaces">
    <!-- Hero Section -->
    <section class=" sm:py-16 md:py-20 bg-gradient-to-r from-primary/20 to-primary/5">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-4">Our Workspaces</h1>
        <p class="text-gray-600 text-lg mb-8">
          Explore our flexible workspace solutions designed for every professional. From solo work
          to large team gatherings, we have the perfect space for you.
        </p>
      </div>
    </section>

    <!-- Single Workspace Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Image Column -->
          <div class="order-2 md:order-1">
            <img
              src="/images/coworking/about.webp"
              alt="Single Workspace"
              class="w-full rounded-lg shadow-lg"
            />
          </div>

          <!-- Content Column -->
          <div class="order-1 md:order-2">
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Single Workspace</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-4">
              Perfect for freelancers, consultants, and remote workers. Each workspace includes
              high-speed internet, comfortable ergonomic seating, and access to all Resonate
              amenities.
            </p>
            <ul class="space-y-3 mb-8 text-gray-600">
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Dedicated desk with storage</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>High-speed WiFi and power outlets</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Access to meeting rooms</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Coffee and refresh station</span>
              </li>
            </ul>
            <RouterLink
              to="/bookings"
              class="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Book Now
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="relative w-full overflow-hidden bg-gray-50">
      <svg
        class="w-full block"
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z" fill="#ffffff" />
      </svg>
    </div>

    <!-- Private Rooms Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Content Column -->
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Private Rooms</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-4">
              Ideal for small teams, startups, or client meetings. Our private rooms offer complete
              privacy, professional ambiance, and full control of your workspace.
            </p>
            <ul class="space-y-3 mb-8 text-gray-600">
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>1-3 person capacity</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Soundproof walls for confidentiality</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Video conferencing setup</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Flexible lease terms</span>
              </li>
            </ul>
            <RouterLink
              to="/bookings"
              class="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Book Now
            </RouterLink>
          </div>

          <!-- Image Column -->
          <div>
            <img
              src="/images/coworking/about.webp"
              alt="Private Room"
              class="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Team Sprint Rooms Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Image Column -->
          <div class="order-2 md:order-1">
            <img
              src="/images/coworking/about.webp"
              alt="Team Sprint Room"
              class="w-full rounded-lg shadow-lg"
            />
          </div>

          <!-- Content Column -->
          <div class="order-1 md:order-2">
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Team Sprint Rooms</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-4">
              Perfect for collaborative work sessions and intensive team projects. These spacious
              rooms accommodate 4-8 people and feature all the tools needed for productive
              collaboration.
            </p>
            <ul class="space-y-3 mb-8 text-gray-600">
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Capacity for 4-8 people</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Large collaboration tables and whiteboards</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Projector and presentation equipment</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Comfortable seating and standing options</span>
              </li>
            </ul>
            <RouterLink
              to="/bookings"
              class="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Book Now
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Conference Rooms Section -->
    <section class="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Content Column -->
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Conference Rooms</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-4">
              Impress your clients and stakeholders with our state-of-the-art conference rooms.
              Designed for professional meetings and presentations with capacity up to 16 people.
            </p>
            <ul class="space-y-3 mb-8 text-gray-600">
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Seating for up to 16 people</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Advanced AV system with 4K projection</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>High-quality video conferencing technology</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Catering and beverage service available</span>
              </li>
            </ul>
            <RouterLink
              to="/bookings"
              class="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Book Now
            </RouterLink>
          </div>

          <!-- Image Column -->
          <div>
            <img
              src="/images/coworking/about.webp"
              alt="Conference Room"
              class="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Seminar Halls Section -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Image Column -->
          <div class="order-2 md:order-1">
            <img
              src="/images/coworking/about.webp"
              alt="Seminar Hall"
              class="w-full rounded-lg shadow-lg"
            />
          </div>

          <!-- Content Column -->
          <div class="order-1 md:order-2">
            <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">Seminar Halls</h2>
            <p class="text-gray-600 text-base leading-relaxed mb-4">
              Host large events, workshops, and seminars with our spacious, fully-equipped seminar
              halls. Perfect for training sessions, conferences, and community gatherings.
            </p>
            <ul class="space-y-3 mb-8 text-gray-600">
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Flexible seating arrangements (theater, classroom, banquet)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Professional stage with lighting and sound system</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Breakout rooms for workshops and sessions</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary font-bold mr-3">✓</span>
                <span>Full catering and event coordination services</span>
              </li>
            </ul>
            <RouterLink
              to="/bookings"
              class="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Book Now
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary to-primary-hover text-white"
    >
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold mb-4">Ready to Find Your Perfect Space?</h2>
        <p class="text-lg mb-8 opacity-90">
          Book a tour today and discover why Resonate is the best coworking solution for your needs.
        </p>
        <RouterLink
          to="/bookings"
          class="inline-block bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          Start Booking Now
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
</style>
