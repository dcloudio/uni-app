import path from 'path'
import { initPluginUniOptions } from '../src/utils/plugin'
import { initPluginVueOptions } from '../src/vue/options'

const inputDir = path.resolve(
  __dirname,
  '../../uni-uts-v1/__tests__/examples/uni-app-x'
)

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
    UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
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
    ['android-vdom', 'app-android', false, false, ['typescript', 'decorators']],
    ['android-vapor', 'app-android', true, true, undefined],
    ['ios-vdom', 'app-ios', false, false, ['decorators']],
    ['ios-vapor', 'app-ios', true, true, undefined],
    ['harmony-vdom', 'app-harmony', false, false, ['decorators']],
    ['harmony-vapor', 'app-harmony', true, true, undefined],
    ['web', 'web', false, false, ['decorators']],
    ['mp', 'mp-weixin', false, false, ['decorators']],
  ] as const)(
    'injects the script transform for %s',
    (_name, platform, isDom2, expected, expectedParserPlugins) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_UTS_PLATFORM = platform
      if (isDom2) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }
      process.env.UNI_INPUT_DIR = inputDir
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
        inputDir,
        outputDir: '/dist',
        assetsDir: 'assets',
      } as any

      const vueOptions = initPluginVueOptions(options, uniPluginOptions)

      expect(!!(vueOptions as any).uniAppXVaporScriptTransform).toBe(expected)
      expect(vueOptions.script?.babelParserPlugins).toEqual(
        expectedParserPlugins
      )
      if (expected) {
        expect((vueOptions as any).uniAppXVaporScriptTransform).toBe(
          uniAppXVaporScriptTransform
        )
      }
    }
  )

  test('preserves configured parser plugins in DOM2', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_INPUT_DIR = inputDir
    const options = {
      base: '/',
      command: 'serve',
      platform: 'h5',
      inputDir,
      outputDir: '/dist',
      assetsDir: 'assets',
      vueOptions: {
        script: { babelParserPlugins: ['decorators-legacy'] },
      },
    } as any

    const vueOptions = initPluginVueOptions(options, initPluginUniOptions([]))

    expect(vueOptions.script?.babelParserPlugins).toEqual(['decorators-legacy'])
  })

  test('Web Vapor 显式传入定制 SFC compiler', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
    process.env.UNI_INPUT_DIR = inputDir
    const options = {
      base: '/',
      command: 'serve',
      platform: 'h5',
      inputDir,
      outputDir: '/dist',
      assetsDir: 'assets',
    } as any

    const vueOptions = initPluginVueOptions(options, initPluginUniOptions([]))

    expect(
      (vueOptions.features as typeof vueOptions.features & { vapor?: boolean })
        ?.vapor
    ).toBe(true)
    expect(vueOptions.compiler).toBe(require('vue/compiler-sfc'))
    expect(vueOptions.template).not.toHaveProperty('vaporCompiler')
  })

  test.each(['web', 'mp-weixin', 'app-ios', 'app-harmony'] as const)(
    'uses script lang parser semantics on %s',
    (platform) => {
      process.env.UNI_APP_X = 'true'
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      process.env.UNI_UTS_PLATFORM = platform
      process.env.UNI_INPUT_DIR = inputDir
      const options = {
        base: '/',
        command: 'serve',
        platform: 'h5',
        inputDir,
        outputDir: '/dist',
        assetsDir: 'assets',
      } as any
      const vueOptions = initPluginVueOptions(options, initPluginUniOptions([]))
      const compiler = require('../../uni-cli-shared/lib/@vue/compiler-sfc')
      const compile = (lang: string) => {
        const { descriptor } = compiler.parse(
          `<script setup lang="${lang}">const value: number = 1</script>`,
          { filename: '/project/pages/index/index.uvue' }
        )
        return () =>
          compiler.compileScript(descriptor, {
            ...vueOptions.script,
            id: 'test',
          })
      }

      expect(compile('js')).toThrow()
      expect(compile('ts')).not.toThrow()
      expect(compile('uts')).not.toThrow()
    }
  )

  test.each([
    ['web', 'web'],
    ['android-vdom', 'app-android'],
  ] as const)('supports decorator tuple on %s', (_name, platform) => {
    process.env.UNI_APP_X = 'true'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    process.env.UNI_UTS_PLATFORM = platform
    process.env.UNI_INPUT_DIR = inputDir
    const decorators = ['decorators', { decoratorsBeforeExport: true }] as any
    const options = {
      base: '/',
      command: 'serve',
      platform: 'h5',
      inputDir,
      outputDir: '/dist',
      assetsDir: 'assets',
      vueOptions: {
        script: { babelParserPlugins: [decorators] },
      },
    } as any
    const vueOptions = initPluginVueOptions(options, initPluginUniOptions([]))

    expect(vueOptions.script?.babelParserPlugins).toEqual([
      decorators,
      ...(platform === 'app-android' ? ['typescript'] : []),
      'decorators',
    ])
    if (platform === 'web') {
      const compiler = require('../../uni-cli-shared/lib/@vue/compiler-sfc')
      const { descriptor } = compiler.parse(
        '<script setup lang="uts">function dec(value) {}\n@dec class Foo {}</script>',
        { filename: '/project/pages/index/index.uvue' }
      )
      expect(() =>
        compiler.compileScript(descriptor, {
          ...vueOptions.script,
          id: 'test',
        })
      ).not.toThrow()
    } else {
      const {
        resolveParserPlugins,
      } = require('../../uni-app-uts/src/plugins/android/uvue/sfc/compiler/script/context')
      expect(
        resolveParserPlugins('ts', vueOptions.script?.babelParserPlugins)
      ).not.toContain('decorators-legacy')
    }
  })
})
