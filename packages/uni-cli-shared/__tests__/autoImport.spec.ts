import { initAutoImportOptions } from '../src/vite/autoImport'

describe('autoImport', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_APP_X_UVUE_SCRIPT_ENGINE: process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE,
  }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_INPUT_DIR = ''
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  test('app-android legacy skips common auto import preset', () => {
    Reflect.set(process.env, 'UNI_APP_X_DOM2', 'false')
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'native'
    const options = initAutoImportOptions('app-android', {})
    const imports = options.imports as { from?: string; imports?: string[] }[]

    expect(
      imports.some(
        (preset) => preset.from === 'vue' || preset.from === '@dcloudio/uni-app'
      )
    ).toBe(false)
  })

  test('app-android vapor uses app js lifecycle preset', () => {
    Reflect.set(process.env, 'UNI_APP_X_DOM2', 'true')
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'js'
    const options = initAutoImportOptions('app-android', {})
    const imports = options.imports as { from: string; imports: string[] }[]

    expect(
      imports.some(
        (preset) =>
          preset.from === 'vue' &&
          preset.imports.includes('onLastPageBackPress')
      )
    ).toBe(true)
    expect(
      imports.some(
        (preset) =>
          preset.from === '@dcloudio/uni-app' &&
          preset.imports.includes('onAppShow')
      )
    ).toBe(false)
  })
})
