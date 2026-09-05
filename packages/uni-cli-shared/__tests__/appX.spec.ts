import {
  isUniAppX,
  isUniAppXAndroid,
  isUniAppXAndroidJsEngine,
  isUniAppXAndroidNative,
  isUniAppXAndroidVapor,
  isUniAppXIOS,
  isUniAppXJsEngine,
  isUniAppXStandardScriptSupported,
  isUniAppXVapor,
} from '../src/x'
import { resolveUniAppXVaporScriptLang } from '../src/json'

describe('uni-app x predicates', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_UVUE_SCRIPT_ENGINE: process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  test('non app x returns false', () => {
    process.env.UNI_APP_X = 'false'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'js'

    expect(isUniAppX()).toBe(false)
    expect(isUniAppXAndroid()).toBe(false)
    expect(isUniAppXVapor()).toBe(false)
    expect(isUniAppXJsEngine()).toBe(false)
    expect(isUniAppXStandardScriptSupported()).toBe(false)
  })

  test('app x iOS js engine predicates', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'js'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')

    expect(isUniAppX()).toBe(true)
    expect(isUniAppXIOS()).toBe(true)
    expect(isUniAppXVapor()).toBe(false)
    expect(isUniAppXJsEngine()).toBe(true)
    expect(isUniAppXAndroidJsEngine()).toBe(false)
    expect(isUniAppXStandardScriptSupported()).toBe(true)
  })

  test('app x Android vapor js engine predicates', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'js'

    expect(isUniAppXAndroid()).toBe(true)
    expect(isUniAppXVapor()).toBe(true)
    expect(isUniAppXAndroidVapor()).toBe(true)
    expect(isUniAppXJsEngine()).toBe(true)
    expect(isUniAppXAndroidJsEngine()).toBe(true)
    expect(isUniAppXAndroidNative()).toBe(false)
    expect(isUniAppXStandardScriptSupported()).toBe(true)
  })

  test('app x Android native predicates', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    Reflect.set(process.env, 'UNI_APP_X_DOM2', 'false')
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'native'

    expect(isUniAppXAndroid()).toBe(true)
    expect(isUniAppXVapor()).toBe(false)
    expect(isUniAppXAndroidVapor()).toBe(false)
    expect(isUniAppXJsEngine()).toBe(false)
    expect(isUniAppXAndroidJsEngine()).toBe(false)
    expect(isUniAppXAndroidNative()).toBe(true)
    expect(isUniAppXStandardScriptSupported()).toBe(false)
  })

  test.each(['web', 'mp-weixin', 'app-harmony'] as const)(
    'app x %s supports standard scripts without DOM2',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_UTS_PLATFORM = platform
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')

      expect(isUniAppXStandardScriptSupported()).toBe(true)
    }
  )
})

describe('uni-app x Vapor script language', () => {
  test('uses TypeScript by default', () => {
    expect(resolveUniAppXVaporScriptLang({})).toBe('ts')
  })

  test('accepts configured JavaScript and UTS values', () => {
    expect(
      resolveUniAppXVaporScriptLang({
        'uni-app-x': { 'vapor-default-script-lang': 'js' },
      })
    ).toBe('js')
    expect(
      resolveUniAppXVaporScriptLang({
        'uni-app-x': { 'vapor-default-script-lang': 'uts' },
      })
    ).toBe('uts')
  })

  test('falls back to TypeScript for invalid values', () => {
    expect(
      resolveUniAppXVaporScriptLang({
        'uni-app-x': { 'vapor-default-script-lang': 'jsx' },
      })
    ).toBe('ts')
  })
})
