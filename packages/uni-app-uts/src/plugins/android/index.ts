import path from 'path'
import {
  parseUniExtApiNamespacesOnce,
  resolveUTSCompiler,
  uniUTSUniModulesPlugin,
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
import { parseImports, parseUTSRelativeFilename } from './utils'

export function init() {
  return [
    uniPrePlugin(),
    uniUTSUniModulesPlugin({
      x: true,
      isSingleThread: process.env.UNI_APP_X_SINGLE_THREAD !== 'false',
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniAppPlugin(),
    // 需要放到 uniAppPlugin 之后(TSC模式无需)，让 uniAppPlugin 先 emit 出真实的 main.uts，然后 MainPlugin 再返回仅包含 import 的 js code
    uniAppMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
    uniAppCssPlugin(),
    // 解决所有的src引入
    uniViteSfcSrcImportPlugin({ onlyVue: false }),
    uniAppUVuePlugin(),
    uniCloudPlugin(),
    ...(process.env.UNI_APP_X_TSC === 'true'
      ? [
          // 必须在 uvue 处理之后
          resolveUTSCompiler().uts2kotlin({
            cacheRoot: path.resolve(
              process.env.UNI_APP_X_CACHE_DIR ||
                path.resolve(process.env.UNI_OUTPUT_DIR, '../.kotlin'),
              '.uts/cache'
            ),
            inputDir: process.env.UNI_INPUT_DIR,
            sourcemap: process.env.NODE_ENV === 'development',
            fileName(fileName) {
              const name = parseUTSRelativeFilename(fileName)
              return name === 'main.uts' ? 'index.uts' : name
            },
            jsCode(code) {
              return parseImports(code)
            },
          }),
        ]
      : []),
  ]
}
