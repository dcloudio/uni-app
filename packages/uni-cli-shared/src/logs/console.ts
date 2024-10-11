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
  const re = /(console\.(log|info|debug|warn|error))\(([^)]+)\)/g
  const locate = getLocator(code)
  const s = new MagicString(code)
  let match: RegExpExecArray | null
  while ((match = re.exec(code))) {
    const [str, expr, type] = match
    if (method) {
      s.overwrite(
        match.index,
        match.index + expr.length + 1,
        method + `('${type}','at ${filename}:${locate(match.index).line + 1}',`
      )
    } else {
      // 如果没有指定method，则在console.log等方法最后增加at参数
      s.appendRight(
        match.index + str.length - 1,
        `, " at ${filename}:${locate(match.index).line + 1}"`
      )
    }
  }
  if (s.hasChanged()) {
    return {
      code: s.toString(),
      map: sourceMap ? s.generateMap({ hires: true }) : { mappings: '' },
    }
  }
  return { code, map: { mappings: '' } }
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
