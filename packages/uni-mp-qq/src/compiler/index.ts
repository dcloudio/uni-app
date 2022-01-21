import type { Plugin } from 'vite'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { fix2648 } from './fix2648'
import { options } from './options'

const uniMiniProgramQQPlugin: Plugin = {
  name: 'uni:mp-qq',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
  writeBundle(_, bundle) {
    fix2648(bundle)
  },
}

export default [uniMiniProgramQQPlugin, ...initMiniProgramPlugin(options)]
