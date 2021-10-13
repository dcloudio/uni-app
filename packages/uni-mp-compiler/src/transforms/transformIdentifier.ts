import { BaseNode } from 'estree'
import { walk } from 'estree-walker'
import { Expression, isIdentifier, isReferenced } from '@babel/types'
import {
  createCompoundExpression,
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  TO_DISPLAY_STRING,
} from '@vue/compiler-core'
import { createObjectProperty, parseExpr } from '../ast'
import { genExpr } from '../codegen'
import { CodegenScope, CodegenVForScope } from '../options'
import {
  isRootScope,
  isVForScope,
  isVIfScope,
  NodeTransform,
  TransformContext,
} from '../transform'
import { isForElementNode } from './vFor'

export const transformIdentifier: NodeTransform = (node, context) => {
  return () => {
    if (node.type === NodeTypes.INTERPOLATION) {
      node.content = rewriteExpression(
        createCompoundExpression([
          `${context.helperString(TO_DISPLAY_STRING)}(`,
          node.content,
          `)`,
        ]),
        context
      )
    } else if (node.type === NodeTypes.ELEMENT) {
      const vFor = isForElementNode(node) && node.vFor
      for (let i = 0; i < node.props.length; i++) {
        const dir = node.props[i]
        if (dir.type === NodeTypes.DIRECTIVE) {
          const arg = dir.arg
          if (arg) {
            // TODO 指令暂不不支持动态参数,v-bind:[arg] v-on:[event]
            if (!(arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic)) {
              node.props.splice(i, 1)
              i--
              continue
            }
          }
          const exp = dir.exp
          if (exp) {
            if (
              vFor &&
              arg &&
              arg.type === NodeTypes.SIMPLE_EXPRESSION &&
              arg.content === 'key' &&
              exp.type === NodeTypes.SIMPLE_EXPRESSION &&
              exp.content === vFor.valueAlias
            ) {
              exp.content = '*this'
              continue
            }
            dir.exp = rewriteExpression(exp, context)
          }
        }
      }
    }
  }
}

export function rewriteExpression(
  node: ExpressionNode,
  context: TransformContext,
  babelNode?: Expression,
  scope: CodegenScope = context.currentScope
) {
  if (node.type === NodeTypes.SIMPLE_EXPRESSION && node.isStatic) {
    return node
  }
  if (!babelNode) {
    const code = genExpr(node)
    babelNode = parseExpr(code, context, node)
    if (!babelNode) {
      return createSimpleExpression(code)
    }
  }

  scope = findScope(babelNode, scope)!
  const id = scope.id.next()
  scope.properties.push(createObjectProperty(id, babelNode!))
  if (node.type === NodeTypes.COMPOUND_EXPRESSION) {
    const firstChild = node.children[0]
    if (isSimpleExpression(firstChild)) {
      const content = firstChild.content.trim()
      if (scope.identifiers.includes(content)) {
        return createSimpleExpression(content + '.' + id)
      }
    }
  }
  return createSimpleExpression(id)
}

// function findReferencedScope(
//   node: Expression,
//   scope: CodegenScope
// ): CodegenRootScope | CodegenVForScope {
//   if (isRootScope(scope)) {
//     return scope
//   }

// }

function findScope(node: Expression, scope: CodegenScope) {
  if (isRootScope(scope) || isVIfScope(scope)) {
    return scope
  }
  return findVForScope(node, scope) || scope
}

function findVForScope(
  node: Expression,
  scope: CodegenScope
): CodegenVForScope | undefined {
  if (isVForScope(scope)) {
    if (isReferencedScope(node, scope)) {
      return scope
    }
  }
  // if (scope.parent) {
  //   return findVForScope(node, scope.parent)
  // }
}

function isReferencedScope(node: Expression, scope: CodegenVForScope) {
  const knownIds: string[] = scope.locals
  let referenced = false
  walk(node as unknown as BaseNode, {
    enter(node: BaseNode, parent: BaseNode) {
      if (referenced) {
        return this.skip()
      }
      if (!isIdentifier(node)) {
        return
      }
      if (
        parent &&
        knownIds.includes(node.name) &&
        isReferenced(node, parent as any)
      ) {
        referenced = true
        return this.skip()
      }
    },
  })
  return referenced
}

function isSimpleExpression(val: any): val is SimpleExpressionNode {
  return val.type && val.type === NodeTypes.SIMPLE_EXPRESSION
}
