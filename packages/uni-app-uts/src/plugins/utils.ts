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
  return capitalize(
    camelize(removeExt(normalizePath(fileName).replace(/\//g, '-')))
  )
}
