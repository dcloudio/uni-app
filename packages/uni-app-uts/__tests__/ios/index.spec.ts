const mockUts2js = jest.fn((_options: Record<string, unknown>) => ({
  name: 'uts2js',
}))
const mockResolveUasmLoadPath = jest.fn()
const mockCreateLoadUasmTransformer = jest.fn()
const mockCollectExtApiUsageAst = jest.fn()
const mockInitUts2jsExtApiOptions = jest.fn(() => ({
  collectExtApiUsageAst: mockCollectExtApiUsageAst,
}))
const mockInitUasmTransformOptions = jest.fn((platform: string) => ({
  targetArchs: ['arm64'],
  resolve: (modulePath: string) =>
    mockResolveUasmLoadPath(modulePath, platform),
  createLoadUasmTransformer: mockCreateLoadUasmTransformer,
}))

jest.mock('@dcloudio/uni-cli-shared', () => {
  const plugin = (name: string) => () => ({ name })
  return {
    UNI_EASYCOM_EXCLUDE: [],
    enableSourceMap: () => false,
    getWorkers: () => ({}),
    initUts2jsSharedDataOptions: () => undefined,
    initUts2jsExtApiOptions: mockInitUts2jsExtApiOptions,
    isNormalCompileTarget: () => process.env.UNI_COMPILE_TARGET !== 'ext-api',
    initUasmTransformOptions: mockInitUasmTransformOptions,
    parseUniExtApiNamespacesOnce: () => ({}),
    resolveUTSCompiler: () => ({
      uts2js: mockUts2js,
    }),
    uniDecryptUniModulesPlugin: plugin('decrypt'),
    uniEasycomPlugin: plugin('easycom'),
    uniEncryptUniModulesAssetsPlugin: plugin('encrypt-assets'),
    uniEncryptUniModulesPlugin: plugin('encrypt'),
    uniHBuilderXConsolePlugin: plugin('console'),
    uniSharedDataPlugin: plugin('shared-data'),
    uniStatsPlugin: plugin('stats'),
    uniUasmPlugin: plugin('uasm'),
    uniUTSAppUniModulesPlugin: plugin('uni-modules'),
    uniUTSUVueJavaScriptPlugin: plugin('js'),
    uniUniModulesExtApiPlugin: plugin('ext-api'),
    uniVaporScriptPlugin: plugin('vapor-script'),
    uniWorkersPlugin: plugin('workers'),
  }
})

jest.mock('../../src/plugins/dom2/css', () => ({
  uniAppCssPrePlugin: () => ({ name: 'css-pre' }),
  uniAppCssPlugin: () => ({ name: 'css' }),
}))

jest.mock('../../src/plugins/js/extApiPages', () => ({
  replaceExtApiPagePaths: () => ({ name: 'replace-ext-api-pages' }),
}))

jest.mock('../../src/plugins/js/mainUTS', () => ({
  uniAppJsEngineMainPlugin: () => ({ name: 'main' }),
}))

jest.mock('../../src/plugins/js/manifestJson', () => ({
  uniAppManifestPlugin: () => ({ name: 'manifest' }),
}))

jest.mock('../../src/plugins/js/pagesJson', () => ({
  uniAppPagesPlugin: () => ({ name: 'pages' }),
}))

jest.mock('../../src/plugins/js/plugin', () => ({
  createUniAppJsEnginePlugin: () => () => ({ name: 'js-engine' }),
}))

jest.mock('../../src/plugins/ios/devPlugin', () => ({
  uniAppXIOSEngineDevPlugin: () => ({ name: 'ios-engine-dev' }),
}))

jest.mock('../../src/plugins/utils', () => ({
  SHARED_DATA_LIB_GLOBAL_NAME: '__uniSharedDataLib',
}))

