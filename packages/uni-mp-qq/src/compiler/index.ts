import { Plugin } from 'vite'

import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { fix2648 } from './fix2648'
import { options } from './options'

const uniMiniProgramQQPlugin: Plugin = {
  name: 'vite:uni-mp-qq',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: 40 * 1024, // 40kb
      },
    }
  },
  writeBundle(_, bundle) {
    fix2648(bundle)
  },
}

export default [uniMiniProgramQQPlugin, ...initMiniProgramPlugin(options)]
