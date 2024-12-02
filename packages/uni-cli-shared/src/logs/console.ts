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
