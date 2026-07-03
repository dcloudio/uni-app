import {
  isUniAppX,
  isUniAppXAndroid,
  isUniAppXAndroidJsEngine,
  isUniAppXAndroidNative,
  isUniAppXAndroidVapor,
  isUniAppXIOS,
  isUniAppXJsEngine,
  isUniAppXVapor,
} from '../src/x'

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
  })
})
