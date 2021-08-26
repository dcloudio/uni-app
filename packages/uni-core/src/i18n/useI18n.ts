import { getEnvLocale } from '@dcloudio/uni-shared'
import { BuiltInLocale, initVueI18n } from '@dcloudio/uni-i18n'

let i18n: ReturnType<typeof initVueI18n>

interface webviewStyleWithLanguage extends PlusWebviewWebviewStyles {
  locale: string
}

export function useI18n() {
  if (!i18n) {
    let locale: BuiltInLocale
    if (__PLATFORM__ === 'h5') {
      if (__NODE_JS__) {
        locale = getEnvLocale() as BuiltInLocale
      } else {
        locale = (__uniConfig.locale || navigator.language) as BuiltInLocale
      }
    } else if (__PLATFORM__ === 'app') {
      if (typeof getApp === 'function') {
        locale = weex.requireModule('plus').getLanguage() as BuiltInLocale
      } else {
        locale = (
          plus.webview.currentWebview().getStyle() as webviewStyleWithLanguage
        ).locale as BuiltInLocale
      }
    } else {
      locale = uni.getSystemInfoSync().language as BuiltInLocale
    }
    const SET_LOCALE_API = 'i18n.setLocale'
    if (__PLATFORM__ === 'app') {
      i18n = initVueI18n(
        locale,
        undefined,
        undefined,
        typeof getApp === 'function'
          ? (locale) => {
              const pages = getCurrentPages()
              pages.forEach((page) => {
                UniServiceJSBridge.publishHandler(
                  SET_LOCALE_API,
                  locale,
                  page.$page.id
                )
              })
              weex.requireModule('plus').setLanguage(locale)
            }
          : undefined
      )
    } else {
      i18n = initVueI18n(locale)
    }
    if (__PLATFORM__ === 'app' && typeof getApp !== 'function') {
      UniViewJSBridge.subscribe(SET_LOCALE_API, i18n.setLocale)
    }
  }
  return i18n
}
