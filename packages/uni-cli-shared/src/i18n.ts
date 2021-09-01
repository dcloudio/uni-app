import fs from 'fs'
import path from 'path'
import { I18N_JSON_DELIMITERS } from '@dcloudio/uni-shared'

export function initI18nOptions(inputDir: string, fallbackLocale?: string) {
  const locales = initLocales(path.resolve(inputDir, 'locale'))
  if (!Object.keys(locales).length) {
    return
  }
  const locale = normalizeI18nLocale(locales, fallbackLocale)
  return {
    locale,
    locales,
    delimiters: I18N_JSON_DELIMITERS,
  }
}

function initLocales(dir: string) {
  if (!fs.existsSync(dir)) {
    return {}
  }
  return fs.readdirSync(dir).reduce((res, filename) => {
    if (path.extname(filename) === '.json') {
      try {
        res[path.basename(filename).replace('.json', '')] = JSON.parse(
          fs.readFileSync(path.join(dir, filename), 'utf8')
        )
      } catch (e) {}
    }
    return res
  }, {} as Record<string, Record<string, string>>)
}

const defaultFallbackLocale = 'en'
// specifying locale > en > zh-Hans > zh-Hant > first locale
export function normalizeI18nLocale(
  locales: Record<string, Record<string, string>>,
  locale: string = defaultFallbackLocale
) {
  if (locales[locale]) {
    return locale
  }
  return (
    ['en', 'zh-Hans', 'zh-Hant'].find((n) => locales[n]) ||
    Object.keys(locales)[0] ||
    defaultFallbackLocale
  )
}
