import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { parseVueRequest } from '../utils'
import { EXTNAME_VUE } from '../../constants'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

const debugScoped = debug('vite:uni:scoped')

const SCOPED_RE = /<style\s[^>]*scoped[^>]*>/i

function addScoped(code: string) {
  if (SCOPED_RE.test(code)) {
    return code
  }
  return code.replace(/(<style\b[^><]*)>/gi, '$1 scoped>')
}

interface UniCssScopedPluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export function uniCssScopedPlugin(
  options: UniCssScopedPluginOptions = {}
): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-css-scoped',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('App.vue')) {
        return code
      }
      if (!filter(id)) return null

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
    // 仅 h5
    handleHotUpdate(ctx) {
      if (!EXTNAME_VUE.includes(path.extname(ctx.file))) {
        return
      }
      if (ctx.file.endsWith('App.vue')) {
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
