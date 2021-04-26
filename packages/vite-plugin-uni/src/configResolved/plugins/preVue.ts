import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import {
  TextModes,
  NodeTypes,
  ElementNode,
  AttributeNode,
} from '@vue/compiler-core'
import { parse } from '@vue/compiler-dom'
import { MagicString } from '@vue/compiler-sfc'
import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'

const debugPreVue = debug('uni:pre-vue')

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
      if (!WXS_LANG_RE.test(code)) {
        return
      }
      const sourceKey = code + filename
      const cache = sourceToSFC.get(sourceKey)
      if (cache) {
        debugPreVue('cache', id)
        return cache
      }
      debugPreVue(id)
      const [errors, wxsCode] = normalizeWxsCode(code)
      if (errors.length) {
        this.error(errors.join('\n'))
      }
      sourceToSFC.set(sourceKey, wxsCode)
      return wxsCode
    },
  }
}

export function normalizeWxsCode(code: string): [SyntaxError[], string] {
  const errors: SyntaxError[] = []
  const ast = parse(code, {
    isNativeTag: () => true,
    isPreTag: () => true,
    getTextMode: () => TextModes.DATA,
    onError: (e) => {
      errors.push(e)
    },
  })
  const wxsNode = ast.children.find(
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
  if (wxsNode) {
    code = normalizeWxsNode(code, wxsNode as ElementNode)
  }
  return [errors, code]
}

const SCRIPT_END_LEN = '</script>'.length
const SCRIPT_START_LEN = '<script'.length

function normalizeWxsNode(code: string, { loc, props }: ElementNode) {
  const magicString = new MagicString(code)
  const langAttr = props.find((prop) => prop.name === 'lang') as AttributeNode
  const moduleAttr = props.find(
    (prop) => prop.name === 'module'
  ) as AttributeNode
  const startOffset = loc.start.offset
  const endOffset = loc.end.offset
  const lang = langAttr.value!.content
  const langStartOffset = langAttr.loc.start.offset
  magicString.overwrite(startOffset, startOffset + SCRIPT_START_LEN, '<' + lang) // <renderjs or <wxs
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
  return magicString.toString()
}
