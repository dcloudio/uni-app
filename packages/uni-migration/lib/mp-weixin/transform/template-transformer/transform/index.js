const traverse = require('./traverse')
const generate = require('./generate')

module.exports = function transform(ast, options) {
  options.wxs = []
  options.shouldWrapper = options.shouldWrapper || function noop() {}
  return generate(traverse(ast, options), options)
}
