import postcss, { Message } from 'postcss'
import { objectifier } from './objectifier'
import { expand } from './expand'
import { normalize } from './normalize'
import { NormalizeOptions } from './utils'

interface ParseOptions extends NormalizeOptions {
  filename?: string
  map?: boolean
  ts?: boolean
  chunk?: number
  noCode?: boolean
}

export async function parse(input: string, options: ParseOptions = {}) {
  const { root, messages } = await postcss([
    expand(options),
    normalize(options),
  ])
    .process(input, {
      from: options.filename || 'foo.css',
    })
    .catch((err: any) => {
      return {
        root: null,
        messages: [
          {
            type: 'error',
            text: err.message,
          } as Message,
        ],
      }
    })
  if (options.noCode === true) {
    return { code: '', messages }
  }
  const obj = root ? objectifier(root) : {}
  if (options.map) {
    return {
      code: mapToInitStringChunk(
        objToMap(obj),
        options.ts,
        true,
        options.chunk
      ),
      messages,
    }
  }
  return { code: JSON.stringify(obj), messages }
}

function mapToInitStringChunk(
  map: Map<string, unknown>,
  ts: boolean = false,
  isRoot: boolean = false,
  chunk: number = 0
): string {
  if (!chunk) {
    return mapToInitString(map, ts, isRoot)
  }
  const chunks: string[] = []
  let chunkMap: Map<string, unknown> = new Map()
  let chunkCount = 0
  for (const [key, value] of map) {
    if (chunkCount === chunk) {
      chunks.push(mapToInitString(chunkMap, ts, isRoot))
      chunkMap = new Map()
      chunkCount = 0
    }
    chunkMap.set(key, value)
    chunkCount++
  }
  if (chunkCount) {
    chunks.push(mapToInitString(chunkMap, ts, isRoot))
  }
  return `[${chunks.join(',')}]`
}

function mapToInitString(
  map: Map<string, unknown>,
  ts: boolean = false,
  isRoot: boolean = false
): string {
  const entries = []
  for (let [key, value] of map) {
    if (value instanceof Map) {
      entries.push(`["${key}", ${mapToInitString(value, ts)}]`)
    } else {
      entries.push(`["${key}", ${JSON.stringify(value)}]`)
    }
  }
  return `new Map${
    ts
      ? isRoot
        ? '<string, Map<string, Map<string, any>>>'
        : '<string, any>'
      : ''
  }([${entries.join(', ')}])`
}

function objToMap(obj: Record<string, unknown>) {
  const map = new Map()
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'object') {
      map.set(key, objToMap(value as Record<string, unknown>))
    } else {
      map.set(key, value)
    }
  }
  return map
}
