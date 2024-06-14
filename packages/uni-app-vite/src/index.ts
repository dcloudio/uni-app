import {
  parseUniExtApiNamespacesOnce,
  uniUTSAppUniModulesPlugin,
} from '@dcloudio/uni-cli-shared'
import { initVuePlugins } from './vue'
import { initNVuePlugins } from './nvue'
import { uniAppPlugin } from './plugin'
export default () => {
  return [
    uniAppPlugin({
      renderer: process.env.UNI_RENDERER,
      appService: process.env.UNI_RENDERER_NATIVE === 'appService',
    }),
    uniUTSAppUniModulesPlugin({
      x: false,
      isSingleThread: false,
      extApis: parseUniExtApiNamespacesOnce(
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      ),
    }),
    ...(process.env.UNI_COMPILER === 'nvue'
      ? initNVuePlugins()
      : initVuePlugins()),
  ]
}
