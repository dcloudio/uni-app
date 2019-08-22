module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.swan.json'))

  const content = project.content

  if (content.condition && content.condition.miniprogram) {
    content.condition.swan = content.condition.miniprogram
    delete content.condition.miniprogram
  }

  project.name = 'project.swan'
  return [
    app,
    project
  ]
}
