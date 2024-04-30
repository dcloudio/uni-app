import type { BuiltInLocale } from '../src/index'
import { I18n } from '../src/index'

const messages = {
  en: {
    hello: 'the world',
    helloName: 'Hello {name}',
    empty: '',
    'Hello {0}': 'Hello {0}',
    'hyphen-locale': 'hello hyphen',
    '1234': 'Number-based keys are found',
    '1mixedKey': 'Mixed keys are not found.',
    sálvame: 'save me',
  },
  'zh-Hans': {
    hello: '世界',
    helloName: '你好！{name}',
  },
}

const locales: {
  [name: string]: BuiltInLocale
} = {
  'zh-Hans': 'zh-Hans',
  'zh-CN': 'zh-Hans',
  zh_CN: 'zh-Hans',
  zh: 'zh-Hans',
  zh_cn: 'zh-Hans',
  zh_Hans_CN: 'zh-Hans',
  'zh-CHS': 'zh-Hans',
  'zh-Hans-CN': 'zh-Hans',
  'zh-Hans-TW': 'zh-Hans',
  'zh-CHT': 'zh-Hant',
  'zh-Hant': 'zh-Hant',
  'zh-TW': 'zh-Hant',
  'zh-Hant-TW': 'zh-Hant',
  'zh-HK': 'zh-Hant',
  'zh-Hant-HK': 'zh-Hant',
  'zh-MO': 'zh-Hant',
  'zh-Hant-MO': 'zh-Hant',
  en: 'en',
  'en-SG': 'en',
  'en-US': 'en',
  'en-AU': 'en',
  fr: 'fr',
  'fr-CA': 'fr',
  es: 'es',
  'es-AR': 'es',
  'sv-se': 'en', //fallback
  'ja-CN': 'en', //fallback
}

describe('i18n', () => {
  Object.keys(locales).forEach((name) => {
    test(`locale ${name}`, () => {
      const i18n = new I18n({
        locale: name as BuiltInLocale,
        fallbackLocale: 'en',
        messages: {},
      })
      expect(i18n.getLocale()).toBe(locales[name])
      i18n.setLocale('zh-Hant-HK')
      expect(i18n.getLocale()).toBe('zh-Hant')
    })
  })
  test('watchLocale', () => {
    let i = 0
    function watcher(newLocale: string, oldLocale: string) {
      i++
      expect(newLocale).toBe('zh-Hans')
      expect(oldLocale).toBe('en')
    }
    const i18n = new I18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages: {},
      watcher,
    })
    i18n.watchLocale(watcher)
    i18n.setLocale('zh')
    expect(i).toBe(2)
  })
  test('zh-Hans locale', () => {
    const i18n = new I18n({
      locale: 'zh-Hans',
      fallbackLocale: 'en',
      messages,
    })
    expect(i18n.t('hello')).toBe(messages['zh-Hans'].hello)
    expect(i18n.t('helloName', { name: '世界' })).toBe(
      messages['zh-Hans'].helloName.replace('{name}', '世界')
    )
    expect(i18n.t('helloName', 'en', { name: '世界' })).toBe(
      messages.en.helloName.replace('{name}', '世界')
    )
    expect(i18n.t('Hello {0}', ['world'])).toBe('Hello {0}')
  })
  test('en locale', () => {
    const i18n = new I18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages,
    })
    expect(i18n.t('hello')).toBe(messages.en.hello)
    expect(i18n.t('helloName', { name: 'world' })).toBe(
      messages.en.helloName.replace('{name}', 'world')
    )
    expect(i18n.t('Hello {0}', ['world'])).toBe(
      messages.en['Hello {0}'].replace('{0}', 'world')
    )
    expect(i18n.t('empty')).toBe(messages.en.empty)
    expect(i18n.t('hyphen-locale')).toBe(messages.en['hyphen-locale'])
    expect(i18n.t(1234 as unknown as string)).toBe(messages.en[1234])
    expect(i18n.t('1mixedKey')).toBe(messages.en['1mixedKey'])
    expect(i18n.t('sálvame')).toBe(messages.en['sálvame'])
  })
})
