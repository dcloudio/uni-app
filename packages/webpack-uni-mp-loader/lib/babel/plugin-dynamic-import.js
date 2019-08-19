const t = require('@babel/types')
const babelTemplate = require('@babel/template').default

const buildDynamicImport = babelTemplate(`var IMPORT_NAME = ()=>import(IMPORT_SOURCE)`, {
  preserveComments: true,
  plugins: [
    'dynamicImport'
  ]
})
// var test = ()=>import(/* webpackChunkName: "components/test" */'../../components/test')
function getDynamicImport (name, source, chunkName) {
  const stringLiteral = t.stringLiteral(source)
  const dynamicImportComment = {
    type: 'CommentBlock',
    value: `webpackChunkName: "${chunkName}"`
  }
  stringLiteral.leadingComments = [dynamicImportComment]
  return buildDynamicImport({
    IMPORT_NAME: t.identifier(name),
    IMPORT_SOURCE: stringLiteral
  })
}

module.exports = function ({
  types: t
}) {
  return {
    visitor: {
      ImportDeclaration (path, state) {
        const dynamicImport = state.opts.dynamicImports[path.node.source.value]
        if (dynamicImport) {
          path.insertBefore(
            getDynamicImport(
              path.node.specifiers[0].local.name,
              dynamicImport.source,
              dynamicImport.chunkName
            )
          )
          path.remove()
        }
      }
    }
  }
}
