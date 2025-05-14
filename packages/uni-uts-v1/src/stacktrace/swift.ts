import { originalPositionFor } from '../sourceMap'
import { generateCodeFrame, splitRE } from './utils'

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
      const message = codes[0]
      res.push('\u200Cerror: ' + message + '\u200C')
      res.push(...codes.slice(1))
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
  sourceRoot?: string
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
      `at ${originalPosition.source.split('?')[0]}:${originalPosition.line}:${
        originalPosition.column
      }`
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
