import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import WorkspacesView from '../views/WorkspacesView.vue'
import BookingsView from '../views/BookingsView.vue'
import CommunityView from '../views/CommunityView.vue'
import ContactView from '../views/ContactView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About' },
  },
  {
    path: '/workspaces',
    name: 'workspaces',
    component: WorkspacesView,
    meta: { title: 'Workspaces' },
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: BookingsView,
    meta: { title: 'Bookings' },
  },

  /* ------------------ COMMUNITY ------------------ */
  {
    path: '/community',
    name: 'community',
    component: CommunityView,
    meta: { title: 'Community' },
    redirect: { name: 'community-events' },
    children: [
      {
        path: 'events',
        name: 'community-events',
        component: () => import('../views/community/Events.vue'),
        meta: { title: 'Community — Events' },
      },
      {
        path: 'opportunities',
        name: 'community-opportunities',
        component: () => import('../views/community/Opportunities.vue'),
        meta: { title: 'Community — Opportunities' },
      },
      {
        path: 'resources',
        name: 'community-resources',
        component: () => import('../views/community/Resources.vue'),
        meta: { title: 'Community — Resources' },
      },
      {
        path: 'mentorship',
        name: 'community-mentorship',
        component: () => import('../views/community/Mentorship.vue'),
        meta: { title: 'Community — Mentorship' },
      },
      {
        path: 'stories',
        name: 'community-stories',
        component: () => import('../views/community/Stories.vue'),
        meta: { title: 'Community — Stories' },
      },
    ],
  },
  /* ------------------------------------------------ */

  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact' },
  },

  /* ✅ MUST BE LAST */
  {
    path: '/:pathMatch(.*)*',
    name: 'PageError',
    component: NotFoundView,
    meta: { title: 'Page not found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Set document title from route meta
router.beforeEach((to, from, next) => {
  const base = 'Resonate'
  const title = to.meta?.title ? `${to.meta.title} - ${base}` : base

  if (typeof document !== 'undefined') {
    document.title = title
  }

  next()
})

export default router
