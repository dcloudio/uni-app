/**
 * webpack-uni-pages-loader 待重构，需要将平台特有逻辑，收敛到各自包内
 * @param {Object} pagesJson
 * @param {Object} manifestJson
 */
module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.config.json'))

  const baseJson = {
    appType: 'webapp', // 华为IDE V3.0.2+ 需要此属性，否则无法导入
    minPlatformVersion: 1070
  }
  manifestJson.name && (baseJson.name = manifestJson.name)
  manifestJson.versionName && (baseJson.versionName = manifestJson.versionName)
  manifestJson.versionCode && (baseJson.versionCode = manifestJson.versionCode)

  const options = Object.assign({}, manifestJson['quickapp-webview'] || {})
  if (process.env.UNI_SUB_PLATFORM) {
    Object.assign(options, manifestJson[process.env.UNI_SUB_PLATFORM] || {})
  }
  Object.assign(app.content, baseJson, options)

  if (!app.content.package) {
    app.content.package = manifestJson.name
  }

  project.name = 'quickapp.config'

  return [
    app,
    project
  ]
}
