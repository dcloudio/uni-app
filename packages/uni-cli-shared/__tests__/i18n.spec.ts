import { normalizeI18nLocale } from '../src/i18n'
describe('normalizeI18nLocale', () => {
  test('specifying locale', () => {
    expect(normalizeI18nLocale({ 'zh-Hans': {}, fr: {} }, 'fr')).toBe('fr')
  })
  test('fallback en', () => {
    expect(normalizeI18nLocale({ 'zh-Hans': {}, en: {} }, 'fr')).toBe('en')
  })
  test('fallback zh-Hans', () => {
    expect(normalizeI18nLocale({ 'zh-Hans': {}, es: {} })).toBe('zh-Hans')
  })
  test('fallback zh-Hant', () => {
    expect(normalizeI18nLocale({ 'zh-Hant': {}, es: {} })).toBe('zh-Hant')
  })
  test('fallback first locale', () => {
    expect(normalizeI18nLocale({ fr: {}, es: {} })).toBe('fr')
  })
})
