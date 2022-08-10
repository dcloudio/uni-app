module.exports = function ({
  types: t
}) {
  return {
    visitor: {
      MemberExpression (path, state) {
        if (
          // main.js main.ts
          state.filename.startsWith(require('path').join(process.env.UNI_INPUT_DIR, 'main.')) &&
          t.isIdentifier(path.node.property) &&
                    path.node.property.name === '$mount' &&
                    !path.node.$createApp
        ) {
          path.node.$createApp = true
          path.get('object').replaceWith(
            t.callExpression(
              t.identifier('createApp'),
              [
                path.node.object
              ]
            )
          )
        }
      }
    }
  }
}
