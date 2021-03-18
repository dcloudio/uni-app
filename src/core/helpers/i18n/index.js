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

const fallbackLocale = 'en'

const i18n = initVueI18n(__PLATFORM__ === 'app-plus' || __PLATFORM__ === 'h5' ? messages : {}, fallbackLocale)
export const t = i18n.t
export const i18nMixin = i18n.mixin
export const setLocale = i18n.setLocale
export const getLocale = i18n.getLocale
