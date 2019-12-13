const path = require('path')

const {
  removeExt,
  normalizePath,
  getPagesJson
} = require('@dcloudio/uni-cli-shared')

const {
  normalizeNodeModules
} = require('@dcloudio/webpack-uni-mp-loader/lib/shared')

const SCROLLER_COMPONENTS = [
  'list',
  'scroller',
  'scroll-view',
  'waterfall'
]

module.exports = function(content) {
  this.cacheable && this.cacheable()
  const source = content.trim()

  if (SCROLLER_COMPONENTS.find(name => source.indexOf('<' + name) === 0)) {
    return content
  }
  if (source.indexOf('<recycle-list') !== -1) {
    return content
  }

  let resourcePath = normalizeNodeModules(
    removeExt(normalizePath(path.relative(process.env.UNI_INPUT_DIR, this.resourcePath)))
  )

  if (
    !process.UNI_NVUE_ENTRY[resourcePath] &&
    this._module.issuer &&
    this._module.issuer.issuer
  ) {
    // <template src=""/>
    resourcePath = normalizeNodeModules(
      removeExt(normalizePath(path.relative(process.env.UNI_INPUT_DIR, this._module.issuer.issuer.resource)))
    )
  }

  if (!process.UNI_NVUE_ENTRY[resourcePath]) {
    return content
  }
  // 暂时实时读取配置信息,查找是否 disableScroll
  const appJson = getPagesJson()
  if (!appJson.nvue || !appJson.nvue.pages) {
    return content
  }
  const pagePath = resourcePath + '.html'
  const pageJson = appJson.nvue.pages.find(page => page.path === pagePath)
  if (!pageJson) {
    return content
  }

  if (!appJson.globalStyle) {
    appJson.globalStyle = {}
  }

  Object.assign(appJson.globalStyle, appJson.globalStyle['app-plus'] || {})
  Object.assign(pageJson.style, pageJson.style['app-plus'] || {})
  const pageJsonStyle = Object.assign(appJson.globalStyle, pageJson.style)
  if (pageJsonStyle.disableScroll === true) {
    return content
  }

  return `<scroll-view :scroll-y="true" :enableBackToTop="true" bubble="true" style="flex-direction:column">${content}</scroll-view>`
}
