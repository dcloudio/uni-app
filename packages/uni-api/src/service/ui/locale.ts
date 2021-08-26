import { defineSyncApi } from '../../helpers/api'
import { useI18n } from '@dcloudio/uni-core'
import { BuiltInLocale } from '@dcloudio/uni-i18n'

export const getLocale = defineSyncApi<typeof uni.getLocale>(
  'getLocale',
  () => {
    const i18n = useI18n()
    return i18n.getLocale()
  }
)

export const setLocale = defineSyncApi<typeof uni.setLocale>(
  'setLocale',
  (locale) => {
    const i18n = useI18n()
    return i18n.setLocale(locale as BuiltInLocale)
  }
)
