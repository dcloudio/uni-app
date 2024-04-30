import {
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  findProp,
} from '@vue/compiler-core'
import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import type { NodeTransform, TransformContext } from '../transform'
import { parseExpr } from '../ast'
import {
  type Expression,
  arrayExpression,
  identifier,
  isArrayExpression,
} from '@babel/types'
import { genBabelExpr } from '../codegen'

export const transformRoot: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ROOT) {
    return
  }
  if (context.bindingCssVars.length) {
    node.children.forEach((child) => {
      if (child.type !== NodeTypes.ELEMENT) {
        return
      }
      addCssVars(child, context)
    })
  }
}

const CSS_VARS = '__cssVars()'
function addCssVars(node: ElementNode, context: TransformContext) {
  const styleProp = findProp(node, 'style', true) as DirectiveNode
  if (!styleProp) {
    node.props.push(createBindDirectiveNode('style', CSS_VARS))
  } else {
    if (styleProp.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
      let expr = parseExpr(styleProp.exp.content, context) as Expression
      if (isArrayExpression(expr)) {
        expr.elements.push(identifier(CSS_VARS))
      } else {
        expr = arrayExpression([expr as Expression, identifier(CSS_VARS)])
      }
      styleProp.exp.content = genBabelExpr(expr)
    }
  }
}
