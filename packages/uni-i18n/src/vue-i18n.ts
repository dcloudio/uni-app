import { I18n, BuiltInLocale, LocaleMessages, LOCALE_EN } from './I18n'

const ignoreVueI18n = true

type Interpolate = (
  key: string,
  values?: Record<string, unknown> | Array<unknown>
) => string

function initLocaleWatcher(appVm: any, i18n: I18n) {
  if (appVm.$i18n) {
    const vm = appVm.$i18n.vm ? appVm.$i18n.vm : appVm
    vm.$watch(
      appVm.$i18n.vm ? 'locale' : () => appVm.$i18n.locale,
      (newLocale: BuiltInLocale) => {
        i18n.setLocale(newLocale)
      },
      {
        immediate: true,
      }
    )
  }
}

// function getDefaultLocale() {
//   if (typeof navigator !== 'undefined') {
//     return (navigator as any).userLanguage || navigator.language
//   }
//   if (typeof plus !== 'undefined') {
//     // TODO 待调整为最新的获取语言代码
//     return plus.os.language
//   }
//   return uni.getSystemInfoSync().language
// }

export function initVueI18n(
  locale: BuiltInLocale = LOCALE_EN,
  messages: LocaleMessages = {},
  fallbackLocale: BuiltInLocale = LOCALE_EN,
  watcher?: (locale: BuiltInLocale) => void
) {
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    ;[locale, messages] = [messages as BuiltInLocale, locale as LocaleMessages]
  }
  if (typeof locale !== 'string') {
    locale = fallbackLocale
  }
  const i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale,
    messages,
    watcher,
  })
  let t: Interpolate = (key, values) => {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      t = function (key, values) {
        return i18n.t(key, values)
      }
    } else {
      const appVm = getApp().$vm
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        t = function (key, values) {
          return i18n.t(key, values)
        }
      } else {
        initLocaleWatcher(appVm, i18n)
        /* eslint-disable no-func-assign */
        t = function (key, values) {
          const $i18n = appVm.$i18n
          const silentTranslationWarn = $i18n.silentTranslationWarn
          $i18n.silentTranslationWarn = true
          const msg = appVm.$t(key, values)
          $i18n.silentTranslationWarn = silentTranslationWarn
          if (msg !== key) {
            return msg
          }
          return i18n.t(key, $i18n.locale, values)
        }
      }
    }
    return t(key, values)
  }
  return {
    i18n,
    t(key: string, values?: Record<string, unknown> | Array<unknown>) {
      return t(key, values)
    },
    add(locale: BuiltInLocale, message: Record<string, string>) {
      return i18n.add(locale, message)
    },
    getLocale() {
      return i18n.getLocale()
    },
    setLocale(newLocale: BuiltInLocale) {
      return i18n.setLocale(newLocale)
    },
  }
}
