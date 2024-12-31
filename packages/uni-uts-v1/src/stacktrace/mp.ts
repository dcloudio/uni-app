import debug from 'debug'
import fs from 'fs-extra'
import path from 'path'
import crypto from 'crypto'

import type { GenerateJavaScriptRuntimeCodeFrameOptions } from './js'
import {
  COLORS,
  generateCodeFrame,
  lineColumnToStartEnd,
  resolveSourceMapFileBySourceFile,
  splitRE,
} from './utils'
import { originalPositionForSync } from '../sourceMap'
import { normalizePath, resolveSourceMapPath } from '../shared'

const debugSourceMap = debug('uni:sourcemap')
export interface GenerateMiniProgramRuntimeCodeFrameOptions
  extends GenerateJavaScriptRuntimeCodeFrameOptions {
  outputDir: string
  platform: 'mp-weixin' | 'mp-baidu' | 'mp-alipay' | 'mp-toutiao'
}

function parseFileNameAndLine(lineStr: string) {
  const matches = lineStr.match(/(https?:\/\/[^\s]+?):(\d+):(\d+)/)
  if (matches) {
    const [, fileName, line] = matches
    return { fileName, line: parseInt(line) }
  }
}

interface SourceMapPlatformOptions {
  parseFileNameAndLine(
    lineStr: string
  ): { fileName: string; line: number } | undefined
  // base64说明：sourceMappingURL=data:application/json;charset=utf-8;base64,
  // url说明：sourceMappingURL=http://xxx.com/xx.map
  // json说明：当前文件本身就是sourceMap
  sourceMapType: 'base64' | 'url' | 'json'
  sourceMapFileNameRe: RegExp
  fetchHeaders?: Record<string, string>
  needsSecondaryMapping?: boolean // 是否需要二次映射解析
  resolveAtSourceFileName?: (
    sourceFileName: string,
    sourceMapDir: string,
    stacktraceFileName: string
  ) => string
  resolveUrl?: (url: string) => string
}

export const MP_PLATFORMS: Record<string, SourceMapPlatformOptions> = {
  'mp-weixin': {
    parseFileNameAndLine,
    sourceMapType: 'base64',
    sourceMapFileNameRe: /\/appservice\/(.+\.js)$/,
    resolveAtSourceFileName(sourceFileName, _sourceMapDir, stacktraceFileName) {
      return (
        normalizePath(path.dirname(stacktraceFileName)) + '/' + sourceFileName
      )
    },
  },
  'mp-toutiao': {
    parseFileNameAndLine(lineStr: string) {
      let matches = lineStr.match(/\(([^()]+\.js):(\d+):(\d+)\)/)
      if (!matches) {
        matches = lineStr.match(/at ([^()]+\.js):(\d+):(\d+)/)
      }
      if (matches) {
        const [, fileName, line] = matches
        return { fileName, line: parseInt(line) }
      }
    },
    sourceMapType: 'base64',
    sourceMapFileNameRe: /\/app-dist\/(.+\.js)$/,
  },
  'mp-baidu': {
    parseFileNameAndLine,
    sourceMapType: 'json',
    sourceMapFileNameRe: /\/output\/(.+\.js).map$/,
    needsSecondaryMapping: true,
    fetchHeaders: {
      Referer: 'https://smartapps.cn/defaultkey/devtools/page-frame.html', // 模拟来源页面
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 swan/2.97.0 swan-baiduboxapp/12.15.0.255 swandevtools',
    },
    resolveUrl(url) {
      return url + '.map'
    },
  },
  'mp-alipay': {
    parseFileNameAndLine,
    sourceMapType: 'url',
    sourceMapFileNameRe: /(index\.worker\.js)/,
    resolveAtSourceFileName(fileName, sourceMapDir) {
      return normalizePath(
        path.relative(sourceMapDir, fileName.replace('raw-source://', ''))
      )
    },
  },
  'mp-qq': {
    parseFileNameAndLine,
    sourceMapType: 'base64',
    sourceMapFileNameRe: /\/appservice\/(.+\.js)$/,
    needsSecondaryMapping: true,
  },
}

const MP_TOUTIAO_URL_RE = /127\.0\.0\.1:\d+/

function createResolveMPToutiaoUrl(stacktrace: string) {
  const ipAndPort = stacktrace.match(MP_TOUTIAO_URL_RE)?.[0] ?? ''
  if (!ipAndPort) {
    return
  }
  return (url: string) => {
    return 'http://' + ipAndPort + '/app-dist/' + url
  }
}

// at http://127.0.0.1:37922/appservice/pages/index/index.js:5:7
export async function parseMiniProgramRuntimeStacktrace(
  stacktrace: string,
  options: GenerateMiniProgramRuntimeCodeFrameOptions
) {
  const mpOptions = MP_PLATFORMS[options.platform]
  if (options.platform === 'mp-toutiao') {
    mpOptions.resolveUrl = createResolveMPToutiaoUrl(stacktrace)
  }
  const sourceMapDir = resolveSourceMapPath(options.outputDir, options.platform)
  const lines = stacktrace.split(splitRE)
  const errMsgs: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isStackTraceLine = line.trim().startsWith('at ')
    if (!isStackTraceLine) {
      errMsgs.push(line)
      continue
    }
    const codes = await parseMiniProgramRuntimeStacktraceLine(
      mpOptions,
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
  }
  return stacktrace
}

// 使用 MD5 缓存
const sourceMapCache: Record<string, string> = {}

