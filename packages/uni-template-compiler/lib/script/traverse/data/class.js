const t = require('@babel/types')
const uniI18n = require('@dcloudio/uni-cli-i18n')

const {
  VIRTUAL_HOST_CLASS
} = require('../../../constants')

const {
  getCode,
  isRootElement
} = require('../../../util')

function processClassArrayExpressionElements (classArrayExpression) {
  let binaryExpression

  classArrayExpression.elements.forEach(expr => {
    if (t.isArrayExpression(expr)) {
      expr = processClassArrayExpressionElements(expr)
    }
    if (!binaryExpression) {
      binaryExpression = t.parenthesizedExpression(expr)
    } else {
      binaryExpression = t.parenthesizedExpression(t.binaryExpression(
        '+',
        t.binaryExpression(
          '+',
          binaryExpression,
          t.stringLiteral(' ')
        ),
        expr
      ))
    }
  })

  return binaryExpression
}

function processStaticClass (classArrayExpression, staticClassPath, state) {
  if (staticClassPath) {
    const staticClassPathArr = staticClassPath.node.value.value.split(' ')
    for (let len = staticClassPathArr.length, index = len - 1; index >= 0; index--) {
      classArrayExpression.elements.unshift(t.stringLiteral(staticClassPathArr[index]))
    }
    staticClassPath.remove()
  }

  const transPlatform = ['mp-toutiao', 'mp-alipay', 'mp-lark']
  if (transPlatform.includes(state.options.platform.name)) {
    // classArrayExpression => binaryExpression
    return processClassArrayExpressionElements(classArrayExpression)
  }
  return classArrayExpression
}

function processClassObjectExpression (classValuePath) {
  const elements = []
  const propertyPaths = classValuePath.get('properties')
  propertyPaths.forEach(propertyPath => {
    const key = propertyPath.node.key
    elements.push(
      t.conditionalExpression(
        t.parenthesizedExpression(propertyPath.node.value),
        t.stringLiteral(key.name || key.value),
        t.stringLiteral('')
      )
    )
  })
  return t.arrayExpression(elements)
}

function processClassArrayExpression (classValuePath) {
  const elementPaths = classValuePath.get('elements')
  elementPaths.forEach(elementPath => {
    if (elementPath.isObjectExpression()) {
      elementPath.replaceWith(processClassObjectExpression(elementPath))
    }
  })
  return classValuePath.node
}

module.exports = function processClass (paths, path, state) {
  const classPath = paths.class
  const staticClassPath = paths.staticClass
  const mergeVirtualHostAttributes = state.options.mergeVirtualHostAttributes
  let classArrayExpression
  if (classPath) {
    const classValuePath = classPath.get('value')
    if (classValuePath.isObjectExpression()) { // object
      classArrayExpression = processClassObjectExpression(classValuePath)
    } else if (classValuePath.isArrayExpression()) { // array
      classArrayExpression = processClassArrayExpression(classValuePath)
    } else if (
      classValuePath.isStringLiteral() || // :class="'a'"
      classValuePath.isIdentifier() || // TODO 需要优化到下一个条件，:class="classObject"
      classValuePath.isMemberExpression() || // 需要优化到下一个条件，:class="item.classObject"
      classValuePath.isConditionalExpression() ||
      classValuePath.isLogicalExpression() ||
      classValuePath.isBinaryExpression()
    ) {
      // 理论上 ConditionalExpression,LogicalExpression 可能存在 classObject，应该__get_class，还是先不考虑这种情况吧
      // ConditionalExpression :class="index === currentIndex ? activeStyle : itemStyle"
      // BinaryExpression  :class="'m-content-head-'+message.user"
      classArrayExpression = t.arrayExpression([classValuePath.node])
    } else if (
      classValuePath.isIdentifier() ||
      classValuePath.isMemberExpression()
    ) { // classObject :class="classObject" :class="vm.classObject"
      // TODO 目前先不考虑 classObject,styleObject

      //       const args = [classPath.node.value]
      //       if (staticClassPath) {
      //         args.push(staticClassPath.node.value)
      //         staticClassPath.remove()
      //       }
      //       classValuePath.replaceWith(
      //         getMemberExpr(
      //           classPath,
      //           IDENTIFIER_CLASS,
      //           t.callExpression(t.identifier(INTERNAL_GET_CLASS), args),
      //           state
      //         )
      //       )
    } else {
      state.errors.add(':class' + uniI18n.__('templateCompiler.noSupportSyntax', { 0: getCode(classValuePath.node) }))
    }
  }
  if (mergeVirtualHostAttributes && isRootElement(path.parentPath)) {
    const virtualHostClass = t.identifier(VIRTUAL_HOST_CLASS)
    if (classArrayExpression) {
      classArrayExpression.elements.push(virtualHostClass)
    } else {
      classArrayExpression = t.arrayExpression([virtualHostClass])
      const property = t.objectProperty(t.identifier('class'), processStaticClass(classArrayExpression, staticClassPath, state))
      path.node.properties.push(property)
      return []
    }
  }
  if (classArrayExpression) {
    const classValuePath = classPath.get('value')
    classValuePath.replaceWith(processStaticClass(classArrayExpression, staticClassPath, state))
  }
  return []
}
