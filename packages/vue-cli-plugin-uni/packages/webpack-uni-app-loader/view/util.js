const parser = require('@babel/parser')

function parseComponents (content, traverse) {
  const {
    state: {
      options,
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
    components: [],
    options: {
      name: null,
      inheritAttrs: null
    }
  })
  return {
    components,
    options
  }
}

module.exports = {
  parseComponents
}
