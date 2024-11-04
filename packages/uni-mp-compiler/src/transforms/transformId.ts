import {
  type ElementNode,
  type ExpressionNode,
  createCompoundExpression,
  findProp,
} from '@vue/compiler-core'
import {
  createBindDirectiveNode,
  isAttributeNode,
} from '@dcloudio/uni-cli-shared'
import type { TransformContext } from '../transform'
import { SET_UNI_ELEMENT_ID, WITH_UNI_ELEMENT_STYLE } from '../runtimeHelpers'
import {
  ATTR_ELEMENT_ID,
  ATTR_SET_ELEMENT_STYLE,
  FILTER_SET_ELEMENT_STYLE,
  filterName,
  filterObserverName,
} from './utils'

export function rewriteId(node: ElementNode, context: TransformContext) {
  const idProp = findProp(node, 'id')
  if (!idProp) {
    return
  }
  let idExprNode: string | ExpressionNode | undefined
  // id="test" => :id="setUniElementId('test')"
  if (isAttributeNode(idProp)) {
    if (!idProp.value) {
      return
    }
    idExprNode = `'${idProp.value.content}'`
    node.props.push(
      createBindDirectiveNode(
        ATTR_ELEMENT_ID,
        createCompoundExpression([
          context.helperString(SET_UNI_ELEMENT_ID) + '(',
          idExprNode,
          ')',
        ])
      )
    )
  } else if (idProp.exp) {
    idExprNode = idProp.exp
    const idPropIndex = node.props.indexOf(idProp)
    // :id="a" => :id="setUniElementId(a)"
    node.props.splice(
      idPropIndex,
      1,
      createBindDirectiveNode(
        'id',
        createCompoundExpression([
          context.helperString(SET_UNI_ELEMENT_ID) + '(',
          idExprNode,
          ')',
        ])
      )
    )
  }

  if (context.miniProgram.filter?.setStyle) {
    // 支持通过filter来设置style
    node.props.push(
      createBindDirectiveNode(
        filterObserverName(ATTR_SET_ELEMENT_STYLE),
        filterName(FILTER_SET_ELEMENT_STYLE)
      )
    )
    node.props.push(
      createBindDirectiveNode(
        ATTR_SET_ELEMENT_STYLE,
        createCompoundExpression([
          context.helperString(WITH_UNI_ELEMENT_STYLE) + '(',
          idExprNode!,
          ')',
        ])
      )
    )
    return
  }

  // 如果没有动态绑定 style，则创建一个新的
  if (!findProp(node, 'style', true, true)) {
    node.props.push(
      createBindDirectiveNode(
        'style',
        createCompoundExpression([
          context.helperString(WITH_UNI_ELEMENT_STYLE) + '(',
          idExprNode!,
          ')',
        ])
      )
    )
  }
}
