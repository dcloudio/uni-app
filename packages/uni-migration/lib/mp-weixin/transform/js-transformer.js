const fs = require('fs')
const path = require('path')

const {
  normalizePath
} = require('../util')

module.exports = function transformJs(filepath, usingComponentsCode, options) {
  let jsCode = ''
  if (!fs.existsSync(filepath)) {
    jsCode = `
Component({})
`
  } else {
    jsCode = fs.readFileSync(filepath, 'utf8')
  }

  let route = normalizePath(filepath)
  if (options.base) {
    route = normalizePath(path.relative(options.base, filepath))
  }
  route = route.replace('.js', '')
  return `
global['__wxRoute'] = '${route}'
global['__wxUsingComponents'] = ${usingComponentsCode}
${jsCode}
export default global['__wxComponents']['${route}']
  `
}
