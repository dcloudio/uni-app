export const getLocale: typeof uni.getLocale = () => {
  // 优先使用 $locale
  const app = getApp({ allowDefault: true })
  if (app && app.$vm) {
    return app.$vm.$locale
  }
  return uni.getSystemInfoSync().language || 'zh-Hans'
}

export const setLocale: typeof uni.setLocale = (locale) => {
  const oldLocale = getApp().$vm.$locale
  if (oldLocale !== locale) {
    getApp().$vm.$locale = locale
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }))
    return true
  }
  return false
}

type OnLocaleCHangeCallback = Parameters<typeof uni.onLocaleChange>[0]
const onLocaleChangeCallbacks: OnLocaleCHangeCallback[] = []
export const onLocaleChange: typeof uni.onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn)
  }
}
