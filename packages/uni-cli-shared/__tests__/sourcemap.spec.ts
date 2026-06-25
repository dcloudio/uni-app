import { withSourcemap } from '../src/vite/utils'

describe('withSourcemap', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    UNI_APP_SOURCEMAP: process.env.UNI_APP_SOURCEMAP,
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
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

  test('disables sourcemap by default for uni-app app dev build', () => {
    process.env.NODE_ENV = 'development'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_APP_X = 'false'
    Reflect.deleteProperty(process.env, 'UNI_APP_SOURCEMAP')
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

    expect(withSourcemap({ build: {} })).toBe(false)
  })

  test('allows explicit sourcemap for uni-app app dev build', () => {
    process.env.NODE_ENV = 'development'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_APP_X = 'false'
    Reflect.deleteProperty(process.env, 'UNI_APP_SOURCEMAP')
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

    expect(withSourcemap({ build: { sourcemap: true } })).toBe(true)
  })

  test('keeps development sourcemap default for other platforms', () => {
    process.env.NODE_ENV = 'development'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_APP_X = 'false'
    Reflect.deleteProperty(process.env, 'UNI_APP_SOURCEMAP')
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

    expect(withSourcemap({ build: {} })).toBe(true)
  })
})
