import path from 'path'

describe.each([
  [
    '本机',
    path,
    path.resolve('/插件 [旧]/plugins'),
    path.resolve('/插件 [新]/missing'),
  ],
  ['POSIX', path.posix, '/插件 [旧]/plugins', '/插件 [新]/missing'],
  [
    'Windows 盘符',
    path.win32,
    path.win32.normalize('C:/插件 [旧]/plugins'),
    path.win32.normalize('D:/插件 [新]/missing'),
  ],
  [
    'Windows UNC',
    path.win32,
    path.win32.normalize('//server/share/插件 [旧]'),
    path.win32.normalize('//server/share/插件 [新]/missing'),
  ],
] as const)('插件路径回退：%s', (_name, pathApi, legacyRoot, mappedRoot) => {
  const savedPaths = process.env.HX_PLUGIN_PATHS
  const savedRoot = process.env.UNI_HBUILDERX_PLUGINS

  afterEach(() => {
    if (savedPaths === undefined) delete process.env.HX_PLUGIN_PATHS
    else process.env.HX_PLUGIN_PATHS = savedPaths
    if (savedRoot === undefined)
      Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
    else process.env.UNI_HBUILDERX_PLUGINS = savedRoot
    jest.dontMock('path')
    jest.resetModules()
  })

  function resolve(raw: string | undefined, withLegacyRoot = true) {
    if (raw === undefined) delete process.env.HX_PLUGIN_PATHS
    else process.env.HX_PLUGIN_PATHS = raw
    if (withLegacyRoot) process.env.UNI_HBUILDERX_PLUGINS = legacyRoot
    else Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
    // 显式使用对应平台的路径 API，避免在 POSIX 下误解析 Windows 路径。
    jest.doMock('path', () => pathApi)
    let result: string | undefined
    jest.isolateModules(() => {
      result = require('../src/shared').resolveHBuilderXPluginPath(
        'compile-less',
        'node_modules',
        'less'
      )
    })
    return result
  }

  test.each([undefined, '', '{}', '{"compile-sass":""}'])(
    '缺少 key 时回退：%s',
    (raw) => {
      expect(resolve(raw)).toBe(
        pathApi.resolve(legacyRoot, 'compile-less/node_modules/less')
      )
    }
  )

  test('显式空值不回退', () => {
    expect(resolve('{"compile-less":""}')).toBeUndefined()
  })

  test('指定路径即使不存在也保持优先', () => {
    expect(resolve(JSON.stringify({ 'compile-less': mappedRoot }))).toBe(
      pathApi.resolve(mappedRoot, 'node_modules/less')
    )
  })

  test('缺少旧根目录时不推导当前目录', () => {
    expect(resolve('{}', false)).toBeUndefined()
  })

  test('没有旧根目录仍可使用映射', () => {
    expect(resolve(JSON.stringify({ 'compile-less': mappedRoot }), false)).toBe(
      pathApi.resolve(mappedRoot, 'node_modules/less')
    )
  })

  test.each(['{', '[]', 'null'])('无效配置保留报错：%s', (raw) => {
    expect(() => resolve(raw)).toThrow()
  })
})

function loadShared() {
  let shared!: typeof import('../src/shared')
  jest.isolateModules(() => {
    shared = require('../src/shared')
  })
  return shared
}

