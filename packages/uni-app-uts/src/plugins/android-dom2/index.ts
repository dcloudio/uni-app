import * as path from 'path'
import {
  UNI_EASYCOM_EXCLUDE,
  enableSourceMap,
  getWorkers,
  initUts2jsSharedDataOptions,
  isNormalCompileTarget,
  parseUniExtApiNamespacesOnce,
  resolveUTSCompiler,
  resolveUasmLoadPath,
  uniDecryptUniModulesPlugin,
  uniEasycomPlugin,
  uniEncryptUniModulesAssetsPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniSharedDataPlugin,
  uniStatsPlugin,
  uniUTSAppUniModulesPlugin,
  uniUTSUVueJavaScriptPlugin,
  uniUasmPlugin,
  uniUniModulesExtApiPlugin,
  uniVaporScriptPlugin,
  uniWorkersPlugin,
} from '@dcloudio/uni-cli-shared'

import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniAppCssPlugin, uniAppCssPrePlugin } from '../dom2/css'
import { replaceExtApiPagePaths } from '../js/extApiPages'
import { uniAppJsEngineMainPlugin } from '../js/mainUTS'
import { uniAppManifestPlugin } from '../js/manifestJson'
import { uniAppPagesPlugin } from '../js/pagesJson'
import { createUniAppJsEnginePlugin } from '../js/plugin'
import { SHARED_DATA_LIB_GLOBAL_NAME } from '../utils'
import { uniAppXAndroidEngineDevPlugin } from './devPlugin'

export function init() {
  const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
  const isDom2Dynamic = process.env.UNI_APP_X_DOM2_DYNAMIC === 'true'
  const isDev = process.env.NODE_ENV === 'development'
  return [
    uniUasmPlugin(),
    ...(isDom2 ? [uniAppCssPrePlugin()] : []),
    ...(isNormalCompileTarget()
      ? [uniWorkersPlugin(), uniDecryptUniModulesPlugin()]
      : []),
    uniHBuilderXConsolePlugin('uni.__log__'),
    uniUTSAppUniModulesPlugin({
      x: true,
      isSingleThread: process.env.UNI_APP_X_SINGLE_THREAD !== 'false',
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    createUniAppJsEnginePlugin('app-android')(),
    ...(process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? [uniUniModulesExtApiPlugin()]
      : process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
      : [
          uniAppJsEngineMainPlugin(),
          uniAppManifestPlugin('app-android'),
          uniAppPagesPlugin(),
        ]),
    uniUTSUVueJavaScriptPlugin(),
    ...(isDom2
      ? [
          uniVaporScriptPlugin({
            sharedDataLibName: !isDom2Dynamic
              ? SHARED_DATA_LIB_GLOBAL_NAME
              : undefined,
            sharedDataLibAsGlobal: !isDom2Dynamic,
          }),
        ]
      : []),
    resolveUTSCompiler().uts2js({
      dom2: isDom2,
      platform: 'app-android',
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
      cacheRoot: path.resolve(process.env.UNI_APP_X_CACHE_DIR, '.uts2js/cache'),
      sourceMap: enableSourceMap(),
      sharedDataLibName:
        isDom2 && !isDom2Dynamic ? SHARED_DATA_LIB_GLOBAL_NAME : undefined,
      sharedDataLibAsGlobal: isDom2 && !isDom2Dynamic,
      sharedData: initUts2jsSharedDataOptions(),
      modules: {
        vueCompilerDom,
        uniCliShared,
      },
      workers: {
        resolve: () => {
          return getWorkers()
        },
      },
      uasm: {
        resolve: (modulePath) => resolveUasmLoadPath(modulePath, 'app-android'),
      },
    }),
    ...(isDom2 ? [uniSharedDataPlugin()] : []),
    ...(process.env.UNI_COMPILE_EXT_API_TYPE === 'pages'
      ? [replaceExtApiPagePaths()]
      : []),
    ...(isDom2 ? [uniAppCssPlugin()] : []),
    ...(isNormalCompileTarget()
      ? [
          uniStatsPlugin(),
          ...(isDom2Dynamic || !isDev ? [] : [uniAppXAndroidEngineDevPlugin()]),
        ]
      : []),
  ]
}
