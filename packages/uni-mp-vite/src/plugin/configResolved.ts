import debug from 'debug'
import { Plugin } from 'vite'
import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
  normalizePath,
  resolveMainPathOnce,
  removeExt,
  transformScopedCss,
  normalizeMiniProgramFilename,
  relativeFile,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '.'
import { getNVueCssPaths } from '../plugins/pagesJson'
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath,
} from '../plugins/entry'

const debugNVueCss = debug('vite:uni:nvue-css')
const cssVars = `page{--status-bar-height:25px;--top-window-height:0px;--window-top:0px;--window-bottom:0px;--window-left:0px;--window-right:0px;--window-magin:0px}`

const genShadowCss = (cdn: string) => {
  return `page::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(${cdn}/img/shadow-grey.png)}100%{background-image:url(${cdn}/img/shadow-grey.png)}}@keyframes shadow-preload{0%{background-image:url(${cdn}/img/shadow-grey.png)}100%{background-image:url(${cdn}/img/shadow-grey.png)}}`
}
const genComponentCustomHiddenCss = (name: string) =>
  `[${name.replace(':', '')}="true"]{display: none !important;}`

export function createConfigResolved({
  cdn,
  style: { extname },
  template: { component },
}: UniMiniProgramPluginOptions): Plugin['configResolved'] {
  function normalizeCssChunkFilename(id: string, extname: string) {
    return (
      removeExt(normalizeMiniProgramFilename(id, process.env.UNI_INPUT_DIR)) +
      extname
    )
  }
  return (config) => {
    const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
    removePlugins('vite:import-analysis', config)
    injectCssPlugin(config)
    injectCssPostPlugin(config, {
      chunkCssFilename(id: string) {
        if (id === mainPath) {
          return 'app' + extname
        } else if (isUniPageUrl(id)) {
          return normalizeCssChunkFilename(parseVirtualPagePath(id), extname)
        } else if (isUniComponentUrl(id)) {
          return normalizeCssChunkFilename(
            parseVirtualComponentPath(id),
            extname
          )
        }
      },
      chunkCssCode(filename, cssCode) {
        cssCode = transformScopedCss(cssCode)
        if (filename === 'app' + extname) {
          const componentCustomHiddenCss =
            (component &&
              component.vShow &&
              genComponentCustomHiddenCss(component.vShow)) ||
            ''
          if (config.isProduction) {
            return (
              cssCode +
              genShadowCss(`https://cdn${cdn || ''}.dcloud.net.cn`) +
              cssVars +
              componentCustomHiddenCss
            )
          } else {
            return cssCode + cssVars + componentCustomHiddenCss
          }
        }

        const nvueCssPaths = getNVueCssPaths(config)
        if (!nvueCssPaths || !nvueCssPaths.length) {
          return cssCode
        }
        const normalized = normalizePath(filename)
        if (nvueCssPaths.find((pageCssPath) => pageCssPath === normalized)) {
          debugNVueCss(normalized)
          return (
            `@import "${relativeFile(normalized, 'nvue' + extname)}";\n` +
            cssCode
          )
        }
        return cssCode
      },
    })
    injectAssetPlugin(config)
  }
}
