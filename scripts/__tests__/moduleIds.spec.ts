import path from 'path'

describe.each(['posix', 'win32'] as const)('%s 模块 ID', (platform) => {
  const modes = [
    { name: 'uni-app VDOM', isX: false, vapor: false, dist: 'dist' },
    { name: 'uni-app x VDOM', isX: true, vapor: false, dist: 'dist-x' },
    { name: 'uni-app x Vapor', isX: true, vapor: true, dist: 'dist-x-vapor' },
  ]
  const envKeys = [
    'UNI_APP_X',
    'UNI_APP_X_VAPOR',
    'UNI_PLATFORM',
    'UNI_UTS_PLATFORM',
    'VITEST',
  ] as const
  let originalEnv: Record<string, string | undefined>
  let resolveBuiltIn: jest.Mock

  beforeEach(() => {
    originalEnv = Object.fromEntries(
      envKeys.map((name) => [name, process.env[name]])
    )
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
    delete process.env.VITEST
    jest.resetModules()
    // 模拟宿主路径规则，但保留 POSIX API；模块请求必须始终使用正斜杠。
    jest.doMock('path', () => ({
      ...path[platform],
      posix: path.posix,
      win32: path.win32,
    }))
    resolveBuiltIn = jest.fn((id: string) => id)
    jest.doMock('@dcloudio/uni-cli-shared', () => ({
      resolveBuiltIn,
      resolveMainPathOnce: () => '/project/main.ts',
      resolvePiniaAlias: () => ({}),
      resolveVueI18nAlias: () => ({}),
      resolveWebVaporPackage: (id: string) => '/web-vapor/' + id,
      isUniAppXWebVapor: () => process.env.UNI_APP_X_VAPOR === 'true',
      defineUniMainJsPlugin: (factory: Function) => factory({}),
      isEnableConsole: () => true,
      isUniAppXAndroidNative: () =>
        process.env.UNI_APP_X === 'true' &&
        process.env.UNI_UTS_PLATFORM === 'app-android',
      normalizePath: (id: string) => id.replace(/\\/g, '/'),
    }))
    jest.doMock('../../packages/uni-h5-vite/src/utils', () => ({
      ...jest.requireActual('../../packages/uni-h5-vite/src/utils/utils'),
      ownerModuleName: '@dcloudio/uni-h5',
      isSSR: (options?: { ssr?: boolean }) => !!options?.ssr,
    }))
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    })
    jest.dontMock('path')
    jest.dontMock('@dcloudio/uni-cli-shared')
    jest.dontMock('../../packages/uni-h5-vite/src/utils')
    jest.resetModules()
  })

  test.each(modes)(
    '$name 内置 shared 请求保留模块别名前缀',
    ({ isX, vapor }) => {
      process.env.UNI_APP_X = isX ? 'true' : 'false'
      process.env.UNI_APP_X_VAPOR = vapor ? 'true' : 'false'
      const {
        uniResolveIdPlugin,
      } = require('../../packages/vite-plugin-uni/src/configResolved/plugins/resolveId')
      const plugin = uniResolveIdPlugin({})
      resolveBuiltIn.mockClear()
      plugin.resolveId('@vue/shared')
      plugin.resolveId('@vue/shared')
      expect(resolveBuiltIn).toHaveBeenCalledWith(
        '@vue/shared/dist/shared.esm-bundler.js'
      )
      expect(resolveBuiltIn).toHaveBeenCalledTimes(1)
    }
  )

  test.each(modes)('$name H5 框架及运行时请求', ({ isX, vapor, dist }) => {
    process.env.UNI_APP_X = isX ? 'true' : 'false'
    process.env.UNI_APP_X_VAPOR = vapor ? 'true' : 'false'
    const {
      uniResolveIdPlugin,
    } = require('../../packages/uni-h5-vite/src/plugins/resolveId')
    const plugin = uniResolveIdPlugin()
    plugin.configResolved({})
    expect(resolveBuiltIn).toHaveBeenCalledWith(
      `@dcloudio/uni-h5/${dist}/uni-h5.es.js`
    )
    expect(resolveBuiltIn).toHaveBeenCalledWith(
      `@dcloudio/uni-h5-vue/${dist}/vue.runtime.esm.js`
    )
    resolveBuiltIn.mockClear()
    expect(plugin.resolveId('@dcloudio/uni-h5')).toBe(
      `@dcloudio/uni-h5/${dist}/uni-h5.es.js`
    )
    expect(plugin.resolveId('vue')).toBe(
      `@dcloudio/uni-h5-vue/${dist}/vue.runtime.esm.js`
    )
    expect(resolveBuiltIn).not.toHaveBeenCalled()
    expect(plugin.resolveId('@dcloudio/uni-h5', undefined, { ssr: true })).toBe(
      `@dcloudio/uni-h5/${vapor ? 'dist-x-vapor-ssr' : dist}/uni-h5.es.js`
    )
    if (vapor) {
      expect(resolveBuiltIn).toHaveBeenCalledWith(
        '@dcloudio/uni-h5/dist-x-vapor-ssr/uni-h5.es.js'
      )
    }
    plugin.resolveId('vue', undefined, { ssr: true })
    expect(resolveBuiltIn).toHaveBeenCalledWith(
      `@dcloudio/uni-h5-vue/${dist}/vue.runtime.${vapor ? 'esm' : 'cjs'}.js`
    )
  })

  test.each([
    ['mp-weixin', 'web', true, 'dist/mp.esm.js'],
    ['h5', 'web', true, 'dist/index.esm.js'],
    ['app', 'app-ios', true, 'dist/app.esm.js'],
    ['app', 'app-android', true, 'src/runtime/app/index.ts'],
    ['app-harmony', 'app-harmony', false, 'dist/harmony.jsvm.esm.js'],
  ] as const)('console %s/%s/%s', (uniPlatform, utsPlatform, isX, file) => {
    process.env.UNI_PLATFORM = uniPlatform
    process.env.UNI_UTS_PLATFORM = utsPlatform
    process.env.UNI_APP_X = isX ? 'true' : 'false'
    const {
      default: createPlugin,
    } = require('../../packages/uni-console/src/compiler')
    createPlugin()
    expect(resolveBuiltIn).toHaveBeenLastCalledWith(
      '@dcloudio/uni-console/' + file
    )
  })

  test.each([
    ['h5', 'dist/uni-push.es.js'],
    ['mp-weixin', 'dist/uni-push.mp.es.js'],
  ] as const)('push %s', (uniPlatform, file) => {
    process.env.UNI_PLATFORM = uniPlatform
    const {
      default: createPlugin,
    } = require('../../packages/uni-push/src/plugin')
    const plugin = createPlugin()[0]
    resolveBuiltIn.mockClear()
    plugin.resolveId('@dcloudio/uni-push')
    expect(resolveBuiltIn).toHaveBeenCalledWith('@dcloudio/uni-push/' + file)
  })
})
