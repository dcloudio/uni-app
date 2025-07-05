import path from 'path'
import fs from 'fs-extra'
import { originalPositionFor } from '../sourceMap'
import { generateCodeFrame, parseErrorWithRules, splitRE } from './utils'
import { SPECIAL_CHARS } from '../utils'

const uniModulesSwiftUTSRe = /(.*).swift:([0-9]+):([0-9]+):\s+error:\s+(.*)/

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
  let colored = false
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
      colored = true
      res.push(
        '\u200C' + SPECIAL_CHARS.ERROR_BLOCK + 'error: ' + message + '\u200C'
      )
      res.push(...codes.slice(1))
    } else {
      res.push(line)
    }
  }
  return (
    (colored ? '' : SPECIAL_CHARS.ERROR_BLOCK) +
    parseErrorWithRules(res.join('\n'), {
      language: 'swift',
      platform: 'app-ios',
    }) +
    SPECIAL_CHARS.ERROR_BLOCK
  )
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
  const [, filename, line, column, message] = uniModulesMatches
  // uts编译出来的入口index.swift
  if (
    filename.includes('/app-ios/src/') &&
    !filename.endsWith('/app-ios/src/index')
  ) {
    // 移除 src 目录，混编的假sourcemap，需要读取源码
    sourceMapFile =
      filename.replace('/app-ios/src/', '/app-ios/') + '.swift.fake.map'
  }
  const originalPosition = await originalPositionFor({
    sourceMapFile,
    line: parseInt(line),
    column: parseInt(column),
    withSourceContent: true,
  })

  if (originalPosition.source) {
    lines.push(`${message}`)
    lines.push(
      `at ${originalPosition.source.split('?')[0]}:${originalPosition.line}:${
        originalPosition.column
      }`
    )
    // 混编的假sourcemap，需要读取源码
    if (sourceMapFile.endsWith('.fake.map') && process.env.UNI_INPUT_DIR) {
      const file = path.join(
        process.env.UNI_INPUT_DIR,
        sourceMapFile.replace('.fake.map', '')
      )
      if (fs.existsSync(file)) {
        originalPosition.sourceContent = fs.readFileSync(file, 'utf-8')
      }
    }
    if (
      originalPosition.line !== null &&
      originalPosition.column !== null &&
      originalPosition.sourceContent
    ) {
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
