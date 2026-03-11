import { initAutoImportOptions } from '../src/vite/autoImport'

describe('autoImport', () => {
  const originalAppX = process.env.UNI_APP_X
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalInputDir = process.env.UNI_INPUT_DIR

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_INPUT_DIR = ''
  })

  afterEach(() => {
    process.env.UNI_APP_X = originalAppX
    process.env.UNI_APP_X_DOM2 = originalDom2
    process.env.UNI_INPUT_DIR = originalInputDir
  })

  test('app-android legacy skips common auto import preset', () => {
    process.env.UNI_APP_X_DOM2 = 'false' as any
    const options = initAutoImportOptions('app-android', {})
    const imports = options.imports as { from?: string; imports?: string[] }[]

    expect(
      imports.some(
        (preset) => preset.from === 'vue' || preset.from === '@dcloudio/uni-app'
      )
    ).toBe(false)
  })

  test('app-android vapor uses app js lifecycle preset', () => {
    process.env.UNI_APP_X_DOM2 = 'true' as any
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
