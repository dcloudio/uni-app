import type { Node, Program } from '@babel/types'
import type MagicString from 'magic-string'
import { walk } from 'estree-walker'

export function hasConsole(content: string) {
  return content.includes('console.')
}

export function rewriteConsole(
  ast: Program,
  s: MagicString,
  {
    fileName,
    startLine,
    startOffset,
  }: {
    fileName: string
    startLine: number
    startOffset: number
  }
) {
  walk(ast, {
    enter(node: Node, _parent?: Node) {
      if (node.type === 'CallExpression' && node.loc) {
        const callee = node.callee
        if (callee.type === 'MemberExpression') {
          // console.log()
          // UTSAndroid.consoleDebugError()
          if (
            callee.object.type === 'Identifier' &&
            callee.property.type === 'Identifier' &&
            (callee.object.name === 'console' ||
              callee.property.name === 'consoleDebugError')
          ) {
            const at = `${node.arguments.length ? ', " ' : '"'}at ${fileName}:${
              node.loc.start.line + startLine
            }"`
            s.appendRight(startOffset + node.end! - 1, at)
          }
        }
      }
    },
  })
}
