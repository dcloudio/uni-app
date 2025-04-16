import type { Plugin, UserConfig } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { extend } from '@vue/shared'
import { options } from './options'

const uniMiniProgramAlipayPlugin: Plugin = {
  name: 'uni:mp-alipay',
  config() {
    const buildOptions: UserConfig['build'] = {}
    if (process.env.NODE_ENV === 'production') {
      buildOptions.terserOptions = {
        compress: false,
        mangle: false,
      }
    }
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: extend(
        {
          assetsInlineLimit: 0,
        },
        buildOptions
      ),
    }
  },
  // fix question/159362
  transform(code, id) {
    if (id.includes('@vue/shared') || id.includes('@vue\\shared')) {
      return {
        code: code.replace('//gs', '//g'),
        map: { mappings: '' },
      }
    }
  },
}

export default [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin(options)]
