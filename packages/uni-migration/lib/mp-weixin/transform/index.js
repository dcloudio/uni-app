const path = require('path')
const glob = require('glob')
const transformFile = require('./file-transformer')

function generateVueFile(input, out, options) {
  const content = transformFile(input, out, options)
  return {
    path: path.resolve(out, path.basename(input).replace(options.extname, '.vue')),
    content
  }
}

function generateVueFolder(input, out, options) {
  return glob.sync('**/*.wxml', {
    cwd: input
  }).map(wxmlFile => {
    return generateVueFile(
      path.resolve(input, wxmlFile),
      path.dirname(path.resolve(out, wxmlFile)),
      options
    )
  })
}

function generateVueApp(input, out, options) {
  console.error(`暂不支持转换整个 App`)
}

module.exports = function transform(input, out, options) {
  const ret = []
  switch (options.target) {
    case 'file':
      ret.push(generateVueFile(input, out, options))
      break
    case 'folder':
      ret.push(...generateVueFolder(input, out, options))
      break
    case 'app':
      ret.push(...generateVueApp(input, out, options))
      break
  }
  return ret
}
