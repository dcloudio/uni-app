import type { Plugin } from 'vite'
import MagicString from 'magic-string'
import {
  type AttributeNode,
  type ElementNode,
  NodeTypes,
} from '@vue/compiler-core'
import { parse } from '@vue/compiler-dom'
import { isVueSfcFile } from '../../../vue'

const SCRIPT_OPEN_TAG_RE = /<script([^>]*)>/gi
const SCRIPT_LANG_RE =
  /(^|\s)lang\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i

interface ScriptTag {
  end: number
  setup: boolean
  vapor: boolean
  src: boolean
  lang?: string
  langAttr?: AttributeNode
}

function findScriptTag(code: string, node: ElementNode): ScriptTag | undefined {
  const start = node.loc.start.offset
  let quote = ''
  let end = -1
  for (let index = start + '<script'.length; index < code.length; index++) {
    const char = code[index]
    if (quote) {
      if (char === quote) {
        quote = ''
      }
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === '>') {
      end = index + 1
      break
    }
  }
  if (end < 0) {
    return
  }
  const attrs = node.props.filter(
    (prop): prop is AttributeNode => prop.type === NodeTypes.ATTRIBUTE
  )
  const getAttr = (name: string) =>
    attrs.find((attr) => attr.name.toLowerCase() === name)
  const langAttr = getAttr('lang')
  return {
    end,
    setup: !!getAttr('setup'),
    vapor: !!getAttr('vapor'),
    src: !!getAttr('src'),
    lang: langAttr?.value?.content,
    langAttr,
  }
}

export function uniUTSUVueJavaScriptPlugin(options = {}): Plugin {
  process.env.UNI_UTS_USING_ROLLUP = 'true'
  const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
  return {
    name: 'uni:uts-uvue',
    enforce: 'pre',
    configResolved(config) {
      if (isDom2) {
        return
      }
      // 移除自带的 esbuild 处理 ts 文件
      const index = config.plugins.findIndex((p) => p.name === 'vite:esbuild')
      if (index > -1) {
        // @ts-expect-error
        config.plugins.splice(index, 1)
      }
    },
    transform(code, id) {
      if (!isVueSfcFile(id)) {
        return
      }
      const platform = process.env.UNI_PLATFORM
      const isApp =
        platform === 'app' ||
        platform === 'app-plus' ||
        platform === 'app-harmony'
      const scriptTags = isDom2
        ? parse(code, {
            parseMode: 'sfc',
            // 此阶段只识别真实脚本块，语法错误仍由后续正式 SFC 编译统一报告。
            onError: () => {},
          })
            .children.filter(
              (node): node is ElementNode =>
                node.type === NodeTypes.ELEMENT &&
                node.tag.toLowerCase() === 'script'
            )
            .map((node) => findScriptTag(code, node))
            .filter((script): script is ScriptTag => !!script)
        : []
      const setupScript = scriptTags.find((script) => script.setup)
      // 同一 SFC 的普通 script 与 script setup 必须使用相同语言，因此需要整组归一为 TypeScript。
      const normalizeJavaScript =
        isDom2 &&
        !!setupScript &&
        !scriptTags.some((script) => script.src) &&
        (setupScript.lang === 'js' || setupScript.lang === 'ts') &&
        scriptTags.every(
          (script) => script.lang === 'js' || script.lang === 'ts'
        )
      const transformScriptTag = (match: string, attributes: string) => {
        let result = ''
        const langMatch = attributes.match(SCRIPT_LANG_RE)
        const lang = langMatch
          ? langMatch[2] || langMatch[3] || langMatch[4]
          : undefined
        // 未声明 lang 时保持现有 UTS 默认行为。
        if (!langMatch) {
          result = `<script${attributes} lang="uts">`
        } else if (lang === 'ts') {
          // 非 DOM2 继续由 uts2js 处理 TypeScript。
          result = match.replace(langMatch[0], `${langMatch[1]}lang="uts"`)
        } else {
          result = match
        }
        return result
      }
      if (isDom2) {
        const source = id.split('?')[0]
        const transformed = new MagicString(code)
        let changed = false
        for (const script of scriptTags) {
          const addVapor = script.setup && !script.vapor
          if (script.langAttr) {
            const normalizeLang = normalizeJavaScript && script.lang === 'js'
            if (addVapor || normalizeLang) {
              const langText = normalizeLang
                ? 'lang="ts"'
                : code.slice(
                    script.langAttr.loc.start.offset,
                    script.langAttr.loc.end.offset
                  )
              transformed.overwrite(
                script.langAttr.loc.start.offset,
                script.langAttr.loc.end.offset,
                `${addVapor ? 'vapor ' : ''}${langText}`
              )
              changed = true
            }
          } else {
            // 未声明 lang 时保持现有 UTS 默认行为，并将 vapor 放在 lang 前。
            transformed.appendLeft(
              script.end - 1,
              `${addVapor ? ' vapor' : ''} lang="uts"`
            )
            changed = true
          }
        }
        if (!changed) {
          return
        }
        return {
          code: transformed.toString(),
          // 阶段 map 用于后续编译诊断还原，与发行产物是否输出 sourcemap 无关。
          map: transformed.generateMap({
            source,
            includeContent: true,
            hires: 'boundary',
          }),
        }
      }
      return {
        code: code.replace(SCRIPT_OPEN_TAG_RE, transformScriptTag),
        // app平台不可返回null，否则会报错“Multiple conflicting contents for sourcemap source”
        map: isApp ? { mappings: '' } : null,
      }
    },
  }
}

/**
 * 将 <script> 标签中的 lang="uts" 替换为 lang="ts"
 * 主要是当前功能内部使用 x.vite.config.ts 配置
 * @param options
 * @returns
 */
export function uniUVueTypeScriptPlugin(options = {}): Plugin {
  return {
    name: 'uni:uvue-ts',
    enforce: 'pre',
    transform(code, id) {
      if (!isVueSfcFile(id)) {
        return
      }
      return {
        code: code.replace(/<script([^>]*)>/gi, (match, attributes) => {
          // 如果 <script> 标签中没有 lang 属性，添加 lang="uts"
          if (!/lang=["']?[^"']*["']?/.test(attributes)) {
            return `<script${attributes} lang="ts">`
          }
          // 否则，将现有的 lang 属性替换为 lang="uts"
          return match.replace(/lang=["']?uts["']?/, 'lang="ts"')
        }),
        map: { mappings: '' },
      }
    },
  }
}
