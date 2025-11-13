import debug from 'debug'
import { isString } from '@vue/shared'
import type { Plugin, ResolvedConfig } from 'vite'
import type { EmittedAsset } from 'rollup'
import {
  createEncryptCssUrlReplacer,
  createShadowImageUrl,
  cssPostPlugin,
  getUniModulesEncryptType,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
  isMiniProgramPageFile,
  normalizeMiniProgramFilename,
  normalizePath,
  parseManifestJsonOnce,
  parsePagesJsonOnce,
  parseUniXFlexDirection,
  relativeFile,
  removeExt,
  resolveMainPathOnce,
  transformPartSelector,
  transformScopedCss,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '.'
import { getNVueCssPaths } from '../plugins/pagesJson'
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath,
} from '../plugins/entry'

const debugNVueCss = debug('uni:nvue-css')
const cssVars = `page{--status-bar-height:25px;--top-window-height:0px;--window-top:0px;--window-bottom:0px;--window-left:0px;--window-right:0px;--window-magin:0px}`
const uvueCssVars = `page{--top-window-height:0px;--window-top:0px;--window-bottom:0px;--window-left:0px;--window-right:0px;--window-magin:0px;--uni-safe-area-inset-top:0px;--uni-safe-area-inset-left:0px;--uni-safe-area-inset-right:0px;--uni-safe-area-inset-bottom:0px;}`

