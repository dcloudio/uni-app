const parseBase = require('./base-parser')
const parsePages = require('./pages-parser')
const parseDisplay = require('./display-parser')

module.exports = function(pagesJson, manifestJson, loader) {
  const manifest = manifestJson.quickapp || {}
  parseBase(manifest, manifestJson)
  parsePages(manifest, pagesJson.pages)
  parseDisplay(manifest, pagesJson.pages, pagesJson.globalStyle)

  global.framework.manifest = manifest
  
  loader.emitFile('manifest.json', JSON.stringify(manifest))
  
  return ''
}
