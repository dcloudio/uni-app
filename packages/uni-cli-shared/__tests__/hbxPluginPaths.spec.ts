import path from 'path'

function loadPluginPaths() {
  let pluginPaths!: typeof import('../src/hbx/pluginPaths')
  jest.isolateModules(() => {
    pluginPaths = require('../src/hbx/pluginPaths')
  })
  return pluginPaths
}

describe('HBuilderX plugin paths', () => {
  const originalPluginPaths = process.env.HX_PLUGIN_PATHS
  const originalPluginsRoot = process.env.UNI_HBUILDERX_PLUGINS
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
    if (originalHxAppRoot === undefined) {
      Reflect.deleteProperty(process.env, 'HX_APP_ROOT')
    } else {
      process.env.HX_APP_ROOT = originalHxAppRoot
    }
    jest.resetModules()
  })

  test('新配置优先于旧插件根目录', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({
      'uniapp-cli-vite': path.resolve('/new/plugins/uniapp-cli-vite'),
    })
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uniapp-cli-vite', 'node_modules')).toBe(
      path.resolve('/new/plugins/uniapp-cli-vite/node_modules')
    )
  })

  test('新配置缺少插件时不回退旧插件根目录', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({})
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uni_helpers')).toBeUndefined()
  })

  test('没有新配置时使用旧插件根目录', () => {
    Reflect.deleteProperty(process.env, 'HX_PLUGIN_PATHS')
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uni_helpers', 'lib/bytenode')).toBe(
      path.resolve('/legacy/plugins/uni_helpers/lib/bytenode')
    )
  })

  test('拒绝无效配置', () => {
    process.env.HX_PLUGIN_PATHS = '[]'
    const { resolveHBuilderXPluginPath } = loadPluginPaths()
    expect(() => resolveHBuilderXPluginPath('uni_helpers')).toThrow(
      'Invalid HX_PLUGIN_PATHS'
    )
  })

  test('新配置存在时仍保留 HX_APP_ROOT 对旧插件根目录的初始化', () => {
    const hxAppRoot = path.resolve('/hbuilder')
    process.env.HX_PLUGIN_PATHS = JSON.stringify({})
    process.env.HX_APP_ROOT = hxAppRoot
    Reflect.deleteProperty(process.env, 'UNI_HBUILDERX_PLUGINS')

    let isInHBuilderX!: typeof import('../src/hbx/utils').isInHBuilderX
    jest.isolateModules(() => {
      isInHBuilderX = require('../src/hbx/utils').isInHBuilderX
    })

    expect(isInHBuilderX()).toBe(true)
    expect(process.env.UNI_HBUILDERX_PLUGINS).toBe(
      path.resolve(hxAppRoot, 'plugins')
    )
  })
})
