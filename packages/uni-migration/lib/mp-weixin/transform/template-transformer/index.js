const fs = require('fs')
const path = require('path')

const parse = require('./parser')
const transform = require('./transform')

function transformTemplate(content, options = {}) {
  return transform(parse(content), options)
}

module.exports = {
  transformTemplate,
  transformTemplateFile(filepath, options = {}) {
    return transformTemplate(fs.readFileSync(filepath, 'utf8').toString().trim(), options)
  }
}
