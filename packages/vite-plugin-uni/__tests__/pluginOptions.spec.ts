import path from 'path'
import fs from 'fs'
import { initPluginUniOptions } from '../src/utils/plugin'
import { initPluginVueOptions } from '../src/vue/options'
import {
  isUniPageFile,
  normalizePagesJson,
  pagesCacheSet,
  parsePagesJsonOnce,
  windowsCacheSet,
} from '@dcloudio/uni-cli-shared'

// 此处仅验证 ID 策略，真实编译器接入另由开发/发行编译验证。
jest.mock('@dcloudio/compiler-vapor-web', () => ({
  UNI_APP_SCOPE_ID: require('../../uni-cli-shared/lib/dom2/web/@vue/shared')
    .UNI_APP_SCOPE_ID,
}))

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
    NODE_ENV: process.env.NODE_ENV,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    VITE_ROOT_DIR: process.env.VITE_ROOT_DIR,
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
    ['ios-vdom', 'app-ios', false, false, ['typescript', 'decorators']],
    ['ios-vapor', 'app-ios', true, true, undefined],
    ['harmony-vdom', 'app-harmony', false, false, ['typescript', 'decorators']],
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

  test('records script language metadata and limits implicit markers to development', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-harmony'
    process.env.UNI_INPUT_DIR = inputDir
    const createDescriptor = () =>
      ({
        script: null,
        scriptSetup: { attrs: {} },
      } as any)
    const createVueOptions = () =>
      initPluginVueOptions(
        {
          base: '/',
          command: 'serve',
          platform: 'app-harmony',
          inputDir,
          outputDir: '/dist',
          assetsDir: 'assets',
        } as any,
        initPluginUniOptions([])
      ) as any

    process.env.NODE_ENV = 'development'
    const developmentDescriptor = createDescriptor()
    const developmentTransform = createVueOptions().uniAppXVaporSfcTransform
    developmentTransform(developmentDescriptor)
    // compiler-sfc 的解析缓存可能让同一 descriptor 再次进入扩展点。
    developmentTransform(developmentDescriptor)
    expect(developmentDescriptor.__uniAppXVaporSfcMeta).toEqual({
      scriptLang: 'ts',
      hasImplicitLang: true,
      defaultLang: 'ts',
    })

    process.env.NODE_ENV = 'production'
    const productionDescriptor = createDescriptor()
    createVueOptions().uniAppXVaporSfcTransform(productionDescriptor)
    expect(productionDescriptor.scriptSetup.lang).toBe('ts')
    expect(productionDescriptor.__uniAppXVaporSfcMeta).toEqual({
      scriptLang: 'ts',
    })
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

  test.each([
    'web',
    'mp-weixin',
    'app-android',
    'app-ios',
    'app-harmony',
  ] as const)(
    'preserves the platform script parser behavior on %s',
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

      if (platform === 'web' || platform === 'mp-weixin') {
        expect(compile('js')).toThrow()
      } else {
        // App VDOM 保持历史 UTS 解析规则，不按标准 JS/TS 区分解析器。
        expect(compile('js')).not.toThrow()
      }
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

  test.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])(
    '仅固定 Web Vapor 根 App ID（发行：%s，存在 App.uvue：%s）',
    (isProduction, hasAppUVue) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR = 'true'
      process.env.UNI_PLATFORM = 'h5'
      process.env.UNI_INPUT_DIR = inputDir
      process.env.NODE_ENV = isProduction ? 'production' : 'development'
      process.env.VITE_ROOT_DIR = path.dirname(inputDir)
      const existsSync = fs.existsSync
      const exists = jest
        .spyOn(fs, 'existsSync')
        .mockImplementation((filename) =>
          filename === path.resolve(inputDir, 'App.uvue')
            ? hasAppUVue
            : existsSync(filename)
        )
      const appName = hasAppUVue ? 'App.uvue' : 'App.vue'
      const relativeDir = path.basename(inputDir)
      const custom = jest.fn(() => 'custom')
      try {
        for (const componentIdGenerator of [
          undefined,
          'filepath',
          'filepath-source',
          custom,
        ]) {
          const vueOptions = initPluginVueOptions(
            {
              inputDir,
              vueOptions: { features: { componentIdGenerator } },
            } as any,
            initPluginUniOptions([])
          )
          const generate = vueOptions.features!.componentIdGenerator as Function
          const getHash = jest.fn((value: string) => 'hash:' + value)
          exists.mockClear()
          custom.mockClear()
          for (const source of ['first', 'updated']) {
            expect(
              generate(
                `${relativeDir}/${appName}`,
                source,
                isProduction,
                getHash
              )
            ).toBe('212d40c7')
          }
          expect(getHash).not.toHaveBeenCalled()
          expect(custom).not.toHaveBeenCalled()
          for (const filename of [
            `${relativeDir}/components/App.uvue`,
            `${relativeDir}/components/App.vue`,
            `${relativeDir}/app.uvue`,
            `${relativeDir}/app.vue`,
            `${relativeDir}/${hasAppUVue ? 'App.vue' : 'App.uvue'}`,
          ]) {
            expect(generate(filename, 'content', isProduction, getHash)).toBe(
              typeof componentIdGenerator === 'function'
                ? 'custom'
                : 'hash:' +
                    filename +
                    (componentIdGenerator === 'filepath-source' ||
                    (!componentIdGenerator && isProduction)
                      ? 'content'
                      : '')
            )
            if (componentIdGenerator === custom) {
              expect(custom).toHaveBeenLastCalledWith(
                filename,
                'content',
                isProduction,
                getHash
              )
            }
          }
          expect(exists).not.toHaveBeenCalled()
        }
      } finally {
        exists.mockRestore()
      }
    }
  )

  test('仅页面及自定义窗口默认接收 App 样式，普通组件不受影响', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_INPUT_DIR = inputDir
    const pages = parsePagesJsonOnce(inputDir, 'h5')
    const cachedPages = [...pagesCacheSet]
    const cachedWindows = [...windowsCacheSet]
    normalizePagesJson(
      JSON.stringify({ ...pages, topWindow: { path: './windows/top.uvue' } }),
      'h5'
    )
    pagesCacheSet.add('pages/index/index')
    const helpers = jest
      .spyOn(require('../../uni-cli-shared/src/utils'), 'requireUniHelpers')
      .mockReturnValue({})
    try {
      const vueOptions = initPluginVueOptions(
        { inputDir } as any,
        initPluginUniOptions([])
      )
      const { isUniPage } = vueOptions.template!.compilerOptions as any
      expect(isUniPage(path.join(inputDir, 'pages/index/index.uvue'))).toBe(
        true
      )
      expect(isUniPage(path.join(inputDir, 'windows/top.uvue'))).toBe(true)
      expect(isUniPage(path.join(inputDir, 'components/App.uvue'))).toBe(false)
      // 样式接收范围包括窗口，但页面生命周期只能给真正的页面注入。
      const { extraOptions } = vueOptions.script as any
      expect(
        extraOptions({
          filename: path.join(inputDir, 'pages/index/index.uvue'),
        }).componentType
      ).toBe('page')
      expect(
        extraOptions({ filename: path.join(inputDir, 'windows/top.uvue') })
          .componentType
      ).toBe('component')
    } finally {
      helpers.mockRestore()
      pagesCacheSet.clear()
      cachedPages.forEach((file) => pagesCacheSet.add(file))
      windowsCacheSet.clear()
      cachedWindows.forEach((file) => windowsCacheSet.add(file))
    }
  })

  test('非 Vapor 不改写 componentIdGenerator 或页面判定', () => {
    process.env.UNI_APP_X = 'true'
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_VAPOR
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_INPUT_DIR = inputDir
    const componentIdGenerator = () => 'custom'
    const vueOptions = initPluginVueOptions(
      {
        inputDir,
        vueOptions: { features: { componentIdGenerator } },
      } as any,
      initPluginUniOptions([])
    )
    expect(vueOptions.features!.componentIdGenerator).toBe(componentIdGenerator)
    expect(vueOptions.template!.compilerOptions).not.toHaveProperty('isUniPage')
  })

  test.each(['topWindow', 'leftWindow', 'rightWindow'])(
    '%s 配置更新或删除后，模板隔离判定使用新的 pages.json',
    (name) => {
      process.env.UNI_APP_X = 'true'
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR = 'true'
      process.env.UNI_PLATFORM = 'h5'
      process.env.UNI_INPUT_DIR = inputDir
      const pages = parsePagesJsonOnce(inputDir, 'h5')
      const cachedPages = [...pagesCacheSet]
      const cachedWindows = [...windowsCacheSet]
      normalizePagesJson(
        JSON.stringify({ ...pages, [name]: { path: 'windows/old.uvue' } }),
        'h5'
      )
      try {
        const vueOptions = initPluginVueOptions(
          { inputDir } as any,
          initPluginUniOptions([])
        )
        const { isUniPage } = vueOptions.template!.compilerOptions as any
        expect(isUniPage(path.join(inputDir, 'windows/old.uvue'))).toBe(true)
        // 与 pages.json 插件热更新时一致，重新标准化最新配置，而非修改旧缓存对象。
        normalizePagesJson(
          JSON.stringify({
            ...pages,
            [name]: { path: 'windows/new.uvue' },
          }),
          'h5'
        )
        expect(isUniPage(path.join(inputDir, 'windows/new.uvue'))).toBe(true)
        expect(isUniPage(path.join(inputDir, 'windows/old.uvue'))).toBe(false)
        expect(
          isUniPageFile(path.join(inputDir, 'windows/new.uvue'), inputDir)
        ).toBe(false)
        normalizePagesJson(
          JSON.stringify({ ...pages, [name]: undefined }),
          'h5'
        )
        expect(isUniPage(path.join(inputDir, 'windows/new.uvue'))).toBe(false)
      } finally {
        pagesCacheSet.clear()
        cachedPages.forEach((file) => pagesCacheSet.add(file))
        windowsCacheSet.clear()
        cachedWindows.forEach((file) => windowsCacheSet.add(file))
      }
    }
  )
})
