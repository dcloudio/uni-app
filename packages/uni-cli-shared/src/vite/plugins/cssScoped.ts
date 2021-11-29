import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'
import { EXTNAME_VUE } from '../../constants'
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
  filter: (id: string) => boolean
}

export function uniCssScopedPlugin(
  { filter }: UniCssScopedPluginOptions = { filter: () => false }
): Plugin {
  return {
    name: 'vite:uni-css-scoped',
    enforce: 'pre',
    transform(code, id) {
      if (!filter(id)) return null
      debugScoped(id)
      return {
        code: addScoped(code),
        map: null,
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
