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
  MP_PLATFORMS,
  parseWeixinRuntimeStacktrace,
} from './mp/weixin'

export { parseUTSSwiftPluginStacktrace } from './swift'

export {
  parseUTSKotlinStacktrace,
  parseUTSKotlinRuntimeStacktrace,
} from './kotlin'

export { parseUTSJavaScriptRuntimeStacktrace } from './js'

export async function parseRuntimeStacktrace(
  stacktrace: string,
  options:
    | GenerateAppAndroidKotlinRuntimeCodeFrameOptions
    | GenerateAppIOSJavaScriptRuntimeCodeFrameOptions
    | GenerateWeixinRuntimeCodeFrameOptions
) {
  if (
    (options.platform === 'app-android' && options.language === 'kotlin') ||
    (options.platform === 'app-ios' && options.language === 'javascript')
  ) {
    return parseUTSRuntimeStacktrace(stacktrace, options)
  }
  // 微信小程序，sourceMap可以合并映射（所以微信开发工具可以显示源码），也可以读取到最终的sourceMap（下载js文件，解析里边的base64格式sourceMap）
  // 百度小程序，sourceMap无法合并映射（所以百度开发工具无法显示源码），可以读取到百度的sourceMap，二次解析映射（也可以合并sourceMap吧）
  // 抖音小程序，sourceMap可以合并映射（所以抖音开发工具可以显示源码），无法读取到抖音的sourceMap。无法解析映射
  // 支付宝小程序，sourceMap可以合并映射（所以支付宝开发工具可以显示源码），可以读取到支付宝的sourceMap（下载js文件，解析url格式的sourceMap，再根据url下载sourceMap）
  if (MP_PLATFORMS[options.platform]) {
    return parseWeixinRuntimeStacktrace(stacktrace, options)
  }
  // 其他小程序平台暂不处理，因为没法拿到小程序的sourceMap做合并映射
  return stacktrace
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
