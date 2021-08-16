import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import {
  preJs,
  preHtml,
  EXTNAME_JS,
  EXTNAME_VUE,
  parseVueRequest,
} from '@dcloudio/uni-cli-shared'
import { UniPluginFilterOptions } from '.'

const debugPreJs = debug('vite:uni:pre-js')
const debugPreHtml = debug('vite:uni:pre-html')
const debugPreJsTry = debug('vite:uni:pre-js-try')

const PRE_JS_EXTNAME = ['.json', '.css'].concat(EXTNAME_VUE).concat(EXTNAME_JS)
const PRE_HTML_EXTNAME = EXTNAME_VUE
export function uniPrePlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-pre',
    transform(code, id) {
      if (!filter(id)) {
        return
      }
      const { filename, query } = parseVueRequest(id)
      if (query.vue && query.type !== 'template') {
        return
      }
      const extname = path.extname(filename)
      const isHtml =
        query.type === 'template' || PRE_HTML_EXTNAME.includes(extname)
      const isJs = PRE_JS_EXTNAME.includes(extname)
      const isPre = isHtml || isJs
      if (isPre) {
        debugPreJsTry(id)
      }
      const hasEndif = isPre && code.includes('#endif')
      if (isHtml && hasEndif) {
        code = preHtml(code)
        debugPreHtml(id)
      }
      if (isJs && hasEndif) {
        code = preJs(code)
        debugPreJs(id)
      }
      // https://github.com/vitejs/vite/blob/bc35fe994d48b2bd7076474f4a1a7b8ae5e8f401/packages/vite/src/node/server/sourcemap.ts#L15
      // 读取sourcemap时，需要移除?mpType=page等参数，否则读取不到提示文件不存在
      const map = this.getCombinedSourcemap()
      if (map) {
        map.sources = map.sources.map(
          (source) => parseVueRequest(source).filename
        )
      }
      return {
        code,
        map,
      }
    },
  }
}
