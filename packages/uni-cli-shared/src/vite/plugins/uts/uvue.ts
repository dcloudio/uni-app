import type { Plugin } from 'vite'
import MagicString from 'magic-string'
import {
  type AttributeNode,
  type ElementNode,
  NodeTypes,
} from '@vue/compiler-core'
import { parse } from '@vue/compiler-dom'
import { isVueSfcFile } from '../../../vue'
import { isUniAppXStandardScriptSupported } from '../../../x'

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
  const standardScriptSupported = isUniAppXStandardScriptSupported()
  return {
    name: 'uni:uts-uvue',
    enforce: 'pre',
    configResolved(config) {
      if (standardScriptSupported) {
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
      const scriptTags = standardScriptSupported
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
          // Android VDOM 模式下，TypeScript 继续由 uts2js 处理。
          result = match.replace(langMatch[0], `${langMatch[1]}lang="uts"`)
        } else {
          result = match
        }
        return result
      }
      if (standardScriptSupported) {
        const transformed = new MagicString(code)
        let changed = false
        // fixed by uts 记录原始 SFC 是否未显式配置 lang，供后续 plugin-vue 生成元数据。
        let hasImplicitLang = false
        for (const script of scriptTags) {
          const addVapor = isDom2 && script.setup && !script.vapor
          if (script.langAttr) {
            if (addVapor) {
              const langText = code.slice(
                script.langAttr.loc.start.offset,
                script.langAttr.loc.end.offset
              )
              transformed.overwrite(
                script.langAttr.loc.start.offset,
                script.langAttr.loc.end.offset,
                `vapor ${langText}`
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
            // fixed by uts 该标记必须在改写 script 标签前记录，避免丢失原始状态。
            hasImplicitLang = true
          }
        }
        // fixed by uts HMR 从隐式 lang 切换为显式 lang 时，覆盖模块缓存中的旧元数据。
        const previousScriptMeta = this.getModuleInfo?.(id)?.meta
          ?.uniAppXScript as { hasImplicitLang?: boolean } | undefined
        const shouldClearImplicitLangMeta =
          previousScriptMeta?.hasImplicitLang === true
        if (!changed) {
          // App 旧流程即使未改写 script 标签也会返回空 map，用于隔离后续
          // uni:pre-vue 无 map 的条件编译，避免同一 SFC 出现不同 sourcesContent。
          if (isApp) {
            return {
              code,
              map: { mappings: '' },
              meta: shouldClearImplicitLangMeta
                ? {
                    uniAppXScript: {
                      hasImplicitLang: false,
                    },
                  }
                : undefined,
            }
          }
          if (shouldClearImplicitLangMeta) {
            return {
              code,
              meta: {
                uniAppXScript: {
                  hasImplicitLang: false,
                },
              },
            }
          }
          return
        }
        return {
          code: transformed.toString(),
          // 此插件只改写 script 开始标签。常规多行脚本的正文行列不变，继续沿用旧的空 map
          // 可避免后续 SFC 虚拟模块针对同一文件生成不同 sourcesContent。遗留问题：单行
          // <script>code</script> 中正文的列偏移暂时无法还原。
          map: { mappings: '' },
          meta: {
            uniAppXScript: {
              hasImplicitLang,
              defaultLang: 'uts',
            },
          },
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
