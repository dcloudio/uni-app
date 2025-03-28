import path from 'path'
import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'
import { type FilterPattern, createFilter } from '@rollup/pluginutils'

import { EXTNAME_JS, EXTNAME_VUE, X_EXTNAME_VUE } from '../../constants'
import { preHtml, preJs, preNVueHtml, preNVueJs } from '../../preprocess'
import { parseVueRequest, withSourcemap } from '../utils'

const debugPreJs = debug('uni:pre-js')
const debugPreHtml = debug('uni:pre-html')
// const debugPreJsTry = debug('uni:pre-js-try')

export function uniPrePlugin(
  config: ResolvedConfig,
  options: { include?: FilterPattern; exclude?: FilterPattern }
): Plugin {
  const isX = process.env.UNI_APP_X === 'true'
  const PRE_JS_EXTNAME = ['.json', '.css']
    .concat(isX ? X_EXTNAME_VUE : EXTNAME_VUE)
    .concat(EXTNAME_JS) // 因为 1.0 也会使用 uts uni_modules，所以 EXTNAME_JS 直接包含了 .uts 后缀
  const PRE_HTML_EXTNAME = isX ? X_EXTNAME_VUE : EXTNAME_VUE

  const filter = createFilter(options.include, options.exclude)
  const isNVue = (config as any).nvue
  const preJsFile = isNVue ? preNVueJs : preJs
  const preHtmlFile = isNVue ? preNVueHtml : preHtml
  return {
    name: 'uni:pre',
    transform(code, id) {
      if (!filter(id)) {
        return
      }
      const { filename, query } = parseVueRequest(id)
      const extname = path.extname(filename)
      const isHtml =
        query.type === 'template' || PRE_HTML_EXTNAME.includes(extname)
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
        map: withSourcemap(config) ? this.getCombinedSourcemap() : null,
      }
    },
  }
}
