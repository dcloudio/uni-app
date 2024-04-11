import {
  LOCALE_EN,
  LOCALE_ES,
  LOCALE_FR,
  LOCALE_ZH_HANS,
  LOCALE_ZH_HANT,
} from '../src/I18n'

import { resolveLocale } from '../src/locale'
const resolve = resolveLocale([
  LOCALE_ZH_HANS,
  LOCALE_ZH_HANT,
  LOCALE_EN,
  LOCALE_ES,
  LOCALE_FR,
])
describe('resolveLocale', () => {
  test('zh=>zh-Hans', () => {
    expect(resolve('zh')).toBe('zh-Hans')
  })
  test('zh-CN=>zh-Hans', () => {
    expect(resolve('zh-CN')).toBe('zh-Hans')
    expect(resolve('zh_CN')).toBe('zh-Hans')
  })
  test('en-US=>en', () => {
    expect(resolve('en-US')).toBe('en')
    expect(resolveLocale(['en'])('en-US')).toBe('en')
  })
  test('a-b-c=>a-b', () => {
    expect(resolveLocale(['a-b', 'a'])('a-b-c')).toBe('a-b')
  })
})
