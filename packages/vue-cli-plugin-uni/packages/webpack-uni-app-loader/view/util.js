const parser = require('@babel/parser')

function parseComponents (content, traverse) {
  const {
    state: {
      components
    }
  } = traverse(parser.parse(content, {
    sourceType: 'module',
    plugins: [
      'typescript',
      ['decorators', {
        decoratorsBeforeExport: true
      }],
      'classProperties'
    ]
  }), {
    components: []
  })
  return components
}

module.exports = {
  parseComponents
}
