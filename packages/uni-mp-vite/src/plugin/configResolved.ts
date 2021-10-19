import debug from 'debug'
import { Plugin } from 'vite'
import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '.'
import { getNVueCssPaths } from '../plugins/pagesJson'

const debugNVueCss = debug('vite:uni:nvue-css')

const shadowCss = `page::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}100%{background-image:url(https://cdn.dcloud.net.cn/img/shadow-grey.png)}}`

export function createConfigResolved({
  style: { extname },
}: UniMiniProgramPluginOptions): Plugin['configResolved'] {
  return (config) => {
    removePlugins('vite:import-analysis', config)
    injectCssPlugin(config)
    injectCssPostPlugin(config, {
      extname,
      chunkCss(filename, cssCode) {
        if (config.isProduction && filename === 'app' + extname) {
          return cssCode + shadowCss
        }
        const nvueCssPaths = getNVueCssPaths(config)
        if (!nvueCssPaths || !nvueCssPaths.length) {
          return cssCode
        }
        const normalized = normalizePath(filename)
        if (nvueCssPaths.find((pageCssPath) => pageCssPath === normalized)) {
          debugNVueCss(normalized)
          return `@import "/nvue.wxss";\n` + cssCode
        }
        return cssCode
      },
    })
    injectAssetPlugin(config)
  }
}
