import path from 'path'
import fs from 'fs-extra'
import { SPECIAL_CHARS, relative } from '../utils'
import { originalPositionFor, originalPositionForSync } from '../sourceMap'
import {
  COLORS,
  type GenerateRuntimeCodeFrameOptions,
  generateCodeFrame,
  lineColumnToStartEnd,
  parseErrorWithRules,
  resolveSourceMapDirByCacheDir,
  resolveSourceMapFileBySourceFile,
  splitRE,
} from './utils'
import { normalizePath } from '../shared'

export interface MessageSourceLocation {
  type: 'exception' | 'error' | 'warning' | 'info' | 'logging' | 'output'
  message: string
  file?: string
  line?: number
  column?: number
  code?: string
}

interface GenerateCodeFrameOptions {
  inputDir: string
  sourceMapDir: string
  replaceTabsWithSpace?: boolean
  format: (msg: MessageSourceLocation) => string
}

export function hbuilderKotlinCompileErrorFormatter(m: MessageSourceLocation) {
  const msgs: string[] = []
  let isFormatted = false
  if (m.type === 'error' || m.type === 'exception') {
    const formatted = formatKotlinError(
      m.message,
      m.code?.split('\n') || [],
      compileFormatters
    )
    // 如果格式化后与原消息不同，则认为格式化成功
    isFormatted = m.message !== formatted
    m.message = formatted
  }
  let msg = m.type + ': ' + m.message
  if (m.type === 'warning') {
    // 忽略部分警告
    if (
      msg.includes(`Classpath entry points to a non-existent location:`) &&
      !msg.includes('.gradle') // gradle 的警告需要输出
    ) {
      return ''
    }
    msg
      .replace(/\r\n/g, '\n')
      .split('\n')
      .forEach((m, index) => {
        // 重要：区块标识需要放到颜色值之后
        msgs.push(
          '\u200B' +
            (index === 0 ? SPECIAL_CHARS.WARN_BLOCK : '') +
            m +
            '\u200B'
        )
      })
  } else if (m.type === 'error' || m.type === 'exception') {
    msg
      .replace(/\r\n/g, '\n')
      .split('\n')
      .forEach((m, index) => {
        // 重要：区块标识需要放到颜色值之后
        msgs.push(
          '\u200C' +
            (index === 0 ? SPECIAL_CHARS.ERROR_BLOCK : '') +
            m +
            '\u200C'
        )
      })
  } else {
    msgs.push(msg)
  }
  if (m.file) {
    if (m.file.includes('?')) {
      ;[m.file] = m.file.split('?')
    }
    msgs.push(`at ${m.file}:${m.line}:${m.column}`)
  }
  if (m.code) {
    msgs.push(m.code)
  }
  const result = msgs.join('\n')
  if (isFormatted) {
    return result
  }
  return parseErrorWithRules(result, {
    language: 'kotlin',
    platform: 'app-android',
  })
}

export async function parseUTSKotlinStacktrace(
  messages: MessageSourceLocation[],
  options: GenerateCodeFrameOptions
) {
  if (typeof messages === 'string') {
    try {
      messages = JSON.parse(messages)
    } catch (e) {}
  }
  const msgs: string[] = []
  if (Array.isArray(messages) && messages.length) {
    for (const m of messages) {
      if (m.file) {
        const sourceMapFile = resolveSourceMapFile(
          m.file,
          options.sourceMapDir,
          options.inputDir
        )
        if (sourceMapFile) {
          const originalPosition = await originalPositionFor({
            sourceMapFile,
            line: m.line!,
            column: m.column!,
            withSourceContent: true,
          })

          if (originalPosition.source) {
            // 混编的假sourcemap，需要读取源码
            if (sourceMapFile.endsWith('.fake.map')) {
              if (fs.existsSync(m.file)) {
                originalPosition.sourceContent = fs.readFileSync(
                  m.file,
                  'utf-8'
                )
              }
            }
            m.file = originalPosition.source.split('?')[0]
            if (originalPosition.line !== null) {
              m.line = originalPosition.line
            }
            if (originalPosition.column !== null) {
              m.column = originalPosition.column
            }
            if (
              originalPosition.line !== null &&
              originalPosition.column !== null &&
              originalPosition.sourceContent
            ) {
              m.code = generateCodeFrame(originalPosition.sourceContent, {
                line: originalPosition.line,
                column: originalPosition.column,
              }).replace(/\t/g, ' ')
            }
          }
        }
      }
      let msg = options.format(m)
      if (msg) {
        if (m.type === 'error' || m.type === 'exception') {
          msg = msg + SPECIAL_CHARS.ERROR_BLOCK
        } else if (m.type === 'warning') {
          msg = msg + SPECIAL_CHARS.WARN_BLOCK
        }
        msgs.push(msg)
      }
    }
  }
  return msgs.join('\n')
}

function resolveSourceMapFile(
  file: string,
  sourceMapDir: string,
  inputDir: string
) {
  const sourceMapFile = path.resolve(
    sourceMapDir,
    relative(file, inputDir) + '.map'
  )
  if (fs.existsSync(sourceMapFile)) {
    return sourceMapFile
  }
  return normalizePath(relative(file, inputDir)) + '.fake.map'
}

