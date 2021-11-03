import { ComponentNode, NodeTypes } from '@vue/compiler-core'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import { isVForScope, NodeTransform, TransformContext } from '../transform'
import { ATTR_VUE_ID } from './utils'

export const transformComponent: NodeTransform = (node, context) => {
  if (!isUserComponent(node, context as any)) {
    return
  }
  addVueId(node, context)
  processBooleanAttr(node)
  return function postTransformComponent() {
    context.vueIds.pop()
  }
}

function addVueId(node: ComponentNode, context: TransformContext) {
  let { hashId, scopes, currentScope, currentVueId } = context
  if (!hashId) {
    return
  }
  let vueId = hashId + '-' + scopes.vueId++
  const indexs: string[] = []
  while (currentScope) {
    if (isVForScope(currentScope)) {
      indexs.push(`+'-'+${currentScope.indexAlias}`)
    }
    currentScope = currentScope.parent!
  }
  const inFor = !!indexs.length
  if (inFor) {
    vueId = `'${vueId}'` + indexs.reverse().join('')
  }

  context.vueIds.push(vueId)

  let value = vueId
  if (currentVueId) {
    const isParentDynamic = currentVueId.includes('+')
    const isCurrentDynamic = vueId.includes('+')
    if (isParentDynamic || isCurrentDynamic) {
      value = `(${vueId})+','+(${
        isParentDynamic ? currentVueId : `'${currentVueId}'`
      })`
    } else {
      value = vueId + ',' + currentVueId
    }
  }
  if (value.includes('+')) {
    return node.props.push(createBindDirectiveNode(ATTR_VUE_ID, value))
  }
  return node.props.push(createAttributeNode(ATTR_VUE_ID, value))
}
/**
 * <uni-collapse accordion/> => <uni-collapse :accordion="true"/>
 * 否则部分平台(快手)可能获取到的 accordion 是空字符串
 * @param param0
 */
function processBooleanAttr({ props }: ComponentNode) {
  props.forEach((prop, index) => {
    if (
      prop.type === NodeTypes.ATTRIBUTE &&
      typeof prop.value === 'undefined'
    ) {
      props.splice(index, 1, createBindDirectiveNode(prop.name, 'true'))
    }
  })
}
