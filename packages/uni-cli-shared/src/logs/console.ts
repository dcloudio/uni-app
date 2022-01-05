import MagicString from 'magic-string'
import { normalizePath } from '../utils'

const F = '__f__'
export function rewriteConsoleExpr(
  id: string,
  filename: string,
  code: string,
  sourceMap: boolean = false
) {
  filename = normalizePath(filename)
  const re = /(console\.(log|info|debug|warn|error))\(([^)]+)\)/g
  const locate = getLocator(code)
  const s = new MagicString(code)
  let match: RegExpExecArray | null
  while ((match = re.exec(code))) {
    const [, expr, type] = match
    s.overwrite(
      match.index,
      match.index + expr.length + 1,
      F + `('${type}','at ${filename}:${locate(match.index).line + 1}',`
    )
  }
  return {
    code: s.toString(),
    map: sourceMap ? s.generateMap({ source: id, hires: true }) : null,
  }
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
