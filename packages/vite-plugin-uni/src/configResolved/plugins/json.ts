import type { Plugin } from 'vite'
import { parse } from 'jsonc-parser'
import { isUniAppLocaleFile, preJs } from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '../..'

const jsonExtRE = /\.json($|\?)(?!commonjs-proxy)/
const SPECIAL_QUERY_RE = /[\?&](?:worker|sharedworker|raw|url)\b/

export function uniJsonPlugin(options: VitePluginUniResolvedOptions): Plugin {
  return {
    name: 'uni:json',
    transform(code, id) {
      if (!jsonExtRE.test(id)) return null
      if (SPECIAL_QUERY_RE.test(id)) return null
      if (id.endsWith('.json.js')) return null
      // preprocess
      if (code.includes('#endif')) {
        code = preJs(code, id)
      }
      let jsonObj = parse(code)
      if (isUniAppLocaleFile(id)) {
        jsonObj = jsonObj.common || {}
      }
      return {
        code: JSON.stringify(jsonObj),
        map: {
          mappings: '',
        },
      }
    },
  }
}
