const t = require('@babel/types')

const {
  CLASS_REF,
  CLASS_REF_IN_FOR
} = require('../../../constants')

module.exports = function processRef (paths, path, state) {
  const refPath = paths.ref
  if (refPath) {
    if (state.options.platform.name === 'mp-alipay') {
      return [
        t.objectProperty( // data-ref="" ,data-ref-in-for=""
          t.stringLiteral('ref'),
          t.stringLiteral('__r')
        ),
        t.objectProperty( // data-ref="" ,data-ref-in-for=""
          t.stringLiteral(state.inFor ? state.options.platform.refInFor : state.options.platform.ref),
          refPath.node.value
        )
      ]
    }
    const refClass = state.inFor ? CLASS_REF_IN_FOR : CLASS_REF
    const staticClassPath = paths.staticClass
    if (staticClassPath) { // append
      staticClassPath.node.value.value = staticClassPath.node.value.value + ' ' + refClass
    } else { // add staticClass
      path.node.properties.unshift(
        t.objectProperty(t.identifier('staticClass'), t.stringLiteral(refClass))
      )
      paths.staticClass = path.get('properties').find(
        propertyPath => propertyPath.node.key.name === 'staticClass'
      )
    }
    return [
      t.objectProperty( // data-ref="" ,头条 vue-ref
        t.stringLiteral(state.options.platform.ref),
        refPath.node.value
      )
    ]
  }
  return []
}
