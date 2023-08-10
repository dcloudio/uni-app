import type { Node } from '@babel/types'
import { ExpressionNode, createSimpleExpression } from '@vue/compiler-core'
import { MagicString, walk } from '@vue/compiler-sfc'
import { parseExpression } from '@babel/parser'
import { CompilerOptions } from './options'

import { stringifyExpression } from './transforms/transformExpression'

import { TransformContext } from './transform'

export function genRenderFunctionDecl({
  targetLanguage,
  filename,
}: CompilerOptions): string {
  return `${
    targetLanguage === 'kotlin' ? '@Suppress("UNUSED_PARAMETER") ' : ''
  }function ${filename}Render(): VNode | null`
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
