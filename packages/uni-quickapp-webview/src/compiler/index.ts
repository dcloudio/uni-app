import type { Plugin } from 'vite'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'

let quickappConfigJson = false
const uniQuickappWebviewPlugin: Plugin = {
  name: 'uni:quickapp-webview',
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
  generateBundle(_, bundle) {
    if (process.env.UNI_SUB_PLATFORM === 'quickapp-webview-huawei') {
      if (quickappConfigJson) {
        return
      }
      quickappConfigJson = true
      bundle['quickapp.config.json'] = {
        type: 'asset',
        fileName: 'quickapp.config.json',
        originalFileName: 'quickapp.config.json',
        name: 'quickapp.config.json',
        source: JSON.stringify({
          quickappRoot: './',
          packOptions: {
            ignore: [],
          },
        }),
        needsCodeReference: false,
      }
    }
  },
}

export default [uniQuickappWebviewPlugin, ...initMiniProgramPlugin(options)]
