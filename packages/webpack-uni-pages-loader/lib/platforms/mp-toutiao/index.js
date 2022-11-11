module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.config.json'))
  const [key, value] = ['component2', true]
  app.content = app.content || {}
  app.content[key] = key in pagesJson ? pagesJson[key] : value
  return [app, project]
}
