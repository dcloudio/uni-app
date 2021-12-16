module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.config.json'))
  // 暂不支持分包，兼容引擎判断
  if (app.content.subPackages && !app.content.subPackages.length) {
    delete app.content.subPackages
  }
  return [app, project]
}
