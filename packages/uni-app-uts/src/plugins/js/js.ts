import type { Plugin, ResolvedConfig } from 'vite'
import type { Node } from '@babel/types'
import { walk } from 'estree-walker'
import { parse } from '@babel/parser'

const UNI_EXT_API_RE = /\b(?:uni|uniCloud)\./

export function uniAppJsPlugin(resolvedConfig: ResolvedConfig): Plugin {
  return {
    name: 'uni:app-js',
    transform: {
      // 该插件只收集 uni/uniCloud API 调用，先过滤不含相关调用的 JS，避免无意义 AST 解析。
      filter: { id: /\.js(\?|$)/, code: UNI_EXT_API_RE },
      async handler(source, filename) {
        if (!filename.endsWith('.js')) {
          return
        }
        if (!UNI_EXT_API_RE.test(source)) {
          return
        }
        const parseResult = parse(source, {
          sourceType: 'module',
        })
        const program = parseResult.program
        const uniExtApis = new Set<string>()
        walk(program, {
          enter(node: Node) {
            if (
              node.type === 'CallExpression' &&
              node.callee.type === 'MemberExpression'
            ) {
              const callee = node.callee
              if (
                callee.object.type === 'Identifier' &&
                (callee.object.name === 'uni' ||
                  callee.object.name === 'uniCloud') &&
                callee.property.type === 'Identifier'
              ) {
                uniExtApis.add(callee.object.name + '.' + callee.property.name)
              }
            }
          },
        })
        // 强行解除uniCloud对uni-push的依赖关系
        if (filename.endsWith('uni-cloud-x.es.js')) {
          uniExtApis.delete('uni.getPushClientId')
          uniExtApis.delete('uni.onPushMessage')
          uniExtApis.delete('uni.offPushMessage')
        }
        return {
          code: source,
          map: { mappings: '' },
          meta: { uniExtApis: Array.from(uniExtApis) },
        }
      },
    },
  }
}
