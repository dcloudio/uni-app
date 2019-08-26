const t = require('@babel/types')

const {
  getCode
} = require('../../../util')

function processClassArrayExpressionElements (classArrayExpression) {
  let binaryExpression

  classArrayExpression.elements.forEach(expr => {
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
    classArrayExpression.elements.unshift(
      t.stringLiteral(staticClassPath.node.value.value)
    )
    staticClassPath.remove()
  }
  if (
    state.options.platform.name === 'mp-toutiao' ||
        state.options.platform.name === 'mp-alipay'
  ) {
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
  const classPath = paths['class']
  const staticClassPath = paths['staticClass']
  if (classPath) {
    const classValuePath = classPath.get('value')
    if (classValuePath.isObjectExpression()) { // object
      classValuePath.replaceWith(
        processStaticClass(
          processClassObjectExpression(classValuePath),
          staticClassPath,
          state
        )
      )
    } else if (classValuePath.isArrayExpression()) { // array
      classValuePath.replaceWith(
        processStaticClass(
          processClassArrayExpression(classValuePath),
          staticClassPath,
          state
        )
      )
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
      classValuePath.replaceWith(
        processStaticClass(
          t.arrayExpression([classValuePath.node]),
          staticClassPath,
          state
        )
      )
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
      state.errors.add(`:class 不支持 ${getCode(classValuePath.node)} 语法`)
    }
  }
  return []
}
