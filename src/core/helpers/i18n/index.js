import {
  initVueI18n
} from '@dcloudio/uni-i18n'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'

const messages = {
  en,
  es,
  fr,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant
}

let locale

if (__PLATFORM__ === 'h5') {
  locale = (__uniConfig.locale || navigator.language)
} else if (__PLATFORM__ === 'app-plus') {
  if (typeof weex === 'object') {
    locale = weex.requireModule('plus').getLanguage()
  }
} else {
  locale = uni.getSystemInfoSync().language
}

export const i18n = initVueI18n(locale, __PLATFORM__ === 'app-plus' || __PLATFORM__ === 'h5' ? messages : {})
export const t = i18n.t
export const i18nMixin = i18n.mixin = {
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
}
export const setLocale = i18n.setLocale
export const getLocale = i18n.getLocale

export function initAppLocale (Vue, appVm) {
  const state = Vue.observable({
    locale: i18n.getLocale()
  })
  const localeWatchers = []
  appVm.$watchLocale = (fn) => {
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
