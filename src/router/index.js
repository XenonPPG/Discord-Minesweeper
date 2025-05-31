import { createRouter, createWebHashHistory } from 'vue-router'
import DiscordViewVue from '../views/DiscordView.vue'
import SupportViewVue from '../views/SupportView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'discord',
      component: DiscordViewVue,
    },
    {
      path: '/support',
      name: 'support',
      component: SupportViewVue,
    },
  ],
})

export default router
