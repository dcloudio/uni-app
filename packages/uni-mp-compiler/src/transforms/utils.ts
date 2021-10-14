import {
  Expression,
  Identifier,
  identifier,
  isIdentifier,
  isReferenced,
  MemberExpression,
  objectProperty,
  SpreadElement,
} from '@babel/types'
import {
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  SourceLocation,
} from '@vue/compiler-core'
import { walk, BaseNode } from 'estree-walker'
import { isUndefined, parseExpr } from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import { CodegenScope, CodegenVForScope } from '../options'
import {
  isRootScope,
  isVForScope,
  isVIfScope,
  TransformContext,
} from '../transform'

export function rewriteSpreadElement(
  name: symbol,
  expr: SpreadElement,
  loc: SourceLocation,
  context: TransformContext
) {
  return rewirteWithHelper(name, expr.argument, loc, context)
}

export function rewirteWithHelper(
  name: symbol,
  expr: Expression,
  loc: SourceLocation,
  context: TransformContext
) {
  return parseExprWithRewrite(
    context.helperString(name) + '(' + genBabelExpr(expr) + ')',
    loc,
    context
  )
}

export function parseExprWithRewrite(
  code: string,
  loc: SourceLocation,
  context: TransformContext,
  node?: Expression
) {
  return parseExpr(
    rewriteExpression(createSimpleExpression(code, false, loc), context, node),
    context
  ) as Identifier | MemberExpression | undefined
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
  if (isUndefined(babelNode)) {
    return createSimpleExpression('undefined', false, node.loc)
  }

  scope = findScope(babelNode, scope)!
  const id = scope.id.next()
  scope.properties.push(objectProperty(identifier(id), babelNode!))
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
