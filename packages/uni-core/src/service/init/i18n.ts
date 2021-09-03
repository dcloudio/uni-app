import { BuiltInLocale } from '@dcloudio/uni-i18n'
import { useI18n } from '../../i18n'

export function initI18n() {
  const localeKeys = Object.keys(__uniConfig.locales || {})
  if (localeKeys.length) {
    const i18n = useI18n()
    localeKeys.forEach((locale) =>
      i18n.add(locale as BuiltInLocale, __uniConfig.locales[locale])
    )
  }
}
