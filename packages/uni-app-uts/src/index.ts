import {
  parseUniExtApiNamespacesOnce,
  uniUTSAppPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniAppUTSPlugin } from './plugins'
import { uniAppCssPlugin } from './plugins/css'
import { uniAppMainPlugin } from './plugins/mainUTS'
import { uniAppManifestPlugin } from './plugins/manifestJson'
import { uniAppPagesPlugin } from './plugins/pagesJson'
import { uniPrePlugin } from './plugins/pre'
import { uniAppUVuePlugin } from './plugins/uvue'
import { uniCloudPlugin } from './plugins/unicloud'
export default () => {
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

export { genClassName } from './plugins/utils'
export { transformVue } from './plugins/uvue/index'
