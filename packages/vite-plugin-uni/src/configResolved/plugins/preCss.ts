import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { preJs, withSourcemap } from '@dcloudio/uni-cli-shared'

import { UniPluginFilterOptions } from '.'

const debugPre = debug('vite:uni:pre-css')
const debugPreTry = debug('vite:uni:pre-css-try')
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
  return {
    name: 'vite:uni-pre-css',
    transform(code, id) {
      if (!cssLangRE.test(id)) {
        return
      }
      if (!filter(id)) {
        return
      }
      debugPreTry(id)
      if (!code.includes('#endif')) {
        return
      }
      debugPre(id)
      return {
        code: preJs(code),
        map: withSourcemap(config) ? this.getCombinedSourcemap() : null,
      }
    },
  }
}
