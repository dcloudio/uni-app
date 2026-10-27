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
      result = require('../src/hbx/pluginPaths').resolveHBuilderXPluginPath(
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

  test('新配置缺少插件时回退旧插件根目录', () => {
    process.env.HX_PLUGIN_PATHS = JSON.stringify({})
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve('/legacy/plugins')
    const { resolveHBuilderXPluginPath } = loadPluginPaths()

    expect(resolveHBuilderXPluginPath('uni_helpers')).toBe(
      path.resolve('/legacy/plugins/uni_helpers')
    )
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
