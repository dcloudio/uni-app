import {
  parseUniExtApiNamespacesOnce,
  uniUTSUniModulesPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniPrePlugin } from '../pre'
import { uniAppPlugin } from './plugin'
import { uniAppCssPlugin } from './css'
import { uniAppMainPlugin } from './mainUTS'
import { uniAppManifestPlugin } from './manifestJson'
import { uniAppPagesPlugin } from './pagesJson'
import { uniAppUVuePlugin } from './uvue'
import { uniCloudPlugin } from './unicloud'

export function init() {
  return [
    uniPrePlugin(),
    uniUTSUniModulesPlugin({
      x: true,
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniAppPlugin(),
    uniAppMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
    uniAppCssPlugin(),
    uniAppUVuePlugin(),
    uniCloudPlugin(),
  ]
}
