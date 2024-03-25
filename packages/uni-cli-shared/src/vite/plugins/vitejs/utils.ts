/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts
 */
import os from 'os'
import path from 'path'
import remapping from '@ampproject/remapping'
import type { DecodedSourceMap, RawSourceMap } from '@ampproject/remapping'
import { Position, SourceLocation } from '@vue/compiler-core'
import { LinesAndColumns } from 'lines-and-columns'

export function slash(p: string): string {
  return p.replace(/\\/g, '/')
}

export const bareImportRE = /^[\w@](?!.*:\/\/)/
export const deepImportRE = /^([^@][^/]*)\/|^(@[^/]+\/[^/]+)\//

export const isWindows = os.platform() === 'win32'

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export const queryRE = /\?.*$/s
export const hashRE = /#.*$/s

export const cleanUrl = (url: string): string =>
  url.replace(hashRE, '').replace(queryRE, '')

export const externalRE = /^(https?:)?\/\//
export const isExternalUrl = (url: string): boolean => externalRE.test(url)

export const dataUrlRE = /^\s*data:/i
export const isDataUrl = (url: string): boolean => dataUrlRE.test(url)

export const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm

export async function asyncReplace(
  input: string,
  re: RegExp,
  replacer: (match: RegExpExecArray) => string | Promise<string>
): Promise<string> {
  let match: RegExpExecArray | null
  let remaining = input
  let rewritten = ''
  while ((match = re.exec(remaining))) {
    rewritten += remaining.slice(0, match.index)
    rewritten += await replacer(match)
    remaining = remaining.slice(match.index + match[0].length)
  }
  rewritten += remaining
  return rewritten
}

export function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const splitRE = /\r?\n/

const range: number = 2

export function pad(source: string, n = 2): string {
  const lines = source.split(splitRE)
  return lines.map((l) => ` `.repeat(n) + l).join(`\n`)
}

export function offsetToStartAndEnd(
  source: string,
  startOffset: number,
  endOffset: number
): SourceLocation {
  const lines = new LinesAndColumns(source)
  return {
    start: offsetToLineColumnByLines(lines, startOffset),
    end: offsetToLineColumnByLines(lines, endOffset),
    source: '',
  }
}

export function offsetToLineColumn(
  source: string,
  offset: number
): { line: number; column: number } {
  return offsetToLineColumnByLines(new LinesAndColumns(source), offset)
}

export function offsetToLineColumnByLines(
  lines: LinesAndColumns,
  offset: number
): Position {
  let location = lines.locationForIndex(offset)
  if (!location) {
    location = lines.locationForIndex(offset)!
  }
  // lines-and-columns is 0-indexed while positions are 1-indexed
  return { line: location.line + 1, column: location.column, offset: 0 }
}

export function posToNumber(
  source: string,
  pos: number | { line: number; column: number }
): number {
  if (typeof pos === 'number') return pos
  return posToNumberByLines(new LinesAndColumns(source), pos.line, pos.column)
}

function posToNumberByLines(
  lines: LinesAndColumns,
  line: number,
  column: number
) {
  // lines-and-columns is 0-indexed while positions are 1-indexed
  return lines.indexForLocation({ line: line - 1, column }) || 0
}

export function locToStartAndEnd(
  source: string,
  loc: {
    start: { line: number; column: number }
    end: { line: number; column: number }
  }
) {
  const lines = new LinesAndColumns(source)
  const start = posToNumberByLines(lines, loc.start.line, loc.start.column)
  const end = loc.end
    ? posToNumberByLines(lines, loc.end.line, loc.end.column)
    : undefined
  return { start, end }
}

export function generateCodeFrame(
  source: string,
  start: number | { line: number; column: number } = 0,
  end?: number
): string {
  start = posToNumber(source, start)
  end = end || start
  // Split the content into individual lines but capture the newline sequence
  // that separated each line. This is important because the actual sequence is
  // needed to properly take into account the full line length for offset
  // comparison
  let lines = source.split(/(\r?\n)/)

  // Separate the lines and newline sequences into separate arrays for easier referencing
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1)
  lines = lines.filter((_, idx) => idx % 2 === 0)

  let count = 0
  const res: string[] = []
  for (let i = 0; i < lines.length; i++) {
    count +=
      lines[i].length +
      ((newlineSequences[i] && newlineSequences[i].length) || 0)
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
        const newLineSeqLength =
          (newlineSequences[j] && newlineSequences[j].length) || 0

        if (j === i) {
          // push underline
          const pad = start - (count - (lineLength + newLineSeqLength))
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

          count += lineLength + newLineSeqLength
        }
      }
      break
    }
  }
  return res.join('\n')
}

