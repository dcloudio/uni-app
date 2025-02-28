import fs from 'fs'
import path, { relative } from 'path'
import { normalizePath } from '../shared'

export interface GenerateRuntimeCodeFrameOptions {
  cacheDir: string
  logType?: 'log' | 'info' | 'warn' | 'debug' | 'error'
}

export const COLORS: Record<string, string> = {
  warn: '\u200B',
  error: '\u200C',
}

export const splitRE = /\r?\n/

export function resolveSourceMapDirByCacheDir(cacheDir: string) {
  return path.resolve(cacheDir, 'sourcemap')
}

export function resolveSourceMapFileBySourceFile(
  file: string,
  sourceMapDir: string
) {
  const sourceMapFile = path.resolve(sourceMapDir, file + '.map')
  if (fs.existsSync(sourceMapFile)) {
    return sourceMapFile
  }
}

const range: number = 2

function posToNumber(
  source: string,
  pos: number | { line: number; column: number }
): number {
  if (typeof pos === 'number') return pos
  const lines = source.split(splitRE)
  const { line, column } = pos
  let start = 0
  for (let i = 0; i < line - 1; i++) {
    start += lines[i].length + 1
  }
  return start + column
}

export function lineColumnToStartEnd(
  source: string,
  line: number,
  column: number
) {
  const lines = source.split(splitRE)
  let start = 0
  for (let i = 0; i < line - 1; i++) {
    start += lines[i].length + 1
  }
  return {
    start: start + column,
    end: start + lines[line - 1].length,
  }
}

export function generateCodeFrame(
  source: string,
  start: number | { line: number; column: number } = 0,
  end?: number
): string {
  start = posToNumber(source, start)
  end = end || start
  const lines = source.split(splitRE)
  let count = 0
  const res: string[] = []
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue
        const line = j + 1
        res.push(
          `${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${
            lines[j]
          }`
        )
        const lineLength = lines[j].length
        if (j === i) {
          // push underline
          const pad = start - (count - lineLength) + 1
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          )
          res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length))
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1)
            res.push(`   |  ` + '^'.repeat(length))
          }
          count += lineLength + 1
        }
      }
      break
    }
  }
  return res.join('\n')
}

export function parseRelativeSourceFile(
  sourceFile: string,
  sourceRoot?: string | null
) {
  if (!sourceRoot) {
    return sourceFile
  }
  sourceFile = normalizePath(sourceFile)
  sourceRoot = normalizePath(sourceRoot)
  if (sourceFile.startsWith(sourceRoot)) {
    return normalizePath(relative(sourceRoot, sourceFile))
  }
  return sourceFile
}
