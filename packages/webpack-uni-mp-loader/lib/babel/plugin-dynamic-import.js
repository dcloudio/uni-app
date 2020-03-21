const t = require('@babel/types')
const babelTemplate = require('@babel/template').default

// const buildDynamicImport = babelTemplate(`var IMPORT_NAME = ()=>import(IMPORT_SOURCE)`, {
//   preserveComments: true,
//   plugins: [
//     'dynamicImport'
//   ]
// })
// 已废弃，@vue/cli-plugin-babel@4 增加了 dynamic import 转换
// var test = ()=>import(/* webpackChunkName: "components/test" */'../../components/test')
// function getDynamicImport (name, source, chunkName) {
//   const stringLiteral = t.stringLiteral(source)
//   const dynamicImportComment = {
//     type: 'CommentBlock',
//     value: `webpackChunkName: "${chunkName}"`
//   }
//   stringLiteral.leadingComments = [dynamicImportComment]
//   return buildDynamicImport({
//     IMPORT_NAME: t.identifier(name),
//     IMPORT_SOURCE: stringLiteral
//   })
// }
// var test = function(resolve) {require.ensure([], () => resolve(require('../../components/test')),'components/test')}
const buildRequireEnsure = babelTemplate(
  `var IMPORT_NAME = function(){require.ensure([],()=>resolve(require(IMPORT_SOURCE)),CHUNK_NAME)}`
)

function getRequireEnsure (name, source, chunkName) {
  return buildRequireEnsure({
    IMPORT_NAME: t.identifier(name),
    IMPORT_SOURCE: t.stringLiteral(source),
    CHUNK_NAME: t.stringLiteral(chunkName)
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
            getRequireEnsure(
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
