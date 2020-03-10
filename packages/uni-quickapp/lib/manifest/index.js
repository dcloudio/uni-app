const parseBase = require('./base-parser')
const parsePages = require('./pages-parser')
const parseDisplay = require('./display-parser')

const parseEntry = require('./entry-parser')

module.exports = function(pagesJson, manifestJson, loader) {
  const manifest = manifestJson.quickapp || {}

  parseBase(manifest, manifestJson)
  parsePages(manifest, pagesJson.pages)
  parseDisplay(manifest, pagesJson.pages, pagesJson.globalStyle)

  process.UNI_ENTRY = parseEntry(pagesJson.pages)

  global.framework.manifest = manifest

  loader && loader.emitFile('manifest.json', JSON.stringify(manifest))

  return ''
}
