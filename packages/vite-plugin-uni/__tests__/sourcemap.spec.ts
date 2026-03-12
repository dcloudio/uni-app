import { shouldMoveSourceMapFromCache } from '../src'

describe('sourcemap', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_CACHE_DIR: process.env.UNI_APP_X_CACHE_DIR,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_UVUE_SCRIPT_ENGINE: process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    NODE_ENV: process.env.NODE_ENV,
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

  test('app-ios uses cache sourcemap dir', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_CACHE_DIR = '/tmp/cache'
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    process.env.NODE_ENV = 'production'

    expect(shouldMoveSourceMapFromCache()).toBe(true)
  })

  test('Android Vapor uses cache sourcemap dir', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_CACHE_DIR = '/tmp/cache'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'js'
    process.env.NODE_ENV = 'production'

    expect(shouldMoveSourceMapFromCache()).toBe(true)
  })

  test('legacy app-android keeps output dir sourcemap', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_CACHE_DIR = '/tmp/cache'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    Reflect.set(process.env, 'UNI_APP_X_DOM2', 'false')
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'native'
    process.env.NODE_ENV = 'production'

    expect(shouldMoveSourceMapFromCache()).toBe(false)
  })
})
