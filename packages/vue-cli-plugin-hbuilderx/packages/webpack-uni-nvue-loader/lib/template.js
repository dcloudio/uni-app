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

module.exports = function (content, map) {
  this.cacheable && this.cacheable()
  const source = content.trim()

  if (SCROLLER_COMPONENTS.find(name => source.indexOf('<' + name) === 0)) {
    return this.callback(null, content, map)
  }
  if (source.indexOf('<recycle-list') !== -1) {
    return this.callback(null, content, map)
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
    return this.callback(null, content, map)
  }
  // 暂时实时读取配置信息,查找是否 disableScroll
  const appJson = getPagesJson()

  let pageJson
  if (appJson.nvue) { // 旧版本
    if (!appJson.nvue || !appJson.nvue.pages) {
      return this.callback(null, content, map)
    }
    const pagePath = resourcePath + '.html'
    pageJson = appJson.nvue.pages.find(page => page.path === pagePath)
  } else {
    pageJson = appJson.pages.find(page => page.path === resourcePath)
  }

  if (!pageJson) {
    return this.callback(null, content, map)
  }

  if (!appJson.globalStyle) {
    appJson.globalStyle = {}
  }

  Object.assign(appJson.globalStyle, appJson.globalStyle['app-plus'] || {})
  Object.assign(pageJson.style, pageJson.style['app-plus'] || {})
  const pageJsonStyle = Object.assign(appJson.globalStyle, pageJson.style)
  if (pageJsonStyle.disableScroll === true) {
    return this.callback(null, content, map)
  }

  this.callback(null,
    `<scroll-view :scroll-y="true" :show-scrollbar="${pageJsonStyle.scrollIndicator === 'none' ? 'false' : 'true'}" :enableBackToTop="true" bubble="true" style="flex-direction:column">${content}</scroll-view>`,
    map)
}
