const fs = require('fs')
const path = require('path')

const parse = require('./parser')
const transform = require('./transform')
module.exports = function transformWxml(filepath) {
  return transform(parse(fs.readFileSync(filepath, 'utf8')))
}
