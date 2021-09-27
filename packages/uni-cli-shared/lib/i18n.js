const fs = require('fs')
const path = require('path')
const {
  parseJson
} = require('./json')
const {
  getManifestJson
} = require('./manifest')

const delimiters = ['%', '%']

function initI18nOptions (
  platform,
  inputDir,
  warning = false,
  withMessages = true
) {
  const locales = initLocales(path.resolve(inputDir, 'locale'), withMessages)
  if (!Object.keys(locales).length) {
    return
  }
  const manifestJson = getManifestJson()
  const fallbackLocale = manifestJson.fallbackLocale || manifestJson.locale
  const locale = resolveI18nLocale(
    platform,
    Object.keys(locales),
    fallbackLocale
  )
  if (warning) {
    if (!fallbackLocale) {
      console.warn()
    } else if (locale !== fallbackLocale) {
      console.warn()
    }
  }
  return {
    locale,
    locales,
    delimiters
  }
}

const localeJsonRE = /uni-app.*.json/

function isUniAppLocaleFile (filepath) {
  if (!filepath) {
    return false
  }
  return localeJsonRE.test(path.basename(filepath))
}

function parseLocaleJson (filepath) {
  let jsonObj = parseJson(fs.readFileSync(filepath, 'utf8'))
  if (isUniAppLocaleFile(filepath)) {
    jsonObj = jsonObj.common || {}
  }
  return jsonObj
}

function initLocales (dir, withMessages = true) {
  if (!fs.existsSync(dir)) {
    return {}
  }
  return fs.readdirSync(dir).reduce((res, filename) => {
    if (path.extname(filename) === '.json') {
      const locale = path
        .basename(filename)
        .replace(/(uni-app.)?(.*).json/, '$2')
      if (withMessages) {
        Object.assign(
          res[locale] || (res[locale] = {}),
          parseLocaleJson(path.join(dir, filename))
        )
      } else {
        res[locale] = {}
      }
    }
    return res
  }, {})
}

function resolveI18nLocale (platfrom, locales, locale) {
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
  return defaultLocales.find(locale => locales.includes(locale)) || locales[0]
}

module.exports = {
  initLocales,
  initI18nOptions
}
