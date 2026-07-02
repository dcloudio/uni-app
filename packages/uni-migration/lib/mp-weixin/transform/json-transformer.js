const fs = require('fs')

const {
  camelize,
  capitalize
} = require('../../util')

function transformJson(content) {
  const {
    component,
    usingComponents
  } = JSON.parse(content)
  if (!usingComponents) {
    return ['']
  }
  const importCode = []
  const componentsCode = []
  Object.keys(usingComponents).forEach(name => {
    // 跳过小程序原生插件
    if (usingComponents[name].includes('plugin://')) {
      return
    }
    const identifier = capitalize(camelize(name))
    importCode.push(`import ${identifier} from '${usingComponents[name]}.vue'`)
    componentsCode.push(`'${name}': ${identifier}`)
  })

  return [`${importCode.join('\n')}
global['__wxVueOptions'] = {components:{${componentsCode.join(',')}}}
`, component]
}

module.exports = {
  transformJson,
  transformJsonFile(filepath, deps) {
    if (!fs.existsSync(filepath)) {
      return ['']
    }
    deps.push(filepath)
    return transformJson(fs.readFileSync(filepath, 'utf8').toString().trim())
  }
}
