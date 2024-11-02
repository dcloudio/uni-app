import {
  type ElementNode,
  createCompoundExpression,
  findProp,
} from '@vue/compiler-core'
import {
  createBindDirectiveNode,
  isAttributeNode,
} from '@dcloudio/uni-cli-shared'
import type { TransformContext } from '../transform'
import { SET_UNI_ELEMENT_ID } from '../runtimeHelpers'
import { ATTR_ELEMENT_ID } from './utils'

export function rewriteId(node: ElementNode, context: TransformContext) {
  const idProp = findProp(node, 'id')
  if (!idProp) {
    return
  }
  // id="test" => :id="setUniElementId('test')"
  if (isAttributeNode(idProp)) {
    if (idProp.value) {
      node.props.push(
        createBindDirectiveNode(
          ATTR_ELEMENT_ID,
          createCompoundExpression([
            context.helperString(SET_UNI_ELEMENT_ID) + "('",
            idProp.value.content,
            "')",
          ])
        )
      )
    }
  } else if (idProp.exp) {
    const idPropIndex = node.props.indexOf(idProp)
    // :id="a" => :id="setUniElementId(a)"
    node.props.splice(
      idPropIndex,
      1,
      createBindDirectiveNode(
        'id',
        createCompoundExpression([
          context.helperString(SET_UNI_ELEMENT_ID) + '(',
          idProp.exp,
          ')',
        ])
      )
    )
  }
}
