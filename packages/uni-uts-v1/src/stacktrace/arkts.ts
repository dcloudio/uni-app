import { join } from 'path'
import { normalizePath } from '../shared'
import {
  originalPositionFor,
  resolveUTSPluginSourceMapFile,
} from '../sourceMap'
import { generateCodeFrame, splitRE } from './utils'
import { existsSync, readFileSync } from 'fs-extra'

interface ParseUTSArkTSPluginStacktraceOptions {
  /**
   * 项目输入目录 = process.env.UNI_INPUT_DIR
   */
  inputDir: string
  /**
   * 项目输出目录 = process.env.UNI_OUTPUT_DIR
   */
  outputDir: string
}

const uniModulesArkTSUTSRe = /File:\s+([^:]+):(\d+):(\d+)/

/**
 * 解析uts插件ArkTS的堆栈信息
 */
export async function parseUTSArkTSPluginStacktrace(
  stacktrace: string,
  options: ParseUTSArkTSPluginStacktraceOptions
) {
  const lines = stacktrace.split(splitRE)
  const res: string[] = []
  const errorMessageLines: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const codes = await parseUTSStacktraceLine(
      line,
      uniModulesArkTSUTSRe,
      options
    )
    if (codes && codes.length) {
      res.push(...codes)
    } else {
      errorMessageLines.push(line)
    }
  }
  if (res.length) {
    res.unshift(...errorMessageLines)
  } else {
    res.push(...errorMessageLines)
  }
  return res.join('\n')
}

async function parseUTSStacktraceLine(
  lineStr: string,
  re: RegExp,
  options: ParseUTSArkTSPluginStacktraceOptions
) {
  const uniModulesMatches = lineStr.match(re)
  if (!uniModulesMatches) {
    return
  }
  const lines: string[] = []
  const [, filename, line, column] = uniModulesMatches

  const parts = normalizePath(filename).split('/uni_modules/')
  if (parts.length > 1) {
    const relativePath = 'uni_modules/' + parts[parts.length - 1]
    const srcFileName = join(options.inputDir, relativePath)
    if (existsSync(srcFileName)) {
      lines.push(`at ${relativePath}:${line}:${column}`)
      lines.push(
        generateCodeFrame(readFileSync(srcFileName, 'utf-8'), {
          line: parseInt(line),
          column: parseInt(column),
        }).replace(/\t/g, ' ')
      )
      return lines
    }
  }

  const sourceMapFile = resolveUTSPluginSourceMapFile(
    'arkts',
    filename,
    options.inputDir,
    options.outputDir
  )
  const originalPosition = await originalPositionFor({
    sourceMapFile,
    line: parseInt(line),
    column: parseInt(column),
    withSourceContent: true,
  })

  if (originalPosition.source && originalPosition.sourceContent) {
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
