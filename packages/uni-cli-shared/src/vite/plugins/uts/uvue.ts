import type { Plugin } from 'vite'
import { isVueSfcFile } from '../../../vue'

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
      return {
        code: code.replace(/<script([^>]*)>/gi, (match, attributes) => {
          let vapor = false
          if (process.env.UNI_APP_X_DOM2 === 'true') {
            if (attributes.includes('setup') && !attributes.includes('vapor')) {
              vapor = true
            }
          }
          let result = ''
          const langMatch = attributes.match(
            /(^|\s)lang\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i
          )
          const lang = langMatch
            ? langMatch[2] || langMatch[3] || langMatch[4]
            : undefined
          // 未声明 lang 时保持现有 UTS 默认行为。
          if (!langMatch) {
            result = `<script${attributes} lang="uts">`
          } else if (isDom2 && lang === 'js') {
            // DOM2 的标准 JavaScript 统一交给 TypeScript/esbuild 链路处理。
            result = match.replace(langMatch[0], `${langMatch[1]}lang="ts"`)
          } else if (!isDom2 && lang === 'ts') {
            // 非 DOM2 继续由 uts2js 处理 TypeScript。
            result = match.replace(langMatch[0], `${langMatch[1]}lang="uts"`)
          } else {
            result = match
          }
          if (vapor) {
            // 追加 vapor 属性
            result = result.replace(/(\s)lang(?=\s*=)/i, '$1vapor lang')
          }
          return result
        }),
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
