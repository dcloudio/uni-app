import path from 'path'
import fs from 'fs-extra'
import { relative } from '../utils'
import { originalPositionFor } from '../sourceMap'
import { generateCodeFrame } from './utils'

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

export function hbuilderFormatter(m: MessageSourceLocation) {
  const msgs: string[] = []
  let msg = m.type + ': ' + m.message
  if (m.type === 'warning') {
    // 忽略部分警告
    if (msg.includes(`Classpath entry points to a non-existent location:`)) {
      return ''
    }
    msg
      .replace(/\r\n/g, '\n')
      .split('\n')
      .forEach((m) => {
        msgs.push('\u200B' + m + '\u200B')
      })
  } else if (m.type === 'error' || m.type === 'exception') {
    msg
      .replace(/\r\n/g, '\n')
      .split('\n')
      .forEach((m) => {
        msgs.push('\u200C' + m + '\u200C')
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
  return msgs.join('\n')
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
    function resolveSourceMapFile(file: string) {
      const sourceMapFile = path.resolve(
        options.sourceMapDir,
        relative(file, options.inputDir) + '.map'
      )
      if (fs.existsSync(sourceMapFile)) {
        return sourceMapFile
      }
    }
    for (const m of messages) {
      if (m.file) {
        const sourceMapFile = resolveSourceMapFile(m.file)
        if (sourceMapFile) {
          const originalPosition = await originalPositionFor({
            sourceMapFile,
            line: m.line!,
            column: m.column!,
            withSourceContent: true,
          })

          if (originalPosition.source && originalPosition.sourceContent) {
            m.file = originalPosition.source.split('?')[0]
            if (originalPosition.line !== null) {
              m.line = originalPosition.line
            }
            if (originalPosition.column !== null) {
              m.column = originalPosition.column
            }
            if (
              originalPosition.line !== null &&
              originalPosition.column !== null
            ) {
              m.code = generateCodeFrame(originalPosition.sourceContent, {
                line: originalPosition.line,
                column: originalPosition.column,
              }).replace(/\t/g, ' ')
            }
          }
        }
      }
      const msg = options.format(m)
      if (msg) {
        msgs.push(msg)
      }
    }
  }
  return msgs.join('\n')
}
