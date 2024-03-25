import type { Node, Program } from '@babel/types'
import MagicString from 'magic-string'
import { walk } from 'estree-walker'

const DEBUG_ERROR_RE = /(JSON\.parse)|(codeURI)/
export function hasDebugError(content: string) {
  return DEBUG_ERROR_RE.test(content)
}

interface RewriteDebugErrorOptions {
  fileName: string
  startLine: number
  startOffset: number
}

export function rewriteDebugError(
  ast: Program,
  s: MagicString,
  options: RewriteDebugErrorOptions
) {
  walk(ast, {
    enter(node: Node, _parent?: Node) {
      if (node.type === 'CallExpression' && node.loc) {
        const callee = node.callee
        if (callee.type === 'MemberExpression') {
          // JSON.parse || JSON.parseObject || JSON.parseArray
          //
          if (
            callee.object.type === 'Identifier' &&
            callee.property.type === 'Identifier' &&
            callee.object.name === 'JSON'
          ) {
            const name = callee.property.name
            if (
              name === 'parse' ||
              name === 'parseObject' ||
              name === 'parseArray'
            ) {
              wrapConsoleDebugError(s, node, options)
            }
          }
        } else if (
          callee.type === 'Identifier' &&
          METHODS.includes(callee.name)
        ) {
          wrapConsoleDebugError(s, node, options)
        }
      }
    },
  })
}

function wrapConsoleDebugError(
  s: MagicString,
  node: Node,
  { fileName, startLine, startOffset }: RewriteDebugErrorOptions
) {
  s.appendLeft(startOffset + node.start!, `UTSAndroid.consoleDebugError(`)
  s.appendRight(startOffset + node.end!, `)`)
  const at = `, " at ${fileName}:${node.loc!.start.line + startLine}"`
  s.appendLeft(startOffset + node.end!, at)
}

const METHODS = [
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
]
