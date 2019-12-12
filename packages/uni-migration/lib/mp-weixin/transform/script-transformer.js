const fs = require('fs')

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
    return transformScript(content, options.route, code, options)
  }
}
