import { BuiltInLocale, initVueI18n } from '@dcloudio/uni-i18n'
let i18n: ReturnType<typeof initVueI18n>
export function useI18n() {
  if (!i18n) {
    let language: BuiltInLocale
    if (__PLATFORM__ === 'h5') {
      language = navigator.language as BuiltInLocale
    } else if (__PLATFORM__ === 'app') {
      // TODO 需替换为新API
      language = plus.os.language as BuiltInLocale
    } else {
      language = uni.getSystemInfoSync().language as BuiltInLocale
    }
    i18n = initVueI18n(language)
  }
  return i18n
}
