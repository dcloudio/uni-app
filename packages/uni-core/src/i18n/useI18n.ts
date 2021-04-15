import { BuiltInLocale, initVueI18n } from '@dcloudio/uni-i18n'
import { getBaseSystemInfo } from '@dcloudio/uni-platform'
const i18n = initVueI18n(getBaseSystemInfo().language as BuiltInLocale)
export function useI18n() {
  return i18n
}
