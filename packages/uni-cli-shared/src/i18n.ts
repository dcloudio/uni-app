import fs from 'fs'
import path from 'path'
import { I18N_JSON_DELIMITERS, once } from '@dcloudio/uni-shared'
import { parseJson, parseManifestJsonOnce } from './json'
import { M } from './messages'

export function initI18nOptions(
  platform: UniApp.PLATFORM,
  inputDir: string,
  warning: boolean = false,
  withMessages: boolean = true
) {
  const locales = initLocales(path.resolve(inputDir, 'locale'), withMessages)
  if (!Object.keys(locales).length) {
    return
  }
  const manifestJson = parseManifestJsonOnce(inputDir)
  const fallbackLocale = manifestJson.fallbackLocale || manifestJson.locale
  const locale = resolveI18nLocale(
    platform,
    Object.keys(locales),
    fallbackLocale
  )
  if (warning) {
    if (!fallbackLocale) {
      console.warn(M['i18n.fallbackLocale.default'].replace('{locale}', locale))
    } else if (locale !== fallbackLocale) {
      console.warn(
        M['i18n.fallbackLocale.missing'].replace('{locale}', fallbackLocale)
      )
    }
  }
  return {
    locale,
    locales,
    delimiters: I18N_JSON_DELIMITERS,
  }
}

export const initI18nOptionsOnce = once(initI18nOptions)

export function initLocales(dir: string, withMessages: boolean = true) {
  if (!fs.existsSync(dir)) {
    return {}
  }
  return fs.readdirSync(dir).reduce((res, filename) => {
    if (path.extname(filename) === '.json') {
      try {
        res[path.basename(filename).replace('.json', '')] = withMessages
          ? parseJson(fs.readFileSync(path.join(dir, filename), 'utf8'))
          : {}
      } catch (e) {}
    }
    return res
  }, {} as Record<string, Record<string, string>>)
}

function resolveI18nLocale(
  platfrom: UniApp.PLATFORM,
  locales: string[],
  locale?: string
) {
  if (locale && locales.includes(locale)) {
    return locale
  }
  const defaultLocales = ['zh-Hans', 'zh-Hant']
  if (platfrom === 'app' || platfrom === 'h5') {
    defaultLocales.unshift('en')
  } else {
    // 小程序
    defaultLocales.push('en')
  }
  return defaultLocales.find((locale) => locales.includes(locale)) || locales[0]
}