const DEFAULT_APPID = '__UNI__uniappx'

function normalizeAppid(appid: string) {
  return appid.replace(/_/g, '')
}
function createRegExp(appid: string) {
  return new RegExp('uni\\.' + appid + '\\.(.*)\\..*\\(*\\.kt:([0-9]+)\\)')
}

let kotlinManifest = {
  mtimeMs: 0,
  manifest: {} as Record<string, string>,
}

export interface KotlinManifestCache {
  version: string
  env: Record<string, string>
  files: Record<string, Record<string, string>>
}
export function updateUTSKotlinSourceMapManifestCache(cacheDir: string) {
  const manifestFile = path.resolve(cacheDir, 'src/.manifest.json')
  try {
    const stats = fs.statSync(manifestFile)
    if (stats.isFile()) {
      if (kotlinManifest.mtimeMs !== stats.mtimeMs) {
        const { files } = fs.readJSONSync(manifestFile) as KotlinManifestCache
        if (files) {
          const classManifest: Record<string, string> = {}
          Object.keys(files).forEach((name) => {
            const kotlinClass = files[name].class
            if (kotlinClass) {
              classManifest[kotlinClass] = name
            }
          })
          kotlinManifest.mtimeMs = stats.mtimeMs
          kotlinManifest.manifest = classManifest
        }
      }
    }
  } catch (e) {}
}

export function parseFilenameByClassName(className: string) {
  return kotlinManifest.manifest[className.split('$')[0]] || 'index.kt'
}

export interface GenerateKotlinRuntimeCodeFrameOptions
  extends GenerateRuntimeCodeFrameOptions {
  appid: string
  language: 'kotlin'
}

export interface GenerateAppAndroidKotlinRuntimeCodeFrameOptions
  extends GenerateKotlinRuntimeCodeFrameOptions {
  platform: 'app-android'
}

export function resolveUTSKotlinFilenameByClassName(
  className: string,
  { cacheDir }: { cacheDir: string }
) {
  updateUTSKotlinSourceMapManifestCache(cacheDir)
  return parseFilenameByClassName(className)
}

export function parseUTSKotlinRuntimeStacktrace(
  stacktrace: string,
  options: GenerateKotlinRuntimeCodeFrameOptions
) {
  const appid = normalizeAppid(options.appid || DEFAULT_APPID)
  if (!stacktrace.includes('uni.' + appid + '.')) {
    return ''
  }
  updateUTSKotlinSourceMapManifestCache(options.cacheDir)
  const re = createRegExp(appid)
  const res: string[] = []
  const lines = stacktrace.split(splitRE)
  const sourceMapDir = resolveSourceMapDirByCacheDir(options.cacheDir)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const codes = parseUTSKotlinRuntimeStacktraceLine(line, re, sourceMapDir)
    if (codes.length && res.length) {
      const color = options.logType
        ? COLORS[options.logType as string] || ''
        : ''
      const message = resolveCausedBy(res)
      const formatted = formatKotlinError(
        message,
        codes,
        runtimeFormatters,
        options.appid
      )
      let error = 'error: ' + formatted
      const isFormatted = message !== formatted
      if (color) {
        error = color + SPECIAL_CHARS.ERROR_BLOCK + error + color
      }
      let errorStr = [error, ...codes].join('\n')
      if (!isFormatted) {
        errorStr = parseErrorWithRules(errorStr, {
          language: 'kotlin',
          platform: 'app-android',
        })
      }
      return (
        (color ? '' : SPECIAL_CHARS.ERROR_BLOCK) +
        errorStr +
        SPECIAL_CHARS.ERROR_BLOCK
      )
    } else {
      res.push(line)
    }
  }
  return ''
}

function resolveCausedBy(lines: string[]) {
  // 从最后一行开始，找到第一个Caused by:
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('Caused by: ')) {
      return lines[i].replace('Caused by: ', '')
    }
  }
  return lines[0]
}

