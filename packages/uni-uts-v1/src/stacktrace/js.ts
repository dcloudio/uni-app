import { originalPositionForSync } from '../sourceMap'
import {
  COLORS,
  type GenerateRuntimeCodeFrameOptions,
  generateCodeFrame,
  lineColumnToStartEnd,
  parseRelativeSourceFile,
  resolveSourceMapDirByCacheDir,
  resolveSourceMapFileBySourceFile,
  splitRE,
} from './utils'

export interface GenerateJavaScriptRuntimeCodeFrameOptions
  extends GenerateRuntimeCodeFrameOptions {
  platform: 'app-ios' | 'app-harmony'
  language: 'javascript'
}

export interface GenerateAppIOSJavaScriptRuntimeCodeFrameOptions
  extends GenerateJavaScriptRuntimeCodeFrameOptions {
  platform: 'app-ios'
}

export interface GenerateAppHarmonyJavaScriptRuntimeCodeFrameOptions
  extends GenerateJavaScriptRuntimeCodeFrameOptions {
  platform: 'app-harmony'
}
// app-ios app-service.js(4:56) ReferenceError:Can't find variable: a @app-service.js:4:56
const APP_IOS_JS_ERROR_RE = /\(\d+:\d+\)\s(.*)\s@([^\s]+\.js)\:(\d+)\:(\d+)/
// onLoad@app-service.js:9:64
const APP_IOS_VUE_ERROR_RE = /@([^\s]+\.js)\:(\d+)\:(\d+)/

// app-harmony aaa\n    at testArr (entry/src/main/resources/resfile/uni-app-x/apps/HBuilder/www/app-service.js:530:15)
const APP_HARMONY_JS_ERROR_RE =
  /(.*?)\s*at\s+(?:.*?)\s+\(.*?\/www\/(.*?\.js):(\d+):(\d+)\)/

export function parseUTSJavaScriptRuntimeStacktrace(
  stacktrace: string,
  options: GenerateJavaScriptRuntimeCodeFrameOptions
) {
  // 兼容旧版本
  if (!options.platform) {
    options.platform = 'app-ios'
  }
  const res: string[] = []
  const lines = stacktrace.split(splitRE)
  const sourceMapDir = resolveSourceMapDirByCacheDir(options.cacheDir)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let codes = parseUTSJavaScriptRuntimeStacktraceJsErrorLine(
      options.platform === 'app-harmony'
        ? APP_HARMONY_JS_ERROR_RE
        : APP_IOS_JS_ERROR_RE,
      line,
      sourceMapDir
    )
    if (codes.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      const [errorCode, ...other] =
        options.platform === 'app-harmony' ? res.concat(codes) : codes
      const mark =
        options.platform === 'app-ios'
          ? errorCode.includes('[EXCEPTION] ')
            ? ''
            : '[EXCEPTION] '
          : ''
      let error = `error: ${mark}` + errorCode
      if (color) {
        error = color + error + color
      }
      return [error, ...other].join('\n')
    }
    if (options.platform === 'app-ios') {
      codes = parseUTSJavaScriptRuntimeStacktraceVueErrorLine(
        line,
        sourceMapDir
      )
    }
    if (codes.length && res.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      let error =
        `error: ${res[0].includes('[EXCEPTION] ') ? '' : '[EXCEPTION] '}` +
        res[0]
      if (color) {
        error = color + error + color
      }
      const [, ...other] = res
      const otherCodes = other.map((item) => {
        if (color) {
          return color + item + color
        }
        return item
      })
      return [error, ...otherCodes, ...codes].join('\n')
    }

    res.push(line)
  }
  return ''
}

// at <Index __pageId=1 __pagePath="pages/index/index" __pageQuery=  ... >
// Can't find variable: a
// onLoad@app-service.js:9:64
// callWithErrorHandling@uni-app-x-framework.js:2279:23
function parseUTSJavaScriptRuntimeStacktraceVueErrorLine(
  lineStr: string,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(APP_IOS_VUE_ERROR_RE)
  if (!matches) {
    return lines
  }
  const [, filename, line] = matches
  const sourceMapFile = resolveSourceMapFileBySourceFile(filename, sourceMapDir)
  if (!sourceMapFile) {
    return lines
  }

  const originalPosition = originalPositionForSync({
    sourceMapFile,
    line: parseInt(line),
    column: 0,
    withSourceContent: true,
  })
  if (originalPosition.source && originalPosition.sourceContent) {
    lines.push(
      `at ${parseRelativeSourceFile(
        originalPosition.source.split('?')[0],
        originalPosition.sourceRoot
      )}:${originalPosition.line}:${originalPosition.column}`
    )
    if (originalPosition.line !== null && originalPosition.column !== null) {
      const { start, end } = lineColumnToStartEnd(
        originalPosition.sourceContent,
        originalPosition.line,
        originalPosition.column
      )
      lines.push(
        generateCodeFrame(originalPosition.sourceContent, start, end).replace(
          /\t/g,
          ' '
        )
      )
    }
  }
  return lines
}

function parseUTSJavaScriptRuntimeStacktraceJsErrorLine(
  re: RegExp,
  lineStr: string,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(re)
  if (!matches) {
    return lines
  }
  const [, error, filename, line] = matches
  const sourceMapFile = resolveSourceMapFileBySourceFile(filename, sourceMapDir)
  if (!sourceMapFile) {
    return lines
  }

  processErrorLines(error, sourceMapFile, parseInt(line), lines)

  return lines
}

export function processErrorLines(
  error: string,
  sourceMapFile: string,
  line: number,
  lines: string[],
  withSourceContent = true
) {
  const originalPosition = originalPositionForSync({
    sourceMapFile,
    line,
    column: 0,
    withSourceContent,
  })
  if (originalPosition.source) {
    if (error) {
      lines.push(error)
    }
    lines.push(
      `at ${parseRelativeSourceFile(
        originalPosition.source.split('?')[0],
        originalPosition.sourceRoot
      )}:${originalPosition.line}:${originalPosition.column}`
    )
    if (
      originalPosition.sourceContent &&
      originalPosition.line !== null &&
      originalPosition.column !== null
    ) {
      const { start, end } = lineColumnToStartEnd(
        originalPosition.sourceContent,
        originalPosition.line,
        originalPosition.column
      )
      lines.push(
        generateCodeFrame(originalPosition.sourceContent, start, end).replace(
          /\t/g,
          ' '
        )
      )
    }
  }
}
