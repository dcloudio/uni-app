describe('env', () => {
  it('CLI', () => {
    process.env.LANG = 'es'
    const { getLocale } = require('../lib/locale')
    expect(getLocale()).toBe('es')
  })
  it('HBuilderX', () => {
    process.env.UNI_HBUILDERX_LANGID = 'fr'
    const { getLocale } = require('../lib/locale')
    expect(getLocale()).toBe('fr')
  })
})
