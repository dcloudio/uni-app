import {
  getLocale,
  setLocale
} from 'uni-core/helpers/i18n'

export function getLanguage () {
  return getLocale()
}

export function setLanguage (locale) {
  return setLocale(locale)
}
