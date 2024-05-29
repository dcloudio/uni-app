import {
  type BuiltInLocale,
  I18n,
  LOCALE_EN,
  type LocaleMessages,
  type LocaleWatcher,
} from './I18n'

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

function getDefaultLocale(): string {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale()
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && (global as any).getLocale) {
    return (global as any).getLocale()
  }
  return LOCALE_EN
}

export function initVueI18n(
  locale?: string,
  messages: LocaleMessages = {},
  fallbackLocale?: string,
  watcher?: (locale: string) => void
) {
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    // ;[locale, messages] = [
    //   messages as unknown as string,
    //   locale as unknown as LocaleMessages,
    // ]
    // 暂不使用数组解构，uts编译器暂未支持。
    const options = [
      messages as unknown as string,
      locale as unknown as LocaleMessages,
    ]
    locale = options[0] as string
    messages = options[1] as LocaleMessages
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale()
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

  let t: Interpolate = (key, values) => {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      t = function (key, values) {
        return i18n.t(key, values)
      }
    } else {
      let isWatchedAppLocale = false
      t = function (key, values) {
        const appVm = getApp().$vm
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true
            watchAppLocale(appVm, i18n)
          }
        }
        return i18n.t(key, values)
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
