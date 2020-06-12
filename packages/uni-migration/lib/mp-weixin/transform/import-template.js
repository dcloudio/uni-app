const fs = require('fs')
const path = require('path')
const parse = require('./template-transformer/parser')

function getTemplate (content) {
  const template = []
  const node = parse(content)
  node.children.forEach(node => {
    if (node.name === 'template') {
      const name = node.attribs.name
      if (name) {
        template.push(name)
      }
    }
  })
  return template
}

module.exports = function (filepath, options) {
  filepath = path.join(path.dirname(options.filepath), filepath)
  return getTemplate(fs.readFileSync(filepath, 'utf8').toString().trim())
}