export const getLocale: typeof uni.getLocale = () => {
  // 优先使用 $locale
  const app = getApp({ allowDefault: true })
  if (app && app.$vm) {
    return app.$vm.$locale
  }
  return __GLOBAL__.getSystemInfoSync().language || 'zh-Hans'
}

export const setLocale: typeof uni.setLocale = (locale) => {
  const app = getApp()
  if (!app) {
    return false
  }
  const oldLocale = app.$vm.$locale
  if (oldLocale !== locale) {
    app.$vm.$locale = locale
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }))
    return true
  }
  return false
}

type OnLocaleChangeCallback = Parameters<typeof uni.onLocaleChange>[0]
const onLocaleChangeCallbacks: OnLocaleChangeCallback[] = []
export const onLocaleChange: typeof uni.onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn)
  }
}

if (typeof global !== 'undefined') {
  ;(global as any).getLocale = getLocale
}
