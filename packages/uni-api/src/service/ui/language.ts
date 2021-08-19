import { defineSyncApi } from '../../helpers/api'
import { useI18n } from '@dcloudio/uni-core'
import { BuiltInLocale } from '@dcloudio/uni-i18n'

export const getLanguage = defineSyncApi<typeof uni.getLanguage>(
  'getLanguage',
  () => {
    const i18n = useI18n()
    return i18n.getLocale()
  }
)

export const setLanguage = defineSyncApi<typeof uni.setLanguage>(
  'setLanguage',
  (locale) => {
    const i18n = useI18n()
    return i18n.setLocale(locale as BuiltInLocale)
  }
)
