import {
  type ComponentInternalInstance,
  type ExtractPropTypes,
  defineComponent,
  getCurrentInstance,
  // @ts-expect-error
  parseClassList,
} from 'vue'
import { isArray, isString } from '@vue/shared'
import { parseHtml, props } from '../../components/rich-text'
import { parseStyleText } from '../helpers'

const defaultFontSize = 16
type Props = ExtractPropTypes<typeof props>

export default defineComponent({
  name: 'RichText',
  props,
  setup(props) {
    const instance = getCurrentInstance()

    return () => {
      let nodes = props.nodes
      if (isString(nodes)) {
        nodes = parseHtml(nodes)
      }

      return (
        <u-rich-text
          {...{
            value: normalizeNodes(nodes || [], instance!.root, {
              defaultFontSize,
            }),
          }}
        ></u-rich-text>
      )
    }
  },
})

function normalizeNodes(
  nodes: Props['nodes'],
  instance: ComponentInternalInstance | null,
  options: { defaultFontSize: number }
) {
  type NodeType = keyof typeof strategies | 'span' | 'img' | 'image' | 'text'
  type NvueNode = {
    type?: NodeType
    __type?: string
    name?: string
    attrs?: {
      class: string
      width: string
      height: string
      style: string
    }
    attr?: {
      value: string
    }
    text?: string
    __block?: boolean
    __break?: boolean
    __value?: string
    style?: Record<string, any>
    children?: NvueNode[]
  }

  const TAGS = ['span', 'a', 'image', 'img']
  const strategies = {
    blockquote: block,
    br: br,
    div: block,
    dl: block,
    h1: createHeading(2),
    h2: createHeading(1.5),
    h3: createHeading(1.17),
    h4: createHeading(1),
    h5: createHeading(0.83),
    h6: createHeading(0.67),
    hr: block,
    ol: block,
    p: block,
    strong: bold,
    table: block,
    tbody: block,
    tfoot: block,
    thead: block,
    ul: block,
  }
  const HTML_RE = /&(amp|gt|lt|nbsp|quot|apos);/g
  const CHARS = {
    amp: '&',
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
    apos: "'",
  }

  // 插入换行
  const breakNode: NvueNode = {
    type: 'span',
    __type: 'break',
    attr: {
      value: '\n',
    },
  }
  let lastNode: NvueNode = {
    __block: true,
    __break: true,
    children: [],
  }
  let breakNodes: NvueNode[] | null = null

  function parseStyle(node: NvueNode) {
    const styles = Object.create(null)

    if (node.attrs) {
      const classList = (node.attrs.class || '').split(' ')

      Object.assign(
        styles,
        parseClassList(classList, instance),
        parseStyleText(node.attrs.style || '')
      )
    }

    if (node.name === 'img' || node.name === 'image') {
      const attrs = node.attrs
      styles.width = styles.width || attrs!.width
      styles.height = styles.height || attrs!.height
    }

    return styles
  }

  function block(node: NvueNode) {
    node.__block = true
    // node.attr.value = (node.attr.value || '') + '\n'
    return node
  }

  function heading(node: NvueNode, em: number) {
    if (node.style)
      !node.style.fontSize &&
        (node.style.fontSize = options.defaultFontSize * em)
    return block(bold(node))
  }

  function createHeading(em: number) {
    return function (node: NvueNode) {
      return heading(node, em)
    }
  }

  function bold(node: NvueNode) {
    if (node.style) !node.style.fontWeight && (node.style.fontWeight = 'bold')
    return node
  }

  function br(node: NvueNode) {
    node.__value = ' '
    return block(node)
  }

  function normalizeText(str: string) {
    return str.replace(HTML_RE, function (match, entity: keyof typeof CHARS) {
      return CHARS[entity]
    })
  }

  function normalizeNode(node: NvueNode) {
    let type: NodeType = (node.name || '').toLowerCase() as NodeType

    const __type = type

    const strategy = strategies[type as keyof typeof strategies]

    if (TAGS.indexOf(type) === -1) {
      type = 'span'
    }
    if (type === 'img') {
      type = 'image'
    }
    const nvueNode: NvueNode = {
      type,
      __type,
      attr: Object.create(null),
    }

    if (node.type === 'text' || node.text) {
      nvueNode.__value = nvueNode.attr!.value = normalizeText(
        (node.text || '').trim()
      )
    }

    if (node.attrs) {
      Object.keys(node.attrs).forEach((name) => {
        if (name !== 'class' && name !== 'style') {
          ;(nvueNode.attr as any)[name] = (node.attrs as any)[name]
        }
      })
    }

    nvueNode.style = parseStyle(node)

    if (strategy) {
      strategy(nvueNode)
    }

    if (lastNode.__block || nvueNode.__block) {
      if (!breakNodes) {
        lastNode.children!.push(breakNode)
        breakNodes = [lastNode, breakNode]
      }
    }
    // 进入节点
    lastNode = nvueNode
    if (
      lastNode.__value ||
      (lastNode.type === 'image' && (lastNode.attr as any).src)
    ) {
      // 文本和图像消费换行
      breakNodes = null
    }
    nvueNode.children = normalizeNodes(node.children)
    // 退出节点
    lastNode = nvueNode
    if (
      lastNode.__block &&
      (lastNode.style as any).height &&
      !/^0(px)?$/.test((lastNode.style as any).height)
    ) {
      // 有高度的块元素消费换行
      breakNodes = null
    }

    return nvueNode
  }

  function normalizeNodes(nodes?: NvueNode[]) {
    if (isArray(nodes)) {
      return nodes.map((node) => normalizeNode(node))
    }
    return []
  }

  const nvueNodes = normalizeNodes(nodes as NvueNode[])
  if (breakNodes) {
    // 撤销未消费的换行
    const [lastNode, breakNode] = breakNodes as NvueNode[]
    const children = lastNode.children!
    const index = children.indexOf(breakNode)
    children.splice(index, 1)
  }
  return nvueNodes
}
