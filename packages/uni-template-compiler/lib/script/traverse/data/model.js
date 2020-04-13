const t = require('@babel/types')

const {
  getModelEventFunctionExpr
} = require('./util')

module.exports = function processRef (paths, path, state) {
  const modelPath = paths.model
  if (modelPath) {
    const callbackProperty = modelPath.node.value.properties.find(property => {
      return property.key.name === 'callback'
    })

    const exprProperty = modelPath.node.value.properties.find(
      property => property.key.name === 'expression'
    )

    const prop = exprProperty.value.value.trim()

    const onPath = paths.on

    // on:{'input':__m('msg',$event)}
    if (!onPath) {
      path.node.properties.unshift(
        t.objectProperty(t.identifier('on'), t.objectExpression([
          t.objectProperty(
            t.stringLiteral('input'),
            getModelEventFunctionExpr(
              callbackProperty.value,
              prop
            )
          )
        ]))
      )
      paths.on = path.get('properties').find(
        propertyPath => propertyPath.node.key.name === 'on'
      )
    } else {
      const existingInput = onPath.node.value.properties.find(
        property => property.key.value === 'input'
      )
      if (existingInput) {
        if (!t.isArrayExpression(existingInput.value)) {
          existingInput.value = t.arrayExpression([existingInput.value])
        }
        existingInput.value.elements.unshift(getModelEventFunctionExpr(
          callbackProperty.value,
          prop
        ))
      } else {
        onPath.node.value.properties.push(
          t.objectProperty(
            t.stringLiteral('input'),
            getModelEventFunctionExpr(
              callbackProperty.value,
              prop
            )
          )
        )
      }
    }

    return [ // attrs:{value:value}
      t.objectProperty(
        t.stringLiteral('value'),
        t.identifier(prop)
      )
    ]
  }
  return []
}
