import { useI18n } from '@dcloudio/uni-core'
import { defineSyncApi } from '../../helpers/api'

export const getLocale = defineSyncApi<typeof uni.getLocale>(
  'getLocale',
  () => {
    // 优先使用 $locale
    const app = getApp({ allowDefault: true })
    if (app && app.$vm) {
      return app.$vm.$locale
    }
    return useI18n().getLocale()
  }
)

export const setLocale = defineSyncApi<typeof uni.setLocale>(
  'setLocale',
  (locale) => {
    getApp().$vm.$locale = locale
    if (__PLATFORM__ === 'app') {
      const pages = getCurrentPages()
      pages.forEach((page) => {
        UniServiceJSBridge.publishHandler('setLocale', locale, page.$page.id)
      })
      weex.requireModule('plus').setLanguage(locale)
    }
  }
)
