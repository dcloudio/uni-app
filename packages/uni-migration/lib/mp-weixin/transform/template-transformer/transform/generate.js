const BOOL_ATTRS = [
  'v-else'
]

function genAttrs(node) {
  const attribs = node.attribs
  const attribsArr = Object.keys(attribs).map(name => {
    if (BOOL_ATTRS.includes(name) || attribs[name] === '') { // boolean attribute
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

function genWxs(wxs, state) {
  const wxsCode = []
  const wxsFiles = []
  wxs.forEach(wxsNode => {
    const {
      src,
      module
    } = wxsNode.attribs
    if (!module) {
      return
    }
    if (!src) {
      wxsNode.attribs.src = './' + (state.filename ? (state.filename + '-' + module) : module) + '.wxs'
      wxsFiles.push({
        path: wxsNode.attribs.src,
        content: genChildren(wxsNode)
      })
    }
    wxsNode.children.length = 0
    wxsCode.push(genElement(wxsNode))
  })
  return [wxsCode.join('').trim(), wxsFiles]
}

module.exports = function generate(node, state) {
  return [
    `<uni-shadow-root class="${state.shadowRootHost}">${genChildren(node).trim()}</uni-shadow-root>`,
    ...genWxs(state.wxs, state)
  ]
}
