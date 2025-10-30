import { parse } from '@babel/parser'
import MagicString from 'magic-string'
import type { Identifier } from '@babel/types'
import type { Plugin } from 'vite'

export function rewriteImportVuePlugin(): Plugin {
  return {
    name: 'uni:rewrite-import-vue',
    enforce: 'post',
    async renderChunk(source, chunk) {
      if (chunk.fileName.endsWith('.js')) {
        const rewritten = rewriteImportVue(source)
        if (rewritten.hasChanged()) {
          return {
            code: rewritten.toString(),
            map: rewritten.generateMap(),
          }
        }
      }
    },
  }
}

/**
 * import { xx as yy, zz } from 'vue' =>
 * const { xx: yy, zz } = globalThis.Vue
 */
export function rewriteImportVue(input: string) {
  const ast = parse(input, {
    sourceType: 'module',
  }).program.body
  const s = new MagicString(input)
  ast.forEach((node) => {
    if (node.type === 'ImportDeclaration' && node.source.value === 'vue') {
      const specifiers = node.specifiers
      const imports: string[] = []
      specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          const imported = (specifier.imported as Identifier).name
          const local = specifier.local.name
          if (imported === local) {
            imports.push(imported)
          } else {
            imports.push(`${imported}: ${local}`)
          }
        } else if (specifier.type === 'ImportDefaultSpecifier') {
          const local = specifier.local.name
          imports.push(`default: ${local}`)
        } else if (specifier.type === 'ImportNamespaceSpecifier') {
          const local = specifier.local.name
          s.overwrite(node.start!, node.end!, `const ${local} = globalThis.Vue`)
          return
        }
      })
      if (imports.length > 0) {
        s.overwrite(
          node.start!,
          node.end!,
          `const { ${imports.join(', ')} } = globalThis.Vue`
        )
      } else {
        s.remove(node.start!, node.end!)
      }
    }
  })
  return s
}
