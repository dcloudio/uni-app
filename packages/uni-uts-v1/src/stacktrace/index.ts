import type { RollupError } from 'rollup'
import path from 'path'
import fs from 'fs-extra'
import {
  type GenerateAppHarmonyCodeFrameOptions,
  type ParseUTSArkTSPluginStacktraceOptions,
  parseUTSArkTSPluginStacktrace,
  parseUTSHarmonyRuntimeStacktrace,
} from './arkts'
import {
  type GenerateAppAndroidJavaScriptRuntimeCodeFrameOptions,
  type GenerateAppIOSJavaScriptRuntimeCodeFrameOptions,
  type GenerateJavaScriptRuntimeCodeFrameOptions,
  isAppAndroidJavaScriptRuntimeStacktrace,
  parseUTSJavaScriptRuntimeStacktrace,
} from './js'
import {
  type GenerateAppAndroidKotlinRuntimeCodeFrameOptions,
  parseUTSKotlinRuntimeStacktrace,
} from './kotlin'
import {
  type GenerateMiniProgramRuntimeCodeFrameOptions,
  MP_PLATFORMS,
  parseMiniProgramRuntimeStacktrace,
} from './mp'
import { originalPositionForSync } from '../sourceMap'
import {
  type CompileStacktraceOptions,
  type GenerateRuntimeCodeFrameOptions,
  generateCodeFrame,
} from './utils'
import {
  type ParseUTSPluginStacktraceOptions,
  parseUTSSwiftPluginStacktrace,
} from './swift'
import { type ParseCppStacktraceOptions, parseCppStacktrace } from './cpp'

export { parseUTSSwiftPluginStacktrace } from './swift'
export { parseUTSArkTSPluginStacktrace } from './arkts'
export {
  parseUTSKotlinStacktrace,
  parseUTSKotlinRuntimeStacktrace,
  resolveUTSKotlinFilenameByClassName,
} from './kotlin'

export { parseUTSJavaScriptRuntimeStacktrace } from './js'
export { parseCppStacktrace } from './cpp'

function initEnv(
  options: CompileStacktraceOptions | GenerateRuntimeCodeFrameOptions
) {
  if (options.env) {
    if (options.env.UNI_COMPILER_VALIDATION_RULES_PATH) {
      process.env.UNI_COMPILER_VALIDATION_RULES_PATH =
        options.env.UNI_COMPILER_VALIDATION_RULES_PATH
    }
  }
}

export async function parseCompileStacktrace(
  stacktrace: string,
  options:
    | (ParseUTSArkTSPluginStacktraceOptions & {
        platform: 'app-harmony'
        language: 'arkts'
      })
    | (Omit<ParseUTSPluginStacktraceOptions, 'stacktrace'> & {
        platform: 'app-ios'
        language: 'swift'
      })
    | ParseCppStacktraceOptions
) {
  initEnv(options)
  if (options.language === 'cpp') {
    return parseCppStacktrace(stacktrace, options)
  }
  if (options.platform === 'app-harmony' && options.language === 'arkts') {
    return parseUTSArkTSPluginStacktrace(stacktrace, options)
  }
  if (options.platform === 'app-ios' && options.language === 'swift') {
    return parseUTSSwiftPluginStacktrace({
      ...options,
      stacktrace,
    })
  }
  return stacktrace
}

export async function parseRuntimeStacktrace(
  stacktrace: string,
  options:
    | GenerateAppAndroidKotlinRuntimeCodeFrameOptions
    | GenerateAppAndroidJavaScriptRuntimeCodeFrameOptions
    | GenerateAppIOSJavaScriptRuntimeCodeFrameOptions
    | GenerateAppHarmonyCodeFrameOptions
    | GenerateMiniProgramRuntimeCodeFrameOptions
) {
  initEnv(options)
  if (
    options.platform === 'app-android' ||
    (options.platform === 'app-ios' && options.language === 'javascript') ||
    options.platform === 'app-harmony'
  ) {
    return parseUTSRuntimeStacktrace(stacktrace, options)
  }
  // mp-weixin:   sourceMap可以合并映射（所以开发工具可以显示源码） 可以读取到sourceMap（下载js文件，解析里边的base64格式sourceMap）
  // mp-baidu:    sourceMap无法合并映射（所以开发工具无法显示源码） 可以读取到sourceMap 二次解析映射（也可以合并sourceMap吧）
  // mp-toutiao:  sourceMap可以合并映射（所以开发工具可以显示源码） 可以读取到sourceMap（下载js文件，解析里边的base64格式sourceMap）
  // mp-alipay:   sourceMap可以合并映射（所以开发工具可以显示源码） 可以读取到sourceMap（下载js文件，解析url格式的sourceMap，再根据url下载sourceMap）
  if (MP_PLATFORMS[options.platform]) {
    return parseMiniProgramRuntimeStacktrace(stacktrace, options)
  }
  // 其他小程序平台暂不处理，因为没法拿到小程序的sourceMap做合并映射
  return stacktrace
}

