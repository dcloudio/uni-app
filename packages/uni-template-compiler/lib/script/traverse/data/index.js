const t = require('@babel/types')

const {
  ATTR_DATA_COM_TYPE,
  ATTR_DATA_EVENT_LIST
} = require('../../../constants')

const processRef = require('./ref')
const processAttrs = require('./attrs')
const processClass = require('./class')
const processEvent = require('./event')
const processStyle = require('./style')
const processModel = require('./model')
const processDir = require('./directives')

module.exports = function traverseData (path, state, tagName) {
  if (path.node.$mpProcessed) {
    return
  }
  path.node.$mpProcessed = true

  const paths = {}

  const propertyPaths = path.get('properties')

  propertyPaths.forEach((propertyPath, index) => {
    paths[propertyPath.node.key.name] = propertyPath
  })

  const addAttrProperties = []
  const isComponent = state.options.platform.isComponent(tagName)
  const processes = [processAttrs, processRef, processClass, processModel, processDir, processEvent, processStyle]
  // ref(add staticClass) > class,model,dir(add input event)>event
  processes.forEach(process => {
    process(paths, path, state, isComponent, tagName).forEach((property) => {
      addAttrProperties.push(property)
    })
  })

  // 该组件是引入的小程序组件
  if (state.options.wxComponents[tagName]) {
    addAttrProperties.push(
      t.objectProperty(
        t.stringLiteral(ATTR_DATA_COM_TYPE),
        t.stringLiteral('wx')
      )
    )
    if (state.options.platform.name === 'mp-alipay') {
      addAttrProperties.push(
        t.objectProperty(
          t.stringLiteral('ref'),
          t.stringLiteral('__r')
        )
      )
      const properties = path.node.properties.find(prop => prop.key.name === 'on').value.properties
      const list = []
      for (let index = 0; index < properties.length; index++) {
        const element = properties[index]
        if (element.value.value === '__e') {
          list.push(element.key.value)
        }
      }
      addAttrProperties.push(
        t.objectProperty(
          t.stringLiteral(ATTR_DATA_EVENT_LIST),
          t.stringLiteral(list.join(','))
        )
      )
    }
  }

  if (addAttrProperties.length) {
    const attrsPath = paths.attrs
    if (attrsPath) {
      attrsPath.node.value.properties = attrsPath.node.value.properties.concat(addAttrProperties)
    } else {
      path.node.properties.unshift(
        t.objectProperty(t.identifier('attrs'), t.objectExpression(addAttrProperties))
      )
    }
  }
}
