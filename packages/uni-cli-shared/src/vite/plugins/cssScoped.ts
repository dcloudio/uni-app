import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'
import { EXTNAME_VUE } from '../../constants'
import { preHtml, preJs } from '../../preprocess'
import { parseVueCode } from '../../vue/parse'
import { isAppVue } from '../../utils'
import { isVueSfcFile } from '../../vue/utils'

const debugScoped = debug('uni:scoped')

const SCOPED_RE = /<style\s[^>]*scoped[^>]*>/i

export function addScoped(code: string) {
  return code.replace(/(<style\b[^><]*)>/gi, (str, $1) => {
    if ($1.includes('scoped')) {
      return str
    }
    return `${$1} scoped>`
  })
}

function removeScoped(code: string) {
  if (!SCOPED_RE.test(code)) {
    return code
  }
  return code.replace(/(<style.*)scoped(.*>)/gi, '$1$2')
}

interface UniCssScopedPluginOptions {
  filter: (id: string) => boolean
}

export function uniRemoveCssScopedPlugin(
  _: UniCssScopedPluginOptions = { filter: () => false }
): Plugin {
  return {
    name: 'uni:css-remove-scoped',
    enforce: 'pre',
    transform(code, id) {
      if (!isVueSfcFile(id)) return null
      debugScoped(id)
      return {
        code: removeScoped(code),
        map: null,
      }
    },
  }
}

export function uniCssScopedPlugin(
  { filter }: UniCssScopedPluginOptions = { filter: () => false }
): Plugin {
  return {
    name: 'uni:css-scoped',
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
      const scoped = !isAppVue(ctx.file)
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
        // 处理 block, wxs 等
        return parseVueCode(code).code
      }
    },
  }
}
