import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { preJs, preNVueJs, withSourcemap } from '@dcloudio/uni-cli-shared'

import type { UniPluginFilterOptions } from '.'

const debugPre = debug('uni:pre-css')
// const debugPreTry = debug('uni:pre-css-try')
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)
/**
 * preprocess css
 * @param options
 */
export function uniPreCssPlugin(
  config: ResolvedConfig,
  options: UniPluginFilterOptions
): Plugin {
  const filter = createFilter(options.include, options.exclude)
  const isNVue = (config as any).nvue
  const preJsFile = isNVue ? preNVueJs : preJs
  return {
    name: 'uni:pre-css',
    transform(code, id) {
      if (!cssLangRE.test(id)) {
        return
      }
      if (!filter(id)) {
        return
      }
      // debugPreTry(id)
      if (!code.includes('#endif')) {
        return
      }
      debugPre(id)
      return {
        code: preJsFile(code, id),
        map: withSourcemap(config) ? this.getCombinedSourcemap() : null,
      }
    },
  }
}
