const {
  parse
} = require('mustache')

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
      return `!${token[1]}`
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

function transformEvent(name, value, attribs) {
  let event = name
  if (name.indexOf('bind') === 0) {
    event = name.replace(bindRE, '@')
  } else if (name.indexOf('catch') === 0) {
    event = name.replace(catchRE, '@') + '.stop'
  } else if (name.indexOf('capture-bind') === 0) {
    event = name.replace(captureBindRE, '@') + '.capture'
  } else if (name.indexOf('capture-catch') === 0) {
    event = name.replace(captureCatchRE, '@') + '.stop.capture'
  }
  if (event !== name) {
    attribs[event] = parseMustache(value, true)
    return true
  }
}


function transformAttr(name, value, attribs) {
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
  if (transformEvent(name, value, attribs)) {
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
  Object.keys(attribs).forEach(name => {
    transformAttr(name, attribs[name], attribs)
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
