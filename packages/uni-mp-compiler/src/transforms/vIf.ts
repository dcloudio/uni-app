import {
  type ConditionalExpression,
  type ObjectExpression,
  isConditionalExpression,
  isSpreadElement,
} from '@babel/types'
import {
  type DirectiveNode,
  type ElementNode,
  ErrorCodes,
  type IfBranchNode,
  type IfNode,
  NodeTypes,
  type SimpleExpressionNode,
  createCompilerError,
  createSimpleExpression,
} from '@vue/compiler-core'
import {
  createObjectExpression,
  createVIfConditionalExpression,
  createVIfSpreadElement,
  parseExpr,
} from '../ast'
import type { CodegenScope } from '../options'
import {
  type NodeTransform,
  type TransformContext,
  createStructuralDirectiveTransform,
  traverseNode,
} from '../transform'
import { processExpression } from './transformExpression'
import { isStaticLiteral, rewriteExpression } from './utils'
import { isCommentNode } from '@dcloudio/uni-cli-shared'

interface IfOptions {
  name: string
  condition?: string
}

export type IfElementNode = ElementNode & {
  vIf: IfOptions
}
export function isIfElementNode(node: unknown): node is IfElementNode {
  return !!(node as IfElementNode).vIf
}

export const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      const { currentScope: parentScope, popScope } = context
      const ifOptions: IfOptions = {
        name: dir.name,
      }
      branch.vIf = ifOptions
      const condition = dir.exp ? parseExpr(dir.exp, context) : undefined
      const vIfScope = context.addVIfScope({
        name: dir.name,
        condition,
      })
      if (condition) {
        if (!isStaticLiteral(condition)) {
          ifOptions.condition = rewriteExpression(
            dir.exp!,
            context,
            condition,
            parentScope
          ).content
        } else {
          ifOptions.condition = (dir.exp as SimpleExpressionNode).content
        }
      }
      return () => {
        if (isRoot) {
          parentScope.properties.push(createVIfSpreadElement(vIfScope))
        } else {
          const vIfSpreadElement = findVIfSpreadElement(parentScope)
          if (!vIfSpreadElement) {
            popScope()
            return context.onError(
              createCompilerError(ErrorCodes.X_V_ELSE_NO_ADJACENT_IF, node.loc)
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
        popScope()
      }
    })
  }
) as unknown as NodeTransform

export function processIf(
  node: ElementNode,
  dir: DirectiveNode,
  context: TransformContext,
  processCodegen?: (
    node: IfNode,
    branch: IfElementNode,
    isRoot: boolean
  ) => (() => void) | undefined
) {
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
    // dir.exp can only be simple expression because vIf transform is applied
    // before expression transform.
    dir.exp = processExpression(dir.exp as SimpleExpressionNode, context)
  }

  if (dir.name === 'if') {
    const ifNode: IfNode = {
      type: NodeTypes.IF,
      loc: node.loc,
      branches: [node as unknown as IfBranchNode],
    }
    context.replaceNode(ifNode)
    if (processCodegen) {
      return processCodegen(ifNode, node as IfElementNode, true)
    }
  } else {
    // locate the adjacent v-if
    const siblings = context.parent!.children
    let i = siblings.indexOf(node)
    while (i-- >= -1) {
      const sibling = siblings[i]
      if (sibling && isCommentNode(sibling)) {
        context.removeNode(sibling)
        continue
      }

      if (
        sibling &&
        sibling.type === NodeTypes.TEXT &&
        !sibling.content.trim().length
      ) {
        context.removeNode(sibling)
        continue
      }

      if (sibling && sibling.type === NodeTypes.IF) {
        // Check if v-else was followed by v-else-if
        if (
          dir.name === 'else-if' &&
          (
            sibling.branches[
              sibling.branches.length - 1
            ] as unknown as IfElementNode
          ).vIf.condition === undefined
        ) {
          context.onError(
            createCompilerError(ErrorCodes.X_V_ELSE_NO_ADJACENT_IF, node.loc)
          )
        }

        // move the node to the if node's branches
        context.removeNode()

        sibling.branches.push(node as unknown as IfBranchNode)
        const onExit =
          processCodegen &&
          processCodegen(sibling, node as IfElementNode, false)
        // since the branch was removed, it will not be traversed.
        // make sure to traverse here.
        traverseNode(node, context)
        // call on exit
        if (onExit) onExit()
        // make sure to reset currentNode after traversal to indicate this
        // node has been removed.
        context.currentNode = null
      } else {
        context.onError(
          createCompilerError(ErrorCodes.X_V_ELSE_NO_ADJACENT_IF, node.loc)
        )
      }
      break
    }
  }
}

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
