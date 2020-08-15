const t = require('@babel/types')

const {
  IDENTIFIER_ATTR
} = require('../../../constants')

const getMemberExpr = require('../member-expr')

module.exports = function processAttrs (paths, path, state, isComponent, tagName) {
  const attrsPath = paths.attrs
  if (attrsPath) {
    attrsPath.get('value.properties').forEach(propertyPath => {
      const valuePath = propertyPath.get('value')
      // 对于普通的ObjectExpression不再单独处理，改为在转换temlplte时用()包裹（微信、QQ）
      if (valuePath.isObjectExpression() && valuePath.node.properties.find(({ key, value }) => !t.isIdentifier(key) || !(t.isIdentifier(value) || t.isStringLiteral(value) || t.isBooleanLiteral(value) || t.isNumericLiteral(value) || t.isNullLiteral(value)))) {
        valuePath.replaceWith(getMemberExpr(path, IDENTIFIER_ATTR, valuePath.node, state))
      }
    })
  }
  return []
}
