import {
  hasOwn,
  isPlainObject
} from 'uni-shared'

const TAGS = {
  a: '',
  abbr: '',
  b: '',
  blockquote: '',
  br: '',
  code: '',
  col: ['span', 'width'],
  colgroup: ['span', 'width'],
  dd: '',
  del: '',
  div: '',
  dl: '',
  dt: '',
  em: '',
  fieldset: '',
  h1: '',
  h2: '',
  h3: '',
  h4: '',
  h5: '',
  h6: '',
  hr: '',
  i: '',
  img: ['alt', 'src', 'height', 'width'],
  ins: '',
  label: '',
  legend: '',
  li: '',
  ol: ['start', 'type'],
  p: '',
  q: '',
  span: '',
  strong: '',
  sub: '',
  sup: '',
  table: ['width'],
  tbody: '',
  td: ['colspan', 'rowspan', 'height', 'width'],
  tfoot: '',
  th: ['colspan', 'rowspan', 'height', 'width'],
  thead: '',
  tr: '',
  ul: ''
}
const CHARS = {
  amp: '&',
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
  apos: "'"
}

function decodeEntities (htmlString) {
  return htmlString.replace(/&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi, function (match, stage) {
    if (hasOwn(CHARS, stage) && CHARS[stage]) {
      return CHARS[stage]
    }
    if (/^#[0-9]{1,4}$/.test(stage)) {
      return String.fromCharCode(stage.slice(1))
    }
    if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
      return String.fromCharCode('0' + stage.slice(1))
    }
    const wrap = document.createElement('div')
    wrap.innerHTML = match
    return wrap.innerText || wrap.textContent
  })
}

export default function parseNodes (nodes, parentNode) {
  nodes.forEach(function (node) {
    if (!isPlainObject(node)) {
      return
    }
    if (!hasOwn(node, 'type') || node.type === 'node') {
      if (!(typeof node.name === 'string' && node.name)) {
        return
      }
      const tagName = node.name.toLowerCase()
      if (!hasOwn(TAGS, tagName)) {
        return
      }
      const elem = document.createElement(tagName)
      if (!elem) {
        return
      }
      const attrs = node.attrs
      if (isPlainObject(attrs)) {
        const tagAttrs = TAGS[tagName] || []
        Object.keys(attrs).forEach(function (name) {
          let value = attrs[name]
          switch (name) {
            case 'class':
              /* eslint-disable no-fallthrough */
              Array.isArray(value) && (value = value.join(' '))
            case 'style':
              elem.setAttribute(name, value)
              break
            default:
              if (tagAttrs.indexOf(name) !== -1) {
                elem.setAttribute(name, value)
              }
          }
        })
      }

      const children = node.children
      if (Array.isArray(children) && children.length) {
        parseNodes(node.children, elem)
      }

      parentNode.appendChild(elem)
    } else {
      if (node.type === 'text' && typeof node.text === 'string' && node.text !== '') {
        parentNode.appendChild(document.createTextNode(decodeEntities(node.text)))
      }
    }
  })
  return parentNode
}
