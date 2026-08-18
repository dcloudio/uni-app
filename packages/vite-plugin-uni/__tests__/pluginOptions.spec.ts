import { initPluginUniOptions } from '../src/utils/plugin'
import { initPluginVueOptions } from '../src/vue/options'

describe('initPluginUniOptions', () => {
  test('collects the uni-app x Vapor script transform', () => {
    const uniAppXVaporScriptTransform = jest.fn()

    const options = initPluginUniOptions([
      {
        name: 'uni:vapor-script',
        uni: {
          uniAppXVaporScriptTransform,
        },
      },
    ])

    expect(options.uniAppXVaporScriptTransform).toBe(
      uniAppXVaporScriptTransform
    )
  })
})

describe('initPluginVueOptions', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_VAPOR_SCRIPT_LANG: process.env.UNI_APP_X_VAPOR_SCRIPT_LANG,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
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

  test('injects the script transform only in uni-app x Vapor mode', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = 'true'
    process.env.UNI_INPUT_DIR = '/project'
    const uniAppXVaporScriptTransform = jest.fn()
    const plugin = {
      name: 'uni:vapor-script',
      uni: { uniAppXVaporScriptTransform },
    }
    const uniPluginOptions = initPluginUniOptions([plugin])
    const options = {
      base: '/',
      command: 'serve',
      platform: 'h5',
      inputDir: '/project',
      outputDir: '/dist',
      assetsDir: 'assets',
    } as any

    const vueOptions = initPluginVueOptions(options, uniPluginOptions)

    expect((vueOptions as any).uniAppXVaporScriptTransform).toBe(
      uniAppXVaporScriptTransform
    )

    process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = 'false'
    options.vueOptions = undefined
    const disabledVueOptions = initPluginVueOptions(options, uniPluginOptions)

    expect(
      (disabledVueOptions as any).uniAppXVaporScriptTransform
    ).toBeUndefined()

    delete process.env.UNI_APP_X_DOM2
    options.vueOptions = undefined
    const nonVaporVueOptions = initPluginVueOptions(options, uniPluginOptions)

    expect(
      (nonVaporVueOptions as any).uniAppXVaporScriptTransform
    ).toBeUndefined()
  })
})
