import type { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import {
  ASSETS_INLINE_LIMIT,
  copyMiniProgramThemeJson,
} from '@dcloudio/uni-cli-shared'
import {
  commonCopyTargets,
  options,
} from '@dcloudio/uni-mp-toutiao/src/compiler/options'

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
  ...commonCopyTargets,
  ...copyMiniProgramThemeJson(),
]

options.app.darkmode = true

options.cdn = 10

options.template.slot.fallbackContent = false
options.project!.config = ['project.lark.json']
export default [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin(options)]
