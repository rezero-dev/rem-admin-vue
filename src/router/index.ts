import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      component: () => import('@/layouts/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            icon: 'i-icon-park-outline-home',
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            icon: 'i-icon-park-outline-info',
          },
        },
      ],
    },
  ],
})

export default router
