const {
  IDENTIFIER_ATTR
} = require('../../../constants')

const {
  isSimpleObjectExpression,
  hasEscapeQuote
} = require('../../../util')

const getMemberExpr = require('../member-expr')

function checkObjectExpression (path) {
  return path.isObjectExpression() && !isSimpleObjectExpression(path.node)
}

module.exports = function processAttrs (paths, path, state, isComponent, tagName) {
  const attrsPath = paths.attrs
  if (attrsPath) {
    attrsPath.get('value.properties').forEach(propertyPath => {
      const valuePath = propertyPath.get('value')
      // 对于简单的ObjectExpression不再单独处理，改为在转换temlplte时用()包裹（微信、QQ）
      // 属性中包含转义引号时部分小程序平台报错或显示异常
      if (checkObjectExpression(valuePath) || hasEscapeQuote(valuePath)) {
        valuePath.replaceWith(getMemberExpr(path, IDENTIFIER_ATTR, valuePath.node, state))
      }
    })
  }
  return []
}
