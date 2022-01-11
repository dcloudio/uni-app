import { initVuePlugins } from './vue'
import { initNVuePlugins } from './nvue'
export default () => {
  return process.env.UNI_COMPILER === 'nvue'
    ? initNVuePlugins()
    : initVuePlugins()
}
