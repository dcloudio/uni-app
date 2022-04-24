import { initVuePlugins } from './vue'
import { initNVuePlugins } from './nvue'
import { uniAppPlugin } from './plugin'
export default () => {
  return [
    uniAppPlugin({
      renderer: process.env.UNI_RENDERER,
      appService: process.env.UNI_RENDERER_NATIVE === 'appService',
    }),
    ...(process.env.UNI_COMPILER === 'nvue'
      ? initNVuePlugins()
      : initVuePlugins()),
  ]
}
