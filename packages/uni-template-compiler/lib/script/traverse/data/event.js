const t = require('@babel/types')

const {
  IDENTIFIER_EVENT,
  VUE_EVENT_MODIFIERS,
  INTERNAL_EVENT_PROXY,
  ATTR_DATA_EVENT_OPTS,
  INTERNAL_SET_SYNC
} = require('../../../constants')

const {
  getCode,
  customize,
  processMemberExpression
} = require('../../../util')

const {
  getEventExpressionStatement
} = require('../statements')

const defaultArgs = t.arrayExpression([t.stringLiteral('$event')])

function addEventExpressionStatement (funcPath, state, isCustom) {
  const identifier = t.identifier(IDENTIFIER_EVENT)
  const stringLiteral = t.stringLiteral(IDENTIFIER_EVENT)
  state.identifierArray.push([identifier, stringLiteral])
  state.initExpressionStatementArray.push(getEventExpressionStatement(identifier, funcPath.node))

  const arrayExpression = [
    stringLiteral
  ]

  const args = []
  if (!isCustom) { // native events
    args.push(t.stringLiteral('$event'))
    arrayExpression.push(t.arrayExpression(args))
  } else { // custom events

  }
  //   if (state.scoped) { // add forItem,forIndex
  //     const scopedArgs = []
  //     state.scoped.forEach(scoped => {
  //       if (scoped.forIndex && scoped.forIndex !== scoped.forItem) {
  //         scopedArgs.push(t.identifier(scoped.forIndex))
  //       }
  //       scopedArgs.push(t.identifier(scoped.forItem))
  //     })
  //     scopedArgs.reverse().forEach(arg => {
  //       args.push(arg)
  //     })
  //   }
  return t.arrayExpression(arrayExpression)
}

function getIdentifierName (element) {
  if (t.isMemberExpression(element)) {
    return getIdentifierName(element.object)
  }
  return element.name.split('.')[0]
}

function getScoped (scopedArray, element, methodName, state) {
  const identifierName = getIdentifierName(element)
  const scoped = scopedArray.find(scoped => {
    if (scoped.forItem === identifierName) {
      return true
    }
  })
  if (scoped) {
    const forExtra = t.cloneDeep(t.arrayExpression(scoped.forExtra))
    if (t.isMemberExpression(element)) {
      // 简单处理
      // item['order']=>item.order
      element = processMemberExpression(element, state)
      // v-for="item in data.items" :key="item.data.id"
      // v-for="meta in item.metas" :key="meta.id" @tap="change(meta,meta.b,true)"
      // ['data.items','data.id',item.data.id]
      // ['metas','id',meta.id]=>['metas','id',meta.id,'b']
      forExtra.elements[forExtra.elements.length - 1].elements.push(
        t.stringLiteral(
          getExtraDataPath(
            getCode(element).replace(scoped.forItem + '.', ''), methodName
          )
        )
      )
    }
    return forExtra
  }
}

function isForIndex (scopedArray, element) {
  if (t.isIdentifier(element)) {
    return scopedArray.find(scoped => {
      if (scoped.forIndex === element.name) {
        return true
      }
    })
  }
  return false
}

function getExtraDataPath (dataPath, methodName) {
  if (methodName === INTERNAL_SET_SYNC) {
    const dataPaths = dataPath.split('.')
    dataPaths.pop()
    return dataPaths.join('.')
  }
  return dataPath
}

function parseMethod (method, state) {
  const elements = method.elements
  const methodName = elements[0].value
  const argsArrayExpr = elements[1]
  if (argsArrayExpr) {
    const extraArrayElements = []
    argsArrayExpr.elements = argsArrayExpr.elements.map((element) => {
      if (t.isIdentifier(element) || t.isMemberExpression(element)) { // item or item.b
        if (state.scoped.length) {
          const forExtra = getScoped(state.scoped, element, methodName, state)
          if (!forExtra) {
            if (isForIndex(state.scoped, element)) {
              return element
            } else {
              extraArrayElements.push(t.stringLiteral(
                getExtraDataPath(getCode(processMemberExpression(element, state)),
                  methodName)
              ))
            }
          } else {
            extraArrayElements.push(forExtra)
          }
        } else {
          extraArrayElements.push(t.stringLiteral(
            getExtraDataPath(getCode(processMemberExpression(element, state)), methodName)
          ))
        }
        return t.stringLiteral('$' + (extraArrayElements.length - 1))
      } else if ( // +1=>1
        t.isUnaryExpression(element) &&
        element.operator === '+' &&
        t.isNumericLiteral(element.argument)
      ) {
        element = t.numericLiteral(element.argument.value)
      } else if (t.isObjectExpression(element)) {
        // {name:'a',b:'c',d:123}=>[['name','a'],['b','c'],['d',123]]
        const objectExprElements = [
          t.stringLiteral('o')
        ]
        element.properties.forEach(property => {
          objectExprElements.push(t.arrayExpression([
            t.stringLiteral(property.key.name || property.key.value),
            t.cloneDeep(property.value)
          ]))
        })
        element = t.arrayExpression(objectExprElements)
      }
      return element
    })
    if (extraArrayElements.length) {
      elements.push(t.arrayExpression(extraArrayElements))
    }
  }
}

