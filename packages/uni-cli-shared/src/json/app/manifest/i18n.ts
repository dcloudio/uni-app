import { compileI18nJsonStr } from '@dcloudio/uni-i18n'

import { initI18nOptions } from '../../../i18n'

export function initI18n(manifestJson: Record<string, any>) {
  const i18nOptions = initI18nOptions(
    process.env.UNI_PLATFORM,
    process.env.UNI_INPUT_DIR,
    true
  )
  if (i18nOptions) {
    if (manifestJson.plus.tabBar) {
      manifestJson.plus.tabBar = JSON.parse(
        compileI18nJsonStr(
          JSON.stringify(manifestJson.plus.tabBar),
          i18nOptions
        )
      )
    }
    manifestJson.fallbackLocale = i18nOptions.locale
  }
}
