const fs = require('fs')
const path = require('path')

module.exports = function transformWxml(filepath) {
  return [fs.readFileSync(filepath, 'utf8')]
}