function parseUTSKotlinRuntimeStacktraceLine(
  lineStr: string,
  re: RegExp,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(re)
  if (!matches) {
    return lines
  }

  const [, className, line] = matches
  const sourceMapFile = resolveSourceMapFileBySourceFile(
    parseFilenameByClassName(className),
    sourceMapDir
  )
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
      `at ${originalPosition.source.split('?')[0]}:${originalPosition.line}:${
        originalPosition.column
      }`
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

interface Formatter {
  format(error: string, codes: string[], appid?: string): string | undefined
}

const TYPE_MISMATCH_RE =
  /Type mismatch: inferred type is (.*) but (.*) was expected/

function normalizeType(type: string) {
  type = type.replace(/\b(Unit)\b/g, 'Unit \x1b[90m/* = void */\x1b[39m')

  if (type.endsWith('?')) {
    let nonOptional = type.slice(0, -1)
    if (nonOptional.startsWith('(') && nonOptional.endsWith(')')) {
      nonOptional = nonOptional.slice(1, -1)
    }
    return `${type}（可为空的${nonOptional}）`
  }
  return type
}

const extApiCompileErrorFormatter: Formatter = {
  format(error, codes) {
    if (codes.length && error.includes('Unresolved reference: uni_')) {
      const api = findUniExtApi(codes.join('\n'), UNI_API_RE, '^')
      if (api) {
        return `请检查 ${api} 的拼写是否正确，或确认当前 HBuilderX 版本在当前平台是否支持此 API。`
      }
      return ``
    }
  },
}

const extApiRuntimeErrorFormatter: Formatter = {
  format(error, codes) {
    if (codes.length && error.includes('Failed resolution of: L')) {
      let isUniExtApi =
        error.includes('uts/sdk/modules/DCloudUni') ||
        error.includes('io/dcloud/uniapp/extapi/')
      let isUniCloudApi =
        !isUniExtApi && error.includes('io/dcloud/unicloud/UniCloud')
      if (isUniExtApi || isUniCloudApi) {
        let api = findUniExtApi(
          codes[codes.length - 1],
          isUniCloudApi ? UNI_CLOUD_API_RE : UNI_API_RE,
          '^^^^^'
        )
        if (api) {
          api = `api ${api}`
        } else {
          api = `您使用到的api`
        }
        return `[EXCEPTION] 当前运行的基座未包含${api}，请重新打包自定义基座再运行。`
      }
    } else if (error.includes('Unresolved reference: uni_')) {
      // let api = findUniExtApi(codes[codes.length - 1], UNI_API_RE)
      return ``
    }
  },
}

function findUniExtApi(error: string, re: RegExp, includeStr: string) {
  let api = ''
  // 第一步先遍历查找^^^^^的索引
  const codeFrames = error.split(splitRE)
  const index = codeFrames.findIndex((frame) => frame.includes(includeStr))
  if (index > 0) {
    // 第二步，取前一条记录，查找uni.开头的api
    api = findApi(codeFrames[index - 1], re)
  }
  return api
}

const packageFormatter: Formatter = {
  format(error, _, appid) {
    if (appid) {
      return error.replaceAll(parseUniXAppAndroidPackage(appid) + '.', '')
    }
    return error
  },
}

function parseOrigType(type1: string, type2: string) {
  if (type1.startsWith(type2)) {
    const renamedIndex = type1.replace(type2, '')
    if (/[0-9]+/.test(renamedIndex)) {
      return type2
    }
  }
}
const typeMismatchErrorFormatter: Formatter = {
  format(error, _) {
    const matches = error.match(TYPE_MISMATCH_RE)
    if (matches) {
      const [, inferredType, expectedType] = matches
      const normalizedInferredType = normalizeType(inferredType)
      const normalizedExpectedType = normalizeType(expectedType)
      let extra = ''
      const origType =
        parseOrigType(normalizedInferredType, normalizedExpectedType) ||
        parseOrigType(normalizedExpectedType, normalizedInferredType)
      if (origType) {
        extra = `该错误可能是没有使用import导入${origType}引发的`
      }
      return `类型不匹配: 推断类型是${normalizedInferredType}，但预期的是${normalizedExpectedType}${
        extra ? `，${extra}` : ''
      }。`
    }
  },
}

// error: Unresolved reference: PreLoginOptions‌
const UNRESOLVED_REFERENCE_RE = /Unresolved reference: (.*)/
const unresolvedApiMap = require('../../lib/kotlin/unresolved.json')
const unresolvedErrorFormatter: Formatter = {
  format(error, _) {
    const matches = error.match(UNRESOLVED_REFERENCE_RE)
    if (matches) {
      const name = matches[1].trim()
      const api = unresolvedApiMap[name]
      if (api) {
        return `${error}。[详情](${api.url})`
      }
    }
  },
}

const compileFormatters: Formatter[] = [
  typeMismatchErrorFormatter,
  extApiCompileErrorFormatter,
  unresolvedErrorFormatter,
]

const runtimeFormatters: Formatter[] = [
  extApiRuntimeErrorFormatter,
  packageFormatter,
]

const UNI_API_RE = /(uni\.\w+)/
const UNI_CLOUD_API_RE = /(uniCloud\.\w+)/
function findApi(msg: string, re: RegExp) {
  const matches = msg.match(re)
  if (matches) {
    return matches[1]
  }
  return ''
}

function formatKotlinError(
  error: string,
  codes: string[],
  formatters: Formatter[],
  appid?: string
): string {
  // 替换响应式类型为标准类型，使用对象映射提高可维护性
  const typeReplacements: Record<string, string> = {
    UTSReactiveJSONObject: 'UTSJSONObject',
    UTSReactiveSet: 'Set',
    UTSReactiveMap: 'Map',
    UTSReactiveArray: 'Array',
  }

  Object.entries(typeReplacements).forEach(([reactiveType, standardType]) => {
    error = error.replace(
      new RegExp(`\\b${reactiveType}\\b`, 'g'),
      standardType
    )
  })

  for (const formatter of formatters) {
    const err = formatter.format(error, codes, appid)
    if (err) {
      return err
    }
  }
  return error
}

function parseUniXAppAndroidPackage(appid: string) {
  return 'uni.' + appid.replace(/_/g, '')
}
