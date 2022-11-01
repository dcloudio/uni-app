import { initVuePlugins } from './vue'
import { initNVuePlugins } from './nvue'
import { uniAppPlugin } from './plugin'
import { uniUtsV1Plugin } from './plugins/uts'
export default () => {
  return [
    uniAppPlugin({
      renderer: process.env.UNI_RENDERER,
      appService: process.env.UNI_RENDERER_NATIVE === 'appService',
    }),
    uniUtsV1Plugin(),
    ...(process.env.UNI_COMPILER === 'nvue'
      ? initNVuePlugins()
      : initVuePlugins()),
  ]
}
