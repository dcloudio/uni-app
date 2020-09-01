const fs = require('fs-extra')
const path = require('path')

exports.renameStyle = function(target, pkgDir) {
  const distDir = path.resolve(pkgDir, 'dist')
  fs.readdirSync(distDir).forEach(file => {
    if (path.extname(file) === '.css') {
      fs.renameSync(
        path.resolve(distDir, file),
        path.resolve(distDir, target + '.css')
      )
    }
  })
}
