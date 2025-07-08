import { isAbsolute, join } from 'path'
import { normalizePath } from '../shared'
import {
  originalPositionFor,
  resolveUTSPluginSourceMapFile,
} from '../sourceMap'
import {
  type CompileStacktraceOptions,
  type GenerateRuntimeCodeFrameOptions,
  generateCodeFrame,
  parseErrorWithRules,
  parseRelativeSourceFile,
  splitRE,
} from './utils'
import { existsSync, readFileSync } from 'fs-extra'
import {
  type GenerateAppHarmonyJavaScriptRuntimeCodeFrameOptions,
  parseUTSJavaScriptRuntimeStacktrace,
} from './js'
import { SPECIAL_CHARS } from '../utils'
export interface ParseUTSArkTSPluginStacktraceOptions
  extends CompileStacktraceOptions {
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
const NEW_ARKTS_COMPILE_ERROR_RE =
  /Error Message: (.*). At File:\s+(.*):(\d+):(\d+)/
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
  return parseUTSArkTSStacktrace('compile', stacktrace, options, (lineStr) => {
    let match = lineStr.match(NEW_ARKTS_COMPILE_ERROR_RE)
    if (match) {
      return {
        msg: match[1],
        etsFile: match[2],
        line: match[3],
        column: match[4],
      }
    }
    match = lineStr.match(ARKTS_COMPILE_ERROR_RE)
    if (match) {
      return {
        etsFile: match[1],
        line: match[2],
        column: match[3],
      }
    }
  })
}

async function parseUTSArkTSStacktrace(
  type: 'compile' | 'runtime',
  stacktrace: string,
  options: ParseUTSArkTSPluginStacktraceOptions,
  parse: ParseErrorLine
) {
  const lines = stacktrace.split(splitRE)
  const res: string[] = []
  const errorMessageLines: string[] = []
  let parsedError = false
  let colored = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    try {
      const codes = await parseUTSStacktraceLine(line, parse, options)
      if (codes && codes.length) {
        parsedError = true
        colored = codes[0].startsWith('\u200C')
        res.push(...codes)
        if (type === 'runtime') {
          if (errorMessageLines.length) {
            errorMessageLines[0] = 'error: ' + errorMessageLines[0]
          }
          break
        }
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
  let errorStr = res.join('\n')
  if (parsedError) {
    errorStr = parseErrorWithRules(errorStr, {
      language: 'arkts',
      platform: 'app-harmony',
    })
    return (
      (colored ? '' : SPECIAL_CHARS.ERROR_BLOCK) +
      errorStr +
      SPECIAL_CHARS.ERROR_BLOCK
    )
  }
  return errorStr
}

type ParseErrorLineResult = {
  msg?: string
  etsFile: string
  line: string
  column: string
}

type ParseErrorLine = (lineStr: string) => ParseErrorLineResult | undefined

async function parseUTSStacktraceLine(
  lineStr: string,
  parse: ParseErrorLine,
  options: ParseUTSArkTSPluginStacktraceOptions
) {
  const result = parse(lineStr)
  if (!result) {
    return
  }

  const { msg, etsFile, line, column } = result
  const lines: string[] = []
  if (msg) {
    lines.push(`\u200C${SPECIAL_CHARS.ERROR_BLOCK}error: ${msg}\u200C`)
  }
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
      `at ${parseRelativeSourceFile(
        originalPosition.source.split('?')[0],
        options.inputDir
      )}:${originalPosition.line}:${originalPosition.column}`
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
  return parseUTSArkTSStacktrace('runtime', stacktrace, options, (lineStr) => {
    const match = lineStr.match(ARKTS_RUNTIME_ERROR_RE)
    if (!match) {
      return
    }
    return {
      etsFile: match[1],
      line: match[2],
      column: match[3],
    }
  })
}
