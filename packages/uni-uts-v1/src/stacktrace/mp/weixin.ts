import {
  type GenerateJavaScriptRuntimeCodeFrameOptions,
  processErrorLines,
} from '../js'
import { COLORS, resolveSourceMapFileBySourceFile, splitRE } from '../utils'

export interface GenerateWeixinRuntimeCodeFrameOptions
  extends GenerateJavaScriptRuntimeCodeFrameOptions {
  outputDir: string
  platform: 'mp-weixin' | 'mp-baidu'
}

const JS_ERROR_RE = /\/(appservice|output)\/(.+?):(\d+):(\d+)/
// at http://127.0.0.1:37922/appservice/pages/index/index.js:5:7
export function parseWeixinRuntimeStacktrace(
  stacktrace: string,
  options: GenerateWeixinRuntimeCodeFrameOptions
) {
  const sourceMapDir = options.outputDir
  const res: string[] = []
  const lines = stacktrace.split(splitRE)
  const errMsgs: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isStackTraceLine = line.includes('at ') && line.includes('http://')
    if (!isStackTraceLine) {
      errMsgs.push(line)
      continue
    }
    const codes = parseWeixinRuntimeStacktraceLine(
      options.platform,
      errMsgs.join('\n'),
      line,
      sourceMapDir
    )
    if (codes.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      const [errorCode, ...other] = codes
      let error =
        // `error: ${errorCode.includes('[EXCEPTION] ') ? '' : '[EXCEPTION] '}` +
        errorCode
      if (color) {
        error = color + error + color
      }
      return [error, ...other].join('\n')
    }

    res.push(line)
  }
}

export function parseWeixinRuntimeStacktraceLine(
  platform: 'mp-weixin' | 'mp-baidu',
  error: string,
  lineStr: string,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(JS_ERROR_RE)
  if (!matches) {
    return lines
  }
  const [, , filename, line] = matches
  const sourceMapFile = resolveSourceMapFileBySourceFile(filename, sourceMapDir)
  if (!sourceMapFile) {
    return lines
  }
  // 微信小程序编译后会增加两行，需要减去
  // define("pages/index/index.js", ...
  // "use strict";
  const offset = platform === 'mp-weixin' ? 2 : 0
  processErrorLines(error, sourceMapFile, parseInt(line) - offset, lines)

  return lines
}
