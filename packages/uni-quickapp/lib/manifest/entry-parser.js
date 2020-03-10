const path = require('path')
module.exports = function parseEntry(pages) {
  const entry = {
    'app': path.resolve(process.env.UNI_INPUT_DIR, 'main.js')
  }
  pages.forEach(page => {
    entry[page.path] = path.resolve(process.env.UNI_INPUT_DIR, page.path + '.vue?uxType=page')
  })
  return entry
}
