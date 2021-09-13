// https://zh.wikipedia.org/wiki/ISO_639-1%E4%BB%A3%E7%A0%81%E8%A1%A8
const trs = document.querySelector('.wikitable').querySelectorAll('tr')
const localeObj = {
  'es-US': '西班牙语（美国）',
  'es-419': '西班牙语（拉丁美洲）',
  'en-AU': '英语（澳大利亚）',
  'en-CA': '英语（加拿大）',
  'en-IN': '英语（印度）',
  'en-IE': '英语（爱尔兰）',
  'en-NZ': '英语（新西兰）',
  'en-SG': '英语（新加坡）',
  'en-ZA': '英语（南非）',
  'en-GB': '英语（英国）',
  'en-US': '英语 (美国)',
  'fr-CA': '法语（加拿大）',
  'pt-BR': '葡萄牙语（巴西）',
  'zh-Hans': '中文（简体）',
  'zh-Hant': '中文（繁体）',
  'zh-Hant-HK': '中文（繁体，香港）',
  'zh-Hant-MO': '中文（繁体，澳门）',
  'zh-Hant-TW': '中文（繁体，台湾）',
}
trs.forEach((tr, index) => {
  if (index === 0) {
    return
  }
  const tds = tr.querySelectorAll('td')
  const name = tds[2].innerText.trim()
  const code = tds[5].innerText.trim()
  localeObj[code] = name
})
const locales = Object.keys(localeObj)
  .sort()
  .reduce((r, n) => {
    r[n] = localeObj[n]
    return r
  }, {})

console.log(locales, Object.keys(locales).length, JSON.stringify(locales))
console.log(
  JSON.stringify(
    Object.keys(locales).reduce((r, n) => {
      r[n] = '%' + n + '%'
      return r
    }, {})
  )
)
