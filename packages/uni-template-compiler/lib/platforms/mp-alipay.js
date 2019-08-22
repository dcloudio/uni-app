const t = require('@babel/types')

const {
  capitalize
} = require('../util')

const EVENTS = {
  'click': 'tap',
  'touchstart': 'touchStart',
  'touchmove': 'touchMove',
  'touchend': 'touchEnd',
  'touchcancel': 'touchCancel',
  'longtap': 'longTap',
  'longpress': 'longTap',
  'transitionend': 'transitionEnd',
  'animationstart': 'animationStart',
  'animationiteration': 'animationIteration',
  'animationend': 'animationEnd',
  'firstappear': 'firstAppear',
  // map
  'markertap': 'markerTap',
  'callouttap': 'calloutTap',
  'controltap': 'controlTap',
  'regionchange': 'regionChange',
  // scroll-view
  'scrolltoupper': 'scrollToUpper',
  'scrolltolower': 'scrollToLower',
  // movable-view
  'changeend': 'changeEnd'
}

module.exports = {
  prefix: 'a:',
  specialEvents: {
    'form': {
      'reset': 'onReset'
    },
    'map': {
      'markertap': 'onMarkerTap',
      'controltap': 'onControlTap',
      'callouttap': 'onCalloutTap',
      'regionchange': 'onRegionChange'
    }
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
      },
      children: normalizeChildren(traverseExpr(returnExprNodes, state))
    }
    if (t.isIdentifier(paramExprNode)) {
      node.scoped = paramExprNode.name
    }
    return node
  }
}
