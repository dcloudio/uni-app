const { I18n } = require('i18n')
const { getLocale } = require('./locale')

const defaultLocale = 'en'

const locale = getLocale()

const i18n = new I18n()

const staticCatalog = {}

// 暂时仅支持 en、zh_CN
const locales = [
  'en',
  // 'es',
  // 'fr',
  // 'zh_HK',
  'zh_CN'
]

locales.forEach(item => {
  // TODO 合并 HBuilderX 内置内容
  staticCatalog[item] = require(`../locales/${item}.json`)
})

i18n.configure({
  staticCatalog,
  defaultLocale,
  retryInDefaultLocale: true,
  mustacheConfig: {
    tags: ['{', '}'],
    disable: false
  },
  fallbacks: {
    'en_*': 'en',
    zh: 'zh_CN',
    'zh_*': 'zh_CN'
  }
})

i18n.setLocale(locale)

module.exports = i18n
