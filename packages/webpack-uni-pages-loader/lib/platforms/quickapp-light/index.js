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
    minPlatformVersion: 1053
  }
  manifestJson.name && (baseJson.name = manifestJson.name)
  manifestJson.versionName && (baseJson.versionName = manifestJson.versionName)
  manifestJson.versionCode && (baseJson.versionCode = manifestJson.versionCode)

  Object.assign(app.content, baseJson, manifestJson['quickapp-light'] || {})

  if (!app.content.package) {
    app.content.package = manifestJson.name
  }

  project.name = 'quickapp.config'

  return [
    app,
    project
  ]
}
