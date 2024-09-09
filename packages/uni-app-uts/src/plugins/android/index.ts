import {
  isNormalCompileTarget,
  parseUniExtApiNamespacesOnce,
  uniDecryptUniModulesPlugin,
  uniEncryptUniModulesPlugin,
  uniUTSAppUniModulesPlugin,
  uniUniModulesExtApiPlugin,
  uniViteSfcSrcImportPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniPrePlugin } from './pre'
import { uniAppPlugin } from './plugin'
import { uniAppCssPlugin } from './css'
import { uniAppMainPlugin } from './mainUTS'
import { uniAppManifestPlugin } from './manifestJson'
import { uniAppPagesPlugin } from './pagesJson'
import { uniAppUVuePlugin } from './uvue'
import { uniCloudPlugin } from './unicloud'

export function init() {
  return [
    uniDecryptUniModulesPlugin(),
    uniPrePlugin(),
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
    uniAppPlugin(),
    ...(process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? [uniUniModulesExtApiPlugin()]
      : process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesPlugin()]
      : [
          // 需要放到 uniAppPlugin 之后(TSC模式无需)，让 uniAppPlugin 先 emit 出真实的 main.uts，然后 MainPlugin 再返回仅包含 import 的 js code
          uniAppMainPlugin(),
          uniAppManifestPlugin(),
          uniAppPagesPlugin(),
        ]),

    uniAppCssPlugin(),
    // 解决所有的src引入
    uniViteSfcSrcImportPlugin({ onlyVue: false }),
    uniAppUVuePlugin(),
    uniCloudPlugin(),
  ]
}
