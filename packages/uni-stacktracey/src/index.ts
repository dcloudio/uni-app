import fs from 'fs'
import StackTracey from './stacktracey'
import {
  type BasicSourceMapConsumer,
  type IndexedSourceMapConsumer,
  type Position,
  SourceMapConsumer,
} from '../lib/source-map/source-map'
import path from 'path'

export { SourceMapConsumer } from '../lib/source-map/source-map'

export {
  generateCodeFrame,
  generateCodeFrameSourceMapConsumer,
  generateCodeFrameWithSourceMapPath,
  generateCodeFrameWithKotlinStacktrace,
  generateCodeFrameWithSwiftStacktrace,
} from './utils'
// @ts-expect-error
if (__PLATFORM_WEB__) {
  // @ts-expect-error
  if (SourceMapConsumer.initialize) {
    // @ts-expect-error
    SourceMapConsumer.initialize({
      'lib/mappings.wasm':
        'https://unpkg.com/source-map@0.7.3/lib/mappings.wasm',
    })
  }
}

const nixSlashes = (x: string) => x.replace(/\\/g, '/')
const sourcemapCatch: Record<string, string | Promise<string>> = {}

type StacktraceyItems = StackTracey.Entry & {
  errMsg?: string
  sourceContent?: string
}
type Stacktracey = {
  items: StacktraceyItems[]
  itemsHeader: StackTracey['itemsHeader']
  asTable?: StackTracey['asTable']
}

type asTableResult =
  | string
  | {
      userError: string
      thirdParty: string
    }

interface StacktraceyPreset {
  /**
   * 解析错误栈信息
   * @param stacktrace
   */
  parseStacktrace(stacktrace: string): Stacktracey
  /**
   * 根据解析后的错误信息重新整合为错误栈信息
   * @param opts
   */
  asTableStacktrace(opts: {
    stack: Stacktracey
    maxColumnWidths?: StackTracey.MaxColumnWidths
    stacktrace: string
  }): asTableResult
  /**
   * 编译后的文件名地址
   * @param file
   * 编译后的文件名
   * @param fileName
   */
  parseSourceMapUrl(
    file: string,
    fileName: string,
    fileRelative: string
  ): string
  getSourceMapContent(
    file: string,
    fileName: string,
    fileRelative: string
  ): Promise<string>
  lineOffset?: number
}

interface StacktraceyOptions {
  preset: StacktraceyPreset
  withSourceContent?: boolean
}

export function stacktracey(
  stacktrace: string,
  opts: StacktraceyOptions
): Promise<asTableResult> {
  let cancel: boolean = false

  const stack = opts.preset.parseStacktrace(stacktrace)

  let parseStack = Promise.resolve()

  stack.items.forEach((item, index) => {
    const fn = (
      item: StacktraceyItems,
      index: number
    ): Promise<undefined | void> => {
      const { line = 0, column = 0, file, fileName, fileRelative } = item
      if (item.thirdParty) {
        return Promise.resolve()
      }

      function _getSourceMapContent(
        file: string,
        fileName: string,
        fileRelative: string
      ) {
        return opts.preset
          .getSourceMapContent(file, fileName, fileRelative)
          .then((content) => {
            if (content) {
              return getConsumer(content).then((consumer) => {
                return parseSourceMapContent(
                  consumer,
                  {
                    line: line + (opts.preset.lineOffset || 0),
                    column,
                  },
                  !!opts.withSourceContent
                )
              })
            }
          })
      }

      try {
        return _getSourceMapContent(file, fileName, fileRelative).then(
          (sourceMapContent) => {
            if (sourceMapContent) {
              const {
                source,
                sourcePath,
                sourceLine,
                sourceColumn,
                sourceContent,
                fileName = '',
              } = sourceMapContent

              stack.items[index] = Object.assign({}, item, {
                file: source,
                line: sourceLine,
                column: sourceColumn,
                fileShort: sourcePath,
                fileRelative: source,
                fileName,
                thirdParty: isThirdParty(sourcePath),
                parsed: true,
                sourceContent,
              })

              /**
               * 以 .js 结尾
               * 包含 app-service.js 则需要再解析 两次
               * 不包含 app-service.js 则无需再解析 一次
               */
              const curItem = stack.items[index]
              if (
                (stack as StackTracey).isMP &&
                curItem.beforeParse.indexOf('app-service') !== -1
              ) {
                return fn(curItem, index)
              }
            }
          }
        )
      } catch (error) {
        return Promise.resolve()
      }
    }
    parseStack = parseStack.then(() => {
      // TODO cancel
      if (cancel) return Promise.resolve()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fn(item, index).then(resolve)
        }, 0)
      })
    })
  })

  const _promise = new Promise((resolve, reject) => {
    parseStack
      .then(() => {
        const parseError = opts.preset.asTableStacktrace({
          stack,
          maxColumnWidths: {
            callee: 999,
            file: 999,
            sourceLine: 999,
          },
          stacktrace,
        })
        resolve(parseError)
      })
      .catch(() => {
        resolve(stacktrace)
      })
  }) as Promise<asTableResult>

  return _promise
}

