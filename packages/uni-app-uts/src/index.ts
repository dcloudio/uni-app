import {
  parseUniExtApiNamespacesOnce,
  uniUTSPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniAppUTSPlugin } from './plugins'
import { uniAppCssPlugin } from './plugins/css'
import { uniAppMainPlugin } from './plugins/mainUTS'
import { uniAppManifestPlugin } from './plugins/manifestJson'
import { uniAppPagesPlugin } from './plugins/pagesJson'
import { uniPrePlugin } from './plugins/pre'
import { uniAppUVuePlugin } from './plugins/uvue'
export default () => {
  return [
    uniPrePlugin(),
    uniUTSPlugin({
      x: true,
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    uniAppUTSPlugin(),
    uniAppMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
    uniAppCssPlugin(),
    uniAppUVuePlugin(),
  ]
}

export { genClassName } from './plugins/utils'
export { transformVue } from './plugins/uvue/index'
