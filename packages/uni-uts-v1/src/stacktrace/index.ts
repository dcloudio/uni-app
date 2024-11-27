import { relative } from '../utils'
import {
  type GenerateAppIOSJavaScriptRuntimeCodeFrameOptions,
  type GenerateJavaScriptRuntimeCodeFrameOptions,
  parseUTSJavaScriptRuntimeStacktrace,
} from './js'
import {
  type GenerateAppAndroidKotlinRuntimeCodeFrameOptions,
  type GenerateKotlinRuntimeCodeFrameOptions,
  parseUTSKotlinRuntimeStacktrace,
} from './kotlin'
import {
  type GenerateWeixinRuntimeCodeFrameOptions,
  parseWeixinRuntimeStacktrace,
} from './mp/weixin'

export { parseUTSSwiftPluginStacktrace } from './swift'

export {
  parseUTSKotlinStacktrace,
  parseUTSKotlinRuntimeStacktrace,
} from './kotlin'

export { parseUTSJavaScriptRuntimeStacktrace } from './js'

export function parseRuntimeStacktrace(
  stacktrace: string,
  options:
    | GenerateAppAndroidKotlinRuntimeCodeFrameOptions
    | GenerateAppIOSJavaScriptRuntimeCodeFrameOptions
    | GenerateWeixinRuntimeCodeFrameOptions
) {
  if (options.platform === 'mp-weixin') {
    return parseWeixinRuntimeStacktrace(stacktrace, options)
  }
  return parseUTSRuntimeStacktrace(stacktrace, options)
}

export function parseUTSRuntimeStacktrace(
  stacktrace: string,
  options:
    | GenerateKotlinRuntimeCodeFrameOptions
    | GenerateJavaScriptRuntimeCodeFrameOptions
) {
  if (options.language === 'kotlin') {
    return parseUTSKotlinRuntimeStacktrace(stacktrace, options)
  } else if (options.language === 'javascript') {
    return parseUTSJavaScriptRuntimeStacktrace(stacktrace, options)
  }
}

export function parseUTSSyntaxError(error: any, inputDir: string): string {
  if (error instanceof Error) {
    error = error.message
  }
  let msg = String(error).replace(/\t/g, ' ')
  let res: RegExpExecArray | null = null
  const syntaxErrorRe = /(,-\[(.*):(\d+):(\d+)\])/g
  while ((res = syntaxErrorRe.exec(msg))) {
    const [row, filename, line, column] = res.slice(1)
    msg = msg.replace(
      row,
      `at ${relative(filename.split('?')[0], inputDir)}:${
        parseInt(line) + 3
      }:${column}`
    )
  }
  return msg
}
