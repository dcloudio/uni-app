import { getEnvLocale, I18N_JSON_DELIMITERS } from '@dcloudio/uni-shared'
import { BuiltInLocale, initVueI18n, isI18nStr } from '@dcloudio/uni-i18n'

let i18n: ReturnType<typeof initVueI18n>

interface webviewStyleWithLanguage extends PlusWebviewWebviewStyles {
  locale: string
}

function getLocaleMessage() {
  const locale = useI18n().getLocale()
  const locales = __uniConfig.locales
  return (
    locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {}
  )
}

export function formatI18n(message: string) {
  if (__uniConfig.locales && isI18nStr(message, I18N_JSON_DELIMITERS)) {
    return useI18n().f(message, getLocaleMessage())
  }
  return message
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
