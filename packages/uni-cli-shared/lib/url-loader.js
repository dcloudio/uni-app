const fileLoader = require('./file-loader.js')

const defaultOptions = {
  limit: -1,
  fallback: fileLoader
}

const inlineLimit =
  process.env.UNI_PLATFORM === 'mp-weixin' ||
  process.env.UNI_PLATFORM === 'mp-qq' ||
  process.env.UNI_PLATFORM === 'mp-toutiao' ||
  process.env.UNI_PLATFORM === 'mp-kuaishou' ||
  process.env.UNI_PLATFORM === 'mp-lark' ||
  process.env.UNI_PLATFORM === 'mp-jd' ||
  process.env.UNI_PLATFORM === 'mp-xhs' ||
  process.env.UNI_PLATFORM === 'app-plus' // v2需要base64,v3需要rewriteUrl

// mp-weixin,mp-qq,app-plus 非v3(即：需要base64的平台)
// 将/static/logo.png转换为~@/static/logo.png
// @import,src,background,background-image

const rewriteUrl = inlineLimit ? require('postcss-urlrewrite')({
  imports: true,
  properties: ['src', 'background', 'background-image'],
  rules: [{
    from: /^@\//,
    to: '~@/'
  }, {
    from: /^\/([^/])/,
    to: '~@/$1'
  }]
}) : () => {}

module.exports = {
  loader: 'url-loader',
  options () {
    if (process.env.UNI_PLATFORM === 'h5') {
      // h5平台，不对 url-loader 作调整，默认limit:4096，也不修改file-loader输出路径
      return {}
    }
    if (inlineLimit) {
      return {
        ...defaultOptions,
        limit: process.env.UNI_USING_V3 ? -1 : 40960 // （主要用于background-image）
      }
    }
    return {
      ...defaultOptions
    }
  },
  rewriteUrl
}
