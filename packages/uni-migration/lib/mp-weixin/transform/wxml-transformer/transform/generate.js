function genAttrs(node) {
  const attribs = node.attribs
  const attribsArr = Object.keys(attribs).map(name => `${name}="${attribs[name]}"`)
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
  return wxs.map(wxsNode => genElement(wxsNode)).join('')
}

module.exports = function generate(node, state) {
  if (node.children.length > 1) {
    return [genChildren({
      type: 'tag',
      name: 'view',
      attribs: {},
      children: node.children
    }), genWxs(state.wxs)]
  }
  return [genChildren(node), genWxs(state.wxs)]
}
