import fs from 'fs-extra'
import path from 'path'

import type { GenerateJavaScriptRuntimeCodeFrameOptions } from '../js'
import {
  COLORS,
  generateCodeFrame,
  lineColumnToStartEnd,
  resolveSourceMapFileBySourceFile,
  splitRE,
} from '../utils'
import { originalPositionForSync } from '../../sourceMap'
import { normalizePath } from '../../shared'

export interface GenerateWeixinRuntimeCodeFrameOptions
  extends GenerateJavaScriptRuntimeCodeFrameOptions {
  outputDir: string
  platform: 'mp-weixin' | 'mp-baidu' | 'mp-alipay'
}

const JS_ERROR_RE = /(https?:\/\/[^\s]+?):(\d+):(\d+)/

interface SourceMapPlatformOptions {
  // base64说明：sourceMappingURL=data:application/json;charset=utf-8;base64,
  // url说明：sourceMappingURL=http://xxx.com/xx.map
  // json说明：当前文件本身就是sourceMap
  sourceMapType: 'base64' | 'url' | 'json'
  sourceMapFileNameRe: RegExp
  fetchHeaders?: Record<string, string>
  resolveAtSourceFileName?: (fileName: string, sourceMapDir: string) => string
}

export const MP_PLATFORMS: Record<string, SourceMapPlatformOptions> = {
  'mp-weixin': {
    sourceMapType: 'base64',
    sourceMapFileNameRe: /\/appservice\/(.+\.js)$/,
  },
  'mp-baidu': {
    sourceMapType: 'json',
    sourceMapFileNameRe: /\/output\/(.+\.js)$/,
    fetchHeaders: {
      Referer: 'https://smartapps.cn/defaultkey/devtools/page-frame.html', // 模拟来源页面
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; https://zhanzhang.toutiao.com/)',
    },
  },
  'mp-alipay': {
    sourceMapType: 'url',
    sourceMapFileNameRe: /(index\.worker\.js)$/,
    resolveAtSourceFileName(fileName, sourceMapDir) {
      return normalizePath(
        path.relative(sourceMapDir, fileName.replace('raw-source://', ''))
      )
    },
  },
}

// at http://127.0.0.1:37922/appservice/pages/index/index.js:5:7
export async function parseWeixinRuntimeStacktrace(
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
    const codes = await parseWeixinRuntimeStacktraceLine(
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

export async function parseWeixinRuntimeStacktraceLine(
  platform: 'mp-weixin' | 'mp-baidu' | 'mp-alipay',
  error: string,
  lineStr: string,
  sourceMapDir: string
) {
  const lines: string[] = []
  const matches = lineStr.match(JS_ERROR_RE)
  if (!matches) {
    return lines
  }
  const {
    sourceMapFileNameRe,
    sourceMapType,
    fetchHeaders,
    resolveAtSourceFileName,
  } = MP_PLATFORMS[platform]
  const [, url, line] = matches
  const fileNameMatches = url.match(sourceMapFileNameRe)
  let filename: string = ''
  if (fileNameMatches) {
    const [, fileName] = fileNameMatches
    filename = fileName
  }
  if (!filename) {
    return lines
  }
  // 获取 sourceMap 内容，写入文件
  const sourceMap = await fetchSourceMap(url, sourceMapType, fetchHeaders)
  if (!sourceMap) {
    return lines
  }
  const devtoolsSourceMapDir = sourceMapDir + '-devtools'

  // 写入 sourceMap 文件
  fs.outputFileSync(
    path.resolve(devtoolsSourceMapDir, filename + '.map'),
    sourceMap
  )

  const sourceMapFile = resolveSourceMapFileBySourceFile(
    filename,
    devtoolsSourceMapDir
  )
  if (!sourceMapFile) {
    return lines
  }

  let originalPosition = getOriginalPosition(sourceMapFile, parseInt(line), 0)
  if (platform === 'mp-baidu') {
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
    processErrorLines(originalPosition, '', error, lines)
  } else {
    if (resolveAtSourceFileName) {
      originalPosition.source = resolveAtSourceFileName(
        originalPosition.source,
        sourceMapDir
      )
    }
    processErrorLines(
      originalPosition,
      platform === 'mp-weixin' ? path.dirname(filename) : '',
      error,
      lines
    )
  }

  return lines
}

async function fetchSourceMap(
  url: string,
  sourceMapType: 'base64' | 'url' | 'json' = 'base64',
  headers: Record<string, string> = {}
): Promise<string | null> {
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
  dir: string,
  error: string,
  lines: string[]
) {
  if (originalPosition.source) {
    lines.push(error)
    lines.push(
      `at ${dir ? dir + '/' : ''}${originalPosition.source.split('?')[0]}:${
        originalPosition.line
      }:${originalPosition.column}`
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