function getMethodName (methodName) {
  return methodName === '__HOLDER__' ? '' : methodName
}

function parseEventByCallExpression (callExpr, methods) {
  let methodName = callExpr.callee.name
  if (methodName === '$set') {
    methodName = INTERNAL_SET_SYNC
  }
  const arrayExpression = [t.stringLiteral(getMethodName(methodName))]
  const args = callExpr.arguments
  if (methodName === INTERNAL_SET_SYNC) {
    // v-bind:title.sync="doc.title"
    // ['$set',['doc.a','title','$event']]
    const argsExpression = []
    argsExpression.push(
      t.memberExpression(args[0], t.identifier(args[1].value))
    )
    argsExpression.push(t.stringLiteral(args[1].value))
    argsExpression.push(t.stringLiteral('$event'))
    arrayExpression.push(t.arrayExpression(argsExpression))
  } else {
    if (args.length) {
      const argsExpression = []
      args.forEach(arg => {
        if (t.isIdentifier(arg) && arg.name === '$event') {
          argsExpression.push(t.stringLiteral('$event'))
        } else {
          argsExpression.push(arg)
        }
      })
      arrayExpression.push(t.arrayExpression(argsExpression))
    }
  }
  methods.push(t.arrayExpression(arrayExpression))
}

function parseEvent (keyPath, valuePath, state, isComponent, isNativeOn = false, tagName, ret) {
  const key = keyPath.node
  let type = key.value || key.name || ''

  const isCustom = isComponent && !isNativeOn

  let isCatch = false
  let isCapture = false
  let isPassive = false
  let isOnce = false

  const methods = []

  if (type) {
    isPassive = type.charAt(0) === VUE_EVENT_MODIFIERS.passive
    type = isPassive ? type.slice(1) : type

    isOnce = type.charAt(0) === VUE_EVENT_MODIFIERS.once // Prefixed last, checked first
    type = isOnce ? type.slice(1) : type

    isCapture = type.charAt(0) === VUE_EVENT_MODIFIERS.capture
    type = isCapture ? type.slice(1) : type

    const specialEvents = state.options.platform.specialEvents
    const isSpecialEvent = specialEvents[tagName] && Object.keys(specialEvents[tagName]).includes(type)

    if (!valuePath.isArrayExpression()) {
      valuePath = [valuePath]
    } else {
      valuePath = valuePath.get('elements')
    }

    valuePath.forEach(funcPath => {
      if ( // wxs event
        funcPath.isMemberExpression() &&
        t.isIdentifier(funcPath.node.object) &&
        state.options.filterModules.includes(funcPath.node.object.name)
      ) {
        const {
          getEventType,
          formatEventType
        } = state.options.platform
        const wxsEventType = formatEventType(getEventType(type))
        if (key.value) {
          key.value = wxsEventType
        } else {
          key.name = wxsEventType
        }
      } else if (funcPath.isIdentifier()) { // on:{click:handle}
        if (!isSpecialEvent) {
          const arrayExpression = [t.stringLiteral(getMethodName(funcPath.node.name))]
          if (!isCustom) { // native events
            arrayExpression.push(defaultArgs)
          }
          methods.push(t.arrayExpression(arrayExpression))
        } else {
          if (!state.options.specialMethods) {
            state.options.specialMethods = new Set()
          }
          state.options.specialMethods.add(funcPath.node.name)
        }
      } else if (isSpecialEvent) {
        state.errors.add(
          `${tagName} 组件 ${type} 事件仅支持 @${type}="methodName" 方式绑定`
        )
      } else if (funcPath.isArrowFunctionExpression()) { // e=>count++
        methods.push(addEventExpressionStatement(funcPath, state, isCustom))
      } else {
        let anonymous = true

        // "click":function($event) {click1(item);click2(item);}
        const body = funcPath.node.body && funcPath.node.body.body
        if (body && body.length) {
          const exprStatements = body.filter(node => {
            return t.isExpressionStatement(node) && t.isCallExpression(node.expression)
          })
          if (exprStatements.length === body.length) {
            anonymous = false
            exprStatements.forEach(exprStatement => {
              parseEventByCallExpression(exprStatement.expression, methods)
            })
          }
        }

        anonymous && funcPath.traverse({
          noScope: true,
          MemberExpression (path) {
            if (path.node.object.name === '$event' && path.node.property.name ===
              'stopPropagation') {
              isCatch = true
              path.stop()
            }
          },
          AssignmentExpression (path) { // "update:title": function($event) {title = $event}
            const left = path.node.left
            const right = path.node.right
            // v-bind:title.sync="title"
            if (t.isIdentifier(left) &&
              t.isIdentifier(right) &&
              right.name === '$event' &&
              type.indexOf('update:') === 0) {
              methods.push(t.arrayExpression( // ['$set',['title','$event']]
                [
                  t.stringLiteral(INTERNAL_SET_SYNC),
                  t.arrayExpression([
                    t.identifier(left.name),
                    t.stringLiteral(left.name),
                    t.stringLiteral('$event')
                  ])
                ]
              ))
              anonymous = false
              path.stop()
            }
          },
          ReturnStatement (path) {
            const argument = path.node.argument
            if (t.isCallExpression(argument)) {
              if (t.isIdentifier(argument.callee)) {
                anonymous = false
                parseEventByCallExpression(argument, methods)
              }
            }
          }
        })
        if (anonymous) {
          methods.push(addEventExpressionStatement(funcPath, state, isComponent, isNativeOn))
        }
      }
    })
  }

  return {
    type,
    methods,
    modifiers: {
      isCatch,
      isCapture,
      isPassive,
      isOnce,
      isCustom
    }
  }
}

