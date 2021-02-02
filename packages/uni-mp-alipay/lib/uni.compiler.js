const t = require('@babel/types')
const traverse = require('@babel/traverse').default

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const EVENTS = {
  click: 'tap',
  touchstart: 'touchStart',
  touchmove: 'touchMove',
  touchend: 'touchEnd',
  touchcancel: 'touchCancel',
  longtap: 'longTap',
  longpress: 'longTap',
  transitionend: 'transitionEnd',
  animationstart: 'animationStart',
  animationiteration: 'animationIteration',
  animationend: 'animationEnd',
  firstappear: 'firstAppear',
  // map
  markertap: 'markerTap',
  callouttap: 'calloutTap',
  controltap: 'controlTap',
  regionchange: 'regionChange',
  paneltap: 'panelTap',
  // scroll-view
  scrolltoupper: 'scrollToUpper',
  scrolltolower: 'scrollToLower',
  // movable-view
  changeend: 'changeEnd',
  // video
  timeupdate: 'timeUpdate',
  waiting: 'loading',
  fullscreenchange: 'fullScreenChange',
  useraction: 'userAction',
  renderstart: 'renderStart',
  loadedmetadata: 'renderStart',
  // swiper
  animationfinish: 'animationEnd'
}

module.exports = {
  directive: 'a:',
  specialEvents: {
    form: {
      reset: 'onReset'
    },
    map: {
      markertap: 'onMarkerTap',
      controltap: 'onControlTap',
      callouttap: 'onCalloutTap',
      regionchange: 'onRegionChange'
    }
  },
  createFilterTag (filterTag, {
    attrs
  }) {
    return `<import-sjs name="${attrs.module}" from="${attrs.src}"></import-sjs>`
  },
  getEventType (eventType) {
    return EVENTS[eventType] || eventType
  },
  formatEventType: function (eventName, isCatch) {
    return `${isCatch ? 'catch' : 'on'}${capitalize(eventName)}`
  },
  createScopedSlots (slotName, props, state) {
    const node = {
      type: 'slot',
      attr: {
        name: slotName
      },
      children: []
    }
    Object.keys(props).forEach(name => {
      node.attr[name] = props[name]
    })
    return node
  },
  resolveScopedSlots (slotName, {
    paramExprNode,
    returnExprNodes,
    traverseExpr,
    normalizeChildren
  }, state) {
    const node = {
      type: 'view',
      attr: {
        slot: slotName
      }
    }
    if (paramExprNode) {
      if (t.isIdentifier(paramExprNode)) {
        const scoped = paramExprNode.name
        node.attr['slot-scope'] = scoped
      } else if (t.isObjectPattern(paramExprNode)) {
        const paramName = '__SCOPED__'
        node.attr['slot-scope'] = paramName
        const start = returnExprNodes.start
        const end = returnExprNodes.end
        const names = []
        paramExprNode.properties.forEach(property => {
          const key = property.key
          const value = property.value
          if (t.isIdentifier(value)) {
            if (value.name !== key.name) {
              state.errors.add(`解构插槽 Prop 时,不支持将${key.name}重命名为${value.name},重命名后会影响性能`)
              return
            }
          } else if (t.isAssignmentPattern(value)) {
            state.errors.add(`解构插槽 Prop 时,不支持为${key.name}设置默认值`)
            return
          }
          names.push(key.name)
        })
        traverse({
          type: 'Program',
          start,
          end,
          body: [{
            type: 'ExpressionStatement',
            start,
            end,
            expression: returnExprNodes
          }],
          sourceType: 'module'
        }, {
          Identifier (path) {
            const node = path.node
            const name = node.name
            if (names.includes(name) && path.key !== 'key' && (path.key !== 'property' || path.parent.computed) && !(path.scope && path.scope.hasBinding(name))) {
              path.replaceWithSourceString(`${paramName}.${name}`)
            }
          }
        })
      }
    }
    node.children = normalizeChildren(traverseExpr(returnExprNodes, state))
    return node
  }
}
