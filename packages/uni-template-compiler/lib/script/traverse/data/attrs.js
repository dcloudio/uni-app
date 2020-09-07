const {
  IDENTIFIER_ATTR
} = require('../../../constants')

const {
  isSimpleObjectExpression
} = require('../../../util')

const getMemberExpr = require('../member-expr')

module.exports = function processAttrs (paths, path, state, isComponent, tagName) {
  const attrsPath = paths.attrs
  if (attrsPath) {
    attrsPath.get('value.properties').forEach(propertyPath => {
      const valuePath = propertyPath.get('value')
      // 对于简单的ObjectExpression不再单独处理，改为在转换temlplte时用()包裹（微信、QQ）
      if (valuePath.isObjectExpression() && !isSimpleObjectExpression(valuePath.node)) {
        valuePath.replaceWith(getMemberExpr(path, IDENTIFIER_ATTR, valuePath.node, state))
      }
    })
  }
  return []
}
