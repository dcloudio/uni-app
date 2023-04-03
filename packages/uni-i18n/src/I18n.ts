import BaseFormatter from './format'

export const LOCALE_ZH_HANS = 'zh-Hans'
export const LOCALE_ZH_HANT = 'zh-Hant'
export const LOCALE_EN = 'en'
export const LOCALE_FR = 'fr'
export const LOCALE_ES = 'es'

// 中文 (简体)，中文 (繁體)，英语，法语，西班牙语
export type BuiltInLocale =
  | typeof LOCALE_ZH_HANS
  | typeof LOCALE_ZH_HANT
  | typeof LOCALE_EN
  | typeof LOCALE_FR
  | typeof LOCALE_ES

export type LocaleMessages = Record<string, Record<string, string>>

export interface Formatter {
  interpolate: (
    message: string,
    values?: Record<string, unknown> | Array<unknown>,
    delimiters?: [string, string]
  ) => Array<unknown>
}

export type LocaleWatcher = (newLocale: string, oldLocale: string) => void

export interface I18nOptions {
  locale: string
  fallbackLocale?: string
  messages?: LocaleMessages
  formater?: Formatter
  watcher?: LocaleWatcher
}

const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val: object, key: string | symbol): key is keyof typeof val =>
  hasOwnProperty.call(val, key)

const defaultFormatter = new BaseFormatter()

function include(str: string, parts: string[]) {
  return !!parts.find((part) => str.indexOf(part) !== -1)
}
function startsWith(str: string, parts: string[]) {
  return parts.find((part) => str.indexOf(part) === 0)
}

export function normalizeLocale(
  locale: string,
  messages?: LocaleMessages
): BuiltInLocale | undefined {
  if (!locale) {
    return
  }
  locale = locale.trim().replace(/_/g, '-')
  if (messages && messages[locale as BuiltInLocale]) {
    return locale as BuiltInLocale
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
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES]
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages)
  }
  const lang = startsWith(locale, locales)
  if (lang) {
    return lang as BuiltInLocale
  }
}

export class I18n {
  private locale: string = LOCALE_EN
  private fallbackLocale: string = LOCALE_EN
  private message: Record<string, string> = {}
  private messages: LocaleMessages = {}
  private watchers: LocaleWatcher[] = []
  private formater: Formatter
  constructor({
    locale,
    fallbackLocale,
    messages,
    watcher,
    formater,
  }: I18nOptions) {
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale
    }
    this.formater = formater || defaultFormatter
    this.messages = messages || {}
    this.setLocale(locale || LOCALE_EN)
    if (watcher) {
      this.watchLocale(watcher)
    }
  }
  setLocale(locale: string) {
    const oldLocale = this.locale
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale
    if (!this.messages[this.locale]) {
      // 可能初始化时不存在
      this.messages[this.locale] = {}
    }
    this.message = this.messages[this.locale]!
    // 仅发生变化时，通知
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale)
      })
    }
  }
  getLocale() {
    return this.locale
  }
  watchLocale(fn: LocaleWatcher) {
    const index = this.watchers.push(fn) - 1
    return () => {
      this.watchers.splice(index, 1)
    }
  }
  add(
    locale: BuiltInLocale,
    message: Record<string, string>,
    override: boolean = true
  ) {
    const curMessages = this.messages[locale]
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message)
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key]
          }
        })
      }
    } else {
      this.messages[locale] = message
    }
  }
  f(
    message: string,
    values?: Record<string, unknown> | Array<unknown>,
    delimiters?: [string, string]
  ) {
    return this.formater.interpolate(message, values, delimiters).join('')
  }
  t(
    key: string,
    values?: Record<string, unknown> | Array<unknown> | BuiltInLocale
  ): string
  t(
    key: string,
    locale?: BuiltInLocale,
    values?: Record<string, unknown> | Array<unknown>
  ): string
  t(
    key: string,
    locale?: BuiltInLocale,
    values?: Record<string, unknown> | Array<unknown>
  ) {
    let message = this.message
    if (typeof locale === 'string') {
      locale = normalizeLocale(locale, this.messages)
      locale && (message = this.messages[locale]!)
    } else {
      values = locale
    }
    if (!hasOwn(message, key)) {
      console.warn(
        `Cannot translate the value of keypath ${key}. Use the value of keypath as default.`
      )
      return key
    }
    return this.formater.interpolate(message[key], values).join('')
  }
}
