const compiler = require('@dcloudio/uni-mp-weixin/lib/uni.compiler.js')
const path = require('path')
const t = require('@babel/types')
const crypto = require('crypto')

function generateJsCode (properties = '{}') {
  return `tt.createComponent({
  generic: true,
  props: ${properties},
  render: function(){}
})
`
}

function generateCssCode (filename) {
  return `@import "./${filename}"
`
}

function getBaseName (ownerName, parentName, slotName, resourcePath) {
  const str = `${resourcePath}/${parentName}/${slotName}`
  const md5 = crypto.createHash('md5').update(str).digest('hex')
  if (process.env.NODE_ENV !== 'development') {
    return `m${md5.substring(0, 8)}`
  }
  return `${ownerName}--${parentName}--${slotName}--${md5.substring(0, 4)}`
}

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

module.exports = Object.assign({}, compiler, {
  directive: 'tt:',
  resolveScopedSlots (slotName, {
    genCode,
    generate,
    ownerName,
    parentName,
    parentNode,
    resourcePath,
    paramExprNode,
    returnExprNodes,
    traverseExpr
  }, state) {
    if (!state.scopedSlots) {
      state.scopedSlots = {}
    }
    const baseName = getBaseName(ownerName, parentName, slotName, resourcePath)
    let componentName = baseName
    if (!hasOwn(state.scopedSlots, baseName)) {
      state.scopedSlots[baseName] = 0
    }
    if (state.scopedSlots[baseName]) {
      componentName = baseName + state.scopedSlots[baseName]
    }
    state.scopedSlots[baseName]++

    if (!parentNode.attr.generic) {
      parentNode.attr.generic = {}
    }
    parentNode.attr.generic[slotName] = componentName

    // 生成 scopedSlots 文件，包括 json,js, ttml, ttss, 还需要更新 owner 的 usingComponents
    if (!state.files) {
      state.files = {}
    }
    const extname = path.extname(resourcePath)

    const templateFile = resourcePath.replace(ownerName + extname, componentName + extname)
    const templateContent = generate(traverseExpr(returnExprNodes, state), state)

    state.files[templateFile] = templateContent

    const jsFile = resourcePath.replace(ownerName + extname, componentName + '.js')

    const objectProperties = []

    if (t.isObjectPattern(paramExprNode)) {
      paramExprNode.properties.forEach(property => {
        const key = property.key
        const value = property.value
        const valueObjectProperties = [
          t.objectProperty(t.identifier('type'), t.nullLiteral())
        ]
        if (t.isIdentifier(value)) {
          if (value.name !== key.name) {
            state.errors.add(`解构插槽 Prop 时,不支持将${key.name}重命名为${value.name},重命名后会影响性能`)
          }
        } else if (t.isAssignmentPattern(value)) {
          valueObjectProperties.push(t.objectProperty(t.identifier('default'), value.right))
        }
        objectProperties.push(t.objectProperty(key, t.objectExpression(valueObjectProperties)))
      })
    } else {
      state.errors.add(`目前仅支持解构插槽 ${paramExprNode.name},如 v-slot="{ user }"`)
    }
    const jsContent = generateJsCode(genCode(t.objectExpression(objectProperties), true))
    state.files[jsFile] = jsContent

    try {
      // TODO 使用 getPlatformExts 在单元测试报错，改从 state.options.platform 判断
      const { getPlatformExts } = require('@dcloudio/uni-cli-shared')
      const styleExtname = getPlatformExts().style
      const styleFile = resourcePath.replace(ownerName + extname, componentName + styleExtname)
      const styleContent = generateCssCode(ownerName + styleExtname)

      state.files[styleFile] = styleContent
    } catch (error) { }

    // webpack-uni-mp-loader/lib/plugin/generate-component 处理 json 文件还有修改 slot 模版
    const fixExtname = '.fix'
    const extFile = resourcePath.replace(ownerName + extname, componentName + fixExtname)
    state.files[extFile] = `${resourcePath.replace(ownerName + extname, ownerName)},${parentName},${componentName},scoped-slots-${slotName}`

    if (!state.generic) {
      state.generic = []
    }
    // 存储，方便后续生成 json
    state.generic.push(componentName)

    return ''
  }
})
