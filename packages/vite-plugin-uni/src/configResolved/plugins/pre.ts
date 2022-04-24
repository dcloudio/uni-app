import path from 'path'
import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import {
  preJs,
  preHtml,
  EXTNAME_JS,
  EXTNAME_VUE,
  parseVueRequest,
  withSourcemap,
  preNVueJs,
  preNVueHtml,
} from '@dcloudio/uni-cli-shared'
import { UniPluginFilterOptions } from '.'

const debugPreJs = debug('uni:pre-js')
const debugPreHtml = debug('uni:pre-html')
const debugPreJsTry = debug('uni:pre-js-try')

const PRE_JS_EXTNAME = ['.json', '.css'].concat(EXTNAME_VUE).concat(EXTNAME_JS)
const PRE_HTML_EXTNAME = EXTNAME_VUE

export function uniPrePlugin(
  config: ResolvedConfig,
  options: UniPluginFilterOptions
): Plugin {
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
        debugPreJsTry(id)
      }
      const hasEndif = isPre && code.includes('#endif')
      if (!hasEndif) {
        return
      }
      if (isHtml) {
        code = preHtmlFile(code)
        debugPreHtml(id)
      }
      if (isJs) {
        code = preJsFile(code)
        debugPreJs(id)
      }
      return {
        code,
        map: withSourcemap(config) ? this.getCombinedSourcemap() : null,
      }
    },
  }
}
