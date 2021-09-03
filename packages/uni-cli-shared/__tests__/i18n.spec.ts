import { resolveI18nLocale } from '../src/i18n'
describe('resolveI18nLocale', () => {
  test('specifying locale', () => {
    expect(resolveI18nLocale('app', ['zh-Hans', 'fr'], 'fr')).toBe('fr')
  })
  test('fallback en(app)', () => {
    expect(resolveI18nLocale('app', ['zh-Hans', 'en'], 'fr')).toBe('en')
  })
  test('fallback en(mp)', () => {
    expect(resolveI18nLocale('mp-weixin', ['zh-Hans', 'en'], 'fr')).toBe(
      'zh-Hans'
    )
  })
  test('fallback zh-Hans', () => {
    expect(resolveI18nLocale('app', ['zh-Hans', 'es'])).toBe('zh-Hans')
  })
  test('fallback zh-Hant', () => {
    expect(resolveI18nLocale('app', ['zh-Hant', 'es'])).toBe('zh-Hant')
  })
  test('fallback first locale', () => {
    expect(resolveI18nLocale('app', ['fr', 'es'])).toBe('fr')
  })
})
