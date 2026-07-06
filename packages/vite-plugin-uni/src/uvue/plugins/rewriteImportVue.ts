import { parse } from '@babel/parser'
import {
  type ImportSpecifier,
  init as initEsModuleLexer,
  parse as parseImports,
} from 'es-module-lexer'
import MagicString from 'magic-string'
import type { Identifier, ImportDeclaration } from '@babel/types'
import type { Plugin } from 'vite'

/**
 * 如下情况会生成import vue的代码：
 * 1. uvue页面编译产物通过helpers方式导入的vue相关api，defineComponent、unref等
 * 2. 用户代码script中的ref、reactive、computed等
 * 3. onLoad等从@dcloudio/uni-app导入的api等
 * 4. 用户代码script中import vue的api
 *
 * 如果在transform中处理，需要确保此插件在autoImport之后，否则此时2、3尚未生成import vue的代码。
 * 如果在renderChunk中处理，能保证所有代码都已经生成import vue的代码，但是此时热更新会触发所有文件重新处理import vue。
 */
export function rewriteImportVuePlugin(): Plugin {
  return {
    name: 'uni:rewrite-import-vue',
    enforce: 'post',
    async transform(source, id) {
      await initEsModuleLexer
      const [imports] = parseImports(source)
      const vueImportRanges = imports.filter(
        (specifier) => specifier.n === 'vue' && specifier.d === -1
      )
      if (!vueImportRanges.length) {
        return
      }
      const rewritten = rewriteImportVue(source, vueImportRanges)
      if (rewritten.hasChanged()) {
        return {
          code: rewritten.toString(),
          // 必须指定hires，不然部分情况可能会无法正确映射行号。
          map: rewritten.generateMap({ hires: 'boundary' }),
        }
      }
    },
  }
}

/**
 * import { xx as yy, zz } from 'vue' =>
 * const { xx: yy, zz } = globalThis.Vue
 */
export function rewriteImportVue(
  input: string,
  importRanges?: Pick<ImportSpecifier, 'ss' | 'se'>[]
) {
  const s = new MagicString(input)

  if (importRanges) {
    importRanges.forEach(({ ss, se }) => {
      const rewritten = rewriteImportVueStatement(input.slice(ss, se))
      if (rewritten !== undefined) {
        s.overwrite(ss, se, rewritten)
      }
    })
  } else {
    const ast = parse(input, {
      sourceType: 'module',
    }).program.body
    ast.forEach((node) => {
      if (node.type === 'ImportDeclaration' && node.source.value === 'vue') {
        const rewritten = createImportVueReplacement(node)
        if (rewritten !== undefined) {
          s.overwrite(node.start!, node.end!, rewritten)
        }
      }
    })
  }

  return s
}

function rewriteImportVueStatement(input: string) {
  const node = parse(input, {
    sourceType: 'module',
  }).program.body[0]
  if (node?.type === 'ImportDeclaration' && node.source.value === 'vue') {
    return createImportVueReplacement(node)
  }
}

function createImportVueReplacement(node: ImportDeclaration) {
  const imports: string[] = []
  const declarations: string[] = []
  node.specifiers.forEach((specifier) => {
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
      declarations.push(`const ${local} = globalThis.Vue`)
    }
  })
  if (imports.length > 0) {
    declarations.push(`const { ${imports.join(', ')} } = globalThis.Vue`)
  }
  return declarations.join(';')
}