export function parseUTSRuntimeStacktrace(
  stacktrace: string,
  options:
    | GenerateAppAndroidKotlinRuntimeCodeFrameOptions
    | GenerateAppHarmonyCodeFrameOptions
    | GenerateJavaScriptRuntimeCodeFrameOptions
) {
  if (options.platform === 'app-harmony') {
    return parseUTSHarmonyRuntimeStacktrace(
      stacktrace,
      options as GenerateAppHarmonyCodeFrameOptions
    )
  } else if (options.platform === 'app-android') {
    if (isAndroidJavaScriptRuntimeStacktrace(stacktrace)) {
      return parseUTSJavaScriptRuntimeStacktrace(stacktrace, {
        ...options,
        language: 'javascript',
      })
    }
    return parseUTSKotlinRuntimeStacktrace(stacktrace, {
      ...(options as GenerateAppAndroidKotlinRuntimeCodeFrameOptions),
      language: 'kotlin',
    })
  } else if (options.language === 'javascript') {
    return parseUTSJavaScriptRuntimeStacktrace(stacktrace, options)
  }
  return stacktrace
}

function isAndroidJavaScriptRuntimeStacktrace(stacktrace: string) {
  return isAppAndroidJavaScriptRuntimeStacktrace(stacktrace)
}

export function parseUTSSyntaxError(
  error: any,
  inputDir: string
): string | RollupError {
  let errorMsg = error instanceof Error ? error.message : error
  if (typeof errorMsg === 'string') {
    const jsonSyntaxError = tryParseUTSSyntaxJsonError(errorMsg)
    if (jsonSyntaxError) {
      return parseUTSSyntaxJsonError(jsonSyntaxError, inputDir)
    }
    const textSyntaxError = parseUTSSyntaxTextError(errorMsg)
    if (textSyntaxError) {
      return formatUTSSyntaxTextError(textSyntaxError, inputDir)
    }
  }
  return String(errorMsg).replace(/\t/g, ' ')
}

interface UTSSyntaxJsonError {
  message: string
  code: string | null
  frame: string | null
  level: string
  filename: string
  line: number
  column: number
}

function tryParseUTSSyntaxJsonError(
  errorMsg: string
): UTSSyntaxJsonError | null {
  const normalizedErrorMsg = errorMsg.trim()
  if (!normalizedErrorMsg || !normalizedErrorMsg.startsWith('{')) {
    return null
  }
  try {
    const parsedError = JSON.parse(normalizedErrorMsg)
    if (isUTSSyntaxJsonError(parsedError)) {
      return parsedError
    }
  } catch (e) {
    // JSON 解析失败时，继续按文本错误兜底解析
  }
  return null
}

function isUTSSyntaxJsonError(error: any): error is UTSSyntaxJsonError {
  return !!(
    error &&
    typeof error.message === 'string' &&
    typeof error.filename === 'string' &&
    typeof error.line === 'number' &&
    typeof error.column === 'number'
  )
}

