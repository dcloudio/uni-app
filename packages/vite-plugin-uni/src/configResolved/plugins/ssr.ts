import path from 'path'
import debug from 'debug'
import crypto from 'crypto'
import { Plugin } from 'vite'

import { walk } from 'estree-walker'
import { CallExpression } from 'estree'
import { createFilter } from '@rollup/pluginutils'
import { MagicString } from '@vue/compiler-sfc'
import { UniPluginFilterOptions } from '.'
import {
  isIdentifier,
  isCallExpression,
  isMemberExpression,
  generateSSREntryServerCode,
} from '../../utils'

const debugSSR = debug('vite:uni:ssr')

const KEYED_FUNC_RE = /(ssrRef|shallowSsrRef)/

const ENTRY_SERVER_JS = 'entry-server.js'

export function uniSSRPlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  const entryServerJs = path.join(options.inputDir, ENTRY_SERVER_JS)
  const entryServerJsCode = generateSSREntryServerCode()
  return {
    name: 'vite:uni-ssr',
    resolveId(id) {
      if (id.endsWith(ENTRY_SERVER_JS)) {
        return entryServerJs
      }
    },
    load(id) {
      if (id.endsWith(ENTRY_SERVER_JS)) {
        return entryServerJsCode
      }
    },
    transform(code, id) {
      if (!filter(id)) return null
      if (!KEYED_FUNC_RE.test(code)) {
        return code
      }
      debugSSR('try', id)
      const ast = this.parse(code)
      const s = new MagicString(code)
      walk(ast, {
        enter(node) {
          if (!isCallExpression(node)) {
            return
          }
          const { callee, arguments: args } = node as CallExpression
          if (args.length !== 1) {
            return
          }
          const name = isIdentifier(callee)
            ? callee.name
            : isMemberExpression(callee) && isIdentifier(callee.property)
            ? callee.property.name
            : ''
          if (name !== 'ssrRef' && name !== 'shallowSsrRef') {
            return
          }
          const { end } = (node as unknown) as { end: number }
          const key = id + '-' + (node as any).end
          debugSSR(key, name)
          s.appendLeft(end - 1, ", '" + createKey(`${id}-${end}`) + "'")
        },
      })
      return {
        code: s.toString(),
        map: s.generateMap().toString(),
      }
    },
  }
}

function createKey(source: string) {
  const hash = crypto.createHash('md5')
  hash.update(source)
  return hash.digest('base64').toString()
}
