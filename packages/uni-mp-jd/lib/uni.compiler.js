const compiler = require('@dcloudio/uni-mp-weixin/lib/uni.compiler.js')
const path = require('path')
const t = require('@babel/types')
const uniI18n = require('@dcloudio/uni-cli-i18n')

function generateJsCode (properties = '{}') {
  return `
jd.createComponent({
    generic:true,
    props: ${properties},
    render: function(){}
})
`
}

function generateCssCode (filename) {
  return `
@import "./${filename}"
`
}

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

module.exports = Object.assign({}, compiler, {
  directive: 'jd:',
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
    const baseName = `${ownerName}-${parentName}-${slotName}`
    let componentName = baseName
    if (!hasOwn(state.scopedSlots, baseName)) {
      state.scopedSlots[baseName] = 0
    }
    if (state.scopedSlots[baseName]) {
      componentName = baseName + state.scopedSlots[baseName]
    }
    state.scopedSlots[baseName]++
    parentNode.attr['generic:scoped-slots-' + slotName] = componentName
    if (state.options.platform.name === 'mp-weixin') {
      parentNode.attr['data-vue-generic'] = 'scoped'
    }
    if (!parentNode.attr.generic) {
      parentNode.attr.generic = {}
    }
    parentNode.attr.generic[slotName] = true

    // 生成 scopedSlots 文件，包括 json,js,wxml,wxss,还需要更新 owner 的 usingComponents
    if (!state.files) {
      state.files = {}
    }
    const extname = path.extname(resourcePath)

    // TODO 需要存储 resourcePath 相关 json

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
            state.errors.add(uniI18n.__('mpWeChat.slotPropNoSupportReanme', { 0: key.name, 1: value.name }))
          }
        } else if (t.isAssignmentPattern(value)) {
          valueObjectProperties.push(t.objectProperty(t.identifier('default'), value.right))
        }
        objectProperties.push(t.objectProperty(key, t.objectExpression(valueObjectProperties)))
      })
    } else {
      state.errors.add(uniI18n.__('mpWeChat.onlySupportDestructuringSlot', { 0: paramExprNode.name, 1: 'v-slot="{ user }"' }))
    }
    const jsContent = generateJsCode(genCode(t.objectExpression(objectProperties), true))
    state.files[jsFile] = jsContent

    try {
      // TODO 使用 getPlatformExts 在单元测试报错，改从 state.options.platform 判断
      const {
        getPlatformExts
      } = require('@dcloudio/uni-cli-shared')
      const styleExtname = getPlatformExts().style
      const styleFile = resourcePath.replace(ownerName + extname, componentName + styleExtname)
      const styleContent = generateCssCode(ownerName + styleExtname)

      state.files[styleFile] = styleContent
    } catch (error) { }

    if (!state.generic) {
      state.generic = []
    }
    // 存储，方便后续生成 json
    state.generic.push(componentName)

    return ''
  }
})
