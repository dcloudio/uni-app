module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.config.json'))
const [key, value] = ['component2', true]
  app.content = app.content || {}
  app.content[key] = key in pagesJson ? pagesJson[key] : value

  const hasSubPackages = app.content.subPackages
  if (hasSubPackages) {
    // 鸿蒙元服务平台使用小写subpackages
    app.content.subpackages = hasSubPackages
    delete app.content.subPackages

    // 处理分包的 resource 字段
    if (Array.isArray(app.content.subpackages)) {
      app.content.subpackages.forEach(subPackage => {
        if (subPackage && subPackage.root && !subPackage.resource) {
          subPackage.resource = subPackage.root.replace(/\//g, '_')
        }
      })
    }
  }

  return [app, project]
}
