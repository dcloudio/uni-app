import { parseExpression } from '@babel/parser'
import {
  ConditionalExpression,
  isConditionalExpression,
  isLiteral,
  isSpreadElement,
  ObjectExpression,
} from '@babel/types'
import {
  createCompilerError,
  createSimpleExpression,
  createStructuralDirectiveTransform,
  ErrorCodes,
  SimpleExpressionNode,
} from '@vue/compiler-core'
import {
  createObjectExpression,
  createVIfConditionalExpression,
  createVIfSpreadElement,
} from '../ast'
import { genNode } from '../codegen'
import { CodegenScope } from '../options'
import { NodeTransform, TransformContext } from '../transform'
import { processExpression } from './transformExpression'
import { rewriteExpression } from './transformIdentifier'

export interface IfNode {
  name: string
  condition: string
}

export const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, _context) => {
    const context = _context as unknown as TransformContext
    if (
      dir.name !== 'else' &&
      (!dir.exp || !(dir.exp as SimpleExpressionNode).content.trim())
    ) {
      const loc = dir.exp ? dir.exp.loc : node.loc
      context.onError(
        createCompilerError(ErrorCodes.X_V_IF_NO_EXPRESSION, dir.loc)
      )
      dir.exp = createSimpleExpression(`true`, false, loc)
    }
    if (context.prefixIdentifiers && dir.exp) {
      dir.exp = processExpression(dir.exp as SimpleExpressionNode, context)
    }

    const condition = dir.exp
      ? parseExpression(genNode(dir.exp).code)
      : undefined
    const { currentScope } = context
    const vIfScope = context.addVIfScope({
      name: dir.name,
      condition,
    })
    return () => {
      const ifNode: IfNode = {
        name: dir.name,
        condition: '',
      }
      if (condition) {
        if (!isLiteral(condition)) {
          ifNode.condition = rewriteExpression(
            dir.exp!,
            currentScope,
            condition
          ).content
        } else {
          ifNode.condition = (dir.exp as SimpleExpressionNode).content
        }
      }
      ;(node as any).ifNode = ifNode
      if (dir.name === 'if') {
        currentScope.properties.push(createVIfSpreadElement(vIfScope))
      } else {
        const vIfSpreadElement = findVIfSpreadElement(currentScope)
        if (!vIfSpreadElement) {
          return context.onError(
            createCompilerError(ErrorCodes.X_V_ELSE_NO_ADJACENT_IF, dir.loc)
          )
        }
        let alternate: ConditionalExpression | ObjectExpression =
          createObjectExpression([])
        if (dir.name === 'else-if') {
          alternate = createVIfConditionalExpression(vIfScope)
        } else if (dir.name === 'else') {
          alternate = createObjectExpression(vIfScope.properties)
        }
        findVIfConditionalExpression(
          vIfSpreadElement.argument as ConditionalExpression
        ).alternate = alternate
      }
    }
  }
) as unknown as NodeTransform

function findVIfSpreadElement({ properties }: CodegenScope) {
  const len = properties.length
  for (let i = len - 1; i >= 0; i--) {
    const prop = properties[i]
    if (isSpreadElement(prop)) {
      return prop
    }
  }
}

function findVIfConditionalExpression(
  vIfConditionalExpression: ConditionalExpression
): ConditionalExpression {
  if (isConditionalExpression(vIfConditionalExpression.alternate)) {
    return findVIfConditionalExpression(vIfConditionalExpression.alternate)
  }
  return vIfConditionalExpression
}
