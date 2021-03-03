import BaseFormatter from './format'

// 中文 (简体)，中文 (繁體)，英语，法语，西班牙语
export type BuiltInLocale = 'zh-Hans' | 'zh-Hant' | 'en' | 'fr' | 'es'

export type LocaleMessages = {
  [name in BuiltInLocale]?: Record<string, string>
}

export interface Formatter {
  interpolate: (
    message: string,
    values?: Record<string, unknown> | Array<unknown>
  ) => Array<unknown>
}

export type LocaleWatcher = (
  newLocale: BuiltInLocale,
  oldLocale: BuiltInLocale
) => void

export interface I18nOptions {
  locale: BuiltInLocale
  fallbackLocale?: BuiltInLocale
  messages: LocaleMessages
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

function normalizeLocale(
  locale: string,
  messages: LocaleMessages
): BuiltInLocale | undefined {
  if (!locale) {
    return
  }
  locale = locale.trim().replace(/_/g, '-')
  if (messages[locale as BuiltInLocale]) {
    return locale as BuiltInLocale
  }
  locale = locale.toLowerCase()
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans'
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant'
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant'
    }
    return 'zh-Hans'
  }
  const lang = startsWith(locale, ['en', 'fr', 'es'])
  if (lang) {
    return lang as BuiltInLocale
  }
}

export class I18n {
  private locale: BuiltInLocale = 'en'
  private fallbackLocale: BuiltInLocale = 'en'
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
    this.messages = messages
    this.setLocale(locale)
    if (watcher) {
      this.watchLocale(watcher)
    }
  }
  setLocale(locale: string) {
    const oldLocale = this.locale
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale
    this.message = this.messages[this.locale]!
    this.watchers.forEach((watcher) => {
      watcher(this.locale, oldLocale)
    })
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
  mergeLocaleMessage(locale: BuiltInLocale, message: Record<string, string>) {
    if (this.messages[locale]) {
      Object.assign(this.messages[locale], message)
    } else {
      this.messages[locale] = message
    }
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
