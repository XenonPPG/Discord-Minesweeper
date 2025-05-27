import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/i18n'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'discord',
      component: () => import('../views/DiscordView.vue'),
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue'),
    },
  ],
})

export default router
