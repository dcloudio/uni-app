import type { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'
const uniMiniProgramBaiduPlugin: Plugin = {
  name: 'uni:mp-baidu',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
    }
  },
}
export default [uniMiniProgramBaiduPlugin, ...initMiniProgramPlugin(options)]
