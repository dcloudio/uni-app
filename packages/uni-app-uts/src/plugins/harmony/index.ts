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
import { createUniAppJsEnginePlugin } from '../js/plugin'
import { uniAppJsEngineMainPlugin } from '../js/mainUTS'
import { uniAppManifestPlugin } from '../js/manifestJson'
import { uniAppPagesPlugin } from '../js/pagesJson'
import { replaceExtApiPagePaths } from '../js/extApiPages'
import { uniAppCssPlugin, uniAppCssPrePlugin } from '../dom2/css'

export function init() {
  const isDom2Harmony =
    process.env.UNI_APP_X_DOM2 === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-harmony'
  return [
    ...(isDom2Harmony ? [uniAppCssPrePlugin()] : []),
    ...(isNormalCompileTarget()
      ? [uniWorkersPlugin(), uniDecryptUniModulesPlugin()]
      : []),
    uniHBuilderXConsolePlugin('uni.__f__'),
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
    createUniAppJsEnginePlugin('app-harmony')(),
    ...(process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? [uniUniModulesExtApiPlugin()]
      : process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
      : [
          uniAppJsEngineMainPlugin(),
          uniAppManifestPlugin('app-harmony'),
          uniAppPagesPlugin(),
        ]),
    uniUTSUVueJavaScriptPlugin(),
    resolveUTSCompiler().uts2js({
      dom2: isDom2Harmony,
      platform: 'app-harmony',
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
      cacheRoot: path.resolve(process.env.UNI_APP_X_CACHE_DIR, '.uts2js/cache'),
      sourceMap: enableSourceMap(),
      sharedDataLibName: isDom2Harmony ? 'libentry.so' : undefined,
      modules: {
        vueCompilerDom,
        uniCliShared,
      },
      workers: {
        extname: '.ets',
        resolve: () => {
          return getWorkers()
        },
      },
    }),
    ...(isDom2Harmony ? [uniSharedDataPlugin()] : []),
    ...(process.env.UNI_COMPILE_EXT_API_TYPE === 'pages'
      ? [replaceExtApiPagePaths()]
      : []),
    ...(isDom2Harmony ? [uniAppCssPlugin()] : []),
    ...(isNormalCompileTarget() ? [uniStatsPlugin()] : []),
  ]
}
