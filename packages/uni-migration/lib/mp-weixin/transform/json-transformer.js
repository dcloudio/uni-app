const fs = require('fs')

function transformJson(content) {
  const {
    usingComponents
  } = JSON.parse(content)
  if (!usingComponents) {
    return ['{}']
  }
  const usingComponentsCode = []
  Object.keys(usingComponents).forEach(name => {
    usingComponentsCode.push(`'${name}': require('${usingComponents[name]}.vue').default`)
  })

  return [`{
${usingComponentsCode.join(',\n')}
}`]
}

module.exports = {
  transformJson,
  transformJsonFile(filepath, deps) {
    if (!fs.existsSync(filepath)) {
      return ['{}']
    }
    deps.push(filepath)
    return transformJson(fs.readFileSync(filepath, 'utf8').toString().trim())
  }
}
