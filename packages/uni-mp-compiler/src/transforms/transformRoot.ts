import {
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  findProp,
} from '@vue/compiler-core'
import {
  createBindDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import {
  UNI_SAFE_AREA_INSET_BOTTOM,
  UNI_STATUS_BAR_HEIGHT,
} from '@dcloudio/uni-shared'
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
const UNI_SAFE_AREA_INSET_BOTTOM_VAR = '--uni-safe-area-inset-bottom'
const UNIT = 'px'

export const transformRoot: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ROOT) {
    return
  }
  const hasBindingCssVars = context.bindingCssVars.length > 0
  node.children.forEach((child) => {
    if (!isElementNode(child)) {
      return
    }
    hasBindingCssVars && addCssVars(child, context)
    context.isX && traverseChildren(child, context)
  })
}

function addCssVars(node: ElementNode, context: TransformContext) {
  const styleProp = findProp(node, 'style', true) as DirectiveNode
  if (!styleProp) {
    node.props.push(createBindDirectiveNode('style', CSS_VARS))
  } else {
    if (styleProp.exp && isSimpleExpressionNode(styleProp.exp)) {
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
          templateElement({ raw: UNIT, cooked: UNIT }, true),
        ],
        [identifier(UNI_STATUS_BAR_HEIGHT)]
      )
    ),
    objectProperty(
      stringLiteral(UNI_SAFE_AREA_INSET_BOTTOM_VAR),
      templateLiteral(
        [
          templateElement({ raw: '', cooked: '' }, false),
          templateElement({ raw: UNIT, cooked: UNIT }, true),
        ],
        [identifier(UNI_SAFE_AREA_INSET_BOTTOM)]
      )
    ),
  ])
  const styleProp = findProp(node, 'style', true) as DirectiveNode
  if (!styleProp) {
    node.props.push(createBindDirectiveNode('style', genBabelExpr(style)))
  } else {
    if (styleProp.exp && isSimpleExpressionNode(styleProp.exp)) {
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

function traverseChildren(node: ElementNode, context: TransformContext) {
  if (isUserComponent(node, context)) {
    return
  }
  if (node.tag !== 'template' && node.tag !== 'slot') {
    isElementNode(node) && addStatusBarStyle(node, context)
  } else {
    node.children.forEach((child) => {
      traverseChildren(child as ElementNode, context)
    })
  }
}
