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
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
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

  test.each([
    ['android-vdom', 'app-android', false, false],
    ['android-vapor', 'app-android', true, true],
    ['ios-vdom', 'app-ios', false, false],
    ['ios-vapor', 'app-ios', true, true],
    ['harmony-vdom', 'app-harmony', false, false],
    ['harmony-vapor', 'app-harmony', true, true],
    ['web', 'web', false, false],
    ['mp', 'mp-weixin', false, false],
  ] as const)(
    'injects the script transform for %s',
    (_name, platform, isDom2, expected) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_UTS_PLATFORM = platform
      if (isDom2) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }
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

      expect(!!(vueOptions as any).uniAppXVaporScriptTransform).toBe(expected)
      if (expected) {
        expect((vueOptions as any).uniAppXVaporScriptTransform).toBe(
          uniAppXVaporScriptTransform
        )
      }
    }
  )
})
