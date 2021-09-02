import {
  I18n,
  BuiltInLocale,
  LocaleMessages,
  LOCALE_EN,
  LocaleWatcher,
} from './I18n'

const ignoreVueI18n = true

type Interpolate = (
  key: string,
  values?: Record<string, unknown> | Array<unknown>
) => string

function watchAppLocale(appVm: any, i18n: I18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale((newLocale: string) => {
      i18n.setLocale(newLocale)
    })
  } else {
    appVm.$watch(
      () => appVm.$locale,
      (newLocale: string) => {
        i18n.setLocale(newLocale)
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

const i18nInstances: I18n[] = []

export function initVueI18n(
  locale?: string,
  messages: LocaleMessages = {},
  fallbackLocale?: string,
  watcher?: (locale: string) => void
) {
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    ;[locale, messages] = [
      messages as unknown as string,
      locale as unknown as LocaleMessages,
    ]
  }
  if (typeof locale !== 'string') {
    locale =
      (typeof uni !== 'undefined' && uni.getLocale && uni.getLocale()) ||
      LOCALE_EN
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
      (typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale) ||
      LOCALE_EN
  }

  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher,
  })

  i18nInstances.push(i18n)

  let t: Interpolate = (key, values) => {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      t = function (key, values) {
        return i18n.t(key, values)
      }
    } else {
      const appVm = getApp().$vm
      watchAppLocale(appVm, i18n)
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        t = function (key, values) {
          // 触发响应式
          appVm.$locale
          return i18n.t(key, values)
        }
      } else {
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
    f(
      message: string,
      values?: Record<string, unknown> | Array<unknown>,
      delimiters?: [string, string]
    ) {
      return i18n.f(message, values, delimiters)
    },
    t(key: string, values?: Record<string, unknown> | Array<unknown>) {
      return t(key, values)
    },
    add(
      locale: BuiltInLocale,
      message: Record<string, string>,
      override: boolean = true
    ) {
      return i18n.add(locale, message, override)
    },
    watch(fn: LocaleWatcher) {
      return i18n.watchLocale(fn)
    },
    getLocale() {
      return i18n.getLocale()
    },
    setLocale(newLocale: string) {
      return i18n.setLocale(newLocale)
    },
  }
}
