const t = require('@babel/types')

const {
  getModelEventFunctionExpr
} = require('./util')

module.exports = function processDir (paths, path, state) {
  const directivesPath = paths.directives
  if (directivesPath) {
    /**
         * directives: [{
         *       name: "model",
         *       rawName: "v-model",
         *      value: (aaa.cart_amount),
         *     expression: "aaa.cart_amount"
         *}],
         */
    const modelObjectExpr = directivesPath.node.value.elements.find(
      objectExpression => {
        return objectExpression.properties.find(property => {
          return property.key.name === 'name' && property.value.value === 'model'
        })
      }
    )
    if (modelObjectExpr) {
      const exprProperty = modelObjectExpr.properties.find(property => {
        return property.key.name === 'expression'
      })
      const modifiersProperty = modelObjectExpr.properties.find(property => {
        return property.key.name === 'modifiers'
      })
      if (exprProperty) {
        const onPath = paths.on

        const existingInput = onPath.node.value.properties.find(
          property => property.key.value === 'input'
        )
        if (existingInput) {
          let existingInputFuncExpr
          // remove old model input event
          if (!t.isArrayExpression(existingInput.value)) {
            existingInputFuncExpr = existingInput.value
            existingInput.value = t.arrayExpression([])
          } else {
            existingInputFuncExpr = existingInput.value.elements.shift()
          }
          if (existingInputFuncExpr) {
            const modifiers = []
            if (modifiersProperty) {
              const properties = modifiersProperty.value.properties
              if (properties.find(property => property.key.value === 'number')) {
                modifiers.push(t.stringLiteral('number'))
              }
              if (properties.find(property => property.key.value === 'trim')) {
                modifiers.push(t.stringLiteral('trim'))
              }
            }
            existingInput.value.elements.unshift(
              getModelEventFunctionExpr(
                existingInputFuncExpr,
                exprProperty.value.value.trim(),
                modifiers
              )
            )
          }
        }
      }
    }
  }
  return []
}
