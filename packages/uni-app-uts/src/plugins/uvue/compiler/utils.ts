import { type Node } from '@babel/types'
import { ExpressionNode, createSimpleExpression } from '@vue/compiler-core'
import { MagicString, walk } from '@vue/compiler-sfc'
import { parseExpression } from '@babel/parser'
import { CompilerOptions } from './options'

import { stringifyExpression } from './transforms/transformExpression'

import { TransformContext } from './transform'
import { CompilerError } from './errors'
import { camelize, capitalize } from '@vue/shared'
import { normalizeNodeModules, removeExt } from '@dcloudio/uni-cli-shared'
import path from 'path'
import { UVUE_CLASS_NAME_PREFIX } from '../../utils'

export function genRenderFunctionDecl({
  targetLanguage,
  className,
}: CompilerOptions): string {
  return `${
    targetLanguage === 'kotlin' ? '@Suppress("UNUSED_PARAMETER") ' : ''
  }function ${className}Render(): VNode | null`
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

function genComponentPublicInstanceIdent(tagName: string) {
  return capitalize(camelize(tagName)) + 'ComponentPublicInstance'
}

export function genComponentPublicInstanceImported(
  root: string,
  fileName: string
) {
  if (fileName.startsWith('@/')) {
    return (
      UVUE_CLASS_NAME_PREFIX +
      capitalize(
        camelize(
          removeExt(fileName.replace('@/', ''))
            .replace(/\//g, '-')
            .replace(/@/g, '')
            .replace(/\./g, '')
        )
      ) +
      'ComponentPublicInstance'
    )
  }
  return (
    UVUE_CLASS_NAME_PREFIX +
    capitalize(
      camelize(
        removeExt(normalizeNodeModules(path.relative(root, fileName)))
          .replace(/\//g, '-')
          .replace(/@/g, '')
          .replace(/\./g, '')
      )
    ) +
    'ComponentPublicInstance'
  )
}
