import type { Plugin } from 'vite'
import fs from 'fs'
import { parse } from 'jsonc-parser'
import { isUniAppLocaleFile, preJs } from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '../..'

const jsonExtRE = /\.json($|\?)(?!commonjs-)/
const SPECIAL_QUERY_RE = /[\?&](?:worker|sharedworker|raw|url)\b/

export function uniJsonPlugin(options: VitePluginUniResolvedOptions): Plugin {
  return {
    name: 'uni:json',
    load(id) {
      if (!jsonExtRE.test(id)) return null
      if (SPECIAL_QUERY_RE.test(id)) return null
      if (id.endsWith('.json.js')) return null
      const filename = id.split('?')[0]
      if (!fs.existsSync(filename)) return null
      // rolldown-vite 的 native loader 会拒绝非 UTF-8 JSON。
      // 这里沿用 Node 读取行为，避免历史项目中的非 UTF-8 语言包直接构建失败。
      return fs.readFileSync(filename, 'utf8')
    },
    transform: {
      filter: { id: jsonExtRE },
      handler(code, id) {
        if (!jsonExtRE.test(id)) return null
        if (SPECIAL_QUERY_RE.test(id)) return null
        if (id.endsWith('.json.js')) return null
        const isLocaleFile = isUniAppLocaleFile(id)
        if (!code.includes('#endif') && !isLocaleFile) {
          return null
        }
        // preprocess
        if (code.includes('#endif')) {
          code = preJs(code, id)
        }
        let jsonObj = parse(code)
        if (isLocaleFile) {
          jsonObj = jsonObj.common || {}
        }
        return {
          code: JSON.stringify(jsonObj),
          map: null,
        }
      },
    },
  }
}
