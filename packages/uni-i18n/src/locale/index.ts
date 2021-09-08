import { normalizeLocale } from '../I18n'

type Locale = string

export function resolveLocale(locales: Locale[]) {
  return (locale: Locale) => {
    if (!locale) {
      return locale
    }
    locale = normalizeLocale(locale) || locale
    return resolveLocaleChain(locale).find(
      (locale) => locales.indexOf(locale) > -1
    )
  }
}

function resolveLocaleChain(locale: Locale): Locale[] {
  const chain: Locale[] = []
  const tokens = locale.split('-')
  while (tokens.length) {
    chain.push(tokens.join('-'))
    tokens.pop()
  }
  return chain
}
