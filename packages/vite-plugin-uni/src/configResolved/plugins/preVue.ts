import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import {
  RootNode,
  NodeTypes,
  ParentNode,
  ElementNode,
  AttributeNode,
  TemplateChildNode,
} from '@vue/compiler-core'

import { MagicString } from '@vue/compiler-sfc'
import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'
import { isElementNode, parseVue } from '../../utils'

const debugPreVue = debug('vite:uni:pre-vue')

const BLOCK_RE = /<\/block>/

const WXS_LANG_RE = /lang=["|'](renderjs|wxs)["|']/

const WXS_ATTRS = ['wxs', 'renderjs']

const sourceToSFC = new Map<string, string>()

export function uniPreVuePlugin(): Plugin {
  return {
    name: 'vite:uni-pre-vue',
    transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return
      }
      const sourceKey = code + filename
      const cache = sourceToSFC.get(sourceKey)
      if (cache) {
        debugPreVue('cache', id)
        return {
          code: cache,
          map: null,
        }
      }
      const hasBlock = BLOCK_RE.test(code)
      const hasWxs = WXS_LANG_RE.test(code)
      if (!hasBlock && !hasWxs) {
        return
      }
      debugPreVue(id)
      const errors: SyntaxError[] = []
      const ast = parseVue(code, errors)
      if (hasBlock) {
        code = normalizeBlockCode(ast, code)
      }
      if (hasWxs) {
        code = normalizeWxsCode(ast, code)
      }
      // if (errors.length) {
      //   this.error(errors.join('\n'))
      // }
      sourceToSFC.set(sourceKey, code)
      return {
        code, // 暂不提供sourcemap,意义不大
        map: null,
      }
    },
  }
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

export function normalizeBlockCode(ast: RootNode, code: string) {
  const blockNodes: ElementNode[] = []
  traverseNode(ast, blockNodes)
  if (blockNodes.length) {
    return normalizeBlockNode(code, blockNodes)
  }
  return code
}

const BLOCK_END_LEN = '</block>'.length
const BLOCK_START_LEN = '<block'.length

function normalizeBlockNode(code: string, blocks: ElementNode[]) {
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

export function normalizeWxsCode(ast: RootNode, code: string) {
  const wxsNodes = ast.children.filter(
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
  )
  if (wxsNodes.length) {
    code = normalizeWxsNode(code, wxsNodes as ElementNode[])
  }
  return code
}

const SCRIPT_END_LEN = '</script>'.length
const SCRIPT_START_LEN = '<script'.length

function normalizeWxsNode(code: string, nodes: ElementNode[]) {
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
