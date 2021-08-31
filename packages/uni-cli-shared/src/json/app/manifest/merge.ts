import { recursive } from 'merge'
import { M } from '../../../messages'
import { initI18nOptions } from '../../../i18n'

export function initRecursiveMerge(
  manifestJson: Record<string, any>,
  userManifestJson: Record<string, any>
): Record<string, any> {
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
  }
  return recursive(
    true,
    manifestJson,
    {
      id: userManifestJson.appid || '',
      name: userManifestJson.name || '',
      description: userManifestJson.description || '',
      version: {
        name: userManifestJson.versionName,
        code: userManifestJson.versionCode,
      },
      locale: userManifestJson.locale,
      fallbackLocale,
    },
    { plus: userManifestJson['app-plus'] }
  )
}
