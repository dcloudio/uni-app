import {
  ComponentNode,
  ElementTypes,
  isCoreComponent,
  NodeTypes,
} from '@vue/compiler-core'
import { isComponentTag } from '@dcloudio/uni-shared'
import { isVForScope, NodeTransform, TransformContext } from '../transform'
import { createAttributeNode, createBindDirectiveNode } from '../ast'
import { addStaticClass } from './transformElement'

export const transformComponent: NodeTransform = (node, context) => {
  const isComponent =
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT &&
    !isComponentTag(node.tag) &&
    !isCoreComponent(node.tag) &&
    !context.isBuiltInComponent(node.tag)

  if (!isComponent) {
    return
  }
  addVueRef(node, context)
  addVueId(node, context)
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
    return node.props.push(createBindDirectiveNode('v-i', value))
  }
  return node.props.push(createAttributeNode('v-i', value))
}

function addVueRef(node: ComponentNode, context: TransformContext) {
  return addStaticClass(
    node,
    // vue-ref-in-for
    // vue-ref
    context.scopes.vFor ? 'v-r-i-f' : 'v-r'
  )
}
