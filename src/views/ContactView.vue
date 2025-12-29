## Contact Us ```vue
<script setup>
import { ref } from 'vue'

// Material Design Icons (component import method)
import LinkedinIcon from 'vue-material-design-icons/Linkedin.vue'
import InstagramIcon from 'vue-material-design-icons/Instagram.vue'
import TwitterIcon from 'vue-material-design-icons/Twitter.vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  alert('Thank you for contacting us. We will get back to you shortly.')

  form.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
}
</script>

<template>
  <!-- PAGE HEADER -->
  <section class="sm:py-16 bg-linear-to-b from-primary/20 to-primary/0 text-center">
    <div class="container">
      <h1 class="main-heading text-heading mb-4">Contact Us</h1>
      <p class="mb-8 max-w-4xl mx-auto">
        Whether you’re looking to book a workspace, partner with us, or need support, our team is
        ready to help.
      </p>
      <RouterLink class="primary" :to="'/workspaces'">Go to Booking</RouterLink>
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <section class="pb-16">
    <div class="container max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-14">
        <!-- CONTACT FORM -->
        <div class="bg-card-bg rounded-2xl shadow-soft">
          <h2 class="mb-6">Send Us a Message</h2>

          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-5">
            <div>
              <label for="name" class="block mb-1 font-medium">Full Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Your full name"
                class="w-full px-4 py-3 rounded-md bg-card-bg2 border border-body focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label for="email" class="block mb-1 font-medium">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="you@example.com"
                class="w-full px-4 py-3 rounded-md bg-card-bg2 border border-body focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label for="subject" class="block mb-1 font-medium">Subject</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="How can we help?"
                class="w-full px-4 py-3 rounded-md bg-card-bg2 border border-body focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label for="message" class="block mb-1 font-medium">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                placeholder="Write your message here..."
                class="w-full px-4 py-3 rounded-md bg-card-bg2 border border-body focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <button type="submit" class="primary mt-2 w-full md:w-fit">Send Message</button>
          </form>
        </div>

        <!-- CONTACT DETAILS -->
        <div class="flex flex-col gap-4">
          <div class="">
            <h2 class="">Contact Information</h2>
            <p class="mt-2 text-muted">You can also reach us directly via the channels below.</p>
          </div>

          <div class="bg-card-bg rounded-2xl shadow-soft space-y-4">
            <div>
              <p class="contact font-semibold text-heading">Support Email</p>
              <a href="mailto:support@yourworkspace.com" class="text-primary">
                support@yourworkspace.com
              </a>
            </div>

            <div>
              <p class="contact font-semibold text-heading">General Enquiries</p>
              <a href="mailto:hello@yourworkspace.com" class="text-primary">
                hello@yourworkspace.com
              </a>
            </div>

            <div>
              <p class="contact font-semibold text-heading">Call Us</p>
              <a href="tel:+2348000000000" class="text-primary"> +234 800 000 0000 </a>
            </div>
          </div>

          <!-- SOCIAL LINKS -->
          <div class="bg-card-bg rounded-2xl shadow-soft p-6 text-center">
            <h3 class="mb-4">Connect With Us</h3>
            <ul class="flex gap-6 justify-center">
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                  class="text-muted hover:text-primary transition"
                >
                  <LinkedinIcon :size="28" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                  class="text-muted hover:text-primary transition"
                >
                  <InstagramIcon :size="28" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter / X"
                  class="text-muted hover:text-primary transition"
                >
                  <TwitterIcon :size="28" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  p.contact{
    margin-bottom: 2px;
  }
</style>