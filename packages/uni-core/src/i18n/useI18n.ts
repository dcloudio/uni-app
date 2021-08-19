import { getEnvLocale } from '@dcloudio/uni-shared'
import { BuiltInLocale, initVueI18n } from '@dcloudio/uni-i18n'

let i18n: ReturnType<typeof initVueI18n>

interface webviewStyleWithLanguage extends PlusWebviewWebviewStyles {
  language: string
}

export function useI18n() {
  if (!i18n) {
    let language: BuiltInLocale
    if (__PLATFORM__ === 'h5') {
      if (__NODE_JS__) {
        language = getEnvLocale() as BuiltInLocale
      } else {
        language = (__uniConfig.language || navigator.language) as BuiltInLocale
      }
    } else if (__PLATFORM__ === 'app') {
      if (typeof getApp === 'function') {
        language = weex.requireModule('plus').getLanguage() as BuiltInLocale
      } else {
        language = (
          plus.webview.currentWebview().getStyle() as webviewStyleWithLanguage
        ).language as BuiltInLocale
      }
    } else {
      language = uni.getSystemInfoSync().language as BuiltInLocale
    }
    const SET_LOCALE_API = 'i18n.setLocale'
    if (__PLATFORM__ === 'app') {
      i18n = initVueI18n(
        language,
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
      i18n = initVueI18n(language)
    }
    if (__PLATFORM__ === 'app' && typeof getApp !== 'function') {
      UniViewJSBridge.subscribe(SET_LOCALE_API, i18n.setLocale)
    }
  }
  return i18n
}
