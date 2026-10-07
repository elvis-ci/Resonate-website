import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const revealSections = () => {
  const sections = document.querySelectorAll('section:not(.hero)')

  if (!sections.length) return

  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px',
    },
  )

  sections.forEach((section) => {
    section.classList.add('reveal')
    observer.observe(section)
  })
}

window.addEventListener('load', revealSections)
router.afterEach(() => {
  setTimeout(revealSections, 50)
})
