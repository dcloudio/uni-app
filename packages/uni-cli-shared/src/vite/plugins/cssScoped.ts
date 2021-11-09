import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'
import { parseVueRequest } from '../utils'
import { EXTNAME_VUE } from '../../constants'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { preHtml, preJs } from '../../preprocess'

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
        return
      }
      if (!filter(id)) return null

      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return
      }
      if (EXTNAME_VUE.includes(path.extname(filename))) {
        debugScoped(id)
        return {
          code: addScoped(code),
          map: null,
        }
      }
    },
    // 仅 h5
    handleHotUpdate(ctx) {
      if (!EXTNAME_VUE.includes(path.extname(ctx.file))) {
        return
      }
      const scoped = !ctx.file.endsWith('App.vue')
      debugScoped('hmr', ctx.file)
      const oldRead = ctx.read
      ctx.read = async () => {
        let code = await oldRead()
        // hotUpdate preprocess
        if (code.includes('#endif')) {
          code = preJs(preHtml(code))
        }
        if (scoped) {
          code = addScoped(code)
        }
        return code
      }
    },
  }
}
