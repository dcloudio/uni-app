import * as path from 'path'
import {
  UNI_EASYCOM_EXCLUDE,
  enableSourceMap,
  getWorkers,
  isNormalCompileTarget,
  parseUniExtApiNamespacesOnce,
  resolveUTSCompiler,
  uniDecryptUniModulesPlugin,
  uniEasycomPlugin,
  uniEncryptUniModulesAssetsPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniSharedDataPlugin,
  uniStatsPlugin,
  uniUTSAppUniModulesPlugin,
  uniUTSUVueJavaScriptPlugin,
  uniUniModulesExtApiPlugin,
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
import { SHARED_DATA_LIB_NAME } from '../utils'

export function init() {
  const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
  return [
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
    resolveUTSCompiler().uts2js({
      dom2: isDom2,
      platform: 'app-android',
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
      cacheRoot: path.resolve(process.env.UNI_APP_X_CACHE_DIR, '.uts2js/cache'),
      sourceMap: enableSourceMap(),
      sharedDataLibName: isDom2 ? SHARED_DATA_LIB_NAME : undefined,
      modules: {
        vueCompilerDom,
        uniCliShared,
      },
      workers: {
        resolve: () => {
          return getWorkers()
        },
      },
    }),
    ...(isDom2 ? [uniSharedDataPlugin()] : []),
    ...(process.env.UNI_COMPILE_EXT_API_TYPE === 'pages'
      ? [replaceExtApiPagePaths()]
      : []),
    ...(isDom2 ? [uniAppCssPlugin()] : []),
    ...(isNormalCompileTarget() ? [uniStatsPlugin()] : []),
  ]
}
