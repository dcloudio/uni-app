const babelGenerate = require('@babel/generator').default

module.exports = function generate (ast, state) {
  return babelGenerate(ast, state.options).code
}
