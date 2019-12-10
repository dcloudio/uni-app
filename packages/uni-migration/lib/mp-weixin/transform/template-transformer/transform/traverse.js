const {
  parse
} = require('mustache')

const TAGS = [
  'ad',
  'audio',
  'button',
  'camera',
  'canvas',
  'checkbox',
  'checkbox-group',
  'cover-image',
  'cover-view',
  'editor',
  'form',
  'functional-page-navigator',
  'icon',
  'image',
  'input',
  'label',
  'live-player',
  'live-pusher',
  'map',
  'movable-area',
  'movable-view',
  'navigator',
  'official-account',
  'open-data',
  'picker',
  'picker-view',
  'picker-view-column',
  'progress',
  'radio',
  'radio-group',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'text',
  'textarea',
  'video',
  'view',
  'web-view'
]

const EVENTS = {
  'touchstart': 'touchstart',
  'touchmove': 'touchmove',
  'touchcancel': 'touchcancel',
  'touchend': 'touchend',
  'tap': 'click',
  'longpress': 'longpress',
  'longtap': 'longpress',
  'transitionend': 'transitionend',
  'animationstart': 'animationstart',
  'animationiteration': 'animationiteration',
  'animationend': 'animationend',
  'touchforcechange': 'touchforcechange'
}

const ATTRS = {
  'wx:if': 'v-if',
  'wx:elif': 'v-else-if',
  'wx:else': 'v-else'
}

const FOR = {
  for: 'wx:for',
  item: 'wx:for-item',
  index: 'wx:for-index',
  key: 'wx:key'
}

const FOR_DEFAULT = {
  item: 'item',
  index: 'index',
  index_fallback: '___i___'
}

function parseMustache(expr, identifier = false) {
  if (!expr) {
    return ''
  }
  const tokens = parse(expr)
  const isIdentifier = tokens.length === 1
  return tokens.map(token => {
    if (token[0] === 'text') {
      if (identifier) {
        return token[1]
      }
      return `'${token[1]}'`
    } else if (token[0] === '!') { // {{ !loading }}
      return `(!${token[1]})`
    } else if (token[0] === 'name') {
      if (isIdentifier) {
        return token[1]
      }
      return `(${token[1]})`
    }
  }).join('+')
}


function transformDirective(name, value, attribs) {
  if (ATTRS[name]) {
    attribs[ATTRS[name]] = parseMustache(value)
    return true
  }
}

function transformFor(attribs) {
  const vFor = attribs[FOR.for]
  if (!vFor) {
    return
  }
  let vKey = parseMustache(attribs[FOR.key], true)
  const vItem = parseMustache(attribs[FOR.item], true) || FOR_DEFAULT.item
  const vIndex = parseMustache(attribs[FOR.index], true) || (
    FOR_DEFAULT.index === vItem ? FOR_DEFAULT.index_fallback : FOR_DEFAULT.index
    //处理 wx:for-item="index"
  )

  attribs['v-for'] = `(${vItem},${vIndex}) in (${parseMustache(vFor)})`
  if (vKey) {
    if (vKey === '*this') {
      vKey = vItem
    } else if (vKey !== vItem) {
      vKey = vItem + '.' + vKey
    }
    attribs[':key'] = vKey
  }

  delete attribs[FOR.for]
  delete attribs[FOR.item]
  delete attribs[FOR.index]
  delete attribs[FOR.key]
}

const bindRE = /bind:?/
const catchRE = /catch:?/
const captureBindRE = /capture-bind:?/
const captureCatchRE = /capture-catch:?/

function transformEventName(name, state) {
  if (state.isComponent) {
    return '@' + (EVENTS[name] ? (EVENTS[name] + '.native') : name)
  }
  return '@' + (EVENTS[name] || name)
}

function transformEvent(name, value, attribs, state) {
  let event = name
  if (name.indexOf('bind') === 0) {
    event = transformEventName(name.replace(bindRE, ''), state)
  } else if (name.indexOf('catch') === 0) {
    event = transformEventName(name.replace(catchRE, ''), state) + '.stop.prevent'
  } else if (name.indexOf('capture-bind') === 0) {
    event = transformEventName(name.replace(captureBindRE, ''), state) + '.capture'
  } else if (name.indexOf('capture-catch') === 0) {
    event = transformEventName(name.replace(captureCatchRE, ''), state) + '.stop.prevent.capture'
  }
  if (event !== name) {
    attribs[event] = parseMustache(value, true)
    return true
  }
}


function transformAttr(name, value, attribs, state) {
  if (
    name.indexOf('v-') === 0 ||
    name.indexOf(':') === 0
  ) { // 已提前处理
    return
  }
  delete attribs[name]
  if (transformDirective(name, value, attribs)) {
    return
  }
  if (transformEvent(name, value, attribs, state)) {
    return
  }
  if (value.indexOf('{{') === -1) {
    attribs[name] = value
    return
  }
  attribs[':' + name] = parseMustache(value)
}

function transformAttrs(node, state) {
  const attribs = node.attribs
  if (!attribs) {
    return
  }
  transformFor(attribs)
  const isComponent = !TAGS.includes(node.name)
  Object.keys(attribs).forEach(name => {
    transformAttr(name, attribs[name], attribs, {
      isComponent
    })
  })
}

function transformChildren(node, state) {
  node.children = node.children.filter(childNode => transformNode(childNode, state))
}

function transformNode(node, state) {
  if (node.name === 'wxs') {
    state.wxs.push(node)
    return false
  }
  if (node.type === 'tag') {
    transformAttrs(node, state)
    transformChildren(node, state)
  }
  return true
}

module.exports = function traverse(node, state) {
  transformNode(node, state)
  return node
}
