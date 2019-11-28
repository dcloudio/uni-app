const BOOL_ATTRS = [
  'v-else'
]

function genAttrs(node) {
  const attribs = node.attribs
  const attribsArr = Object.keys(attribs).map(name => {
    if (BOOL_ATTRS.includes(name)) {
      return name
    }
    return `${name}="${attribs[name]}"`
  })
  if (!attribsArr.length) {
    return ''
  }
  return ' ' + attribsArr.join(' ')
}

function genChildren(node) {
  if (!node.children) {
    return ''
  }
  return node.children.map(childNode => genElement(childNode)).join('')
}

function genElement(node) {
  if (node.type === 'text') {
    return node.data
  } else if (node.type === 'tag') {
    const name = node.name
    return `<${name}${genAttrs(node)}>${genChildren(node)}</${name}>`
  }
  return ''
}

function genWxs(wxs) {
  return wxs.map(wxsNode => genElement(wxsNode)).join('').trim()
}

function shouldWrapper(node) {
  node.children = node.children.filter(child => { // remove \n
    if (child.type === 'text' && !child.data.trim()) {
      return false
    }
    return true
  })
  if (node.children.length > 1) { // multi root
    return true
  }
  const rootNode = node.children[0]
  if (rootNode && rootNode.name === 'slot') { // slot root
    return true
  }
  return false
}

module.exports = function generate(node, state) {
  if (shouldWrapper(node)) {
    return [`<view>${genChildren(node).trim()}</view>`, genWxs(state.wxs)]
  }
  return [genChildren(node).trim(), genWxs(state.wxs)]
}
