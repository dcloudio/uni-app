const fs = require('fs')

module.exports = function transformJson(filepath) {
  if (!fs.existsSync(filepath)) {
    return ['{}']
  }

  const {
    usingComponents
  } = require(filepath)
  if (!usingComponents) {
    return ['{}']
  }
  const usingComponentsCode = []
  Object.keys(usingComponents).forEach(name => {
    usingComponentsCode.push(`'${name}': require('${usingComponents[name]}').default`)
  })

  return [`{
${usingComponentsCode.join(',')}
}`]
}
