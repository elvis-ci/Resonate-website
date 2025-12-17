import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/workspaces',
    name: 'workspaces',
    component: () => import('../views/WorkspacesView.vue'),
    meta: { title: 'Workspaces' },
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('../views/CommunityView.vue'),
    meta: { title: 'Community' },
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
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contact' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// set document.title from route meta.title
router.beforeEach((to, from, next) => {
  const base = 'Resonate'
  const t = to.meta && to.meta.title ? `${to.meta.title} - ${base}` : base
  if (typeof document !== 'undefined') document.title = t
  next()
})

export default router
