import type { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import { options } from '@dcloudio/uni-mp-toutiao/src/compiler/options'

const uniMiniProgramToutiaoPlugin: Plugin = {
  name: 'uni:mp-lark',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: true,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
}

options.vite.copyOptions.targets = [
  ...(options.vite.copyOptions.targets || []),
  {
    src: ['theme.json'],
    get dest() {
      return process.env.UNI_OUTPUT_DIR
    },
  },
]

options.app.darkmode = true

options.cdn = 10

options.template.slot.fallbackContent = false
// 飞书不支持：
// <view tt:for="{{items}}" tt:for-item="item" tt:key="id" slot="{{item.slot}}">{{item.text}}</view>
options.template.slot.dynamicSlotNames = false
options.project!.config = ['project.lark.json']
export default [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin(options)]
