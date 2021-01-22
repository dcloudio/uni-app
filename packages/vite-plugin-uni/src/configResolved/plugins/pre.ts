import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'

import { UniPluginFilterOptions } from '.'

const { preJs, preHtml } = require('@dcloudio/uni-cli-shared')

const debugPreJs = debug('uni:pre-js')
const debugPreHtml = debug('uni:pre-html')
const debugPreIgnore = debug('uni:pre-ignore')
const debugPreJsTry = debug('uni:pre-js-try')

const PRE_JS_EXTNAME = ['.js', '.ts', '.json', '.css', '.vue', '.nvue']
const PRE_HTML_EXTNAME = ['.vue', '.nvue']
export function uniPrePlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-pre',
    transform(code, id) {
      if (!filter(id)) {
        debugPreIgnore(id)
        return code
      }
      const extname = path.extname(id)
      const isHtml = PRE_HTML_EXTNAME.includes(extname)
      const isJs = PRE_JS_EXTNAME.includes(extname)
      const isPre = isHtml || isJs
      const hasEndif = isPre && code.includes('#endif')
      if (isPre && !hasEndif) {
        debugPreJsTry(id)
      }
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
