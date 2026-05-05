import { createI18n } from 'vue-i18n'
import en from '../i18n/locales/en.json'
import id from '../i18n/locales/id.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en,
      id
    }
  })

  vueApp.use(i18n)
})