describe('ios plugin init', () => {
  const originalEnv = {
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_DOM2_DYNAMIC: process.env.UNI_APP_X_DOM2_DYNAMIC,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_COMPILE_EXT_API_TYPE: process.env.UNI_COMPILE_EXT_API_TYPE,
    UNI_APP_X_CACHE_DIR: process.env.UNI_APP_X_CACHE_DIR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_COMPILER_VERSION: process.env.UNI_COMPILER_VERSION,
    UNI_APP_X_SINGLE_THREAD: process.env.UNI_APP_X_SINGLE_THREAD,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    UNI_UTS_TARGET_LANGUAGE: process.env.UNI_UTS_TARGET_LANGUAGE,
    NODE_ENV: process.env.NODE_ENV,
  }

  afterEach(() => {
    mockUts2js.mockClear()
    mockResolveUasmLoadPath.mockClear()
    mockInitUasmTransformOptions.mockClear()
    mockInitUts2jsExtApiOptions.mockClear()
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    jest.resetModules()
  })

  function initPlugins(dynamic = false, dom2 = true) {
    if (dom2) {
      process.env.UNI_APP_X_DOM2 = 'true'
    } else {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    }
    if (dynamic) {
      process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    } else {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2_DYNAMIC')
    }
    process.env.UNI_APP_X_CACHE_DIR = '/tmp/cache'
    process.env.UNI_INPUT_DIR = '/tmp/input'
    process.env.UNI_COMPILER_VERSION = '1.0.0'
    process.env.UNI_APP_X_SINGLE_THREAD = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    process.env.UNI_UTS_TARGET_LANGUAGE = 'javascript'
    return require('../../src/plugins/ios/index').init()
  }

  test('normal compile target includes stats plugin', () => {
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

    const plugins = initPlugins()

    expect(plugins.map((plugin: { name: string }) => plugin.name)).toContain(
      'stats'
    )
  })

  test('dom2 includes css plugin', () => {
    const plugins = initPlugins()

    expect(plugins.map((plugin: { name: string }) => plugin.name)).toContain(
      'css'
    )
  })

  test('dom2 includes vapor script plugin', () => {
    const plugins = initPlugins()

    expect(plugins.map((plugin: { name: string }) => plugin.name)).toContain(
      'vapor-script'
    )
  })

  test('non-dom2 keeps Ext API collection without UASM transform', () => {
    initPlugins(false, false)

    expect(mockInitUasmTransformOptions).not.toHaveBeenCalled()
    expect(mockInitUts2jsExtApiOptions).toHaveBeenCalledTimes(1)
    expect(mockUts2js).toHaveBeenCalledWith(
      expect.objectContaining({
        uasm: undefined,
        extApi: { collectExtApiUsageAst: mockCollectExtApiUsageAst },
      })
    )
  })

  test('configures ios UASM resolver', () => {
    initPlugins()

    const options = mockUts2js.mock.calls[0]?.[0] as {
      uasm: {
        targetArchs: string[]
        resolve(modulePath: string): string | undefined
        createLoadUasmTransformer: unknown
      }
    }
    expect(options?.uasm.targetArchs).toEqual(['arm64'])
    expect(options?.uasm.createLoadUasmTransformer).toBe(
      mockCreateLoadUasmTransformer
    )
    options?.uasm.resolve('uni_modules/test-uasm')
    expect(mockResolveUasmLoadPath).toHaveBeenCalledWith(
      'uni_modules/test-uasm',
      'app-ios'
    )
  })

  test('configures the decrypt Ext API collector for uts2js', () => {
    initPlugins()

    expect(mockUts2js).toHaveBeenCalledWith(
      expect.objectContaining({
        extApi: { collectExtApiUsageAst: mockCollectExtApiUsageAst },
      })
    )
  })

  test('dom2 configures SharedData global access', () => {
    initPlugins()

    expect(mockUts2js).toHaveBeenCalledWith(
      expect.objectContaining({
        sharedDataLibName: '__uniSharedDataLib',
        sharedDataLibAsGlobal: true,
      })
    )
  })

  test('dynamic dom2 does not configure SharedData global access', () => {
    initPlugins(true)

    expect(mockUts2js).toHaveBeenCalledWith(
      expect.objectContaining({
        sharedDataLibName: undefined,
        sharedDataLibAsGlobal: false,
      })
    )
  })

  test('development includes ios engine dev plugin', () => {
    process.env.NODE_ENV = 'development'

    const plugins = initPlugins()

    expect(plugins.map((plugin: { name: string }) => plugin.name)).toContain(
      'ios-engine-dev'
    )
  })

  test('ext-api excludes stats plugin', () => {
    process.env.UNI_COMPILE_TARGET = 'ext-api'

    const plugins = initPlugins()

    expect(
      plugins.map((plugin: { name: string }) => plugin.name)
    ).not.toContain('stats')
  })
})

export {}
