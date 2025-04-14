import MagicString from 'magic-string'
import type { TransformResult } from 'vite'
import type * as tsTypes from 'typescript'
import { normalizePath } from '../utils'

export function rewriteConsoleExpr(
  method: string,
  id: string,
  filename: string,
  code: string,
  sourceMap: boolean = false
): TransformResult {
  filename = normalizePath(filename)
  const re = /(console\.(log|info|debug|warn|error))\s*\(([^)]+)\)/g
  const locate = getLocator(code)
  const s = new MagicString(code)
  let match: RegExpExecArray | null
  while ((match = re.exec(code))) {
    const [, expr, type] = match
    s.overwrite(
      match.index,
      match.index + expr.length + 1,
      method + `('${type}','at ${filename}:${locate(match.index).line + 1}',`
    )
  }
  if (s.hasChanged()) {
    return {
      code: s.toString(),
      map: sourceMap ? s.generateMap({ hires: true }) : null,
    }
  }
  return { code, map: null }
}

export function restoreConsoleExpr(code: string): string {
  return code.replace(
    /(?:uni\.)?__f__\('([^']+)','at ([^:]+):(\d+)',/g,
    'console.$1('
  )
}

function getLocator(source: string) {
  const originalLines = source.split('\n')
  const lineOffsets: number[] = []

  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos)
    pos += originalLines[i].length + 1
  }

  return function locate(index: number) {
    let i = 0
    let j = lineOffsets.length
    while (i < j) {
      const m = (i + j) >> 1
      if (index < lineOffsets[m]) {
        j = m
      } else {
        i = m + 1
      }
    }
    const line = i - 1
    const column = index - lineOffsets[line]
    return { line, column }
  }
}

const methods = ['log', 'info', 'debug', 'warn', 'error']
export function appendConsoleExpr(
  filename: string,
  code: string,
  ts: typeof tsTypes
) {
  if (!ts) {
    return code
  }
  const s = new MagicString(code)
  const sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest)
  // 遍历sourceFile，查找console的方法调用
  const traverse = (node: tsTypes.Node) => {
    ts.forEachChild(node, (node) => traverse(node))
    if (
      ts.isCallExpression(node) &&
      node.arguments.length > 0 &&
      ts.isPropertyAccessExpression(node.expression)
    ) {
      const propertyAccess = node.expression
      if (
        ts.isIdentifier(propertyAccess.expression) &&
        propertyAccess.expression.text === 'console' &&
        ts.isIdentifier(propertyAccess.name) &&
        methods.includes(propertyAccess.name.text)
      ) {
        const lastArg = node.arguments[node.arguments.length - 1]
        if (lastArg) {
          const { line } = sourceFile.getLineAndCharacterOfPosition(
            propertyAccess.name.end
          )
          // 重要，需要用双引号，因为混编的kt，swift，java不能用单引号（char类型）
          s.prependRight(lastArg.getEnd(), `, " at ${filename}:${line + 1}"`)
        }
      }
    }
  }
  traverse(sourceFile)
  if (s.hasChanged()) {
    return s.toString()
  }
  return code
}
