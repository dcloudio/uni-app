import path from 'path'
import { init, parse } from 'es-module-lexer'
import {
  normalizeNodeModules,
  normalizePath,
  removeExt,
} from '@dcloudio/uni-cli-shared'
import {
  camelize,
  capitalize,
  isArray,
  isPlainObject,
  isString,
} from '@vue/shared'

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

export function genClassName(fileName: string, prefix: string = 'Gen') {
  return (
    prefix +
    capitalize(camelize(removeExt(normalizePath(fileName).replace(/\//g, '-'))))
  )
}

export function isVue(filename: string) {
  return filename.endsWith('.vue') || filename.endsWith('.uvue')
}

export function stringifyMap(obj: unknown) {
  return serialize(obj, true)
}

function serialize(obj: unknown, ts: boolean = false): string {
  if (isString(obj)) {
    return `"${obj}"`
  } else if (isPlainObject(obj)) {
    const entries = Object.entries(obj).map(
      ([key, value]) => `[${serialize(key, ts)},${serialize(value, ts)}]`
    )
    return `new Map${ts ? '<string, any>' : ''}([${entries.join(',')}])`
  } else if (isArray(obj)) {
    return `[${obj.map((item) => serialize(item, ts)).join(',')}]`
  } else {
    return String(obj)
  }
}

export function parseUTSRelativeFilename(filename: string) {
  if (!path.isAbsolute(filename)) {
    return filename
  }
  return normalizeNodeModules(
    path.relative(process.env.UNI_INPUT_DIR, filename)
  )
}

export function parseUTSImportFilename(filename: string) {
  if (!path.isAbsolute(filename)) {
    return filename
  }
  return normalizePath(
    path.join(
      uvueOutDir(),
      normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, filename))
    )
  )
}
