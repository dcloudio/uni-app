const traverse = require('./traverse')
const generate = require('./generate')

module.exports = function transform(ast, options) {
  const state = {
    wxs: [],
    filename: options.filename
  }
  return generate(traverse(ast, state), state)
}
