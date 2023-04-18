import postcss, { Message } from 'postcss'
import { objectifier } from './objectifier'
import { expand } from './expand'
import { NormalizeOptions, normalize } from './normalize'

interface ParseOptions extends NormalizeOptions {
  filename?: string
  map?: boolean
  ts?: boolean
}

export async function parse(input: string, options: ParseOptions = {}) {
  const { root, messages } = await postcss([expand, normalize(options)])
    .process(input, {
      from: options.filename || 'foo.css',
    })
    .catch((err: any) => {
      return {
        root: null,
        messages: [
          {
            type: 'warning',
            text: err.message,
          } as Message,
        ],
      }
    })
  const obj = root ? objectifier(root) : {}
  if (options.map) {
    return { code: mapToInitString(objToMap(obj), options.ts), messages }
  }
  return { code: JSON.stringify(obj), messages }
}

function mapToInitString(
  map: Map<string, unknown>,
  ts: boolean = false
): string {
  let entries = []
  for (let [key, value] of map) {
    if (value instanceof Map) {
      entries.push(`["${key}", ${mapToInitString(value, ts)}]`)
    } else {
      entries.push(`["${key}", ${JSON.stringify(value)}]`)
    }
  }
  return `new Map${ts ? '<string, any>' : ''}([${entries.join(', ')}])`
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
