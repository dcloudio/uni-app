import path from 'path'
import { init, parse } from 'es-module-lexer'
import { normalizePath, removeExt } from '@dcloudio/uni-cli-shared'
import { camelize, capitalize } from '@vue/shared'

export const ENTRY_FILENAME = 'index.uts'

export async function parseImports(code: string) {
  await init
  const [imports] = parse(code)
  return imports
    .map(({ s, e }) => {
      return `import "${code.slice(s, e)}"`
    })
    .join('\n')
}

export function uvueOutDir() {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.uvue')
}

export function genClassName(fileName: string) {
  return (
    'Gen' +
    capitalize(camelize(removeExt(normalizePath(fileName).replace(/\//g, '-'))))
  )
}

export function isVue(filename: string) {
  return filename.endsWith('.vue') || filename.endsWith('.uvue')
}

export function stringifyMap(obj: unknown) {
  return mapToInitString(objToMap(obj as Record<string, unknown>), true)
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
