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
  uniUTSAppUniModulesPlugin,
  uniUTSUVueJavaScriptPlugin,
  uniUniModulesExtApiPlugin,
  uniWorkersPlugin,
} from '@dcloudio/uni-cli-shared'

import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { createUniAppJsEnginePlugin } from '../js/plugin'
import { uniAppJsEngineMainPlugin } from '../js/mainUTS'
import { uniAppManifestPlugin } from '../js/manifestJson'
import { uniAppPagesPlugin } from '../js/pagesJson'
import { replaceExtApiPagePaths } from '../js/extApiPages'

export function init() {
  return [
    ...(isNormalCompileTarget()
      ? [uniWorkersPlugin(), uniDecryptUniModulesPlugin()]
      : []),
    uniHBuilderXConsolePlugin('uni.__log__'),
    // 非 isNormalCompileTarget 时（ext-api模式），仍需要编译 uni_modules 获取 js code
    uniUTSAppUniModulesPlugin({
      x: true,
      isSingleThread: process.env.UNI_APP_X_SINGLE_THREAD !== 'false',
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    createUniAppJsEnginePlugin('app-ios')(),
    ...(process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? [uniUniModulesExtApiPlugin()]
      : process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
      : [
          uniAppJsEngineMainPlugin(),
          uniAppManifestPlugin('app-ios'),
          uniAppPagesPlugin(),
        ]),
    uniUTSUVueJavaScriptPlugin(),
    resolveUTSCompiler().uts2js({
      platform: 'app-ios',
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
      cacheRoot: path.resolve(process.env.UNI_APP_X_CACHE_DIR, '.uts2js/cache'),
      sourceMap: enableSourceMap(),
      modules: {
        vueCompilerDom,
        uniCliShared,
      },
      resolveWorkers: () => {
        return getWorkers()
      },
    }),
    ...(process.env.UNI_COMPILE_EXT_API_TYPE === 'pages'
      ? [replaceExtApiPagePaths()]
      : []),
  ]
}
