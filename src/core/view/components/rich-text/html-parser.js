import HTMLParser from 'uni-helpers/html-parser'

function removeDOCTYPE (html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<!doctype.*>\n/, '')
    .replace(/<!DOCTYPE.*>\n/, '')
}

function parseAttrs (attrs) {
  return attrs.reduce(function (pre, attr) {
    let value = attr.value
    const name = attr.name

    if (value.match(/ /) && name !== 'style') {
      value = value.split(' ')
    }

    if (pre[name]) {
      if (Array.isArray(pre[name])) {
        pre[name].push(value)
      } else {
        pre[name] = [pre[name], value]
      }
    } else {
      pre[name] = value
    }
    return pre
  }, {})
}

export default function parseHtml (html) {
  html = removeDOCTYPE(html)

  const stacks = []

  const results = {
    node: 'root',
    children: []
  }

  HTMLParser(html, {
    start: function (tag, attrs, unary) {
      const node = {
        name: tag
      }
      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs)
      }
      if (unary) {
        const parent = stacks[0] || results
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      } else {
        stacks.unshift(node)
      }
    },
    end: function (tag) {
      const node = stacks.shift()
      if (node.name !== tag) console.error('invalid state: mismatch end tag')

      if (stacks.length === 0) {
        results.children.push(node)
      } else {
        const parent = stacks[0]
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      }
    },
    chars: function (text) {
      const node = {
        type: 'text',
        text: text
      }
      if (stacks.length === 0) {
        results.children.push(node)
      } else {
        const parent = stacks[0]
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      }
    },
    comment: function (text) {
      const node = {
        node: 'comment',
        text: text
      }
      const parent = stacks[0]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(node)
    }
  })
  return results.children
}