function _processEvent (path, state, isComponent, isNativeOn = false, tagName, ret) {
  const opts = []
  // remove invalid event
  path.node.value.properties = path.node.value.properties.filter(property => {
    return property.key.value || property.key.name
  })
  const len = path.node.value.properties.length
  for (let i = 0; i < len; i++) {
    const propertyPath = path.get(`value.properties.${i}`)
    const keyPath = propertyPath.get('key')
    const valuePath = propertyPath.get('value')
    const {
      type,
      methods,
      modifiers: {
        isCatch,
        isCapture,
        isOnce,
        isCustom
      }
    } = parseEvent(
      keyPath,
      valuePath,
      state,
      isComponent,
      isNativeOn,
      tagName,
      ret
    )

    if (!methods.length) {
      continue
    }

    methods.forEach(method => {
      parseMethod(method, state) // 解析参数
    })

    const getEventType = state.options.platform.getEventType

    let optType = isCustom ? customize(type) : getEventType(type) // 比如自定义组件使用了 click 自定义事件

    if (isOnce) {
      optType = VUE_EVENT_MODIFIERS.once + optType
    }
    if (isCustom) {
      optType = VUE_EVENT_MODIFIERS.custom + optType
    }
    opts.push(
      t.arrayExpression([
        t.stringLiteral(optType),
        t.arrayExpression(methods)
      ])
    )

    keyPath.replaceWith(
      t.stringLiteral(
        state.options.platform.formatEventType(
          isCustom ? customize(type) : getEventType(type), // 比如自定义组件使用了 click 自定义事件
          isCatch,
          isCapture,
          isCustom
        )
      )
    )

    valuePath.replaceWith(t.stringLiteral(INTERNAL_EVENT_PROXY))
  }
  return opts
}
module.exports = function processEvent (paths, path, state, isComponent, tagName) {
  const onPath = paths.on
  const nativeOnPath = paths.nativeOn

  const ret = []

  const opts = []

  if (onPath) {
    _processEvent(onPath, state, isComponent, false, tagName, ret).forEach(opt => {
      opts.push(opt)
    })
  }
  if (nativeOnPath) {
    _processEvent(nativeOnPath, state, isComponent, true, tagName, ret).forEach(opt => {
      opts.push(opt)
    })
  }
  if (!opts.length) {
    return ret
  }

  ret.push(
    t.objectProperty(
      t.stringLiteral(ATTR_DATA_EVENT_OPTS),
      t.arrayExpression(opts)
    )
  )

  return ret
}
