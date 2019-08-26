module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.config.json'))
  return [app, project]
}
