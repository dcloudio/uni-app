import {
  cached,
  normalizeUnit
} from '../helpers/index'

const parseStyleText = cached(function (cssText) {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
})

function parseStyle (node, ctx) {
  const styles = Object.create(null)

  if (!node.attrs) {
    return styles
  }

  const classList = (node.attrs.class || '').split(' ')

  const cssMap = ctx.$options.style || {}

  classList.forEach(name => {
    if (name && cssMap[name]) {
      Object.assign(styles, cssMap[name])
    }
  })

  Object.assign(styles, parseStyleText(node.attrs.style || ''))

  return styles
}

const TAGS = ['span', 'a', 'image', 'img']

function block (node) {
  node.attr.value = (node.attr.value || '') + '\n'
  return node
}

function heading (node, em, options) {
  !node.style.fontSize && (node.style.fontSize = options.defaultFontSize * em)
  return block(bold(node))
}

function createHeading (em) {
  return function (node, options) {
    return heading(node, em, options)
  }
}

function bold (node) {
  !node.style.fontWeight && (node.style.fontWeight = 'bold')
  return node
}

const strategies = {
  'blockquote': block,
  'br': block,
  'div': block,
  'dl': block,
  'h1': createHeading(2),
  'h2': createHeading(1.5),
  'h3': createHeading(1.17),
  'h4': createHeading(1),
  'h5': createHeading(0.83),
  'h6': createHeading(0.67),
  'hr': block,
  'ol': block,
  'p': block,
  'strong': bold,
  'table': block,
  'tbody': block,
  'tfoot': block,
  'thead': block,
  'ul': block
}

const HTML_RE = /&(amp|gt|lt|nbsp|quot|apos);/g

const CHARS = {
  'amp': '&',
  'gt': '>',
  'lt': '<',
  'nbsp': ' ',
  'quot': '"',
  'apos': "'"
}

function normalizeText (str) {
  return str.replace(HTML_RE, function (match, entity) {
    return CHARS[entity]
  })
}

function normalizeNode (node, ctx, options) {
  let type = (node.name || '').toLowerCase()

  const strategy = strategies[type]

  if (TAGS.indexOf(type) === -1) {
    type = 'span'
  }
  if (type === 'img') {
    type = 'image'
  }
  const nvueNode = {
    type,
    attr: Object.create(null)
  }

  if (node.type === 'text' || node.text) {
    nvueNode.attr.value = normalizeText((node.text || '').trim())
  }

  if (node.attrs) {
    Object.keys(node.attrs).forEach(name => {
      if (name !== 'class' && name !== 'style') {
        nvueNode.attr[name] = node.attrs[name]
      }
    })
  }

  nvueNode.style = normalizeUnit(parseStyle(node, ctx))

  if (strategy) {
    strategy(nvueNode, options)
  }

  nvueNode.children = normalizeNodes(node.children, ctx, options)

  return nvueNode
}

function normalizeNodes (nodes, ctx, options) {
  if (Array.isArray(nodes)) {
    return nodes.map(node => normalizeNode(node, ctx, options))
  }
  return []
}

function getRichText (weex) {
  const defaultFontSize = 16
  return {
    props: {
      nodes: {
        type: [Array, String],
        default: function () {
          return []
        }
      }
    },
    render (createElement) {
      // TODO 待处理 String 类型
      const nodes = normalizeNodes(this.nodes || [], this.$vnode.context, {
        defaultFontSize
      })
      return createElement('u-rich-text', this._g({
        attrs: {
          value: nodes
        }
      }, this.$listeners))
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('rich-text', getRichText(weex))
}
