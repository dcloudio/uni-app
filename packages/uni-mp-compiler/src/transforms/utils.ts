import {
  conditionalExpression,
  Expression,
  Identifier,
  identifier,
  isIdentifier,
  isReferenced,
  MemberExpression,
  numericLiteral,
  objectProperty,
  SpreadElement,
} from '@babel/types'
import { isComponentTag } from '@dcloudio/uni-shared'
import {
  ComponentNode,
  createSimpleExpression,
  ElementTypes,
  ExpressionNode,
  isCoreComponent,
  NodeTypes,
  RootNode,
  SourceLocation,
  TemplateChildNode,
  TransformContext as VueTransformContext,
} from '@vue/compiler-core'
import { walk, BaseNode } from 'estree-walker'
import { isUndefined, parseExpr } from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import { CodegenScope } from '../options'
import { isVForScope, isVIfScope, TransformContext } from '../transform'

export const ATTR_VUE_ID = 'v-i'
export const ATTR_VUE_SLOTS = 'v-s'
export const CLASS_VUE_REF = 'v-r'
export const CLASS_VUE_REF_IN_FOR = 'v-r-i-f'
export const SCOPED_SLOT_IDENTIFIER = '__SCOPED_SLOT__'

export function isUserComponent(
  node: RootNode | TemplateChildNode,
  context: TransformContext | VueTransformContext
): node is ComponentNode {
  return (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT &&
    !isComponentTag(node.tag) &&
    !isCoreComponent(node.tag) &&
    !context.isBuiltInComponent(node.tag)
  )
}

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

export function parseExprWithRewriteClass(
  code: string,
  loc: SourceLocation,
  context: TransformContext,
  node: Expression
) {
  // a?1:0
  return parseExpr(
    rewriteExpression(
      createSimpleExpression(code, false, loc),
      context,
      !isUndefined(node)
        ? conditionalExpression(node, numericLiteral(1), numericLiteral(0))
        : node
    ),
    context
  ) as Identifier | MemberExpression | undefined
}

export function rewriteExpressionWithoutProperty(
  node: ExpressionNode,
  context: TransformContext,
  babelNode?: Expression,
  scope: CodegenScope = context.currentScope
) {
  return rewriteExpression(node, context, babelNode, scope, false)
}
export function rewriteExpression(
  node: ExpressionNode,
  context: TransformContext,
  babelNode?: Expression,
  scope: CodegenScope = context.currentScope,
  property: boolean = true
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

  // wxs 等表达式
  if (context.filters?.length) {
    if (isReferencedByIds(babelNode, context.filters)) {
      return createSimpleExpression(genExpr(node), false, node.loc)
    }
  }

  scope = findReferencedScope(babelNode, scope)
  const id = scope.id.next()
  if (property) {
    scope.properties.push(objectProperty(identifier(id), babelNode!))
  }
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
    if (isReferencedByIds(node, scope.locals)) {
      return scope
    }
    return findReferencedScope(node, scope.parent!)
  }
  return scope
}

function isReferencedByIds(node: Expression, knownIds: string[]) {
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
