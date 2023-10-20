import {
  parseUniExtApiNamespacesOnce,
  uniUTSUniModulesPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniPrePlugin } from './pre'
import { uniAppAndroidUTSPlugin } from './android'
import { uniAppCssPlugin } from './android/css'
import { uniAppMainPlugin } from './android/mainUTS'
import { uniAppManifestPlugin } from './android/manifestJson'
import { uniAppPagesPlugin } from './android/pagesJson'
import { uniAppUVuePlugin } from './android/uvue'
import { uniCloudPlugin } from './android/unicloud'

import { uniAppIOSUTSPlugin } from './ios'

export function initAndroid() {
  import('./errorReporting')
  return [
    uniPrePlugin(),
    uniUTSUniModulesPlugin({
      x: true,
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniAppAndroidUTSPlugin(),
    uniAppMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
    uniAppCssPlugin(),
    uniAppUVuePlugin(),
    uniCloudPlugin(),
  ]
}

export function initIOS() {
  import('./errorReporting')
  return [uniPrePlugin(), uniAppIOSUTSPlugin()]
}
