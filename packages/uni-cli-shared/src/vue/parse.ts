import {
  type AttributeNode,
  type ElementNode,
  NodeTypes,
  type ParentNode,
  type RootNode,
  type TemplateChildNode,
} from '@vue/compiler-core'
import MagicString from 'magic-string'
import { isElementNode, parseVue } from '../vite/utils/ast'
import { onCompileLog } from '../logs'

const BLOCK_RE = /<\/block>/
const WXS_LANG_RE = /lang=["|'](renderjs|wxs|sjs)["|']/
const WXS_ATTRS = ['wxs', 'renderjs', 'sjs']

export function parseVueCode(code: string, isNVue = false) {
  const hasBlock = BLOCK_RE.test(code)
  const hasWxs = WXS_LANG_RE.test(code)
  if (!hasBlock && !hasWxs) {
    return { code }
  }
  const errors: SyntaxError[] = []
  const files: string[] = []
  let ast = parseVue(code, errors)
  if (hasBlock) {
    code = parseBlockCode(ast, code)
    // 重新解析新的 code
    ast = parseVue(code, errors)
  }
  if (!isNVue && hasWxs) {
    const wxsNodes = parseWxsNodes(ast)
    code = parseWxsCode(wxsNodes, code)
    // add watch
    for (const wxsNode of wxsNodes) {
      const srcProp = wxsNode.props.find(
        (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'src'
      ) as AttributeNode | undefined
      if (srcProp && srcProp.value) {
        files.push(srcProp.value.content)
      }
    }
  }
  return { code, files, errors }
}

function traverseChildren({ children }: ParentNode, blockNodes: ElementNode[]) {
  children.forEach((node) => traverseNode(node, blockNodes))
}

function traverseNode(
  node: RootNode | TemplateChildNode,
  blockNodes: ElementNode[]
) {
  if (isElementNode(node) && node.tag === 'block') {
    blockNodes.push(node)
  }
  if (
    node.type === NodeTypes.IF_BRANCH ||
    node.type === NodeTypes.FOR ||
    node.type === NodeTypes.ELEMENT ||
    node.type === NodeTypes.ROOT
  ) {
    traverseChildren(node, blockNodes)
  }
}

export function parseBlockCode(ast: RootNode, code: string) {
  const blockNodes: ElementNode[] = []
  traverseNode(ast, blockNodes)
  if (blockNodes.length) {
    return parseBlockNode(code, blockNodes)
  }
  return code
}
const BLOCK_END_LEN = '</block>'.length
const BLOCK_START_LEN = '<block'.length

function parseBlockNode(code: string, blocks: ElementNode[]) {
  const magicString = new MagicString(code)
  blocks.forEach(({ loc }) => {
    const startOffset = loc.start.offset
    const endOffset = loc.end.offset
    magicString.overwrite(
      startOffset,
      startOffset + BLOCK_START_LEN,
      '<template'
    )
    magicString.overwrite(endOffset - BLOCK_END_LEN, endOffset, '</template>')
  })
  return magicString.toString()
}

export function parseWxsNodes(ast: RootNode) {
  return ast.children.filter(
    (node) =>
      node.type === NodeTypes.ELEMENT &&
      node.tag === 'script' &&
      node.props.find(
        (prop) =>
          prop.name === 'lang' &&
          prop.type === NodeTypes.ATTRIBUTE &&
          prop.value &&
          WXS_ATTRS.includes(prop.value.content)
      )
  ) as ElementNode[]
}

export function parseWxsCode(wxsNodes: ElementNode[], code: string) {
  if (wxsNodes.length) {
    code = parseWxsNode(code, wxsNodes)
  }
  return code
}

const SCRIPT_END_LEN = '</script>'.length
const SCRIPT_START_LEN = '<script'.length

function parseWxsNode(code: string, nodes: ElementNode[]) {
  const magicString = new MagicString(code)
  nodes.forEach(({ loc, props }) => {
    const langAttr = props.find((prop) => prop.name === 'lang') as AttributeNode
    const moduleAttr = props.find(
      (prop) => prop.name === 'module'
    ) as AttributeNode
    const startOffset = loc.start.offset
    const endOffset = loc.end.offset
    const lang = langAttr.value!.content
    const langStartOffset = langAttr.loc.start.offset
    magicString.overwrite(
      startOffset,
      startOffset + SCRIPT_START_LEN,
      '<' + lang
    ) // <renderjs or <wxs
    magicString.overwrite(
      langStartOffset,
      langStartOffset + ('lang="' + lang + '"').length,
      ''
    ) // remove lang="renderjs" or lang="wxs"
    magicString.overwrite(
      endOffset - SCRIPT_END_LEN,
      endOffset,
      '</' + lang + '>'
    ) //</renderjs> or </wxs>

    if (moduleAttr) {
      const moduleStartOffset = moduleAttr.loc.start.offset
      magicString.overwrite(
        moduleStartOffset,
        moduleStartOffset + 'module'.length,
        'name'
      ) // module="echarts" => name="echarts"
    }
  })
  return magicString.toString()
}

export const onVueTemplateCompileLog = onCompileLog
