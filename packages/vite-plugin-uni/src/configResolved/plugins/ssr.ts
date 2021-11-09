import debug from 'debug'
import crypto from 'crypto'
import { Plugin, ResolvedConfig } from 'vite'

import { walk } from 'estree-walker'
import { CallExpression } from 'estree'

import { createFilter } from '@rollup/pluginutils'
import { MagicString } from '@vue/compiler-sfc'
import {
  isIdentifier,
  isCallExpression,
  isMemberExpression,
} from '@dcloudio/uni-cli-shared'
import { UniPluginFilterOptions } from '.'

const debugSSR = debug('vite:uni:ssr')

const KEYED_FUNC_RE = /(ssrRef|shallowSsrRef)/

export function uniSSRPlugin(
  _config: ResolvedConfig,
  options: UniPluginFilterOptions
): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-ssr',
    transform(code, id) {
      if (!filter(id)) return null
      if (!KEYED_FUNC_RE.test(code)) {
        return
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
          const { end } = node as unknown as { end: number }
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
