const mockUts2js = jest.fn((_options: Record<string, unknown>) => ({
  name: 'uts2js',
}))

jest.mock('@dcloudio/uni-cli-shared', () => {
  const plugin = (name: string) => () => ({ name })
  return {
    UNI_EASYCOM_EXCLUDE: [],
    enableSourceMap: () => false,
    getWorkers: () => ({}),
    initUts2jsSharedDataOptions: () => undefined,
    isNormalCompileTarget: () => true,
    parseUniExtApiNamespacesOnce: () => ({}),
    resolveUTSCompiler: () => ({ uts2js: mockUts2js }),
    uniDecryptUniModulesPlugin: plugin('decrypt'),
    uniEasycomPlugin: plugin('easycom'),
    uniHBuilderXConsolePlugin: plugin('console'),
    uniSharedDataPlugin: plugin('shared-data'),
    uniStatsPlugin: plugin('stats'),
    uniUasmPlugin: plugin('uasm'),
    uniUTSAppUniModulesPlugin: plugin('uni-modules'),
    uniUTSUVueJavaScriptPlugin: plugin('js'),
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

jest.mock('../../src/plugins/utils', () => ({
  SHARED_DATA_LIB_IMPORT_SOURCE: 'libentry.so',
}))

describe('harmony plugin init', () => {
  const originalEnv = {
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_DOM2_DYNAMIC: process.env.UNI_APP_X_DOM2_DYNAMIC,
    UNI_APP_X_CACHE_DIR: process.env.UNI_APP_X_CACHE_DIR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_COMPILER_VERSION: process.env.UNI_COMPILER_VERSION,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    UNI_UTS_TARGET_LANGUAGE: process.env.UNI_UTS_TARGET_LANGUAGE,
  }

  afterEach(() => {
    mockUts2js.mockClear()
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    jest.resetModules()
  })

  function initPlugins(dynamic = false) {
    process.env.UNI_APP_X_DOM2 = 'true'
    if (dynamic) {
      process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    } else {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2_DYNAMIC')
    }
    process.env.UNI_APP_X_CACHE_DIR = '/tmp/cache'
    process.env.UNI_INPUT_DIR = '/tmp/input'
    process.env.UNI_COMPILER_VERSION = '1.0.0'
    process.env.UNI_UTS_PLATFORM = 'app-harmony'
    process.env.UNI_UTS_TARGET_LANGUAGE = 'javascript'

    return require('../../src/plugins/harmony/index').init()
  }

  test('dom2 configures SharedData module import', () => {
    initPlugins()

    expect(mockUts2js).toHaveBeenCalledWith(
      expect.objectContaining({
        sharedDataLibName: 'libentry.so',
      })
    )
    const options = mockUts2js.mock.calls[0]?.[0]
    expect(options).toBeDefined()
    expect(options?.sharedDataLibAsGlobal).toBeUndefined()
  })

  test('dynamic dom2 does not configure SharedData module import', () => {
    initPlugins(true)

    expect(mockUts2js).toHaveBeenCalledWith(
      expect.objectContaining({
        sharedDataLibName: undefined,
      })
    )
  })
})

export {}
