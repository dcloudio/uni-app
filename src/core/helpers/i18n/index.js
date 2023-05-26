import {
  initVueI18n,
  isI18nStr
} from '@dcloudio/uni-i18n'
import {
  isStr
} from 'uni-shared'

import {
  UNI_STORAGE_LOCALE
} from '../constants'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'

export const LOCALE_ZH_HANS = 'zh-Hans'
export const LOCALE_ZH_HANT = 'zh-Hant'
export const LOCALE_EN = 'en'
export const LOCALE_FR = 'fr'
export const LOCALE_ES = 'es'

const messages = {}

if (__PLATFORM__ === 'h5' || __PLATFORM__ === 'app-plus') {
  Object.assign(messages, {
    [LOCALE_EN]: en,
    [LOCALE_ES]: es,
    [LOCALE_FR]: fr,
    [LOCALE_ZH_HANS]: zhHans,
    [LOCALE_ZH_HANT]: zhHant
  })
}

let locale

if (__PLATFORM__ === 'h5') {
  locale = (navigator.cookieEnabled && window.localStorage && localStorage[UNI_STORAGE_LOCALE]) || __uniConfig.locale || navigator.language
} else if (__PLATFORM__ === 'app-plus') {
  if (typeof weex === 'object') {
    locale = weex.requireModule('plus').getLanguage()
  } else {
    locale = ''
  }
} else {
  locale = normalizeLocale(__GLOBAL__.getSystemInfoSync().language) || LOCALE_EN
}

function initI18nMessages () {
  if (!isEnableLocale()) {
    return
  }
  const localeKeys = Object.keys(__uniConfig.locales)
  if (localeKeys.length) {
    localeKeys.forEach((locale) => {
      const curMessages = messages[locale]
      const userMessages = __uniConfig.locales[locale]
      if (curMessages) {
        Object.assign(curMessages, userMessages)
      } else {
        messages[locale] = userMessages
      }
    })
  }
}

initI18nMessages()

export const i18n = initVueI18n(
  locale,
  __PLATFORM__ === 'app-plus' || __PLATFORM__ === 'h5' ? messages : {}
)
export const t = i18n.t
export const i18nMixin = (i18n.mixin = {
  beforeCreate () {
    const unwatch = i18n.i18n.watchLocale(() => {
      this.$forceUpdate()
    })
    this.$once('hook:beforeDestroy', function () {
      unwatch()
    })
  },
  methods: {
    $$t (key, values) {
      return t(key, values)
    }
  }
})
export const setLocale = i18n.setLocale
export const getLocale = i18n.getLocale

export function initAppLocale (Vue, appVm, locale) {
  const state = Vue.observable({
    locale: locale || i18n.getLocale()
  })
  const localeWatchers = []
  appVm.$watchLocale = fn => {
    localeWatchers.push(fn)
  }
  Object.defineProperty(appVm, '$locale', {
    get () {
      return state.locale
    },
    set (v) {
      state.locale = v
      localeWatchers.forEach(watch => watch(v))
    }
  })
}

export const I18N_JSON_DELIMITERS = ['%', '%']

function getLocaleMessage () {
  const locale = uni.getLocale()
  const locales = __uniConfig.locales
  return (
    locales[locale] || locales[__uniConfig.fallbackLocale] || locales[LOCALE_EN] || {}
  )
}

export function formatI18n (message) {
  if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
    return i18n.f(message, getLocaleMessage(), I18N_JSON_DELIMITERS)
  }
  return message
}

function resolveJsonObj (jsonObj, names) {
  if (names.length === 1) {
    if (jsonObj) {
      const _isI18nStr = (value) => isStr(value) && isI18nStr(value, I18N_JSON_DELIMITERS)
      const _name = names[0]
      let filterJsonObj = []
      if (Array.isArray(jsonObj) && (filterJsonObj = jsonObj.filter(item => _isI18nStr(item[_name]))).length) {
        return filterJsonObj
      }
      const value = jsonObj[_name]
      if (_isI18nStr(value)) {
        return jsonObj
      }
    }
    return
  }
  const name = names.shift()
  return resolveJsonObj(jsonObj && jsonObj[name], names)
}

export function defineI18nProperties (obj, names) {
  return names.map(name => defineI18nProperty(obj, name))
}

export function defineI18nProperty (obj, names) {
  const jsonObj = resolveJsonObj(obj, names)
  if (!jsonObj) {
    return false
  }
  const prop = names[names.length - 1]
  if (Array.isArray(jsonObj)) {
    jsonObj
      .forEach(item => defineI18nProperty(item, [prop]))
  } else {
    let value = jsonObj[prop]
    Object.defineProperty(jsonObj, prop, {
      get () {
        return formatI18n(value)
      },
      set (v) {
        value = v
      }
    })
  }
  return true
}

function isEnableLocale () {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
}

export function initNavigationBarI18n (navigationBar) {
  if (isEnableLocale()) {
    return defineI18nProperties(navigationBar, [
      ['titleText'],
      ['searchInput', 'placeholder'],
      ['buttons', 'text']
    ])
  }
}

export function initPullToRefreshI18n (pullToRefresh) {
  if (isEnableLocale()) {
    const CAPTION = 'caption'
    return defineI18nProperties(pullToRefresh, [
      ['contentdown', CAPTION],
      ['contentover', CAPTION],
      ['contentrefresh', CAPTION]
    ])
  }
}

export function initTabBarI18n (tabBar) {
  if (isEnableLocale() && tabBar.list) {
    tabBar.list.forEach(item => {
      defineI18nProperty(item, ['text'])
    })
  }
  return tabBar
}

function include (str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1)
}

function startsWith (str, parts) {
  return parts.find((part) => str.indexOf(part) === 0)
}

export function normalizeLocale (locale, messages) {
  if (!locale) {
    return
  }
  locale = locale.trim().replace(/_/g, '-')
  if (messages && messages[locale]) {
    return locale
  }
  locale = locale.toLowerCase()
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT
    }
    return LOCALE_ZH_HANS
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES])
  if (lang) {
    return lang
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }
