import MagicString from 'magic-string'
import type { TransformResult } from 'vite'
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
      map: sourceMap ? s.generateMap({ hires: true }) : { mappings: '' },
    }
  }
  return { code, map: { mappings: '' } }
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

export function appendConsoleExpr(filename: string, code: string) {
  filename = normalizePath(filename)
  // 使用更复杂的正则来匹配可能包含换行、括号等的参数
  const re =
    /(console\.(log|info|debug|warn|error))\s*\(([\s\S]*?)(?=\)[;\n]|\)$)/g
  const locate = getLocator(code)
  const s = new MagicString(code)
  let match: RegExpExecArray | null

  while ((match = re.exec(code))) {
    const [full, _, type, args] = match
    const endPos = match.index + full.length + 1 // +1 to include the closing parenthesis
    s.overwrite(
      match.index,
      endPos,
      // 重要，需要用双引号，因为混编的kt，swift，java不能用单引号（char类型）
      `console.${type}(${args.trim()}, " at ${filename}:${
        locate(match.index).line + 1
      }")`
    )
  }

  if (s.hasChanged()) {
    return s.toString()
  }
  return code
}
