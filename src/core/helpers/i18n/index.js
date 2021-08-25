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

let language

if (__PLATFORM__ === 'h5') {
  language = (__uniConfig.language || navigator.language)
} else if (__PLATFORM__ === 'app-plus') {
  if (typeof weex === 'object') {
    language = weex.requireModule('plus').getLanguage()
  }
} else {
  language = uni.getSystemInfoSync().language
}

export const i18n = initVueI18n(language, __PLATFORM__ === 'app-plus' || __PLATFORM__ === 'h5' ? messages : {})
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