function isThirdParty(relativePath: string) {
  return relativePath.indexOf('@dcloudio') !== -1
}

function getConsumer(
  content: string
): Promise<BasicSourceMapConsumer | IndexedSourceMapConsumer> {
  return new Promise((resolve, reject) => {
    try {
      if (SourceMapConsumer.with) {
        SourceMapConsumer.with(content, null, (consumer) => {
          resolve(consumer)
        })
      } else {
        // @ts-expect-error
        const consumer = SourceMapConsumer(content)
        resolve(consumer)
      }
    } catch (error) {
      reject()
    }
  })
}

function getSourceMapContent(sourcemapUrl: string) {
  try {
    return (
      sourcemapCatch[sourcemapUrl] ||
      (sourcemapCatch[sourcemapUrl] = new Promise((resolve, reject) => {
        try {
          if (/^[http|https]+:/i.test(sourcemapUrl)) {
            uni.request({
              url: sourcemapUrl,
              success: (res) => {
                if (res.statusCode === 200) {
                  sourcemapCatch[sourcemapUrl] = res.data as string
                  resolve(sourcemapCatch[sourcemapUrl])
                } else {
                  resolve((sourcemapCatch[sourcemapUrl] = ''))
                }
              },
              fail() {
                resolve((sourcemapCatch[sourcemapUrl] = ''))
              },
            })
          } else {
            sourcemapCatch[sourcemapUrl] = fs.readFileSync(
              sourcemapUrl,
              'utf-8'
            )
            resolve(sourcemapCatch[sourcemapUrl])
          }
        } catch (error) {
          resolve('')
        }
      }))
    )
  } catch (error) {
    return ''
  }
}

type SourceMapContent = {
  source: string
  sourcePath: string
  sourceLine: number
  sourceColumn: number
  sourceContent?: string
  fileName?: string
}
function parseSourceMapContent(
  consumer: BasicSourceMapConsumer | IndexedSourceMapConsumer,
  obj: Position,
  withSourceContent: boolean
): SourceMapContent | undefined {
  // source -> 'uni-app:///node_modules/@sentry/browser/esm/helpers.js'
  const {
    source,
    line: sourceLine,
    column: sourceColumn,
  } = consumer.originalPositionFor(obj)
  if (source) {
    const sourcePathSplit = source.split('/')
    const sourcePath = sourcePathSplit.slice(3).join('/')
    const fileName = sourcePathSplit.pop()

    return {
      source,
      sourcePath,
      sourceLine: sourceLine === null ? 0 : sourceLine,
      sourceColumn: sourceColumn === null ? 0 : sourceColumn,
      fileName,
      sourceContent: withSourceContent
        ? consumer.sourceContentFor(source) || ''
        : '',
    }
  }
}

interface UniStracktraceyPresetOptions {
  base: string
  sourceRoot: string
  splitThirdParty?: boolean
  uniPlatform?: string
  lineOffset?: number
}

function joinItem(item: string[] | string) {
  if (typeof item === 'string') {
    return item
  }
  const a = item[0]
  const b = item[1] ? `  ${item[1]}` : ''
  const c = item[2] ? ` ${item[2]}` : ''
  return `${a}${b}${c}`
}

