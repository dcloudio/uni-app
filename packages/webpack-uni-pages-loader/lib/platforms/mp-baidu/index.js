module.exports = function (pagesJson, manifestJson) {
  const {
    app,
    project
  } = require('../mp')(pagesJson, manifestJson, require('./project.swan.json'))

  const content = project.content

  const miniprogram = content.condition && content.condition.miniprogram
  if (miniprogram && Array.isArray(miniprogram.list) && miniprogram.list.length) {
    content['compilation-args'].options = miniprogram.list.map((item) => {
      return {
        id: item.id,
        text: item.name,
        extra: {
          index: item.pathName,
          query: item.query
        }
      }
    })
    delete content.condition
  }

  project.name = 'project.swan'
  return [
    app,
    project
  ]
}