// export function generateCodeFrame(
//   source: string,
//   start: number | { line: number; column: number } = 0,
//   end?: number
// ): string {
//   start = posToNumber(source, start)
//   end = end || start
//   const lines = source.split(splitRE)
//   let count = 0
//   const res: string[] = []
//   for (let i = 0; i < lines.length; i++) {
//     count += lines[i].length + 1
//     if (count >= start) {
//       for (let j = i - range; j <= i + range || end > count; j++) {
//         if (j < 0 || j >= lines.length) continue
//         const line = j + 1
//         res.push(
//           `${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${
//             lines[j]
//           }`
//         )
//         const lineLength = lines[j].length
//         if (j === i) {
//           // push underline
//           const pad = start - (count - lineLength) + 1
//           const length = Math.max(
//             1,
//             end > count ? lineLength - pad : end - start
//           )
//           res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length))
//         } else if (j > i) {
//           if (end > count) {
//             const length = Math.max(Math.min(end - count, lineLength), 1)
//             res.push(`   |  ` + '^'.repeat(length))
//           }
//           count += lineLength + 1
//         }
//       }
//       break
//     }
//   }
//   return res.join('\n')
// }

interface ImageCandidate {
  url: string
  descriptor: string
}
const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g
const imageSetUrlRE = /^(?:[\w\-]+\(.*?\)|'.*?'|".*?"|\S*)/
export async function processSrcSet(
  srcs: string,
  replacer: (arg: ImageCandidate) => Promise<string>
): Promise<string> {
  const imageCandidates: ImageCandidate[] = srcs
    .split(',')
    .map((s) => {
      const src = s.replace(escapedSpaceCharacters, ' ').trim()
      const [url] = imageSetUrlRE.exec(src) || []

      return {
        url: url!,
        descriptor: src?.slice(url!.length).trim(),
      }
    })
    .filter(({ url }) => !!url)

  const ret = await Promise.all(
    imageCandidates.map(async ({ url, descriptor }) => {
      return {
        url: await replacer({ url, descriptor }),
        descriptor,
      }
    })
  )

  const url = ret.reduce((prev, { url, descriptor }, index) => {
    descriptor = descriptor || ''
    return (prev +=
      url + ` ${descriptor}${index === ret.length - 1 ? '' : ', '}`)
  }, '')

  return url
}

function escapeToLinuxLikePath(path: string) {
  if (/^[A-Z]:/.test(path)) {
    return path.replace(/^([A-Z]):\//, '/windows/$1/')
  }
  if (/^\/[^/]/.test(path)) {
    return `/linux${path}`
  }
  return path
}

function unescapeToLinuxLikePath(path: string) {
  if (path.startsWith('/linux/')) {
    return path.slice('/linux'.length)
  }
  if (path.startsWith('/windows/')) {
    return path.replace(/^\/windows\/([A-Z])\//, '$1:/')
  }
  return path
}

// based on https://github.com/sveltejs/svelte/blob/abf11bb02b2afbd3e4cac509a0f70e318c306364/src/compiler/utils/mapped_code.ts#L221
const nullSourceMap: RawSourceMap = {
  names: [],
  sources: [],
  mappings: '',
  version: 3,
}

export function combineSourcemaps(
  filename: string,
  sourcemapList: Array<DecodedSourceMap | RawSourceMap>,
  excludeContent = true
): RawSourceMap {
  if (
    sourcemapList.length === 0 ||
    sourcemapList.every((m) => m.sources.length === 0)
  ) {
    return { ...nullSourceMap }
  }

  // hack for parse broken with normalized absolute paths on windows (C:/path/to/something).
  // escape them to linux like paths
  // also avoid mutation here to prevent breaking plugin's using cache to generate sourcemaps like vue (see #7442)
  sourcemapList = sourcemapList.map((sourcemap) => {
    const newSourcemaps = { ...sourcemap }
    newSourcemaps.sources = sourcemap.sources.map((source) =>
      source ? escapeToLinuxLikePath(source) : null
    )
    if (sourcemap.sourceRoot) {
      newSourcemaps.sourceRoot = escapeToLinuxLikePath(sourcemap.sourceRoot)
    }
    return newSourcemaps
  })
  const escapedFilename = escapeToLinuxLikePath(filename)

  // We don't declare type here so we can convert/fake/map as RawSourceMap
  let map //: SourceMap
  let mapIndex = 1
  const useArrayInterface =
    sourcemapList.slice(0, -1).find((m) => m.sources.length !== 1) === undefined
  if (useArrayInterface) {
    map = remapping(sourcemapList, () => null, excludeContent)
  } else {
    map = remapping(
      sourcemapList[0],
      function loader(sourcefile) {
        if (sourcefile === escapedFilename && sourcemapList[mapIndex]) {
          return sourcemapList[mapIndex++]
        } else {
          return null
        }
      },
      excludeContent
    )
  }
  if (!map.file) {
    delete map.file
  }

  // unescape the previous hack
  map.sources = map.sources.map((source) =>
    source ? unescapeToLinuxLikePath(source) : source
  )
  map.file = filename

  return map as RawSourceMap
}
