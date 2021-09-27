describe('translate', () => {
  it('mustacheConfig', () => {
    const i18n = require('../lib/index')
    i18n.configure({
      staticCatalog: {
        en: {
          test: 'test {0}'
        }
      }
    })
    i18n.setLocale('en')
    expect(i18n.__('test', { '0': 'test' })).toBe('test test')
  })
})
