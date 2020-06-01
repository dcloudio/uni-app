process.UNI_APIS = new Set()
module.exports = function ({
  types: t
}) {
  return {
    visitor: {
      MemberExpression (path, state) {
        if (
          t.isIdentifier(path.node.object) &&
          (
            path.node.object.name === 'uni' ||
            path.node.object.name === 'wx'
          )
        ) {
          process.UNI_APIS.add(path.node.property.name || path.node.property.value)
        }
      }
    }
  }
}
