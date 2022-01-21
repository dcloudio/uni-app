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
import {
  clearMiniProgramTemplateFilter,
  EXTNAME_VUE,
  normalizeMiniProgramFilename,
  parseVueRequest,
  removeExt,
  isElementNode,
  parseVue,
} from '@dcloudio/uni-cli-shared'

const debugPreVue = debug('uni:pre-vue')

const BLOCK_RE = /<\/block>/

const WXS_LANG_RE = /lang=["|'](renderjs|wxs)["|']/

const WXS_ATTRS = ['wxs', 'renderjs']

export function uniPreVuePlugin(): Plugin {
  return {
    name: 'uni:pre-vue',
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return
      }
      // 清空当前页面已缓存的 filter 信息
      clearMiniProgramTemplateFilter(
        removeExt(normalizeMiniProgramFilename(id, process.env.UNI_INPUT_DIR))
      )
      const hasBlock = BLOCK_RE.test(code)
      const hasWxs = WXS_LANG_RE.test(code)
      if (!hasBlock && !hasWxs) {
        return
      }
      debugPreVue(id)
      const watchFiles: string[] = []
      const errors: SyntaxError[] = []
      let ast = parseVue(code, errors)
      if (hasBlock) {
        code = parseBlockCode(ast, code)
        // 重新解析新的 code
        ast = parseVue(code, errors)
      }
      if (hasWxs) {
        const wxsNodes = parseWxsNodes(ast)
        code = parseWxsCode(wxsNodes, code)
        // add watch
        for (const wxsNode of wxsNodes) {
          const srcProp = wxsNode.props.find(
            (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'src'
          ) as AttributeNode | undefined
          if (srcProp && srcProp.value) {
            const resolveId = await this.resolve(srcProp.value.content, id)
            if (resolveId) {
              watchFiles.push(resolveId.id)
            }
          }
        }
      }
      // if (errors.length) {
      //   this.error(errors.join('\n'))
      // }
      watchFiles.forEach((file) => this.addWatchFile(file))
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
