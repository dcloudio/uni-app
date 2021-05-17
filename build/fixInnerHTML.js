const path = require('path')
const fs = require('fs')

module.exports = function () {
  const files = [
    path.join(__dirname, '../packages/uni-app-plus/dist/view.umd.min.js'),
    path.join(__dirname, '../packages/uni-app-plus/template/v3/__uniappquill.js'),
    path.join(__dirname, '../packages/uni-app-plus/template/v3/__uniappquillimageresize.js')
  ]
  files.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf8'
    })
    fs.writeFileSync(filePath, fileContent.replace(/\.innerHTML\b/g, '["inner"+"HTML"]'), {
      encoding: 'utf8'
    })
  })
}
