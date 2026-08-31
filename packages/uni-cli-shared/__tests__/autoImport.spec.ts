import AutoImport from 'unplugin-auto-import/vite'
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

  test('includes standard JavaScript modules', () => {
    const options = initAutoImportOptions('app-harmony', {})
    const plugin = AutoImport(options)
    const isIncluded = plugin.transformInclude as (id: string) => boolean

    expect(isIncluded('/src/store/index.js')).toBe(true)
    expect(isIncluded('/src/node_modules/uni-app-x-package/index.js')).toBe(
      true
    )
    expect(isIncluded('/src/store/index.ts')).toBe(true)
    expect(isIncluded('/src/store/index.uts')).toBe(true)
    expect(isIncluded('/src/pages/index.uvue?vue&type=script')).toBe(true)
    expect(isIncluded('/src/store/index.js?raw')).toBe(false)
    expect(isIncluded('/src/pages.json')).toBe(false)
  })

  test('injects auto imports into JavaScript modules', async () => {
    const plugin = AutoImport(initAutoImportOptions('app-harmony', {}))
    const transform = plugin.transform as Function
    const projectResult = await transform(
      'export const state = reactive({})',
      '/src/store/index.js'
    )
    const dependencyResult = await transform(
      'export const state = reactive({})',
      '/src/node_modules/uni-app-x-package/index.js'
    )
    const commonjsResult = await transform(
      'module.exports = () => reactive({})',
      '/src/node_modules/uni-app-x-package/index.js'
    )

    expect(projectResult.code).toContain("import { reactive } from 'vue';")
    expect(dependencyResult.code).toContain("import { reactive } from 'vue';")
    expect(commonjsResult.code).toContain(
      "const { reactive } = require('vue');"
    )
    expect(
      await transform(
        "import { reactive } from 'vue'\nexport const state = reactive({})",
        '/src/manual-import.js'
      )
    ).toBeUndefined()
    expect(
      await transform(
        'export const value = 1',
        '/src/node_modules/third-party/index.js'
      )
    ).toBeUndefined()
  })
})