// 计算 MD5 的辅助函数
function calculateMD5(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex')
}

export async function parseMiniProgramRuntimeStacktraceLine(
  options: SourceMapPlatformOptions,
  error: string,
  lineStr: string,
  sourceMapDir: string
) {
  const {
    parseFileNameAndLine,
    sourceMapFileNameRe,
    sourceMapType,
    needsSecondaryMapping,
    fetchHeaders,
    resolveAtSourceFileName,
    resolveUrl,
  } = options
  const lines: string[] = []
  const fileNameAndLine = parseFileNameAndLine(lineStr)
  // console.error('fileNameAndLine', fileNameAndLine)
  if (!fileNameAndLine) {
    return lines
  }

  const { fileName, line } = fileNameAndLine
  const url = resolveUrl?.(fileName) || fileName
  const fileNameMatches = url.match(sourceMapFileNameRe)
  // console.error('url', url, fileNameMatches)
  let filename: string = ''
  if (fileNameMatches) {
    const [, fileName] = fileNameMatches
    filename = fileName
  }
  if (!filename) {
    return lines
  }
  // 微信小程序会用@babel/runtime转换代码，需要忽略此类错误
  if (
    filename.startsWith('@babel/runtime') ||
    // 不解析 vendor.js 的错误，因为 vendor.js 的错误通常是开发者自己的代码引发的，放过后，会继续查找开发者自己的代码
    // 还有一种做法是，解析所有堆栈的源码链接，但是这样就没法提供 codeFrame 了
    filename.startsWith('common/vendor.js')
  ) {
    return lines
  }

  // 获取 sourceMap 内容，写入文件
  const sourceMap = await fetchSourceMap(url, sourceMapType, fetchHeaders)
  // console.error('sourceMap', sourceMap)
  if (!sourceMap) {
    return lines
  }
  const devtoolsSourceMapDir = sourceMapDir + '-devtools'
  const sourceMapPath = path.resolve(devtoolsSourceMapDir, filename + '.map')

  // 计算当前 sourceMap 的 MD5
  const currentMD5 = calculateMD5(sourceMap)

  // 检查缓存和文件内容是否相同
  let needsWrite = true
  if (fs.existsSync(sourceMapPath)) {
    if (sourceMapCache[sourceMapPath] === currentMD5) {
      needsWrite = false
    } else {
      const existingContent = fs.readFileSync(sourceMapPath, 'utf-8')
      const existingMD5 = calculateMD5(existingContent)
      if (existingMD5 === currentMD5) {
        needsWrite = false
        // 更新缓存
        sourceMapCache[sourceMapPath] = currentMD5
      }
    }
  }

  // 只在需要时写入文件
  if (needsWrite) {
    fs.outputFileSync(sourceMapPath, sourceMap)
    sourceMapCache[sourceMapPath] = currentMD5
  }

  const sourceMapFile = resolveSourceMapFileBySourceFile(
    filename,
    devtoolsSourceMapDir
  )
  if (!sourceMapFile) {
    return lines
  }

  let originalPosition = getOriginalPosition(sourceMapFile, line, 0)
  if (needsSecondaryMapping) {
    const sourceMapFile = resolveSourceMapFileBySourceFile(
      originalPosition.source.replace('swan-source:///', ''),
      sourceMapDir
    )
    if (!sourceMapFile) {
      return lines
    }
    // 二次获取原始位置
    originalPosition = getOriginalPosition(
      sourceMapFile,
      originalPosition.line,
      originalPosition.column
    )
    processErrorLines(originalPosition, error, lines)
  } else {
    if (resolveAtSourceFileName && originalPosition.source) {
      originalPosition.source = resolveAtSourceFileName(
        originalPosition.source,
        sourceMapDir,
        filename
      )
    }
    processErrorLines(originalPosition, error, lines)
  }

  return lines
}

async function fetchSourceMap(
  url: string,
  sourceMapType: 'base64' | 'url' | 'json' = 'base64',
  headers: Record<string, string> = {}
): Promise<string | null> {
  debugSourceMap.enabled && debugSourceMap('fetchSourceMap %s', url)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 1000) // 1秒超时
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers,
    })

    if (!response.ok) {
      return null
    }

    const data = await response.text()
    if (sourceMapType === 'json') {
      return data
    }
    if (sourceMapType === 'url') {
      // 解析url格式的sourceMappingURL
      // sourceMappingURL=http://localhost:6600/sourcemaps/index.worker.js.map
      const sourceMapRE = /sourceMappingURL=([^ ]+)/

      const match = data.match(sourceMapRE)
      if (match && match[1]) {
        return await fetchSourceMap(match[1], 'json')
      }
      return null
    }
    // 只匹配 base64 格式的 sourceMappingURL
    const sourceMapRE =
      /\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,([^\s]+)/
    const match = data.match(sourceMapRE)

    if (match && match[1]) {
      return Buffer.from(match[1], 'base64').toString()
    }
    return null
  } catch (error) {
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

function getOriginalPosition(
  sourceMapFile: string,
  line: number,
  column: number
) {
  return originalPositionForSync({
    sourceMapFile,
    line,
    column,
    withSourceContent: true,
  })
}

function processErrorLines(
  originalPosition: ReturnType<typeof getOriginalPosition>,
  error: string,
  lines: string[]
) {
  if (originalPosition.source) {
    lines.push(error)
    lines.push(
      `at ${originalPosition.source.split('?')[0]}:${originalPosition.line}:${
        originalPosition.column
      }`
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
