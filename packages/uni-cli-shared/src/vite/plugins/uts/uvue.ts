import type { Plugin } from 'vite'
import { isVueSfcFile } from '../../../vue'

export function uniUTSUVueJavaScriptPlugin(options = {}): Plugin {
  process.env.UNI_UTS_USING_ROLLUP = 'true'
  return {
    name: 'uni:uts-uvue',
    enforce: 'pre',
    configResolved(config) {
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
      return {
        code: code.replace(/<script([^>]*)>/gi, (match, attributes) => {
          let vapor = false
          if (
            process.env.UNI_VUE_VAPOR_ALL === 'true' ||
            process.env.UNI_VUE_DOM2 === 'true'
          ) {
            if (attributes.includes('setup') && !attributes.includes('vapor')) {
              vapor = true
            }
          }
          let result = ''
          // 如果 <script> 标签中没有 lang 属性，添加 lang="uts"
          if (!/lang=["']?[^"']*["']?/.test(attributes)) {
            result = `<script${attributes} lang="uts">`
          } else {
            // 否则，将现有的 lang 属性替换为 lang="uts"
            result = match.replace(/lang=["']?ts["']?/, 'lang="uts"')
          }
          if (vapor) {
            // 追加 vapor 属性
            result = result.replace('lang=', 'vapor lang=')
          }
          return result
        }),
        map: { mappings: '' },
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
