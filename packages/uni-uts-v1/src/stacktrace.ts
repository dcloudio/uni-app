import { originalPositionFor } from './sourceMap'
import { relative } from './utils'

const splitRE = /\r?\n/
const uniModulesSwiftUTSRe =
  /(.*)index.swift:([0-9]+):([0-9]+):\s+error:\s+(.*)/

interface ParseUTSPluginStacktraceOptions {
  stacktrace: string
  sourceRoot: string
  sourceMapFile: string
}

export async function parseUTSSwiftPluginStacktrace({
  stacktrace,
  sourceRoot,
  sourceMapFile,
}: ParseUTSPluginStacktraceOptions) {
  const res: string[] = []
  const lines = stacktrace.split(splitRE)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const codes = await parseUTSStacktraceLine(
      line,
      uniModulesSwiftUTSRe,
      sourceMapFile,
      sourceRoot
    )
    if (codes && codes.length) {
      res.push(...codes)
    } else {
      res.push(line)
    }
  }
  return res.join('\n')
}

async function parseUTSStacktraceLine(
  lineStr: string,
  re: RegExp,
  sourceMapFile: string,
  sourceRoot: string
) {
  const uniModulesMatches = lineStr.match(re)
  if (!uniModulesMatches) {
    return
  }
  const lines: string[] = []
  const [, , line, column, message] = uniModulesMatches
  const originalPosition = await originalPositionFor({
    sourceMapFile,
    line: parseInt(line),
    column: parseInt(column),
    withSourceContent: true,
  })

  if (originalPosition.source && originalPosition.sourceContent) {
    lines.push(`${message}`)
    lines.push(
      `at ${originalPosition.source}:${originalPosition.line}:${originalPosition.column}`
    )
    if (originalPosition.line !== null && originalPosition.column !== null) {
      lines.push(
        generateCodeFrame(originalPosition.sourceContent, {
          line: originalPosition.line,
          column: originalPosition.column,
        }).replace(/\t/g, ' ')
      )
    }
  } else {
    lines.push(lineStr)
  }
  return lines
}

const range: number = 2

function posToNumber(
  source: string,
  pos: number | { line: number; column: number }
): number {
  if (typeof pos === 'number') return pos
  const lines = source.split(splitRE)
  const { line, column } = pos
  let start = 0
  for (let i = 0; i < line - 1; i++) {
    start += lines[i].length + 1
  }
  return start + column
}

export function generateCodeFrame(
  source: string,
  start: number | { line: number; column: number } = 0,
  end?: number
): string {
  start = posToNumber(source, start)
  end = end || start
  const lines = source.split(splitRE)
  let count = 0
  const res: string[] = []
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue
        const line = j + 1
        res.push(
          `${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${
            lines[j]
          }`
        )
        const lineLength = lines[j].length
        if (j === i) {
          // push underline
          const pad = start - (count - lineLength) + 1
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          )
          res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length))
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1)
            res.push(`   |  ` + '^'.repeat(length))
          }
          count += lineLength + 1
        }
      }
      break
    }
  }
  return res.join('\n')
}

export function parseUTSSyntaxError(error: any, inputDir: string): string {
  let msg = String(error).replace(/\t/g, ' ')
  let res: RegExpExecArray | null = null
  const syntaxErrorRe = /(,-\[(.*):(\d+):(\d+)\])/g
  while ((res = syntaxErrorRe.exec(msg))) {
    const [row, filename, line, column] = res.slice(1)
    msg = msg.replace(
      row,
      `at ${relative(filename, inputDir)}:${parseInt(line) + 1}:${column}`
    )
  }
  return msg
}
