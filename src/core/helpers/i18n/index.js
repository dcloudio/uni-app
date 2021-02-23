import i18n from '@dcloudio/uni-i18n'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'

const messages = {
  en,
  es,
  fr,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant
}

const fallbackLocale = 'en'

export function initI18n (locale, onChange) {
  i18n.init({
    locale,
    fallbackLocale,
    messages
  })
  if (onChange) {
    i18n.watchLocale((newLocale, oldLocale) => {
      onChange(newLocale, oldLocale)
    })
  }
}

function initLocaleWatcher (appVm) {
  appVm.$i18n.vm.$watch('locale', (newLocale) => {
    i18n.setLocale(newLocale)
  }, {
    immediate: true
  })
}

export function t (key, values) {
  if (__VIEW__) {
    return i18n.t(key, values)
  }
  const appVm = getApp().$vm
  if (!appVm.$t) {
    /* eslint-disable no-func-assign */
    t = function (key, values) {
      return i18n.t(key, values)
    }
  } else {
    initLocaleWatcher(appVm)
    /* eslint-disable no-func-assign */
    t = function (key, values) {
      const $i18n = appVm.$i18n
      const silentTranslationWarn = $i18n.silentTranslationWarn
      $i18n.silentTranslationWarn = true
      const msg = appVm.$t(key, values)
      $i18n.silentTranslationWarn = silentTranslationWarn
      if (msg !== key) {
        return msg
      }
      return i18n.t(key, values)
    }
  }
  return t(key, values)
}
