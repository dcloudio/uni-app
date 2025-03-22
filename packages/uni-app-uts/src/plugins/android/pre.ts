import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'
import { type FilterPattern, createFilter } from '@rollup/pluginutils'
import {
  parseVueRequest,
  preUVueHtml,
  preUVueJs,
} from '@dcloudio/uni-cli-shared'

export interface UniPrePluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

const debugPreJs = debug('uni:pre-js')
const debugPreHtml = debug('uni:pre-html')
// const debugPreJsTry = debug('uni:pre-js-try')

const PRE_HTML_EXTNAME = ['.vue', '.uvue']
const PRE_JS_EXTNAME = ['.json', '.css', '.uts', '.ts'].concat(PRE_HTML_EXTNAME)

export function uniPrePlugin(options: UniPrePluginOptions = {}): Plugin {
  const filter = createFilter(options.include, options.exclude)
  const preJsFile = preUVueJs
  const preHtmlFile = preUVueHtml
  return {
    name: 'uni:pre-android',
    enforce: 'pre',
    transform(code, id) {
      if (!filter(id)) {
        return
      }
      const { filename } = parseVueRequest(id)
      const extname = path.extname(filename)
      const isHtml = PRE_HTML_EXTNAME.includes(extname)
      const isJs = PRE_JS_EXTNAME.includes(extname)
      const isPre = isHtml || isJs
      if (isPre) {
        // debugPreJsTry(id)
      }
      const hasEndif = isPre && code.includes('#endif')
      if (!hasEndif) {
        return
      }
      if (isHtml) {
        code = preHtmlFile(code, id)
        debugPreHtml(id)
      }
      if (isJs) {
        code = preJsFile(code, id)
        debugPreJs(id)
      }
      return {
        code,
        map: {
          mappings: '',
        },
      }
    },
  }
}
