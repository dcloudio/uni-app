import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'

import { UniPluginFilterOptions } from '.'

const { preJs, preHtml } = require('@dcloudio/uni-cli-shared')

const debugPreJs = debug('uni:pre-js')
const debugPreHtml = debug('uni:pre-html')
const debugPreJsTry = debug('uni:pre-js-try')

const PRE_JS_EXTNAME = ['.js', '.ts', '.json', '.css', '.vue', '.nvue']
const PRE_HTML_EXTNAME = ['.vue', '.nvue']
export function uniPrePlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-pre',
    transform(code, id) {
      if (!filter(id)) {
        return code
      }
      const extname = path.extname(id)
      const isHtml = PRE_HTML_EXTNAME.includes(extname)
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
      return code
    },
  }
}
