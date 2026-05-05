import en from './i18n/locales/en.json'
import id from './i18n/locales/id.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    id
  }
}))
