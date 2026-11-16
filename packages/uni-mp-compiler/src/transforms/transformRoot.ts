import {
  type AttributeNode,
  type DirectiveNode,
  type ElementNode,
  ElementTypes,
  Namespaces,
  NodeTypes,
  createCompoundExpression,
  createSimpleExpression,
  findProp,
  locStub,
} from '@vue/compiler-core'
import {
  createBindDirectiveNode,
  isAttributeNode,
  isElementNode,
  isMiniProgramPageFile,
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
import { STRINGIFY_STYLE } from '../runtimeHelpers'
import { processExpression } from './transformExpression'

const CSS_VARS = '__cssVars()'
const STATUS_BAR_HEIGHT_VAR = '--status-bar-height'
const UNI_SAFE_AREA_INSET_BOTTOM_VAR = '--uni-safe-area-inset-bottom'
const UNIT = 'px'

export const transformRoot: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ROOT) {
    return
  }
  const platform = process.env.UNI_PLATFORM
  const usePageMeta =
    context.isX && (platform === 'mp-weixin' || platform === 'mp-alipay')
  const hasBindingCssVars = context.bindingCssVars.length > 0
  node.children.forEach((child) => {
    if (!isElementNode(child) || (usePageMeta && child.tag === 'page-meta')) {
      return
    }
    hasBindingCssVars && addCssVars(child, context)
    context.isX && !usePageMeta && traverseChildren(child, context)
  })
  if (
    usePageMeta &&
    isMiniProgramPageFile(context.filename, process.env.UNI_INPUT_DIR)
  ) {
    let firstChild = node.children[0]
    if (
      !firstChild ||
      !isElementNode(firstChild) ||
      firstChild.tag !== 'page-meta'
    ) {
      firstChild = createPageMeta()
      node.children.unshift(firstChild)
    }
    addPageMetaStyle(firstChild, context)
  }
}

function addPageMetaStyle(pageMeta: ElementNode, context: TransformContext) {
  addStatusBarStyle(pageMeta, context, 'page-style')
  const styleProp = findProp(pageMeta, 'page-style', true) as DirectiveNode
  let expr = parseExpr(styleProp.exp!, context) as Expression
  const staticStyleIndex = pageMeta.props.findIndex(
    (prop) => isAttributeNode(prop) && prop.name === 'page-style'
  )
  if (staticStyleIndex > -1) {
    const staticStyle = pageMeta.props[staticStyleIndex] as AttributeNode
    const value = stringLiteral(staticStyle.value?.content || '')
    expr = arrayExpression(
      staticStyleIndex < pageMeta.props.indexOf(styleProp)
        ? [value, expr]
        : [expr, value]
    )
    pageMeta.props.splice(staticStyleIndex, 1)
  }
  // 复用运行时样式序列化；先处理变量前缀，避免 helper 被当作组件属性。
  styleProp.exp = createCompoundExpression([
    context.helperString(STRINGIFY_STYLE) + '(',
    processExpression(createSimpleExpression(genBabelExpr(expr)), context),
    ')',
  ])
}

function createPageMeta(): ElementNode {
  return {
    tag: 'page-meta',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.ELEMENT,
    props: [],
    isSelfClosing: true,
    children: [],
    codegenNode: undefined,
    ns: Namespaces.HTML,
    loc: locStub,
  }
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

function addStatusBarStyle(
  node: ElementNode,
  context: TransformContext,
  name = 'style'
) {
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
  const styleProp = findProp(node, name, true) as DirectiveNode
  if (!styleProp) {
    node.props.push(createBindDirectiveNode(name, genBabelExpr(style)))
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
