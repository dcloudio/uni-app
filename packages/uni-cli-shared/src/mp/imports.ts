import path from 'path'
import type { PluginContext } from 'rollup'
import {
  type ImportSpecifier,
  init,
  parse as parseImports,
} from 'es-module-lexer'
import { extend } from '@vue/shared'
import { isImportDeclaration, isImportDefaultSpecifier } from '@babel/types'
import { parse } from '@babel/parser'
import { EXTNAME_VUE, EXTNAME_VUE_RE } from '../constants'
import { normalizeParsePlugins } from '../utils'
/**
 * 暂时没用
 * @param source
 * @param importer
 * @param resolve
 * @returns
 */
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

  const rewriteImports: (ImportSpecifier & { i: string })[] = []
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
      const expr = parse(source.slice(importSpecifier.ss, importSpecifier.se), {
        plugins: normalizeParsePlugins(res.id),
        sourceType: 'module',
      }).program.body[0]
      if (isImportDeclaration(expr) && expr.specifiers.length === 1) {
        const importDefaultSpecifier = expr.specifiers[0]
        if (!isImportDefaultSpecifier(importDefaultSpecifier)) {
          continue
        }
        rewriteImports.push(
          extend(importSpecifier, {
            n: res.id,
            i: importDefaultSpecifier.local.name,
          })
        )
      }
    }
  }
  return rewriteImports
}
