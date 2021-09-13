// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
const trs = document.querySelector('.wikitable').querySelectorAll('tr')
const localeObj = {
  'es-US': 'Spanish (US)',
  'es-419': 'Spanish (Latin America)',
  'en-AU': 'English (Australia)',
  'en-CA': 'English (Canada)',
  'en-IN': 'English (India)',
  'en-IE': 'English (Ireland)',
  'en-NZ': 'English (New Zealand)',
  'en-SG': 'English (Singapore)',
  'en-ZA': 'English (South Africa)',
  'en-GB': 'English (UK)',
  'en-US': 'English (US)',
  'fr-CA': 'French (Canada)',
  'pt-BR': 'Portuguese (Brazil)',
  'zh-Hans': 'Chinese, Simplified',
  'zh-Hant': 'Chinese, Traditional',
  'zh-Hant-HK': 'Chinese, Traditional (Hong Kong)',
  'zh-Hant-MO': 'Chinese, Traditional (Macao)',
  'zh-Hant-TW': 'Chinese, Traditional (Taiwan)',
}
localeObj.bh = 'Bihari'
trs.forEach((tr, index) => {
  if (index === 0) {
    return
  }
  const tds = tr.querySelectorAll('td')
  const name = tds[2].innerText.trim()
  const code = tds[4].innerText.trim()
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
