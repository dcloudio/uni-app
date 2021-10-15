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
  SourceLocation,
} from '@vue/compiler-core'
import { walk, BaseNode } from 'estree-walker'
import { isUndefined, parseExpr } from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import { CodegenScope, CodegenVForScope } from '../options'
import { isVForScope, isVIfScope, TransformContext } from '../transform'

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

  scope = findReferencedScope(babelNode, scope)
  const id = scope.id.next()
  scope.properties.push(objectProperty(identifier(id), babelNode!))
  // 在v-for中包含的v-if块，所有变量需要补充当前v-for value前缀
  if (isVIfScope(scope)) {
    if (isVForScope(scope.parentScope)) {
      return createSimpleExpression(scope.parentScope.valueAlias + '.' + id)
    }
    return createSimpleExpression(id)
  } else if (isVForScope(scope)) {
    return createSimpleExpression(scope.valueAlias + '.' + id)
  }
  return createSimpleExpression(id)
}

function findReferencedScope(
  node: Expression,
  scope: CodegenScope
): CodegenScope {
  if (isVIfScope(scope)) {
    return scope
  } else if (isVForScope(scope)) {
    if (isReferencedScope(node, scope)) {
      return scope
    }
    return findReferencedScope(node, scope.parent!)
  }
  return scope
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
        knownIds.includes(node.name) &&
        (!parent || isReferenced(node, parent as any))
      ) {
        referenced = true
        return this.skip()
      }
    },
  })
  return referenced
}
