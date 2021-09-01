import { isString } from '@vue/shared'
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
  if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
    return useI18n().f(message, getLocaleMessage(), I18N_JSON_DELIMITERS)
  }
  return message
}

function resolveJsonObj(
  jsonObj: Record<string, any> | undefined,
  names: string[]
): Record<string, any> | undefined {
  if (names.length === 1) {
    if (jsonObj) {
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
  names.forEach((name) => defineI18nProperty(obj, name))
}

export function defineI18nProperty(obj: Record<string, any>, names: string[]) {
  const jsonObj = resolveJsonObj(obj, names)
  if (!jsonObj) {
    return
  }
  const prop = names[names.length - 1]
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
    i18n = initVueI18n(locale)
  }
  return i18n
}
