const path = require('path')
const glob = require('glob')
const transformFile = require('./file-transformer')

function generateVueFile(input, out, options) {
  const [content, deps, wxsFiles] = transformFile(input, options)
  return {
    path: path.resolve(out, path.basename(input).replace(options.extname.template, '.vue')),
    content,
    deps,
    wxsFiles
  }
}

function generateVueFolder(input, out, options) {
  const extname = options.extname.template
  const files = []
  const assets = []
  const deps = []
  glob.sync('**/*', {
    cwd: input,
    nodir: true
  }).map(file => {
    if (path.extname(file) === extname) {
      const vueFile = generateVueFile(
        path.resolve(input, file),
        path.dirname(path.resolve(out, file)),
        options
      )
      files.push(vueFile)
      deps.push(...vueFile.deps)

      const dirname = path.dirname(file)
      vueFile.wxsFiles.forEach(wxsFile => {
        wxsFile.path = path.join(dirname, wxsFile.path)
        assets.push(wxsFile)
      })
    } else {
      assets.push(file)
    }
  })
  return [files, assets.filter(asset => {
    if (typeof asset === 'string') {
      return !deps.includes(path.resolve(input, asset))
    }
    return true
  })]
}

function generateVueApp(input, out, options) {
  console.error(`暂不支持转换整个 App`)
  return [
    [],
    []
  ]
}

module.exports = function transform(input, out, options) {
  switch (options.target) {
    case 'file':
      return [
        [generateVueFile(input, out, options)],
        []
      ]
    case 'folder':
      return generateVueFolder(input, out, options)
    case 'app':
      return generateVueApp(input, out, options)
  }
  return [
    [],
    []
  ]
}
