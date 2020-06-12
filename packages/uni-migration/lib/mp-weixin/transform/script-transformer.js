const fs = require('fs')
const importTemplate = require('./import-template')

function transformScript (content, route, code) {
  return `${code}
global['__wxRoute'] = '${route}'
${content}
export default global['__wxComponents']['${route}']`
}

function genJsCode(components, code, state) {
  const wxTemplateComponentProps = '__wxTemplateComponentProps'
  const props = state.props
  const importCode = []
  const propsCode = []
  const componentsCode = []
  components.forEach((node, index) => {
    const src = node.attribs.src
    const templates = importTemplate(src, state)
    const identifier = `__wxTemplateComponent${index}`
    importCode.push(`import ${identifier} from '${src.replace(/.wxml$/, '.vue')}'`)
    templates.forEach(template => {
      // TODO 改为在 template 编译时静态分析
      propsCode.push(`${wxTemplateComponentProps}['${template}'] && ${wxTemplateComponentProps}['${template}'].forEach(prop => ${identifier}.props[prop] = {type: null})`)
      componentsCode.push(`'${template}' : ${identifier}`)
    })
  })

  return components.length ? `
const ${wxTemplateComponentProps} = ${JSON.stringify(props)}
${importCode.join('\n')}
${propsCode.join('\n')}
${code.trim().replace(/\}\}$/, '')},${componentsCode.join(',')}}}
`: code
}

module.exports = {
  transformScript,
  transformScriptFile(filepath, code, options, deps) {
    let content = ''
    if (options.components.length) {
      code = genJsCode(options.components, code, options)
    }
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
