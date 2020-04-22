const fs = require('fs')
const path = require('path')

const glob = require('glob')
const loaderUtils = require('loader-utils')

const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = function loader(source) {
  const options = loaderUtils.getOptions(this)
  const baseDir = options['base']
  const extendsDir = options['extends']

  const exportCode = []
  const extendsFiles = []
  // extends目录均导出
  glob.sync('**/*.js', {
    cwd: extendsDir
  }).forEach(file => {
    if (file === 'index.js') {
      return
    }
    extendsFiles.push(file)
    exportCode.push(`export * from 'uni-sub-platform-api/${normalizePath(file)}'`)
  })
  //base目录中有，extends无的导出
  glob.sync('**/*.js', {
    cwd: baseDir
  }).forEach(file => {
    if (file === 'index.js') {
      return
    }
    if (!extendsFiles.includes(file)) {
      exportCode.push(`export * from 'uni-platform-api/${normalizePath(file)}'`)
    }
  })
  // console.log(exportCode.join('\n'))
  return exportCode.join('\n')
}
