import path from 'path'
import fs from 'fs-extra'
import { originalPositionFor } from '../sourceMap'
import { generateCodeFrame, splitRE } from './utils'
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
  return SPECIAL_CHARS.ERROR_BLOCK + res.join('\n') + SPECIAL_CHARS.ERROR_BLOCK
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
  if (!filename.endsWith('/app-ios/src/index')) {
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
