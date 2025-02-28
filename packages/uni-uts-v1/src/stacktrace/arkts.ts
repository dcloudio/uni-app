import { isAbsolute, join } from 'path'
import { normalizePath } from '../shared'
import {
  originalPositionFor,
  resolveUTSPluginSourceMapFile,
} from '../sourceMap'
import {
  type GenerateRuntimeCodeFrameOptions,
  generateCodeFrame,
  splitRE,
} from './utils'
import { existsSync, readFileSync } from 'fs-extra'
import {
  type GenerateAppHarmonyJavaScriptRuntimeCodeFrameOptions,
  parseUTSJavaScriptRuntimeStacktrace,
} from './js'
export interface ParseUTSArkTSPluginStacktraceOptions {
  /**
   * 项目输入目录 = process.env.UNI_INPUT_DIR
   */
  inputDir: string
  /**
   * 项目输出目录 = process.env.UNI_OUTPUT_DIR
   */
  outputDir: string
}

const ARKTS_COMPILE_ERROR_RE = /File:\s+(.*):(\d+):(\d+)/
// at test (uni_modules/test-error/utssdk/app-harmony/index.ets:2:11)
const ARKTS_RUNTIME_ERROR_RE =
  /at\s+(?:.*)\s+\((uni_modules\/.*?\.ets):(\d+):(\d+)\)/

/**
 * 解析uts插件编译时的ArkTS的堆栈信息
 */
export async function parseUTSArkTSPluginStacktrace(
  stacktrace: string,
  options: ParseUTSArkTSPluginStacktraceOptions
) {
  return parseUTSArkTSStacktrace(stacktrace, options, ARKTS_COMPILE_ERROR_RE)
}

async function parseUTSArkTSStacktrace(
  stacktrace: string,
  options: ParseUTSArkTSPluginStacktraceOptions,
  re: RegExp
) {
  const lines = stacktrace.split(splitRE)
  const res: string[] = []
  const errorMessageLines: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    try {
      const codes = await parseUTSStacktraceLine(line, re, options)
      if (codes && codes.length) {
        res.push(...codes)
      } else {
        errorMessageLines.push(line)
      }
    } catch (e) {
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
  const [, etsFile, line, column] = uniModulesMatches

  // 编译时获取到的是绝对路径
  const filename = isAbsolute(etsFile)
    ? etsFile
    : // 运行时获取到的是相对路径
      join(options.inputDir, etsFile)

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

export type GenerateAppHarmonyCodeFrameOptions =
  | GenerateAppHarmonyArkTSRuntimeCodeFrameOptions
  | GenerateAppHarmonyJavaScriptRuntimeCodeFrameOptions
  | GenerateAppHarmonyAutoCodeFrameOptions

export interface GenerateAppHarmonyAutoCodeFrameOptions
  extends GenerateRuntimeCodeFrameOptions,
    ParseUTSArkTSPluginStacktraceOptions {
  platform: 'app-harmony'
}

export interface GenerateAppHarmonyArkTSRuntimeCodeFrameOptions
  extends GenerateAppHarmonyAutoCodeFrameOptions,
    ParseUTSArkTSPluginStacktraceOptions {
  platform: 'app-harmony'
  language: 'arkts'
}

export function parseUTSHarmonyRuntimeStacktrace(
  stacktrace: string,
  options: GenerateAppHarmonyCodeFrameOptions
) {
  if (ARKTS_RUNTIME_ERROR_RE.test(stacktrace)) {
    return parseUTSArkTSRuntimeStacktrace(
      stacktrace,
      options as GenerateAppHarmonyArkTSRuntimeCodeFrameOptions
    )
  }
  return parseUTSJavaScriptRuntimeStacktrace(
    stacktrace,
    options as GenerateAppHarmonyJavaScriptRuntimeCodeFrameOptions
  )
}

export function parseUTSArkTSRuntimeStacktrace(
  stacktrace: string,
  options: GenerateAppHarmonyArkTSRuntimeCodeFrameOptions
) {
  return parseUTSArkTSStacktrace(stacktrace, options, ARKTS_RUNTIME_ERROR_RE)
}
