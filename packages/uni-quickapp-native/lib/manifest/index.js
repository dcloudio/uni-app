const parseBase = require('./base-parser')
const parsePages = require('./pages-parser')
const parseDisplay = require('./display-parser')

const parseEntry = require('./entry-parser')

function getPages(pagesJson) {
  const ret = pagesJson.pages
  const subPackages = pagesJson.subPackages
  if (!subPackages || !subPackages.length) {
    return ret
  }
  subPackages.forEach(({
    root,
    pages
  }) => {
    if (!Array.isArray(pages)) {
      return
    }
    pages.forEach(page => {
      page.path = root + '/' + page.path
      ret.push(page)
    })
  })
  return ret
}

module.exports = function(pagesJson, manifestJson, loader) {

  const manifest = manifestJson['quickapp-native'] || {}

  parseBase(manifest, manifestJson)

  const pages = getPages(pagesJson)

  parsePages(manifest, pages)
  parseDisplay(manifest, pages, pagesJson.globalStyle)

  process.UNI_ENTRY = parseEntry(pages)

  global.framework.manifest = manifest

  loader && loader.emitFile('manifest.json', JSON.stringify(manifest))

  return ''
}
