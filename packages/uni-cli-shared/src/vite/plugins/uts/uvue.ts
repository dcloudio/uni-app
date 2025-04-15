import type { Plugin, ResolvedConfig, TransformResult } from 'vite'
import MagicString from 'magic-string'
import { isVueSfcFile } from '../../../vue'
import { withSourcemap } from '../../utils/utils'

export function replaceScriptLang(
  id: string,
  code: string,
  sourcemap: boolean
): TransformResult | undefined {
  const magicString = new MagicString(code)
  magicString.replace(/<script([^>]*)>/gi, (match, attributes) => {
    // 如果 <script> 标签中没有 lang 属性，添加 lang="uts"
    if (!/lang=["']?[^"']*["']?/.test(attributes)) {
      return `<script${attributes} lang="uts">`
    }
    // 否则，将现有的 lang 属性替换为 lang="uts"
    return match.replace(/lang=["']?ts["']?/, 'lang="uts"')
  })

  if (magicString.hasChanged()) {
    return {
      code: magicString.toString(),
      map: sourcemap ? { mappings: '' } : null,
    }
  }
}
export function uniUTSUVueJavaScriptPlugin(options = {}): Plugin {
  process.env.UNI_UTS_USING_ROLLUP = 'true'
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:uts-uvue',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
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
      return replaceScriptLang(id, code, withSourcemap(resolvedConfig))
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
        map: null,
      }
    },
  }
}
