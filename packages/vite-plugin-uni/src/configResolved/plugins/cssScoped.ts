import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'

import { UniPluginFilterOptions } from '.'

const debugScoped = debug('uni:scoped')
export function uniCssScopedPlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-scoped',
    transform(code, id) {
      if (!filter(id)) {
        return code
      }
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return code
      }
      if (EXTNAME_VUE.includes(path.extname(filename))) {
        debugScoped(id)
        return {
          code: code.replace(/(<style\b[^><]*)>/gi, '$1 scoped>'),
          map: this.getCombinedSourcemap(),
        }
      }
    },
  }
}
