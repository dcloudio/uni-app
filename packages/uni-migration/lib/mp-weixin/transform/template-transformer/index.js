const fs = require('fs')
const path = require('path')

const parse = require('./parser')
const transform = require('./transform')

function transformTemplate(content) {
  return transform(parse(content))
}

module.exports = {
  transformTemplate,
  transformTemplateFile(filepath) {
    return transformTemplate(fs.readFileSync(filepath, 'utf8').toString().trim())
  }
}
