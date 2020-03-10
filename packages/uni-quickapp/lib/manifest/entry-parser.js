const fs = require('fs')
const path = require('path')
module.exports = function parseEntry(pages) {
  const entry = {
    'app': path.resolve(process.env.UNI_INPUT_DIR, 'main.js')
  }
  pages.forEach(page => {
    const filepath = path.resolve(process.env.UNI_INPUT_DIR, page.path)
    if (fs.existsSync(filepath + '.nvue')) {
      entry[page.path] = filepath + '.nvue?uxType=page'
    } else {
      entry[page.path] = filepath + '.vue?uxType=page'
    }
  })
  return entry
}
