import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'

import { UniPluginFilterOptions } from '.'

const debugScoped = debug('uni:scoped')

const SCOPED_RE = /<style\s[^>]*scoped[^>]*>/i

function addScoped(code: string) {
  if (SCOPED_RE.test(code)) {
    return code
  }
  return code.replace(/(<style\b[^><]*)>/gi, '$1 scoped>')
}

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
          code: addScoped(code),
          map: this.getCombinedSourcemap(),
        }
      }
    },
    handleHotUpdate(ctx) {
      if (!EXTNAME_VUE.includes(path.extname(ctx.file))) {
        return
      }
      debugScoped('hmr', ctx.file)
      const oldRead = ctx.read
      ctx.read = async () => {
        const code = await oldRead()
        return addScoped(code)
      }
    },
  }
}
