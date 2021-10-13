import { BaseNode } from 'estree'
import { walk } from 'estree-walker'
import {
  Expression,
  isIdentifier,
  isLiteral,
  isObjectExpression,
  isReferenced,
  ObjectExpression,
  ObjectProperty,
  stringLiteral,
} from '@babel/types'
import {
  AttributeNode,
  createCompoundExpression,
  createSimpleExpression,
  DirectiveNode,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  SourceLocation,
  TO_DISPLAY_STRING,
} from '@vue/compiler-core'
import {
  createClassBindingArrayExpression,
  createObjectProperty,
  isUndefined,
  parseExpr,
} from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import { CodegenScope, CodegenVForScope } from '../options'
import {
  isRootScope,
  isVForScope,
  isVIfScope,
  NodeTransform,
  TransformContext,
} from '../transform'
import { ForElementNode, isForElementNode } from './vFor'

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
      const { props } = node
      for (let i = 0; i < props.length; i++) {
        const dir = props[i]
        if (dir.type === NodeTypes.DIRECTIVE) {
          const arg = dir.arg
          if (arg) {
            // TODO 指令暂不不支持动态参数,v-bind:[arg] v-on:[event]
            if (!(arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic)) {
              props.splice(i, 1)
              i--
              continue
            }
          }
          const exp = dir.exp
          if (exp) {
            if (isSelfKey(dir, vFor)) {
              rewriteSelfKey(dir)
            } else if (isClassBinding(dir)) {
              rewriteClass(i, dir, props, context)
            } else {
              dir.exp = rewriteExpression(exp, context)
            }
          }
        }
      }
    }
  }
}

function isSelfKey(
  { arg, exp }: DirectiveNode,
  vFor: ForElementNode['vFor'] | false
) {
  return (
    vFor &&
    arg &&
    exp &&
    arg.type === NodeTypes.SIMPLE_EXPRESSION &&
    arg.content === 'key' &&
    exp.type === NodeTypes.SIMPLE_EXPRESSION &&
    exp.content === vFor.valueAlias
  )
}

function rewriteSelfKey(dir: DirectiveNode) {
  ;(dir.exp as SimpleExpressionNode).content = '*this'
}

function isClassBinding({ arg, exp }: DirectiveNode) {
  return (
    arg && arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.content === 'class'
  )
}

function findStaticClassIndex(props: (AttributeNode | DirectiveNode)[]) {
  return props.findIndex((prop) => prop.name === 'class')
}

function rewriteClass(
  index: number,
  classBindingProp: DirectiveNode,
  props: (AttributeNode | DirectiveNode)[],
  context: TransformContext
) {
  if (!classBindingProp.exp) {
    return
  }
  const staticClassPropIndex = findStaticClassIndex(props)
  const staticClass =
    staticClassPropIndex > -1
      ? (props[staticClassPropIndex] as AttributeNode).value!.content
      : ''
  const expr = parseExpr(classBindingProp.exp, context)
  if (!expr) {
    return
  }
  if (isObjectExpression(expr)) {
    // 重写{ key:value }所有的 value
    rewriteObjectExpression(expr, classBindingProp.loc, context)
    const arrExpr = createClassBindingArrayExpression(expr)
    if (staticClass) {
      if (index > staticClassPropIndex) {
        arrExpr.elements.unshift(stringLiteral(staticClass))
      } else {
        arrExpr.elements.push(stringLiteral(staticClass))
      }
    }
    classBindingProp.exp = createSimpleExpression(genBabelExpr(arrExpr))
  } else {
    classBindingProp.exp = rewriteExpression(classBindingProp.exp, context)
  }
}

function rewriteObjectExpression(
  expr: ObjectExpression,
  loc: SourceLocation,
  context: TransformContext
) {
  expr.properties.forEach((prop) => {
    const { value } = prop as ObjectProperty
    if (isLiteral(value)) {
      return
    } else {
      const newExpr = parseExpr(
        rewriteExpression(
          createSimpleExpression(genBabelExpr(value as Expression), false, loc),
          context,
          value as Expression
        ),
        context
      )
      if (newExpr) {
        ;(prop as ObjectProperty).value = newExpr
      }
    }
  })
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
