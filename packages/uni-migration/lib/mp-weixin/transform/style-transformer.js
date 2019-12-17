const fs = require('fs')

function transformStyle(content, options) {
  return content.replace(new RegExp(`\\${options.extname.style}`, 'g'), '.css')
    .replace(':host', '.' + options.shadowRootHost)
}

module.exports = {
  transformStyle,
  transformStyleFile(filepath, options, deps) {
    if (!fs.existsSync(filepath)) {
      return ''
    }
    deps.push(filepath)
    return transformStyle(fs.readFileSync(filepath, 'utf8').toString().trim(), options)
  }
}
