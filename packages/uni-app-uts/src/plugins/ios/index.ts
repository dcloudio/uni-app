import * as path from 'path'
import {
  UNI_EASYCOM_EXCLUDE,
  enableSourceMap,
  getWorkers,
  initUasmTransformOptions,
  initUts2jsExtApiOptions,
  initUts2jsSharedDataOptions,
  isNormalCompileTarget,
  parseUniExtApiNamespacesOnce,
  resolveUTSCompiler,
  uniAppXStandardScriptPlugin,
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
import { createUniAppJsEnginePlugin } from '../js/plugin'
import { uniAppJsEngineMainPlugin } from '../js/mainUTS'
import { uniAppManifestPlugin } from '../js/manifestJson'
import { uniAppPagesPlugin } from '../js/pagesJson'
import { replaceExtApiPagePaths } from '../js/extApiPages'
import { uniAppCssPlugin, uniAppCssPrePlugin } from '../dom2/css'
import { SHARED_DATA_LIB_GLOBAL_NAME } from '../utils'
import { uniAppXIOSEngineDevPlugin } from './devPlugin'

export function init() {
  const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
  const isDom2Dynamic = process.env.UNI_APP_X_DOM2_DYNAMIC === 'true'
  const isDev = process.env.NODE_ENV === 'development'
  const uasm = isDom2 ? initUasmTransformOptions('app-ios') : undefined
  const extApi = initUts2jsExtApiOptions()
  return [
    uniUasmPlugin(),
    ...(isDom2 ? [uniAppCssPrePlugin()] : []),
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
    ...(isDom2
      ? [
          uniVaporScriptPlugin({
            sharedDataLibName: !isDom2Dynamic
              ? SHARED_DATA_LIB_GLOBAL_NAME
              : undefined,
            sharedDataLibAsGlobal: !isDom2Dynamic,
            uasm,
          }),
        ]
      : [
          // 非 DOM2 iOS 只处理标准脚本宏，不接入仅 H5、MP 需要的 UASM 转换。
          uniAppXStandardScriptPlugin(),
        ]),
    resolveUTSCompiler().uts2js({
      dom2: isDom2,
      excludeStandardTypeScript: true,
      platform: 'app-ios',
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
      cacheRoot: path.resolve(process.env.UNI_APP_X_CACHE_DIR, '.uts2js/cache'),
      sourceMap: enableSourceMap(),
      sharedDataLibName:
        isDom2 && !isDom2Dynamic ? SHARED_DATA_LIB_GLOBAL_NAME : undefined,
      sharedDataLibAsGlobal: isDom2 && !isDom2Dynamic,
      sharedData: initUts2jsSharedDataOptions(),
      extApi,
      modules: {
        vueCompilerDom,
        uniCliShared,
      },
      scriptMacros: {
        createUniAppXScriptMacrosTransformer:
          uniCliShared.createUniAppXScriptMacrosTransformer,
      },
      workers: {
        resolve: () => {
          return getWorkers()
        },
      },
      uasm,
    }),
    ...(isDom2 ? [uniSharedDataPlugin()] : []),
    ...(process.env.UNI_COMPILE_EXT_API_TYPE === 'pages'
      ? [replaceExtApiPagePaths()]
      : []),
    ...(isDom2 ? [uniAppCssPlugin()] : []),
    ...(isNormalCompileTarget() ? [uniStatsPlugin()] : []),
    ...(isDom2 && !isDom2Dynamic && isNormalCompileTarget() && isDev
      ? [uniAppXIOSEngineDevPlugin()]
      : []),
  ]
}
