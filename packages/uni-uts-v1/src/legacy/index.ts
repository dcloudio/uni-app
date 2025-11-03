import fs from 'fs'
import path from 'path'
import {
  type BasicSourceMapConsumer,
  type IndexedSourceMapConsumer,
  SourceMapConsumer,
} from 'source-map'
import { generateCodeFrame } from '../stacktrace/utils'

interface MessageSourceLocation {
  type: 'exception' | 'error' | 'warning' | 'info' | 'logging' | 'output'
  message: string
  file?: string
  line: number
  column: number
  code?: string
}
interface GenerateCodeFrameOptions {
  sourceRoot?: string
  replaceTabsWithSpace?: boolean
}

export function generateCodeFrameSourceMapConsumer(
  consumer: BasicSourceMapConsumer | IndexedSourceMapConsumer,
  m: MessageSourceLocation,
  options: GenerateCodeFrameOptions = {}
): Required<MessageSourceLocation> | undefined {
  if (m.file) {
    const res = consumer.originalPositionFor({
      line: m.line,
      column: m.column,
    })
    if (res.source != null && res.line != null && res.column != null) {
      let code = consumer.sourceContentFor(res.source, true)
      if (code) {
        code = generateCodeFrame(code, { line: res.line, column: res.column })
        if (options.replaceTabsWithSpace) {
          code = code.replace(/\t/g, ' ')
        }
        return {
          type: m.type,
          file: res.source,
          line: res.line,
          column: res.column,
          message: m.message,
          code,
        }
      }
    }
  }
}

function initConsumer(filename: string) {
  if (fs.existsSync(filename)) {
    return new SourceMapConsumer(fs.readFileSync(filename, 'utf8'))
  }
  return Promise.resolve(undefined)
}

export function generateCodeFrameWithSourceMapPath(
  filename: string,
  messages: MessageSourceLocation[] | string,
  options: GenerateCodeFrameOptions = {}
): Promise<Required<MessageSourceLocation>[]> {
  if (typeof messages === 'string') {
    try {
      messages = JSON.parse(messages)
    } catch (e) {}
  }
  if (Array.isArray(messages) && messages.length) {
    return new Promise((resolve) => {
      initConsumer(filename).then((consumer) => {
        resolve(
          (messages as MessageSourceLocation[])
            .map((m) => {
              if (m.file && consumer) {
                const message = generateCodeFrameSourceMapConsumer(
                  consumer,
                  m,
                  options
                )
                if (message) {
                  return message
                }
              }
              if (!m.file) {
                m.file = ''
              }
              return m as Required<MessageSourceLocation>
            })
            .filter(Boolean)
        )
      })
    })
  }
  return Promise.resolve([])
}

interface GenerateCodeFrameWithStacktraceOptions {
  name: string
  inputDir: string
  outputDir: string
}

function resolveSourceMapPath(
  sourceMapFilename: string,
  name: string,
  outputDir: string
) {
  const is_uni_modules = path.basename(path.dirname(name)) === 'uni_modules'
  return path.resolve(
    outputDir,
    '../.sourcemap/app',
    name,
    is_uni_modules ? 'utssdk' : '',
    sourceMapFilename
  )
}

export function generateCodeFrameWithKotlinStacktrace(
  stacktrace: string,
  { name, inputDir, outputDir }: GenerateCodeFrameWithStacktraceOptions
) {
  const sourceMapFilename = resolveSourceMapPath(
    'app-android/index.kt.map',
    name,
    outputDir
  )
  //  e: file://uni_modules/test-api/utssdk/app-android/src/index.kt:70:23 Initializer type mismatch: expected 'String', actual 'Int'.
  return generateCodeFrameWithStacktrace(
    stacktrace,
    // kotlin 1.x 的错误格式
    // /e:\s+(.*):\s+\(([0-9]+),\s+([0-9]+)\):\s+(.*)/g,
    // kotlin 2.2.0 的错误格式
    /e:\s+(.*):([0-9]+):([0-9]+)\s+(.*)/g,
    {
      sourceRoot: inputDir,
      sourceMapFilename,
    }
  )
}

export function generateCodeFrameWithSwiftStacktrace(
  stacktrace: string,
  { name, inputDir, outputDir }: GenerateCodeFrameWithStacktraceOptions
) {
  const sourceMapFilename = resolveSourceMapPath(
    'app-ios/index.swift.map',
    name,
    outputDir
  )
  return generateCodeFrameWithStacktrace(
    stacktrace,
    /(.*):([0-9]+):([0-9]+):\s+error:\s+(.*)/g,
    {
      sourceRoot: inputDir,
      sourceMapFilename,
    }
  )
}

function generateCodeFrameWithStacktrace(
  stacktrace: string,
  regexp: RegExp,
  {
    sourceRoot,
    sourceMapFilename,
    replaceTabsWithSpace,
  }: {
    sourceRoot: string
    sourceMapFilename: string
    replaceTabsWithSpace?: boolean
  }
) {
  return new Promise((resolve) => {
    initConsumer(sourceMapFilename).then((consumer) => {
      if (!consumer) {
        return resolve(stacktrace)
      }
      resolve(
        stacktrace.replace(regexp, (substring, file, line, column, message) => {
          const m = generateCodeFrameSourceMapConsumer(
            consumer,
            {
              type: 'error',
              file,
              message,
              line: parseInt(line),
              column: parseInt(column),
            },
            { sourceRoot, replaceTabsWithSpace }
          )
          if (!m) {
            return substring
          }
          return `error: ${message}
at ${m.file}:${m.line}:${m.column}
${m.code}
`
        })
      )
    })
  })
}
