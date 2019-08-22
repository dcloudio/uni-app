module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.config.json'))
  if (app.content && app.content.subPackages && app.content.subPackages.length === 0) {
    delete app.content.subPackages
  }

  project.content.qqappid = project.content.appid
  project.content.qqLibVersion = project.content.libVersion
  delete project.content.appid
  delete project.content.libVersion

  return [app, project]
}
