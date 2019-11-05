const traverse = require('./traverse')
const generate = require('./generate')

module.exports = function transform(ast) {
  const state = {
    wxs: []
  }
  return generate(traverse(ast, state), state)
}
