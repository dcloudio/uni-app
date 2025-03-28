import fs from 'fs'
import path from 'path'
import { sync } from 'fast-glob'
import { extend } from '@vue/shared'
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
  let fallbackLocale = manifestJson.fallbackLocale || 'en'
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

const localeJsonRE = /uni-app.*.json/

export function isUniAppLocaleFile(filepath: string) {
  if (!filepath) {
    return false
  }
  return localeJsonRE.test(path.basename(filepath))
}

function parseLocaleJson(filepath: string) {
  let jsonObj = parseJson(fs.readFileSync(filepath, 'utf8'), false, filepath)
  if (isUniAppLocaleFile(filepath)) {
    jsonObj = jsonObj.common || {}
  }
  return jsonObj
}

export function getLocaleFiles(cwd: string) {
  return sync('*.json', { cwd, absolute: true })
}

export function initLocales(dir: string, withMessages: boolean = true) {
  if (!fs.existsSync(dir)) {
    return {}
  }
  return fs.readdirSync(dir).reduce((res, filename) => {
    if (path.extname(filename) === '.json') {
      try {
        const locale = path
          .basename(filename)
          .replace(/(uni-app.)?(.*).json/, '$2')
        if (withMessages) {
          extend(
            res[locale] || (res[locale] = {}),
            parseLocaleJson(path.join(dir, filename))
          )
        } else {
          res[locale] = {}
        }
      } catch (e) {}
    }
    return res
  }, {} as Record<string, Record<string, string>>)
}

export function resolveI18nLocale(
  platform: UniApp.PLATFORM,
  locales: string[],
  locale?: string
) {
  if (locale && locales.includes(locale)) {
    return locale
  }
  const defaultLocales = ['zh-Hans', 'zh-Hant']
  if (platform === 'app' || platform === 'h5') {
    defaultLocales.unshift('en')
  } else {
    // 小程序
    defaultLocales.push('en')
  }
  return defaultLocales.find((locale) => locales.includes(locale)) || locales[0]
}
