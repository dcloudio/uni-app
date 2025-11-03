import { isString } from '@vue/shared'
import postcss, { type Message } from 'postcss'
import { objectifier } from './objectifier'
import { expand, vueStyleValidator } from './expand'
import { normalize } from './normalize'
import type { NormalizeOptions } from './utils'

export interface ParseOptions extends NormalizeOptions {
  filename?: string
  map?: boolean
  mapOf?: string
  padStyleMapOf?: string
  ts?: boolean
  chunk?: number
  noCode?: boolean
  trim?: boolean
}

export async function parse(input: string, options: ParseOptions = {}) {
  const { root, messages } = await postcss([
    vueStyleValidator(options),
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
  const obj = root ? objectifier(root, { trim: !!options.trim }) : {}
  if (options.map || options.mapOf) {
    return {
      code: mapToInitStringChunk(
        objToMap(obj),
        options.ts,
        true,
        options.mapOf,
        options.padStyleMapOf,
        options.chunk
      ),
      messages,
    }
  }
  let code = JSON.stringify(obj)
  if (options.type === 'uvue') {
    // TODO 暂时仅简易转换 CSS 变量
    code = code.replace(/\:\s*"(.+?)"/g, function (str, p1) {
      return isExpr(p1) ? `:${p1}` : str
    })
  }
  return { code, messages }
}

function mapToInitStringChunk(
  map: Map<string, unknown>,
  ts: boolean = false,
  isRoot: boolean = false,
  mapOf = '',
  padStyleMapOf = '',
  chunk: number = 0
): string {
  if (!chunk) {
    return mapToInitString(map, ts, isRoot, mapOf, padStyleMapOf)
  }
  const chunks: string[] = []
  let chunkMap: Map<string, unknown> = new Map()
  let chunkCount = 0
  for (const [key, value] of map) {
    if (chunkCount === chunk) {
      chunks.push(mapToInitString(chunkMap, ts, isRoot, mapOf, padStyleMapOf))
      chunkMap = new Map()
      chunkCount = 0
    }
    chunkMap.set(key, value)
    chunkCount++
  }
  if (chunkCount) {
    chunks.push(mapToInitString(chunkMap, ts, isRoot, mapOf, padStyleMapOf))
  }
  return `[${chunks.join(',')}]`
}

function mapToInitString(
  map: Map<string, unknown>,
  ts: boolean = false,
  isRoot: boolean = false,
  mapOf = '',
  padStyleMapOf = ''
): string {
  const entries: string[] = []
  for (let [key, value] of map) {
    if (value instanceof Map) {
      // trim
      if (isRoot && !(value.values().next().value instanceof Map)) {
        entries.push(
          `["${key}", ${padStyleMapOf}(${mapToInitString(
            value,
            ts,
            false,
            mapOf,
            padStyleMapOf
          )})]`
        )
      } else {
        entries.push(
          `["${key}", ${mapToInitString(
            value,
            ts,
            false,
            mapOf,
            padStyleMapOf
          )}]`
        )
      }
    } else {
      entries.push(
        `["${key}", ${
          isString(value) && isExpr(value) ? value : JSON.stringify(value)
        }]`
      )
    }
  }
  if (mapOf) {
    return `${mapOf}([${entries.join(', ')}])`
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

function isExpr(value: string) {
  const v = value.slice(0, 5)
  return /* CSS_VAR_ */ v === 'CSS_V' || v === 'calc('
}
