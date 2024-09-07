import { extend, hasOwn, isArray, isPlainObject, isString } from '@vue/shared'
import { getRealPath } from '@dcloudio/uni-platform'
import { type VNode, createTextVNode, h } from 'vue'

export const TAGS = {
  a: '',
  abbr: '',
  address: '',
  article: '',
  aside: '',
  b: '',
  bdi: '',
  bdo: ['dir'],
  big: '',
  blockquote: '',
  br: '',
  caption: '',
  center: '',
  cite: '',
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
  font: '',
  footer: '',
  h1: '',
  h2: '',
  h3: '',
  h4: '',
  h5: '',
  h6: '',
  header: '',
  hr: '',
  i: '',
  img: ['alt', 'src', 'height', 'width'],
  ins: '',
  label: '',
  legend: '',
  li: '',
  mark: '',
  nav: '',
  ol: ['start', 'type'],
  p: '',
  pre: '',
  q: '',
  rt: '',
  ruby: '',
  s: '',
  section: '',
  small: '',
  span: '',
  strong: '',
  sub: '',
  sup: '',
  table: ['width'],
  tbody: '',
  td: ['colspan', 'height', 'rowspan', 'width'],
  tfoot: '',
  th: ['colspan', 'height', 'rowspan', 'width'],
  thead: '',
  tr: ['colspan', 'height', 'rowspan', 'width'],
  tt: '',
  u: '',
  ul: '',
}
const CHARS = {
  amp: '&',
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
  apos: "'",
  ldquo: '“',
  rdquo: '”',
  yen: '￥',
  radic: '√',
  lceil: '⌈',
  rceil: '⌉',
  lfloor: '⌊',
  rfloor: '⌋',
  hellip: '…',
}

export function decodeEntities(htmlString: string) {
  return htmlString.replace(
    /&(([a-zA-Z]+)|(#x{0,1}[\da-zA-Z]+));/gi,
    function (match, stage) {
      if (hasOwn(CHARS, stage) && CHARS[stage]) {
        return CHARS[stage]
      }
      if (/^#[0-9]{1,4}$/.test(stage)) {
        return String.fromCharCode(stage.slice(1))
      }
      if (/^#x[0-9a-f]{1,4}$/i.test(stage)) {
        return String.fromCharCode(0 + stage.slice(1))
      }
      return match
    }
  )
}

interface Node {
  type: string
  text?: string
  name: string
  attrs: Data
  children?: Node[]
}

function processClickEvent(node: Node, triggerItemClick: Function) {
  if (['a', 'img'].includes(node.name) && triggerItemClick) {
    return {
      onClick: (e: Event) => {
        //#if !_X_
        triggerItemClick(e, { node })
        //#endif
        //#if _X_
        // TODO 确认ref属性的值
        if (node.name === 'a') {
          triggerItemClick(e, { href: (node.attrs || {}).href })
        } else {
          triggerItemClick(e, { src: (node.attrs || {}).src })
        }
        //#endif
        e.stopPropagation()
        e.preventDefault()
        e.returnValue = false
      },
    }
  }
}

function normalizeAttrs(tagName: string, attrs: Data) {
  if (!isPlainObject(attrs)) return
  for (const key in attrs) {
    if (hasOwn(attrs, key)) {
      const value = attrs[key]
      if (tagName === 'img' && key === 'src')
        attrs[key] = getRealPath(value as string)
    }
  }
}

export const nodeList2VNode = /*#__PURE__*/ (
  scopeId: string,
  triggerItemClick: Function,
  nodeList?: Node[]
): Array<VNode | undefined> => {
  if (!nodeList || (isArray(nodeList) && !nodeList.length)) return []

  return nodeList.map((node) => {
    if (!isPlainObject(node)) {
      return
    }
    if (!hasOwn(node, 'type') || node.type === 'node') {
      let nodeProps = { [scopeId]: '' }
      const tagName = node.name?.toLowerCase()
      if (!hasOwn(TAGS, tagName)) {
        return
      }
      normalizeAttrs(tagName, node.attrs)
      nodeProps = extend(
        nodeProps,
        processClickEvent(node, triggerItemClick),
        node.attrs
      )
      return h(
        node.name,
        nodeProps,
        nodeList2VNode(scopeId, triggerItemClick, node.children)
      )
    }
    if (node.type === 'text' && isString(node.text) && node.text !== '')
      return createTextVNode(decodeEntities(node.text || ''))
  })
}
