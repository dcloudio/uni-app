const { I18n } = require('i18n')
const { osLocale } = require('os-locale-s/cjs')
const { format } = require('./lang')

const defaultLocale = format(process.env.UNI_HBUILDERX_LANGID || osLocale.sync({ spawn: false, cache: false }) || 'en')

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
  defaultLocale
})

module.exports = i18n
