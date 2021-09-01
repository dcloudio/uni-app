import { compileI18nJsonStr } from '@dcloudio/uni-i18n'

import { M } from '../../../messages'
import { initI18nOptions } from '../../../i18n'

export function initI18n(
  manifestJson: Record<string, any>,
  userManifestJson: Record<string, any>
) {
  const i18nOptions = initI18nOptions(
    process.env.UNI_INPUT_DIR,
    userManifestJson.fallbackLocale
  )
  let fallbackLocale: string | undefined = undefined
  if (i18nOptions) {
    fallbackLocale = i18nOptions.locale
    if (!userManifestJson.fallbackLocale) {
      console.warn(
        M['i18n.fallbackLocale.missing'].replace('{locale}', fallbackLocale)
      )
    } else if (userManifestJson.fallbackLocale !== fallbackLocale) {
      console.warn(
        M['i18n.fallbackLocale.unmatch'].replace(
          '{locale}',
          userManifestJson.fallbackLocale
        )
      )
    }
    if (manifestJson.plus.tabBar) {
      manifestJson.plus.tabBar = JSON.parse(
        compileI18nJsonStr(
          JSON.stringify(manifestJson.plus.tabBar),
          i18nOptions
        )
      )
    }
    manifestJson.fallbackLocale = fallbackLocale
  }
}
