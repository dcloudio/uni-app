import {
  invoke
} from 'uni-core/service/bridge'
import {
  i18n
} from 'uni-helpers/i18n'
import {
  UNI_STORAGE_LOCALE
} from 'uni-helpers/constants'

export function getLocale () {
  // 优先使用 $locale
  const app = getApp({
    allowDefault: true
  })
  if (app && app.$vm) {
    return app.$vm.$locale
  }
  return i18n.getLocale()
}

export function setLocale (locale) {
  const oldLocale = getApp().$vm.$locale
  if (oldLocale !== locale) {
    getApp().$vm.$locale = locale
    if (__PLATFORM__ === 'app-plus') {
      const pages = getCurrentPages()
      pages.forEach((page) => {
        UniServiceJSBridge.publishHandler(
          'setLocale',
          locale,
          page.$page.id
        )
      })
      weex.requireModule('plus').setLanguage(locale)
    }
    if (__PLATFORM__ === 'h5') {
      window.localStorage && (localStorage[UNI_STORAGE_LOCALE] = locale)
    }
    callbacks.forEach(callbackId => {
      invoke(callbackId, { locale })
    })
    return true
  }
  return false
}
const callbacks = []
export function onLocaleChange (callbackId) {
  callbacks.push(callbackId)
}