function parseUTSSyntaxTextError(errorMsg: string): UTSSyntaxJsonError | null {
  const messages: string[] = []
  const lines = errorMsg.replace(/\r\n?/g, '\n').split('\n')
  let filename = ''
  let fallbackLine = 0
  let fallbackColumn = 0
  let line = 0
  let column = 0
  let frame: string | null = null
  let collectingFrame = false
  let currentFrameLines: string[] = []
  let currentFrameLine = 0

  for (const currentLine of lines) {
    const messageMatch = currentLine.match(/^\s*x\s+(.+)$/)
    if (messageMatch) {
      messages.push(messageMatch[1].trim())
      continue
    }

    const frameHeaderMatch = currentLine.match(/^\s*,-\[(.+):(\d+):(\d+)\]\s*$/)
    if (frameHeaderMatch) {
      collectingFrame = true
      currentFrameLines = []
      currentFrameLine = 0
      if (!filename) {
        filename = frameHeaderMatch[1]
        fallbackLine = Number(frameHeaderMatch[2])
        fallbackColumn = Number(frameHeaderMatch[3])
      }
      continue
    }

    if (!collectingFrame) {
      continue
    }

    if (/^\s*`----\s*$/.test(currentLine)) {
      collectingFrame = false
      // 同一个错误文本里可能带多个重复代码帧，这里只保留首个代码帧即可。
      if (!frame && currentFrameLines.length) {
        frame = currentFrameLines.join('\n').replace(/\t/g, ' ')
      }
      continue
    }

    currentFrameLines.push(currentLine)

    const codeLineMatch = currentLine.match(/^\s*(\d+)\s+\|/)
    if (codeLineMatch) {
      currentFrameLine = Number(codeLineMatch[1])
      continue
    }

    const indicatorIndex = currentLine.indexOf('^')
    const separatorIndex = currentLine.indexOf(':')
    if (indicatorIndex > -1 && separatorIndex > -1 && currentFrameLine > 0) {
      // 文本错误里真正的定位点由 ^ 标记，上一行的代码行号就是实际报错行。
      line = currentFrameLine
      column = indicatorIndex - separatorIndex - 1
      if (column <= 0) {
        column = fallbackColumn
      }
    }
  }

  if (!messages.length || !filename) {
    return null
  }

  return {
    message: messages.join('\n'),
    code: null,
    frame,
    level: 'error',
    filename,
    line: line || fallbackLine,
    column: column || fallbackColumn,
  }
}

function formatUTSSyntaxTextError(
  error: UTSSyntaxJsonError,
  inputDir: string
): string {
  const lines = [error.message]
  const sourceMapFilename = error.filename + '.map'
  if (fs.existsSync(sourceMapFilename)) {
    const result = originalPositionForSync({
      sourceMapFile: sourceMapFilename,
      line: error.line,
      column: error.column,
      withSourceContent: true,
    })
    if (result && result.source) {
      lines.push(`at ${result.source}:${result.line}:${result.column}`)
      if (result.sourceContent) {
        lines.push(
          generateCodeFrame(result.sourceContent, {
            line: result.line,
            column: result.column,
          }).replace(/\t/g, ' ')
        )
      }
      return lines.join('\n')
    }
  }
  const filename = path.isAbsolute(error.filename)
    ? path.relative(inputDir, error.filename)
    : error.filename
  lines.push(`at ${filename}:${error.line}:${error.column}`)
  if (error.frame) {
    lines.push(error.frame)
  }
  return lines.join('\n')
}
// {"message":"Expression expected","code":null,"level":"error","filename":"/Users/xxx/Documents/HBuilderProjects/test-vue3/unpackage/dist/dev/.uvue/app-android/uni_modules/test-uts/utssdk/index.uts","line":3,"column":4}
function parseUTSSyntaxJsonError(error: UTSSyntaxJsonError, inputDir: string) {
  const normalizedError: RollupError = new Error(error.message)

  const sourceMapFilename = error.filename + '.map'
  if (fs.existsSync(sourceMapFilename)) {
    const result = originalPositionForSync({
      sourceMapFile: sourceMapFilename,
      line: error.line,
      column: error.column,
      withSourceContent: true,
    })
    if (result && result.source) {
      Object.defineProperty(normalizedError, 'id', {
        get() {
          return path.resolve(inputDir, result.source)
        },
        set(_v) {},
      })
      normalizedError.loc = {
        file: result.source,
        line: result.line,
        column: result.column,
      }
      if (result.sourceContent) {
        normalizedError.frame = generateCodeFrame(result.sourceContent, {
          line: result.line,
          column: result.column,
        }).replace(/\t/g, ' ')
      }
      return normalizedError
    }
  }
  // 锁定id，防止rollup修改id
  Object.defineProperty(normalizedError, 'id', {
    get() {
      return error.filename
    },
    set(_v) {},
  })
  // 解析 sourcemap
  normalizedError.loc = {
    file: error.filename,
    line: error.line,
    column: error.column,
  }
  normalizedError.frame = error.frame || ''
  return normalizedError
}
