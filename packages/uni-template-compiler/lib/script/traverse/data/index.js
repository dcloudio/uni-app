const t = require('@babel/types')

const {
  METHOD_CREATE_ELEMENT,
  ATTR_DATA_EVENT_OPTS,
  ATTR_DATA_COM_TYPE,
  ATTR_DATA_EVENT_LIST,
  ATTR_DATA_EVENT_PARAMS,
  ATTE_DATA_CUSTOM_HIDDEN,
  INTERNAL_EVENT_WRAP
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
  const wxComponent = state.options.wxComponents[tagName]
  if (wxComponent) {
    addAttrProperties.push(
      t.objectProperty(
        t.stringLiteral(ATTR_DATA_COM_TYPE),
        t.stringLiteral('wx')
      )
    )
    if (state.options.platform.name === 'mp-alipay') {
      if (!wxComponent.startsWith('plugin://')) {
        addAttrProperties.push(
          t.objectProperty(
            t.stringLiteral('ref'),
            t.stringLiteral('__r')
          )
        )
      }
      const on = path.node.properties.find(prop => prop.key.name === 'on')
      if (on) {
        const properties = on.value.properties
        const list = []
        for (let index = 0; index < properties.length; index++) {
          const element = properties[index]
          if (element.value.value === '__e') {
            list.push(element.key.value)
          }
        }
        if (list.length) {
          addAttrProperties.push(
            t.objectProperty(
              t.stringLiteral(ATTR_DATA_EVENT_LIST),
              t.stringLiteral(list.join(','))
            )
          )
        }
      }
      if (wxComponent.startsWith('plugin://')) {
        const wrapperTag = 'plugin-wrapper'
        const orgPath = path.parentPath
        const orgNode = orgPath.node
        const args = orgNode.arguments
        const orgTag = args[0]
        orgTag.$mpPlugin = true
        args[0] = t.stringLiteral(wrapperTag)
        const orgOptions = args[1]
        const orgOptionsProps = orgOptions.properties
        const targetAttrs = []
        const targetOptionsProps = [
          t.objectProperty(t.identifier('attrs'), t.objectExpression(targetAttrs))
        ]
        const uniAttrs = [
          ATTR_DATA_EVENT_OPTS,
          ATTR_DATA_COM_TYPE,
          ATTR_DATA_EVENT_PARAMS,
          ATTR_DATA_EVENT_LIST,
          ATTE_DATA_CUSTOM_HIDDEN,
          'vue-id'
        ]
        for (let a = orgOptionsProps.length - 1; a >= 0; a--) {
          const prop = orgOptionsProps[a]
          if (prop.key.name === 'attrs') {
            const attrs = prop.value.properties
            for (let b = attrs.length - 1; b >= 0; b--) {
              const element = attrs[b]
              const key = element.key.value
              if (!uniAttrs.includes(key)) {
                attrs.splice(b, 1)
                targetAttrs.push(element)
              }
            }
            attrs.push(t.objectProperty(t.stringLiteral('onPluginWrap'), t.stringLiteral(INTERNAL_EVENT_WRAP)))
          } else if (prop.key.name === 'on') {
            const ons = prop.value.properties
            ons.forEach(item => {
              const attrs = path.node.properties.find(prop => prop.key.name === 'attrs').value.properties
              const vueId = attrs.find(prop => prop.key.value === 'vue-id').value
              const eventName = item.key.value
              targetAttrs.push(t.objectProperty(t.stringLiteral(eventName), t.binaryExpression('+', t.stringLiteral(eventName), vueId)))
            })
          } else {
            orgOptionsProps.splice(a, 1)
            targetOptionsProps.push(prop)
          }
        }
        const orgChild = args[2]
        const targetOptions = t.objectExpression(targetOptionsProps)
        targetOptions.$mpProcessed = true
        const targetArguments = [
          orgTag,
          targetOptions
        ]
        if (orgChild) {
          targetArguments.push(orgChild)
        }
        const targetNode = t.callExpression(t.identifier(METHOD_CREATE_ELEMENT), targetArguments)
        args[2] = targetNode
      }
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
