import { useI18n } from '@dcloudio/uni-core'
import { UNI_STORAGE_LOCALE } from '@dcloudio/uni-shared'
import { defineOnApi, defineSyncApi } from '../../helpers/api'

const API_SET_LOCALE = 'setLocale'
const API_GET_LOCALE = 'getLocale'
const API_ON_LOCALE_CHANGE = 'onLocaleChange'

export const getLocale = defineSyncApi<typeof uni.getLocale>(
  API_GET_LOCALE,
  () => {
    // 优先使用 $locale
    const app = getApp({ allowDefault: true })
    if (app && app.$vm) {
      return app.$vm.$locale
    }
    return useI18n().getLocale()
  }
)

export const onLocaleChange = defineOnApi<typeof uni.onLocaleChange>(
  API_ON_LOCALE_CHANGE,
  () => {}
)

export const setLocale = defineSyncApi<typeof uni.setLocale>(
  API_SET_LOCALE,
  (locale) => {
    const app = getApp()
    if (!app) {
      return false
    }
    const oldLocale = app.$vm.$locale
    if (oldLocale !== locale) {
      app.$vm.$locale = locale
      if (__PLATFORM__ === 'app') {
        const pages = getCurrentPages()
        pages.forEach((page) => {
          UniServiceJSBridge.publishHandler(
            API_SET_LOCALE,
            locale,
            page.$page.id
          )
        })
        weex.requireModule('plus').setLanguage(locale)
      }
      if (__PLATFORM__ === 'h5') {
        navigator.cookieEnabled &&
          window.localStorage &&
          (localStorage[UNI_STORAGE_LOCALE] = locale)
      }
      // 执行 uni.onLocaleChange
      UniServiceJSBridge.invokeOnCallback(API_ON_LOCALE_CHANGE, { locale })
      return true
    }
    return false
  }
)
