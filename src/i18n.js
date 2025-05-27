import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en,
    ru
  }
})