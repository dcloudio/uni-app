const t = require('@babel/types')

const {
  IDENTIFIER_STYLE,
  INTERNAL_GET_STYLE
} = require('../../../constants')

const {
  getCode,
  hyphenate
} = require('../../../util')

const getMemberExpr = require('../member-expr')

const REGEX_PX = /(:|\s|\(|\/)[+-]?\d+(\.\d+)?u?px/g
const REGEX_UPX = /(:|\s|\(|\/)[+-]?\d+(\.\d+)?upx/g

function processStaticStyleUnit (styleStr, state) {
  if (typeof styleStr === 'string') {
    let matches = styleStr.match(REGEX_UPX)
    if (matches && matches.length) {
      matches.forEach(function (match) {
        styleStr = styleStr.replace(match, match.substr(0, match.length - 3) + 'rpx')
      })
    }
    // TODO 不应该再支持 px 转 rpx
    if (state.options.transformPx) { // 需要转换 px
      matches = styleStr.match(REGEX_PX)
      if (matches && matches.length) {
        matches.forEach(function (match) {
          styleStr = styleStr.replace(match, match.substr(0, match.length - 2) + 'rpx')
        })
      }
    }
  }
  return styleStr
}

function getStaticStyleStringLiteral (staticStylePath, state) {
  const staticStyle = staticStylePath.node.value.properties
    .map(property => {
      return `${property.key.value}:${property.value.value}`
    })
    .join(';')
  const staticStyleStr = processStaticStyleUnit(staticStyle, state).trim()
  return t.stringLiteral(staticStyleStr + (!staticStyleStr.endsWith(';') ? ';' : ''))
}

function processStaticStyle (binaryExpressions, staticStylePath, state) {
  let binaryExpression

  binaryExpressions.forEach(binaryExpr => {
    if (!binaryExpression) {
      if (staticStylePath) {
        binaryExpression = t.binaryExpression(
          '+',
          getStaticStyleStringLiteral(staticStylePath, state),
          binaryExpr
        )
        staticStylePath.remove()
      } else {
        binaryExpression = binaryExpr
      }
    } else {
      binaryExpression = t.binaryExpression(
        '+',
        binaryExpression,
        binaryExpr
      )
    }
  })

  return binaryExpression
}

function processStyleObjectExpression (styleValuePath) {
  const binaryExpressions = []
  const propertyPaths = styleValuePath.get('properties')
  propertyPaths.forEach(propertyPath => {
    const key = propertyPath.node.key
    binaryExpressions.push(
      t.binaryExpression(
        '+',
        t.binaryExpression(
          '+',
          t.stringLiteral(hyphenate(key.name || key.value) + ':'),
          t.parenthesizedExpression(propertyPath.node.value)
        ),
        t.stringLiteral(';')
      )
    )
  })
  return binaryExpressions
}

function processStyleArrayExpression (elementPaths) {
  let binaryExpressions = []
  elementPaths.forEach(elementPath => {
    binaryExpressions = binaryExpressions.concat(processStyleObjectExpression(elementPath))
  })
  return binaryExpressions
}

function generateGetStyle (stylePath, styleValuePath, staticStylePath, state) {
  const args = [stylePath.node.value]
  if (staticStylePath) {
    args.push(staticStylePath.node.value)
    staticStylePath.remove()
  }
  styleValuePath.replaceWith(
    getMemberExpr(
      stylePath,
      IDENTIFIER_STYLE,
      t.callExpression(t.identifier(INTERNAL_GET_STYLE), args),
      state
    )
  )
}

module.exports = function processStyle (paths, path, state) {
  const stylePath = paths['style']
  const staticStylePath = paths['staticStyle']
  if (stylePath) {
    const styleValuePath = stylePath.get('value')
    if (styleValuePath.isObjectExpression()) {
      styleValuePath.replaceWith(
        processStaticStyle(
          processStyleObjectExpression(styleValuePath),
          staticStylePath,
          state
        )
      )
    } else if (styleValuePath.isArrayExpression()) { // array
      const elementPaths = styleValuePath.get('elements')
      const dynamicStyle = elementPaths.find(elementPath => !elementPath.isObjectExpression())
      if (dynamicStyle) {
        generateGetStyle(stylePath, styleValuePath, staticStylePath, state)
      } else {
        styleValuePath.replaceWith(
          processStaticStyle(
            processStyleArrayExpression(elementPaths),
            staticStylePath,
            state
          )
        )
      }
    } else if (
      styleValuePath.isStringLiteral() || // :style="'background:red'"
            styleValuePath.isIdentifier() || // TODO 需要优化到下一个条件，:style="styleObject"
            styleValuePath.isMemberExpression() || // TODO 需要优化到下一个条件，:style="item.styleObject"
            styleValuePath.isConditionalExpression() ||
            styleValuePath.isLogicalExpression() ||
            styleValuePath.isBinaryExpression()
    ) {
      // 理论上 ConditionalExpression,LogicalExpression 可能存在 styleObject，应该__get_style，还是先不考虑这种情况吧
      // ConditionalExpression :style="index === currentIndex ? activeStyle : itemStyle"
      // BinaryExpression  :style="'m-content-head-'+message.user"
      styleValuePath.replaceWith(
        processStaticStyle(
          [t.parenthesizedExpression(styleValuePath.node)],
          staticStylePath,
          state
        )
      )
    } else if (
      styleValuePath.isIdentifier() ||
            styleValuePath.isMemberExpression()
    ) { // TODO 目前先不考虑 classObject,styleObject
      // generateGetStyle(stylePath, styleValuePath, staticStylePath, state)
    } else {
      state.errors.add(`:style 不支持 ${getCode(styleValuePath.node)} 语法`)
    }
  } else if (staticStylePath) {
    staticStylePath.get('value').replaceWith(getStaticStyleStringLiteral(staticStylePath, state))
  }
  return []
}
