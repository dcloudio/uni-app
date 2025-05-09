import type { Plugin, ResolvedConfig } from 'vite'
import type { Node } from '@babel/types'
import { walk } from 'estree-walker'
import { parse } from '@babel/parser'

export function uniAppJsPlugin(resolvedConfig: ResolvedConfig): Plugin {
  return {
    name: 'uni:app-js',
    async transform(source, filename) {
      if (!filename.endsWith('.js')) {
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
  }
}
