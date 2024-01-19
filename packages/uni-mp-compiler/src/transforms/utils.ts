import {
  conditionalExpression,
  Expression,
  Identifier,
  identifier,
  isIdentifier,
  isLiteral,
  isReferenced,
  isTemplateLiteral,
  MemberExpression,
  numericLiteral,
  objectProperty,
  SpreadElement,
  stringLiteral,
} from '@babel/types'
import { VUE_REF, VUE_REF_IN_FOR } from '@dcloudio/uni-cli-shared'
import {
  createSimpleExpression,
  ElementNode,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  SourceLocation,
  TransformContext as VueTransformContext,
} from '@vue/compiler-core'
import { walk } from 'estree-walker'
import { isUndefined, parseExpr } from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import { CodegenScope } from '../options'
import { isVForScope, isVIfScope, TransformContext } from '../transform'
// v-i,v-s 不能在 quickapp-webview 中使用，估计是内部处理成了指令之类的
export const ATTR_VUE_ID = 'u-i'
export const ATTR_VUE_SLOTS = 'u-s'
export const ATTR_VUE_PROPS = 'u-p'
export const ATTR_VUE_REF = 'u-' + VUE_REF
export const ATTR_VUE_REF_IN_FOR = 'u-' + VUE_REF_IN_FOR
export const ATTR_COM_TYPE = 'u-t'

export const SCOPED_SLOT_IDENTIFIER = '__SCOPED_SLOT__'

export const VIRTUAL_HOST_STYLE = 'virtualHostStyle'
export const VIRTUAL_HOST_CLASS = 'virtualHostClass'

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
        ? conditionalExpression(node, numericLiteral(1), stringLiteral(''))
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
  return rewriteExpression(node, context, babelNode, scope, {
    property: false,
    ignoreLiteral: false,
  })
}
export function rewriteExpression(
  node: ExpressionNode,
  context: TransformContext | VueTransformContext,
  babelNode?: Expression,
  scope: CodegenScope = (context as TransformContext).currentScope,
  {
    property,
    ignoreLiteral,
    referencedScope,
  }: {
    property: boolean
    ignoreLiteral: boolean
    referencedScope?: CodegenScope
  } = {
    property: true,
    ignoreLiteral: false,
  }
) {
  if (node.type === NodeTypes.SIMPLE_EXPRESSION && node.isStatic) {
    return node
  }
  if (!babelNode) {
    const code = genExpr(node)
    babelNode = parseExpr(code, context as TransformContext, node)
    if (!babelNode) {
      return createSimpleExpression(code)
    }
  }
  if (!ignoreLiteral && isStaticLiteral(babelNode)) {
    return node as SimpleExpressionNode
  }
  if (isUndefined(babelNode)) {
    return createSimpleExpression('undefined', false, node.loc)
  }

  // wxs 等表达式
  if ((context as TransformContext).filters?.length) {
    if (isReferencedByIds(babelNode, (context as TransformContext).filters)) {
      return createSimpleExpression(genExpr(node), false, node.loc)
    }
  }

  referencedScope = referencedScope || findReferencedScope(babelNode, scope)
  const id = referencedScope!.id.next()
  if (property) {
    referencedScope!.properties.push(objectProperty(identifier(id), babelNode!))
  }

  // 在 v-for 中包含的 v-if 块，所有变量需要补充当前 v-for value 前缀
  if (isVIfScope(referencedScope!)) {
    if (isVForScope(referencedScope.parentScope)) {
      return createSimpleExpression(
        referencedScope.parentScope.valueAlias + '.' + id
      )
    }
    return createSimpleExpression(id)
  } else if (isVForScope(referencedScope!)) {
    return createSimpleExpression(referencedScope.valueAlias + '.' + id)
  }
  return createSimpleExpression(id)
}

export function findReferencedScope(
  node: Expression,
  scope: CodegenScope,
  findReferenced: boolean = true
): CodegenScope {
  if (isVIfScope(scope)) {
    return scope
  } else if (isVForScope(scope)) {
    if (!findReferenced) {
      return scope
    }
    if (isReferencedByIds(node, scope.locals)) {
      return scope
    }
    return findReferencedScope(node, scope.parent!, findReferenced)
  }
  return scope
}

export function isReferencedByIds(node: Expression, knownIds: string[]) {
  let referenced = false
  walk(node, {
    enter(node, parent) {
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

export function isStaticLiteral(value: object | null | undefined) {
  return isLiteral(value) && !isTemplateLiteral(value)
}

export function removeAttribute(node: ElementNode, name: string) {
  const index = node.props.findIndex((prop) => prop.name === name)
  if (index > -1) {
    node.props.splice(index, 1)
  }
}
