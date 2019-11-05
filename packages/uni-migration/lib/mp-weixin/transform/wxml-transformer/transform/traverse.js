const {
  parse
} = require('mustache')

const ATTRS = {
  'wx:if': 'v-if',
  'wx:elif': 'v-else-if',
  'wx:else': 'v-else'
}

function parseMustache(expr) {
  const tokens = parse(expr)
  const isIdentifier = tokens.length === 1
  return tokens.map(token => {
    if (token[0] === 'text') {
      return `'${token[1]}'`
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
    attribs[event] = value
    return true
  }
}


function transformAttr(name, value, attribs) {
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
