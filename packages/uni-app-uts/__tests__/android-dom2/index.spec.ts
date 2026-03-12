jest.mock('@dcloudio/uni-cli-shared', () => {
  const plugin = (name: string) => () => ({ name })
  return {
    UNI_EASYCOM_EXCLUDE: [],
    enableSourceMap: () => false,
    getWorkers: () => ({}),
    isNormalCompileTarget: () => process.env.UNI_COMPILE_TARGET !== 'ext-api',
    parseUniExtApiNamespacesOnce: () => ({}),
    resolveUTSCompiler: () => ({
      uts2js: () => ({ name: 'uts2js' }),
    }),
    uniDecryptUniModulesPlugin: plugin('decrypt'),
    uniEasycomPlugin: plugin('easycom'),
    uniEncryptUniModulesAssetsPlugin: plugin('encrypt-assets'),
    uniEncryptUniModulesPlugin: plugin('encrypt'),
    uniHBuilderXConsolePlugin: plugin('console'),
    uniSharedDataPlugin: plugin('shared-data'),
    uniStatsPlugin: plugin('stats'),
    uniUTSAppUniModulesPlugin: plugin('uni-modules'),
    uniUTSUVueJavaScriptPlugin: plugin('js'),
    uniUniModulesExtApiPlugin: plugin('ext-api'),
    uniWorkersPlugin: plugin('workers'),
  }
})

jest.mock('../../src/plugins/dom2/css', () => ({
  uniAppCssPrePlugin: () => ({ name: 'css-pre' }),
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
  SHARED_DATA_LIB_NAME: 'libentry.so',
}))

describe('android-dom2 plugin init', () => {
  const originalEnv = {
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_COMPILE_EXT_API_TYPE: process.env.UNI_COMPILE_EXT_API_TYPE,
    UNI_APP_X_CACHE_DIR: process.env.UNI_APP_X_CACHE_DIR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_COMPILER_VERSION: process.env.UNI_COMPILER_VERSION,
    UNI_APP_X_SINGLE_THREAD: process.env.UNI_APP_X_SINGLE_THREAD,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    UNI_UTS_TARGET_LANGUAGE: process.env.UNI_UTS_TARGET_LANGUAGE,
  }

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    jest.resetModules()
  })

  function initPlugins() {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_CACHE_DIR = '/tmp/cache'
    process.env.UNI_INPUT_DIR = '/tmp/input'
    process.env.UNI_COMPILER_VERSION = '1.0.0'
    process.env.UNI_APP_X_SINGLE_THREAD = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_UTS_TARGET_LANGUAGE = 'javascript'
    return require('../../src/plugins/android-dom2/index').init()
  }

  test('normal compile target includes stats plugin', () => {
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

    const plugins = initPlugins()

    expect(plugins.map((plugin: { name: string }) => plugin.name)).toContain(
      'stats'
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
