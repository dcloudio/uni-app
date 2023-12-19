import path from 'path'
import { type Node } from '@babel/types'
import { camelize, capitalize } from '@vue/shared'
import { ExpressionNode, createSimpleExpression } from '@vue/compiler-core'
import { MagicString, walk } from '@vue/compiler-sfc'
import { parseExpression } from '@babel/parser'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import { TemplateCompilerOptions } from './options'
import { stringifyExpression } from './transforms/transformExpression'
import { TransformContext } from './transform'
import { CompilerError } from './errors'
import { genClassName } from '../../utils'

export function genRenderFunctionDecl({
  className = '',
}: // inline = false,
TemplateCompilerOptions): string {
  // if(inline){
  //   return `(): VNode | null =>`
  // }
  return `function ${className}Render(): VNode | null`
}

export function rewriteObjectExpression(
  exp: ExpressionNode,
  context: TransformContext
) {
  const source = stringifyExpression(exp)
  if (source.includes('{')) {
    const s = new MagicString(source)
    const ast = parseExpression(source, {
      plugins: context.expressionPlugins,
    })
    walk(ast, {
      enter(node: Node) {
        if (node.type === 'ObjectExpression') {
          s.prependLeft(
            node.start!,
            node.properties.length > 0
              ? 'utsMapOf('
              : 'utsMapOf<string, any | null>('
          )
          s.prependRight(node.end!, ')')
        }
      },
    })
    return createSimpleExpression(s.toString(), false, exp.loc)
  }
}

export function onCompilerError(error: CompilerError) {}

export function genImportComponentPublicInstance(
  rootDir: string,
  tagName: string,
  fileName: string
) {
  if (fileName.includes('@dcloudio')) {
    return ''
  }
  return `, { ${genComponentPublicInstanceImported(
    rootDir,
    fileName
  )} as ${genComponentPublicInstanceIdent(tagName)} }`
}

export function genComponentPublicInstanceIdent(tagName: string) {
  return capitalize(camelize(tagName)) + 'ComponentPublicInstance'
}

export function genComponentPublicInstanceImported(
  root: string,
  fileName: string
) {
  if (path.isAbsolute(fileName)) {
    fileName = normalizePath(path.relative(root, fileName))
  }
  if (fileName.startsWith('@/')) {
    return genClassName(fileName.replace('@/', '')) + 'ComponentPublicInstance'
  }
  return genClassName(fileName) + 'ComponentPublicInstance'
}

export function addEasyComponentAutoImports(
  easyComponentAutoImports: Record<string, [string, string]>,
  rootDir: string,
  tagName: string,
  fileName: string
) {
  // 内置easycom，如 unicloud-db
  if (fileName.includes('@dcloudio')) {
    return
  }
  if (path.isAbsolute(fileName)) {
    fileName = '@/' + normalizePath(path.relative(rootDir, fileName))
  }
  easyComponentAutoImports[fileName] = [
    genComponentPublicInstanceImported(rootDir, fileName),
    genComponentPublicInstanceIdent(tagName),
  ]
}
