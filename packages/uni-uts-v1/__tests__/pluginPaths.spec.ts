import path from 'path'

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
    if (originalHxAppRoot === undefined) {
      Reflect.deleteProperty(process.env, 'HX_APP_ROOT')
    } else {
      process.env.HX_APP_ROOT = originalHxAppRoot
    }
    jest.resetModules()
  })

  test('使用独立插件绝对路径且不混用旧目录', () => {
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
    expect(resolveHBuilderXPluginPath('uni_helpers')).toBeUndefined()
  })

  test('拒绝非对象配置', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify([])
    const { getHBuilderXPluginPaths } = loadShared()
    expect(() => getHBuilderXPluginPaths()).toThrow('Invalid HX_PLUGIN_PATHS')
  })

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
})
