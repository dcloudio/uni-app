import {
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  findProp,
} from '@vue/compiler-core'
import { createBindDirectiveNode } from '@dcloudio/uni-cli-shared'
import { UNI_STATUS_BAR_HEIGHT } from '@dcloudio/uni-shared'
import type { NodeTransform, TransformContext } from '../transform'
import { parseExpr } from '../ast'
import {
  type Expression,
  arrayExpression,
  identifier,
  isArrayExpression,
  objectExpression,
  objectProperty,
  stringLiteral,
  templateElement,
  templateLiteral,
} from '@babel/types'
import { genBabelExpr } from '../codegen'

const CSS_VARS = '__cssVars()'
const STATUS_BAR_HEIGHT_VAR = '--status-bar-height'
const STATUS_BAR_HEIGHT_UNIT = 'px'

export const transformRoot: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ROOT) {
    return
  }
  const hasBindingCssVars = context.bindingCssVars.length > 0
  node.children.forEach((child) => {
    if (child.type !== NodeTypes.ELEMENT) {
      return
    }
    hasBindingCssVars && addCssVars(child, context)
    context.isX && addStatusBarStyle(child, context)
  })
}

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

function addStatusBarStyle(node: ElementNode, context: TransformContext) {
  const style = objectExpression([
    objectProperty(
      stringLiteral(STATUS_BAR_HEIGHT_VAR),
      templateLiteral(
        [
          templateElement({ raw: '', cooked: '' }, false),
          templateElement(
            { raw: STATUS_BAR_HEIGHT_UNIT, cooked: STATUS_BAR_HEIGHT_UNIT },
            true
          ),
        ],
        [identifier(UNI_STATUS_BAR_HEIGHT)]
      )
    ),
  ])
  const styleProp = findProp(node, 'style', true) as DirectiveNode
  if (!styleProp) {
    node.props.push(createBindDirectiveNode('style', genBabelExpr(style)))
  } else {
    if (styleProp.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
      const originalExpr = parseExpr(
        styleProp.exp.content,
        context
      ) as Expression
      const newExpr = isArrayExpression(originalExpr)
        ? arrayExpression([...originalExpr.elements, style])
        : arrayExpression([originalExpr, style])
      styleProp.exp.content = genBabelExpr(newExpr)
    }
  }
}
