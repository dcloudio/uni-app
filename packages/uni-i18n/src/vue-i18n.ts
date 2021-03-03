import { I18n, BuiltInLocale, LocaleMessages } from './I18n'

type Interpolate = (
  key: string,
  values?: Record<string, unknown> | Array<unknown>
) => string

function initLocaleWatcher(appVm: any, i18n: I18n) {
  appVm.$i18n &&
    appVm.$i18n.vm.$watch(
      'locale',
      (newLocale: BuiltInLocale) => {
        i18n.setLocale(newLocale)
      },
      {
        immediate: true,
      }
    )
}

function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return (navigator as any).userLanguage || navigator.language
  }
  if (typeof plus !== 'undefined') {
    // TODO 待调整为最新的获取语言代码
    return plus.os.language
  }
  return uni.getSystemInfoSync().language
}

export function initVueI18n(
  messages: LocaleMessages,
  fallbackLocale: BuiltInLocale = 'en',
  locale?: BuiltInLocale
) {
  const i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale,
    messages,
  })
  let t: Interpolate = (key, values) => {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      t = function (key, values) {
        return i18n.t(key, values)
      }
    } else {
      const appVm = getApp().$vm
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale())
        }
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
    t(key: string, values?: Record<string, unknown> | Array<unknown>) {
      return t(key, values)
    },
    getLocale() {
      return i18n.getLocale()
    },
    setLocale(newLocale: BuiltInLocale) {
      return i18n.setLocale(newLocale)
    },
    mixin: {
      beforeCreate() {
        const unwatch = i18n.watchLocale(() => {
          ;(this as any).$forceUpdate()
        })
        ;(this as any).$once('hook:beforeDestroy', function () {
          unwatch()
        })
      },
      methods: {
        $$t(key: string, values?: any) {
          return t(key, values)
        },
      },
    },
  }
}
