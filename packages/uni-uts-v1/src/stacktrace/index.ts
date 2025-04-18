import { relative } from '../utils'
import {
  type GenerateAppHarmonyCodeFrameOptions,
  parseUTSHarmonyRuntimeStacktrace,
} from './arkts'
import {
  type GenerateAppIOSJavaScriptRuntimeCodeFrameOptions,
  type GenerateJavaScriptRuntimeCodeFrameOptions,
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

export { parseUTSSwiftPluginStacktrace } from './swift'
export { parseUTSArkTSPluginStacktrace } from './arkts'
export {
  parseUTSKotlinStacktrace,
  parseUTSKotlinRuntimeStacktrace,
  resolveUTSKotlinFilenameByClassName,
} from './kotlin'

export { parseUTSJavaScriptRuntimeStacktrace } from './js'

export async function parseRuntimeStacktrace(
  stacktrace: string,
  options:
    | GenerateAppAndroidKotlinRuntimeCodeFrameOptions
    | GenerateAppIOSJavaScriptRuntimeCodeFrameOptions
    | GenerateAppHarmonyCodeFrameOptions
    | GenerateMiniProgramRuntimeCodeFrameOptions
) {
  if (
    (options.platform === 'app-android' && options.language === 'kotlin') ||
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
  } else if (options.language === 'kotlin') {
    return parseUTSKotlinRuntimeStacktrace(stacktrace, options)
  } else if (options.language === 'javascript') {
    return parseUTSJavaScriptRuntimeStacktrace(stacktrace, options)
  }
}

export function parseUTSSyntaxError(error: any, inputDir: string): string {
  let errorMsg = error
  if (error instanceof Error) {
    errorMsg = error.message
  }
  let msg = String(errorMsg).replace(/\t/g, ' ')
  let res: RegExpExecArray | null = null
  const syntaxErrorRe = /(,-\[(.*):(\d+):(\d+)\])/g
  let matched = false
  while ((res = syntaxErrorRe.exec(msg))) {
    const [row, filename, line, column] = res.slice(1)
    msg = msg.replace(
      row,
      `at ${relative(filename.split('?')[0], inputDir)}:${
        parseInt(line) + 3
      }:${column}`
    )
    matched = true
  }
  if (!matched) {
    return error
  }
  return msg
}
