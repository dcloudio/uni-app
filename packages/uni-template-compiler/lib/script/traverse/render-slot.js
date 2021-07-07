const t = require('@babel/types')

module.exports = function getRenderSlot (path, state) {
  const name = path.get('arguments.0')
  const arg2 = path.get('arguments.2')
  const arg3 = path.get('arguments.3')
  let valueNode
  if (arg3) {
    // v-bind:object
    valueNode = arg3.node
  } else if (arg2 && !arg2.isNullLiteral()) {
    if (arg2.isObjectExpression()) {
      const propertiesPath = arg2.get('properties')
      const oldProperties = []
      const newProperties = []
      propertiesPath.forEach(path => {
        const properties = path.get('key').isStringLiteral({ value: 'SLOT_DEFAULT' }) ? oldProperties : newProperties
        properties.push(state.options.scopedSlotsCompiler === 'auto' ? path.node : t.cloneNode(path.node, true))
      })
      if (!newProperties.length) {
        return
      }
      valueNode = t.objectExpression(newProperties)
      if (state.options.scopedSlotsCompiler !== 'auto') {
        arg2.replaceWith(t.objectExpression(oldProperties))
      }
    } else {
      valueNode = arg2.node
    }
  }
  if (valueNode) {
    const scoped = state.scoped
    // TODO 判断是否包含作用域内变量
    const renderSlotStatementArray = scoped && scoped.length ? scoped[scoped.length - 1].renderSlotStatementArray : state.renderSlotStatementArray
    renderSlotStatementArray.push(t.expressionStatement(t.callExpression(t.identifier('$setScopedSlotsParams'), [t.stringLiteral(name.node.value), valueNode])))
  }
  // TODO 组件嵌套
}
