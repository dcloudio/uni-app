const t = require('@babel/types')

const {
  METHOD_CREATE_ELEMENT,
  METHOD_TO_STRING,
  METHOD_RENDER_LIST,
  METHOD_BUILT_IN,
  METHOD_RESOLVE_FILTER,
  IDENTIFIER_FILTER,
  IDENTIFIER_METHOD,
  IDENTIFIER_GLOBAL
} = require('../../constants')

const {
  getTagName
} = require('../../h5')

const {
  hyphenate,
  getComponentName
} = require('../../util')

const traverseData = require('./data')
const traverseRenderList = require('./render-list')

const getMemberExpr = require('./member-expr')

function addStaticClass (path, staticClass) {
  const dataPath = path.get('arguments.1')
  if (dataPath && dataPath.isObjectExpression()) {
    const staticClassProperty = dataPath.node.properties.find(property => property.key.name === 'staticClass')
    if (staticClassProperty) { // update
      staticClassProperty.value.value = staticClassProperty.value.value + ' ' + staticClass
    } else { // add
      dataPath.node.properties.push(
        t.objectProperty(t.identifier('staticClass'), t.stringLiteral(staticClass))
      )
    }
  } else { // {staticClass:'data-v-aaa'}
    const args = path.node.arguments
    args.splice(1, 0, t.objectExpression(
      [
        t.objectProperty(t.identifier('staticClass'), t.stringLiteral(staticClass))
      ]
    ))
  }
}

function addVueId (path, state) {
  // const platformName = state.options.platform.name
  // if ( // 暂不对 mp-weixin,app-plus 增加 vueId
  //   platformName === 'mp-weixin' ||
  //       platformName === 'app-plus'
  // ) {
  //   return
  // }
  if (!state.options.hasOwnProperty('$vueId')) {
    state.options.$vueId = 1
  }
  const vueId = String(state.options.$vueId++)

  let value

  if (state.scoped.length) {
    let scopeds = state.scoped
    let len = scopeds.length
    if (len > 1) { // v-for 嵌套，forIndex 不允许重复
      const forIndexSet = new Set()
      for (let i = 0; i < len; i++) {
        const scoped = scopeds[i]
        forIndexSet.add(scoped.forIndex)
        if (forIndexSet.size !== i + 1) {
          state.errors.add(`v-for 嵌套时,索引名称 ${scoped.forIndex} 不允许重复`)
          break
        }
      }
    }
    for (let i = len - 1; i >= 0; i--) {
      const scoped = scopeds[i]
      if (!value) {
        value = t.binaryExpression('+', t.stringLiteral(vueId + '-'), t.identifier(scoped.forIndex))
      } else {
        value = t.binaryExpression('+',
          t.binaryExpression('+', value, t.stringLiteral('-')),
          t.identifier(scoped.forIndex)
        )
      }
    }
  } else {
    value = t.stringLiteral(vueId)
  }

  const objectProperty = t.objectProperty(
    t.stringLiteral('vue-id'),
    value
  )

  const dataPath = path.get('arguments.1')
  if (dataPath && dataPath.isObjectExpression()) {
    const attrsProperty = dataPath.node.properties.find(property => property.key.name === 'attrs')
    if (attrsProperty) {
      attrsProperty.value.properties.unshift(objectProperty)
    } else {
      dataPath.node.properties.push(
        t.objectProperty(t.identifier('attrs'), t.objectExpression([
          objectProperty
        ]))
      )
    }
  } else { // {attrs:{'vue-id':'2'}}
    const args = path.node.arguments
    args.splice(1, 0, t.objectExpression(
      [
        t.objectProperty(t.identifier('attrs'), t.objectExpression([
          objectProperty
        ]))
      ]
    ))
  }
}

function checkUsingGlobalComponents (name, globalUsingComponents, state) {
  if (globalUsingComponents && globalUsingComponents[name]) {
    if (!state.options.usingGlobalComponents) {
      state.options.usingGlobalComponents = Object.create(null)
    }
    state.options.usingGlobalComponents[name] = globalUsingComponents[name]
  }
}

module.exports = {
  noScope: true,
  CallExpression (path) {
    const callee = path.node.callee
    if (t.isIdentifier(callee)) {
      const methodName = callee.name
      switch (methodName) {
        case METHOD_CREATE_ELEMENT:
          const tagNode = path.node.arguments[0]
          if (t.isStringLiteral(tagNode)) {
            // 需要把标签增加到 class 样式中
            const tagName = getTagName(tagNode.value)
            if (tagName !== tagNode.value) {
              addStaticClass(path, '_' + tagNode.value)
            }
            tagNode.value = getComponentName(hyphenate(tagName))

            // 组件增加 vueId
            if (this.options.platform.isComponent(tagNode.value)) {
              addVueId(path, this)
            }

            // 查找全局组件
            checkUsingGlobalComponents(
              tagNode.value,
              this.options.globalUsingComponents,
              this
            )
          }
          if (this.options.scopeId) {
            addStaticClass(path, this.options.scopeId)
          }

          const dataPath = path.get('arguments.1')
          dataPath && dataPath.isObjectExpression() && traverseData(dataPath, this, tagNode.value)
          break
        case METHOD_TO_STRING:
          const stringNodes = path.node.arguments[0]
          stringNodes.$toString = true
          path.replaceWith(stringNodes)
          break
        case METHOD_RENDER_LIST:
          traverseRenderList(path, this)
          path.skip()
          break
        default:
          if (!METHOD_BUILT_IN.includes(methodName)) {
            if (
              path.findParent(
                path =>
                  path.isObjectProperty() && ['on', 'nativeOn'].includes(path.node.key.name)
              )
            ) {
              // event
              return path.skip()
            }

            path.replaceWith(
              getMemberExpr(
                path,
                methodName === METHOD_RESOLVE_FILTER
                  ? IDENTIFIER_FILTER
                  : IDENTIFIER_METHOD,
                path.node,
                this
              )
            )
          }
          break
      }
    } else if (
      t.isCallExpression(callee) &&
            t.isIdentifier(callee.callee) &&
            callee.callee.name === METHOD_RESOLVE_FILTER
    ) {
      // multi filter
      path.replaceWith(getMemberExpr(path, IDENTIFIER_FILTER, path.node, this))
    } else if (
      t.isMemberExpression(callee) // message.split('').reverse().join('')
    ) {
      // Object.assign...
      path.replaceWith(getMemberExpr(path, IDENTIFIER_GLOBAL, path.node, this))
    }
  },
  TemplateLiteral (path) {
    const nodes = []
    const expressions = path.get('expressions')

    let index = 0
    for (const elem of path.node.quasis) {
      if (elem.value.cooked) {
        nodes.push(t.stringLiteral(elem.value.cooked))
      }

      if (index < expressions.length) {
        const expr = expressions[index++]
        const node = expr.node
        if (!t.isStringLiteral(node, {
          value: ''
        })) {
          nodes.push(node)
        }
      }
    }

    // since `+` is left-to-right associative
    // ensure the first node is a string if first/second isn't
    const considerSecondNode = !t.isStringLiteral(nodes[1])
    if (!t.isStringLiteral(nodes[0]) && considerSecondNode) {
      nodes.unshift(t.stringLiteral(''))
    }
    let root = nodes[0]

    for (let i = 1; i < nodes.length; i++) {
      root = t.binaryExpression('+', root, nodes[i])
    }

    path.replaceWith(root)
  }
}
