import path from 'path'
import { PluginContext } from 'rollup'
import { init, parse as parseImports, ImportSpecifier } from 'es-module-lexer'
import { extend } from '@vue/shared'
import { EXTNAME_VUE, EXTNAME_VUE_RE } from '../constants'

export async function findVueComponentImports(
  source: string,
  importer: string,
  resolve: PluginContext['resolve']
) {
  await init
  let imports: readonly ImportSpecifier[] = []
  // strip UTF-8 BOM
  if (source.charCodeAt(0) === 0xfeff) {
    source = source.slice(1)
  }
  try {
    imports = parseImports(source)[0]
  } catch (e: any) {
    console.error(e)
  }
  if (!imports.length) {
    return []
  }

  const rewriteImports: ImportSpecifier[] = []
  for (let i = 0; i < imports.length; i++) {
    const importSpecifier = imports[i]
    const { n } = importSpecifier
    if (!n) {
      continue
    }
    const extname = path.extname(n)
    // 仅处理没有后缀，或后缀是.vue,.nvue的文件
    if (extname && !EXTNAME_VUE.includes(extname)) {
      continue
    }
    const res = await resolve(n, importer)
    if (!res) {
      continue
    }
    if (EXTNAME_VUE_RE.test(res.id)) {
      rewriteImports.push(extend(importSpecifier, { n: res.id }))
    }
  }
  return rewriteImports
}
