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
          // 如果 <script> 标签中没有 lang 属性，添加 lang="uts"
          if (!/lang=["']?[^"']*["']?/.test(attributes)) {
            return `<script${attributes} lang="uts">`
          }
          // 否则，将现有的 lang 属性替换为 lang="uts"
          return match.replace(/lang=["']?ts["']?/, 'lang="uts"')
        }),
        map: null,
      }
    },
  }
}
