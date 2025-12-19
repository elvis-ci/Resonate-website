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
  {
    path: '/community',
    name: 'community',
    component: CommunityView,
    meta: { title: 'Community' },
    redirect: '/community/events',
    children: [
      {
        path: 'blog',
        name: 'community-blog',
        component: () => import('../views/community/Blog.vue'),
        meta: { title: 'Community — Blog' },
      },
      {
        path: 'events',
        name: 'community-events',
        component: () => import('../views/community/Events.vue'),
        meta: { title: 'Community — Events' },
      },
      {
        path: 'workshops',
        name: 'community-workshops',
        component: () => import('../views/community/Workshops.vue'),
        meta: { title: 'Community — Workshops' },
      },
      {
        path: 'networking',
        name: 'community-networking',
        component: () => import('../views/community/Networking.vue'),
        meta: { title: 'Community — Networking' },
      },
    ],
  },
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
