// const {
//   IDENTIFIER_ATTR
// } = require('../../../constants')

// const getMemberExpr = require('../member-expr')

module.exports = function processAttrs (paths, path, state, isComponent, tagName) {
  // 不再单独处理ObjectExpression，改为在转换temlplte时用()包裹（微信、QQ）
  // const attrsPath = paths.attrs
  // if (attrsPath) {
  //   attrsPath.get('value.properties').forEach(propertyPath => {
  //     const valuePath = propertyPath.get('value')
  //     if (valuePath.isObjectExpression()) {
  //       valuePath.replaceWith(getMemberExpr(null, IDENTIFIER_ATTR, valuePath.node, state))
  //     }
  //   })
  // }
  return []
}
