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

export { parseUTSSwiftPluginStacktrace } from './swift'
export { parseUTSArkTSPluginStacktrace } from './arkts'
export {
  parseUTSKotlinStacktrace,
  parseUTSKotlinRuntimeStacktrace,
  resolveUTSKotlinFilenameByClassName,
} from './kotlin'

export { parseUTSJavaScriptRuntimeStacktrace } from './js'

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
) {
  initEnv(options)
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
    | GenerateAppIOSJavaScriptRuntimeCodeFrameOptions
    | GenerateAppHarmonyCodeFrameOptions
    | GenerateMiniProgramRuntimeCodeFrameOptions
) {
  initEnv(options)
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
  return stacktrace
}

export function parseUTSSyntaxError(
  error: any,
  inputDir: string
): string | RollupError {
  let errorMsg = error
  if (error instanceof Error) {
    errorMsg = error.message
    if (errorMsg.trim().startsWith('{')) {
      try {
        errorMsg = JSON.parse(errorMsg)
        return parseUTSSyntaxJsonError(errorMsg, inputDir)
      } catch (e) {
        return errorMsg
      }
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
    if (result) {
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
