import { normalizeLocale, LOCALE_EN } from '../helpers/i18n/index'
import { isFn } from 'uni-shared'

export function getLocale () {
  // 优先使用 $locale
  if (isFn(getApp)) {
    const app = getApp({
      allowDefault: true
    })
    if (app && app.$vm) {
      return app.$vm.$locale
    }
  }
  return normalizeLocale(__GLOBAL__.getSystemInfoSync().language) || LOCALE_EN
}

export function setLocale (locale) {
  const app = isFn(getApp) ? getApp() : false
  if (!app) {
    return false
  }
  const oldLocale = app.$vm.$locale
  if (oldLocale !== locale) {
    app.$vm.$locale = locale
    onLocaleChangeCallbacks.forEach((fn) => fn({
      locale
    }))
    return true
  }
  return false
}

const onLocaleChangeCallbacks = []
export function onLocaleChange (fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn)
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale
}