describe('UTS HBuilderX plugin paths', () => {
  const originalPluginPaths = process.env.HX_PLUGIN_PATHS
  const originalPluginsRoot = process.env.UNI_HBUILDERX_PLUGINS
  const originalUtsPlatform = process.env.UNI_UTS_PLATFORM
  const originalAppXDom2 = process.env.UNI_APP_X_DOM2
  const originalHxAppRoot = process.env.HX_APP_ROOT

  afterEach(() => {
    if (originalPluginPaths === undefined) {
      Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
    } else {
      process.env.HX_PLUGIN_PATHS = originalPluginPaths
    }
    if (originalPluginsRoot === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
    } else {
      process.env.UNI_HBUILDERX_PLUGINS = originalPluginsRoot
    }
    if (originalUtsPlatform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_UTS_PLATFORM')
    } else {
      process.env.UNI_UTS_PLATFORM = originalUtsPlatform
    }
    if (originalAppXDom2 === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    } else {
      process.env.UNI_APP_X_DOM2 = originalAppXDom2
    }
    if (originalHxAppRoot === undefined) {
      Reflect.deleteProperty(process.env, 'HX_APP_ROOT')
    } else {
      process.env.HX_APP_ROOT = originalHxAppRoot
    }
    jest.resetModules()
  })

  test('使用独立插件绝对路径，缺少插件时回退旧目录', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({
      'hbuilderx-language-services': path.resolve('/plugins/language-services'),
      'uts-development-android': path.resolve('/native/android'),
    })
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadShared()

    expect(
      resolveHBuilderXPluginPath('hbuilderx-language-services', 'builtin-dts')
    ).toBe(path.resolve('/plugins/language-services/builtin-dts'))
    expect(
      resolveHBuilderXPluginPath(
        'uts-development-android',
        'uts-types/app-android'
      )
    ).toBe(path.resolve('/native/android/uts-types/app-android'))
    expect(resolveHBuilderXPluginPath('uni_helpers')).toBe(
      path.resolve('/legacy/plugins/uni_helpers')
    )
  })

  test('拒绝非对象配置', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify([])
    const { getHBuilderXPluginPaths } = loadShared()
    expect(() => getHBuilderXPluginPaths()).toThrow('Invalid HX_PLUGIN_PATHS')
  })

  test.each(['missing', 'empty', 'mapped', 'no-root', 'legacy'])(
    '编译器调用方保留独立映射和旧根目录：%s',
    (scenario) => {
      const legacyRoot = path.resolve('/旧插件 [root]')
      const mappedDir = path.resolve('/独立插件 [new]')
      const pluginPaths =
        scenario === 'empty'
          ? { 'hbuilderx-language-services': '' }
          : scenario === 'mapped'
          ? { 'hbuilderx-language-services': mappedDir }
          : {}
      process.env.HX_PLUGIN_PATHS = JSON.stringify(pluginPaths)
      process.env.UNI_HBUILDERX_PLUGINS = legacyRoot
      if (scenario === 'no-root')
        Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
      if (scenario === 'legacy')
        Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
      const constructor = jest.fn().mockImplementation(() => ({}))
      jest.doMock('../lib/uni-x/dist/compiler', () => ({
        UniXCompiler: constructor,
      }))
      try {
        jest.isolateModules(() => {
          const { createUniXCompiler } = require('../src/tsc/compiler')
          createUniXCompiler('production', 'Kotlin', {
            inputDir: path.resolve('/project'),
            outputDir: path.resolve('/output'),
            cacheDir: path.resolve('/cache'),
            paths: {},
            normalizeFileName: (file: string) => file,
            resolveWorkers: () => ({}),
          })
        })
        expect(constructor).toHaveBeenCalledTimes(1)
        const options = constructor.mock.calls[0][0]
        expect(options.hxPluginDir).toBe(
          scenario === 'no-root' ? undefined : legacyRoot
        )
        expect(options.hxPluginPaths).toEqual(
          scenario === 'legacy' ? undefined : pluginPaths
        )
        expect(options.hxLanguageServiceDir).toBe(
          scenario === 'empty' || scenario === 'no-root'
            ? undefined
            : scenario === 'mapped'
            ? mappedDir
            : path.resolve(legacyRoot, 'hbuilderx-language-services')
        )
      } finally {
        jest.dontMock('../lib/uni-x/dist/compiler')
      }
    }
  )

  test('新配置存在时仍保留 HX_APP_ROOT 对旧插件根目录的初始化', () => {
    const hxAppRoot = path.resolve('/hbuilder')
    process.env.HX_PLUGIN_PATHS = JSON.stringify({})
    process.env.HX_APP_ROOT = hxAppRoot
    Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')
    const { isInHBuilderX } = loadShared()

    expect(isInHBuilderX()).toBe(true)
    expect(process.env.UNI_HBUILDERX_PLUGINS).toBe(
      path.resolve(hxAppRoot, 'plugins')
    )
  })

  test('没有新配置时使用旧插件根目录', () => {
    Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadShared()

    expect(resolveHBuilderXPluginPath('uni_helpers')).toBe(
      path.resolve('/legacy/plugins/uni_helpers')
    )
  })

  test('TSConfig 虚拟模块分别使用两个插件目录', () => {
    const cliVitePath = path.resolve('/plugins/cli-vite')
    const languageServicesPath = path.resolve('/plugins/language-services')
    process.env.HX_PLUGIN_PATHS = JSON.stringify({
      'uniapp-cli-vite': cliVitePath,
      'hbuilderx-language-services': languageServicesPath,
    })
    process.env.UNI_UTS_PLATFORM = 'app-android'

    jest.isolateModules(() => {
      const { createBasicUtsOptions } = require('../src/tsc/utils/options')
      const options = createBasicUtsOptions(path.resolve('/project'), false)
      const paths = options.tsconfigOverride.compilerOptions.paths

      expect(
        paths[
          '@dcloudio/virtual-modules/uniapp-cli-vite/node_modules/vite/client'
        ]
      ).toEqual([path.resolve(cliVitePath, 'node_modules/vite/client')])
      expect(
        paths[
          '@dcloudio/virtual-modules/hbuilderx-language-services/builtin-dts/common/HBuilderX.d.ts'
        ]
      ).toEqual([
        path.resolve(languageServicesPath, 'builtin-dts/common/HBuilderX.d.ts'),
      ])
    })
  })

  test('Web Vapor 不使用 App DOM2 的 Vue 类型', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({
      'uniapp-cli-vite': path.resolve('/plugins/cli-vite'),
      'hbuilderx-language-services': path.resolve('/plugins/language-services'),
    })
    process.env.UNI_UTS_PLATFORM = 'web'
    process.env.UNI_APP_X_DOM2 = 'true'

    jest.isolateModules(() => {
      const { createBasicUtsOptions } = require('../src/tsc/utils/options')
      const getPaths = () =>
        createBasicUtsOptions(path.resolve('/project'), false).tsconfigOverride
          .compilerOptions.paths

      const webVaporPaths = getPaths()
      expect(webVaporPaths.vue).toEqual([
        path.resolve(__dirname, '../lib/uts/types/uni-x/web/vue/dist/vue.d.ts'),
      ])
      expect(webVaporPaths['@vue/runtime-vapor']).toBeDefined()
      expect(webVaporPaths['@vue/runtime-vapor-dom2']).toBeUndefined()

      delete process.env.UNI_APP_X_DOM2
      expect(getPaths().vue).toEqual([
        path.resolve('/plugins/cli-vite/node_modules/@vue/runtime-core'),
      ])
      expect(getPaths()['@vue/runtime-vapor']).toBeUndefined()

      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_APP_X_DOM2 = 'true'
      expect(getPaths().vue).toEqual([
        path.resolve(
          __dirname,
          '../lib/uts/types/uni-x/@vue/vue/dist/vue.d.ts'
        ),
      ])
      expect(getPaths()['@vue/runtime-vapor-dom2']).toBeDefined()
    })
  })
})
