const fs = require('fs')
const path = require('path')

const {
  normalizePath
} = require('../../util')

function transformScript(content, route, code) {
  return `${code}
global['__wxRoute'] = '${route}'
${content}
export default global['__wxComponents']['${route}']`
}

module.exports = {
  transformScript,
  transformScriptFile(filepath, code, options, deps) {
    let content = ''
    if (!fs.existsSync(filepath)) {
      content = `
Component({})
`
    } else {
      content = fs.readFileSync(filepath, 'utf8').toString().trim()
      deps.push(filepath)
    }
    let route = normalizePath(filepath)
    if (options.base) {
      route = normalizePath(path.relative(options.base, filepath))
    }
    route = route.replace('.js', '')
    return transformScript(content, route, code, options)
  }
}
