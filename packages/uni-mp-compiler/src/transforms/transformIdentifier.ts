import { BaseNode } from 'estree'
import { walk } from 'estree-walker'
import { parseExpression } from '@babel/parser'
import { Expression, isIdentifier, isReferenced } from '@babel/types'
import {
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
} from '@vue/compiler-core'
import { createObjectProperty } from '../ast'
import { genNode } from '../codegen'
import { CodegenScope, CodegenVForScope } from '../options'
import {
  isRootScope,
  isVForScope,
  isVIfScope,
  NodeTransform,
} from '../transform'

export const transformIdentifier: NodeTransform = (node, context) => {
  return () => {
    const { currentScope } = context
    if (node.type === NodeTypes.INTERPOLATION) {
      node.content = rewriteExpression(node.content, currentScope)
    } else if (node.type === NodeTypes.ELEMENT) {
      for (let i = 0; i < node.props.length; i++) {
        const dir = node.props[i]
        if (dir.type === NodeTypes.DIRECTIVE) {
          const exp = dir.exp
          const arg = dir.arg
          if (exp) {
            dir.exp = rewriteExpression(exp, currentScope)
          }
          if (arg) {
            dir.arg = rewriteExpression(arg, currentScope)
          }
        }
      }
    }
  }
}

export function rewriteExpression(
  node: ExpressionNode,
  scope: CodegenScope,
  babelNode?: Expression
) {
  if (node.type === NodeTypes.SIMPLE_EXPRESSION && node.isStatic) {
    return node
  }
  babelNode = babelNode || parseExpression(genNode(node).code)
  scope = findScope(babelNode, scope)
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

function findScope(node: Expression, scope: CodegenScope) {
  if (isRootScope(scope) || isVIfScope(scope)) {
    return scope
  }
  return findVForScope(node, scope) || findRootScope(scope)
}

function findRootScope(scope: CodegenScope) {
  while (scope.parent) {
    scope = scope.parent
  }
  return scope
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
  if (scope.parent) {
    return findVForScope(node, scope.parent)
  }
}

function isReferencedScope(node: Expression, scope: CodegenVForScope) {
  const knownIds: string[] = []
  if (scope.value) {
    knownIds.push(scope.value)
  }
  if (scope.key) {
    knownIds.push(scope.key)
  }
  if (scope.index) {
    knownIds.push(scope.index)
  }
  let referenced = false
  walk(node as unknown as BaseNode, {
    enter(node: BaseNode, parent: BaseNode) {
      if (referenced) {
        return this.skip()
      }
      if (!isIdentifier(node)) {
        return
      }
      if (knownIds.includes(node.name) && isReferenced(node, parent as any)) {
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
