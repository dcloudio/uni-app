import {
  parseUniExtApiNamespacesOnce,
  uniUTSAppPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniAppUTSPlugin } from './android'
import { uniAppCssPlugin } from './android/css'
import { uniAppMainPlugin } from './android/mainUTS'
import { uniAppManifestPlugin } from './android/manifestJson'
import { uniAppPagesPlugin } from './android/pagesJson'
import { uniPrePlugin } from './android/pre'
import { uniAppUVuePlugin } from './android/uvue'
import { uniCloudPlugin } from './android/unicloud'
export function initAndroid() {
  return [
    uniPrePlugin(),
    uniUTSAppPlugin({
      x: true,
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniAppUTSPlugin(),
    uniAppMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
    uniAppCssPlugin(),
    uniAppUVuePlugin(),
    uniCloudPlugin(),
  ]
}

export function initIOS() {
  return []
}
