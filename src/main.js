// --- Стили ---
import './assets/main.css'
import 'vue-toastification/dist/index.css'

// ---Vue и библиотеки ---
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// ---Компоненты и маршруты ---
import App from './App.vue'
import router from './router'

// ---Плагины ---
import Toast from 'vue-toastification'
import { MotionPlugin } from '@vueuse/motion'
import { i18n } from './i18n'

// ---Инициализация ---
const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createPinia())
app.use(Toast, {
  position: 'top-center',
  timeout: 2000,
  pauseOnHover: false,
  closeOnClick: true,
  maxToasts: 1,
})
app.use(MotionPlugin)

// ---Монтирование ---
app.mount('#app')
