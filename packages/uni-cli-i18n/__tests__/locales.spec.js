

describe('locales', () => {
  it('default', () => {
    const i18n = require('../lib/index')
    expect(i18n.setLocale('fr')).toBe('en')
  })
  it('fallbacks', () => {
    const i18n = require('../lib/index')
    expect(i18n.setLocale('zh')).toBe('zh_CN')
    expect(i18n.setLocale('zh_SG')).toBe('zh_CN')
  })
})