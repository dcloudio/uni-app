import { isString } from '@vue/shared'
import {
  getEnvLocale,
  I18N_JSON_DELIMITERS,
  UNI_STORAGE_LOCALE,
} from '@dcloudio/uni-shared'
import { BuiltInLocale, initVueI18n, isI18nStr } from '@dcloudio/uni-i18n'
import { isEnableLocale } from './utils'

let i18n: ReturnType<typeof initVueI18n>

interface webviewStyleWithLanguage extends PlusWebviewWebviewStyles {
  locale: string
}

function getLocaleMessage() {
  const locale = uni.getLocale()
  const locales = __uniConfig.locales
  return (
    locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {}
  )
}

export function formatI18n(message: string) {
  if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
    return useI18n().f(message, getLocaleMessage(), I18N_JSON_DELIMITERS)
  }
  return message
}

function resolveJsonObj(
  jsonObj: Record<string, any> | undefined,
  names: string[]
): Record<string, any> | Array<Record<string, any>> | undefined {
  if (names.length === 1) {
    if (jsonObj) {
      const _isI18nStr = (value: any) =>
        isString(value) && isI18nStr(value, I18N_JSON_DELIMITERS)
      const _name = names[0]
      if (
        Array.isArray(jsonObj) &&
        jsonObj.some((item) => _isI18nStr(item[_name]))
      ) {
        return jsonObj
      }
      const value = jsonObj[names[0]]
      if (isString(value) && isI18nStr(value, I18N_JSON_DELIMITERS)) {
        return jsonObj
      }
    }
    return
  }
  const name = names.shift()!
  return resolveJsonObj(jsonObj && jsonObj[name], names)
}

export function defineI18nProperties(
  obj: Record<string, any>,
  names: string[][]
) {
  return names.map((name) => defineI18nProperty(obj, name))
}

export function defineI18nProperty(obj: Record<string, any>, names: string[]) {
  const jsonObj = resolveJsonObj(obj, names)
  if (!jsonObj) {
    return false
  }
  const prop = names[names.length - 1]
  if (Array.isArray(jsonObj)) {
    jsonObj
      .filter((item) => isI18nStr(item[prop], I18N_JSON_DELIMITERS))
      .forEach((item) => defineI18nProperty(item, [prop]))
  } else {
    let value = jsonObj[prop]
    Object.defineProperty(jsonObj, prop, {
      get() {
        return formatI18n(value)
      },
      set(v) {
        value = v
      },
    })
  }
  return true
}

export function useI18n() {
  if (!i18n) {
    let locale: BuiltInLocale
    if (__PLATFORM__ === 'h5') {
      if (__NODE_JS__) {
        locale = getEnvLocale() as BuiltInLocale
      } else {
        locale = ((window.localStorage && localStorage[UNI_STORAGE_LOCALE]) ||
          __uniConfig.locale ||
          navigator.language) as BuiltInLocale
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
    i18n = initVueI18n(locale)

    // 自定义locales
    if (isEnableLocale()) {
      const localeKeys = Object.keys(__uniConfig.locales || {})
      if (localeKeys.length) {
        localeKeys.forEach((locale) =>
          i18n.add(locale as BuiltInLocale, __uniConfig.locales[locale])
        )
      }
      // initVueI18n 时 messages 还没有，导致用户自定义 locale 可能不生效，当设置完 messages 后，重新设置 locale
      i18n.setLocale(locale)
    }
  }
  return i18n
}
