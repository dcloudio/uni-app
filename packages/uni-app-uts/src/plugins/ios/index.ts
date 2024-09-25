import * as path from 'path'
import {
  UNI_EASYCOM_EXCLUDE,
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
} from '@dcloudio/uni-cli-shared'

import { uniAppIOSPlugin } from './plugin'
import { uniAppIOSMainPlugin } from './mainUTS'
import { uniAppManifestPlugin } from './manifestJson'
import { uniAppPagesPlugin } from './pagesJson'
import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'

export function init() {
  return [
    ...(isNormalCompileTarget() ? [uniDecryptUniModulesPlugin()] : []),
    uniHBuilderXConsolePlugin('uni.__log__'),
    ...(isNormalCompileTarget()
      ? [
          uniUTSAppUniModulesPlugin({
            x: true,
            isSingleThread: process.env.UNI_APP_X_SINGLE_THREAD !== 'false',
            extApis: parseUniExtApiNamespacesOnce(
              process.env.UNI_UTS_PLATFORM,
              process.env.UNI_UTS_TARGET_LANGUAGE
            ),
          }),
        ]
      : []),
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    uniAppIOSPlugin(),
    ...(process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? [uniUniModulesExtApiPlugin()]
      : process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
      : [uniAppIOSMainPlugin(), uniAppManifestPlugin(), uniAppPagesPlugin()]),
    uniUTSUVueJavaScriptPlugin(),
    resolveUTSCompiler().uts2js({
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
      cacheRoot: path.resolve(process.env.UNI_APP_X_CACHE_DIR, '.uts2js/cache'),
      modules: {
        vueCompilerDom,
        uniCliShared,
      },
    }),
  ]
}
