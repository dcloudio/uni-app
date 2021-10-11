import { Plugin } from 'vite'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin, {
  UniMiniProgramPluginOptions,
} from '@dcloudio/uni-mp-vite'

const uniMiniProgramWeixinPlugin: Plugin = {
  name: 'vite:uni-mp-weixin',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: JSON.stringify('false'),
      },
    }
  },
}

const options: UniMiniProgramPluginOptions = {
  vite: {
    alias: {
      'uni-mp-runtime': resolveBuiltIn(
        '@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'
      ),
    },
  },
  global: 'wx',
  app: {
    darkmode: true,
    subpackages: true,
  },
  project: {
    filename: 'project.config.json',
  },
  template: {
    extname: '.wxml',
  },
  style: {
    extname: '.wxss',
    cssVars: {
      '--status-bar-height': '25px',
      '--window-top': '0px',
      '--window-bottom': '0px',
      '--window-left': '0px',
      '--window-right': '0px',
    },
  },
  filter: {
    extname: '.wxs',
    tag: 'wxs',
  },
}

export default [uniMiniProgramWeixinPlugin, ...initMiniProgramPlugin(options)]