export function uniStracktraceyPreset(
  opts: UniStracktraceyPresetOptions
): StacktraceyPreset {
  const { base, sourceRoot, splitThirdParty, uniPlatform, lineOffset } = opts

  let stack: StackTracey

  return {
    /**
     *
     * 微信特殊处理
     * 微信解析步骤：
     *    1. //usr/app-service.js -> 'weixin/__APP__/app-service.map.map'
     *    2. //usr/pages/API/app-service.js -> 'weixin/pages/API/app-service.map.map'
     *    3. uni-list-item/uni-list-item.js -> ${base}/uni-list-item/uni-list-item.js.map
     */
    parseSourceMapUrl(file, fileName, fileRelative) {
      // 组合 sourceMapUrl
      if (fileRelative.indexOf('(') !== -1)
        fileRelative = fileRelative.match(/\((.*)/)![1]
      if (!base || !fileRelative) return ''
      if (sourceRoot) {
        return `${fileRelative.replace(sourceRoot, base + '/')}.map`
      }
      let baseAfter = ''
      if (stack.isMP) {
        if (fileRelative.indexOf('app-service.js') !== -1) {
          baseAfter = (base.match(/\w$/) ? '/' : '') + '__WEIXIN__'
          if (fileRelative === fileName) {
            baseAfter += '/__APP__'
          }
          fileRelative = fileRelative.replace('.js', '.map')
        }
        if (baseAfter && !!fileRelative.match(/^\w/)) baseAfter += '/'
      }
      if (!baseAfter.length) {
        return path.join(base, fileRelative) + '.map'
      }
      return `${base}${baseAfter}${fileRelative}.map`
    },
    getSourceMapContent(file, fileName, fileRelative) {
      if (stack.isMP && fileRelative.indexOf('.js') === -1) {
        return Promise.resolve('')
      }
      const sourcemapUrl = this.parseSourceMapUrl(file, fileName, fileRelative)
      return Promise.resolve(getSourceMapContent(sourcemapUrl))
    },
    parseStacktrace(stacktrace) {
      stack = new StackTracey(stacktrace, uniPlatform)
      return stack
    },
    asTableStacktrace({ maxColumnWidths, stacktrace, stack }) {
      const errorName = stacktrace.split('\n')[0]
      const lines = stack.asTable
        ? stack.asTable(maxColumnWidths ? { maxColumnWidths } : undefined)
        : { items: [], thirdPartyItems: [] }
      if (lines.items.length || lines.thirdPartyItems.length) {
        const { items: stackLines, thirdPartyItems: stackThirdPartyLines } =
          lines

        const userError = stack.itemsHeader
          .map((item) => {
            if (item === '%StacktraceyItem%') {
              const _stack = stackLines.shift()

              return _stack ? joinItem(_stack) : ''
            }
            return item
          })
          .filter(Boolean)
          .join('\n')
        const thirdParty = stackThirdPartyLines.length
          ? stackThirdPartyLines.map(joinItem).join('\n')
          : ''

        if (splitThirdParty) {
          return {
            userError,
            thirdParty,
          }
        }

        return userError + '\n' + thirdParty
      } else {
        if (splitThirdParty) {
          return {
            userError: errorName,
            thirdParty: '',
          }
        }
        return errorName
      }
    },
    lineOffset,
  }
}
export const splitRE = /\r?\n/
interface UTSStracktraceyPreset {
  /**
   * 源码根目录
   */
  inputRoot: string
  /**
   * 编译后根目录
   */
  outputRoot: string
  /**
   * sourceMap 根目录
   */
  sourceMapRoot: string
}
export function utsStracktraceyPreset(
  opts: UTSStracktraceyPreset
): StacktraceyPreset {
  const { inputRoot = '', outputRoot = '', sourceMapRoot = '' } = opts

  let errStack: string[] = []

  return {
    parseSourceMapUrl(file, fileName, fileRelative) {
      return path.resolve(
        sourceMapRoot,
        path.relative(outputRoot, file) + '.map'
      )
    },
    getSourceMapContent(file, fileName, fileRelative) {
      // 根据 base,filename 组合 sourceMapUrl
      return Promise.resolve(
        getSourceMapContent(
          this.parseSourceMapUrl(file, fileName, fileRelative)
        )
      )
    },
    parseStacktrace(str) {
      const lines = (str || '').split(splitRE)

      const entries = lines
        .map((line, index) => {
          line = line.trim()

          const matches = line.match(
            /\s*(.+\.(kt|swift|ets)):([0-9]+):([0-9]+):?\s*(.*)/
          ) as string[]
          if (matches) {
            errStack.push('%StacktraceyItem%')
          } else {
            errStack.push(line)
            return
          }

          if (matches[2] === 'ets') {
            matches[1] =
              (matches[0].match(/File:\s+(.*):(\d+):(\d+)/) || [])[1] ||
              matches[1]
          }

          const fileName: string = matches[1].replace(/^.*(\\|\/|\:)/, '')

          return {
            beforeParse: line,
            callee: '',
            index: false,
            native: false,
            file: nixSlashes(matches[1]),
            line: parseInt(matches[3]),
            column: parseInt(matches[4]),
            fileName,
            fileShort: line,
            errMsg: matches[5] || '',
            calleeShort: '',
            fileRelative: '',
            thirdParty: false,
          }
        })
        .filter((x) => x !== undefined)

      return {
        items: entries as StackTracey.Entry[],
        itemsHeader: [],
      }
    },
    asTableStacktrace({ maxColumnWidths, stacktrace, stack }) {
      return errStack
        .map((item) => {
          if (item === '%StacktraceyItem%') {
            const _stack = stack.items.shift()
            if (_stack) {
              return `at ${nixSlashes(
                path.relative(inputRoot, _stack.file.replace('\\\\?\\', ''))
              )}:${_stack.line}:${_stack.column}
${_stack.errMsg}`
            }
            return ''
          }
          return item
        })
        .join('\n')
    },
  }
}