const genShadowCss = (cdn: number) => {
  const url = createShadowImageUrl(cdn, 'grey')
  return `page::after{position:fixed;content:'';left:-1000px;top:-1000px;-webkit-animation:shadow-preload .1s;-webkit-animation-delay:3s;animation:shadow-preload .1s;animation-delay:3s}@-webkit-keyframes shadow-preload{0%{background-image:url(${url})}100%{background-image:url(${url})}}@keyframes shadow-preload{0%{background-image:url(${url})}100%{background-image:url(${url})}}`
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
    fixUnocss(config)
    injectCssPlugin(
      config,
      process.env.UNI_COMPILE_TARGET === 'uni_modules'
        ? {
            createUrlReplacer: createEncryptCssUrlReplacer,
          }
        : {}
    )

    let unocssGlobalBuildBundleIndex = config.plugins.findIndex(
      (p) => p.name === 'unocss:global:build:bundle'
    )

    if (unocssGlobalBuildBundleIndex === -1) {
      unocssGlobalBuildBundleIndex = config.plugins.findIndex(
        (p) => p.name === 'unocss:global:build:generate'
      )
    }

    const hasUnocssGlobalBuildBundle = unocssGlobalBuildBundleIndex > -1
    // unocss 是根据 .css 后缀来编译文件，需要先保持 css 文件后缀为 .css，等 unocss 处理完后，再重置回正确的文件后缀
    const cssExtname = hasUnocssGlobalBuildBundle ? '.css' : extname
    injectCssPostPlugin(
      config,
      cssPostPlugin(config, {
        platform: process.env.UNI_PLATFORM,
        chunkCssFilename(id: string) {
          if (id === mainPath) {
            return 'app' + cssExtname
          } else if (isUniPageUrl(id)) {
            return normalizeCssChunkFilename(
              parseVirtualPagePath(id),
              cssExtname
            )
          } else if (isUniComponentUrl(id)) {
            return normalizeCssChunkFilename(
              parseVirtualComponentPath(id),
              cssExtname
            )
          } else if (id.startsWith('uni_modules://')) {
            return normalizeCssChunkFilename(
              id.replace('uni_modules://', ''),
              cssExtname
            )
          }
        },
        chunkCssCode(filename, cssCode) {
          // 如果是加密组件，不生成css
          if (filename.startsWith('uni_modules')) {
            const pluginId = filename.split('/')[1]
            const encryptType = getUniModulesEncryptType(pluginId)
            if (encryptType === 'easycom') {
              return ''
            }
          }

          const isX = process.env.UNI_APP_X === 'true'
          cssCode = transformScopedCss(cssCode)
          if (isX) {
            /**
             * .xxx::part(yyy)替换为.xxx .-_part__yyy_-
             * 小程序本身不支持::part选择器，直接替换即可
             * 运行时绑定在内置组件上的part属性生成对应的class合并到class属性内，例如：`^-_part__yyy_-`
             * ^的作用参考：[引用页面或父组件的样式](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E5%BC%95%E7%94%A8%E9%A1%B5%E9%9D%A2%E6%88%96%E7%88%B6%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%B7%E5%BC%8F)
             */
            cssCode = transformPartSelector(cssCode)
          }
          if (filename === 'app' + cssExtname) {
            const componentCustomHiddenCss =
              (component &&
                component.vShow &&
                genComponentCustomHiddenCss(component.vShow)) ||
              ''
            const realCssVars = isX ? uvueCssVars : cssVars
            if (config.isProduction) {
              return (
                cssCode +
                (process.env.UNI_PLATFORM !== 'mp-weixin'
                  ? genShadowCss(cdn || 0)
                  : '') +
                realCssVars +
                componentCustomHiddenCss
              )
            } else {
              return cssCode + realCssVars + componentCustomHiddenCss
            }
          }

          if (isX) {
            if (component?.[':host']) {
              const flexDirection = parseUniXFlexDirection(
                parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
              )
              cssCode = `:host,page{display:flex;flex-direction:${flexDirection}}\n${cssCode}`
            }

            if (!isMiniProgramPageFile(filename)) {
              return cssCode
            }

            /**
             * 此方法将subPackages中的页面合并到了pages内
             */
            const pagesJson = parsePagesJsonOnce(
              process.env.UNI_INPUT_DIR,
              process.env.UNI_PLATFORM
            )
            const page = pagesJson.pages.find(
              (page) => page.path === removeExt(filename)
            )
            if (!page) {
              return cssCode
            }
            /**
             * 何时不重置样式？
             * - page.style.enabelUcssReset为false
             * - page.style.enableUcssReset为空，pagesJson.globalStyle.enableUcssReset为false
             * - page.style.enableUcssReset为空，pagesJson.globalStyle.enableUcssReset为空，page.style.renderer为skyline
             */
            const shouldNotResetStyle =
              page.style.enableUcssReset === false ||
              (page.style.enableUcssReset == null &&
                pagesJson.globalStyle.enableUcssReset === false) ||
              (page.style.enableUcssReset == null &&
                pagesJson.globalStyle.enableUcssReset == null &&
                (page.style as any).renderer === 'skyline')

            if (!shouldNotResetStyle) {
              /**
               * 兼容发布为小程序分包模式
               */
              const uvueCssPath = relativeFile(filename, `uvue${extname}`)
              cssCode = `@import "${uvueCssPath}";\n` + cssCode
            }
            return cssCode
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
    )
    injectAssetPlugin(config)

    if (hasUnocssGlobalBuildBundle && extname !== '.css') {
      ;(config.plugins as Plugin[]).splice(
        unocssGlobalBuildBundleIndex + 1,
        0,
        adjustCssExtname(extname)
      )
    }
  }
}

function adjustCssExtname(extname: string): Plugin {
  return {
    name: 'uni:adjust-css-extname',
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const files = Object.keys(bundle)
        files.forEach((name) => {
          if (name.endsWith('.css')) {
            const asset = bundle[name] as EmittedAsset
            isString(asset.source) &&
              (asset.source = asset.source.replace(/\*\,/g, 'page,'))
            this.emitFile({
              fileName: name.replace('.css', extname),
              type: 'asset',
              source: asset.source,
            })
            delete bundle[name]
          }
        })
      },
    },
  }
}
function fixUnocss(config: ResolvedConfig) {
  const unocssGlobalBuildScan = config.plugins.find(
    (p) => p.name === 'unocss:global:build:scan'
  )
  // TODO 原始的 scan 的 buildStart 会清空 vfsLayerMap，导致 watch 时，load 阶段 /__uno.css 获取不到
  // https://github.com/antfu/unocss/blob/main/packages/vite/src/modes/global/build.ts#L25
  if (unocssGlobalBuildScan) {
    // 隐患: task 未被清空
    unocssGlobalBuildScan.buildStart = () => {}
  }
}
