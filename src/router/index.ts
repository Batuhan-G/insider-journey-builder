import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/journeys',
    },
    {
      path: '/journeys',
      name: 'dashboard',
      component: () => import('@/features/journey/views/JourneyBuilderView.vue'),
    },
    {
      path: '/journeys/:id',
      name: 'journey-builder',
      component: () => import('@/features/journey/views/JourneyBuilderView.vue'),
    },
  ],
})

export default router
