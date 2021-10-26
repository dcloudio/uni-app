import { ComponentNode, findProp } from '@vue/compiler-core'
import { isVForScope, NodeTransform, TransformContext } from '../transform'
import { createAttributeNode, createBindDirectiveNode } from '../ast'
import { addStaticClass } from './transformElement'
import {
  ATTR_VUE_ID,
  CLASS_VUE_REF,
  CLASS_VUE_REF_IN_FOR,
  isUserComponent,
} from './utils'
import { CodegenScope } from '../options'
import { isScopedSlotVFor } from './vSlot'

export const transformComponent: NodeTransform = (node, context) => {
  if (!isUserComponent(node, context)) {
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
    return node.props.push(createBindDirectiveNode(ATTR_VUE_ID, value))
  }
  return node.props.push(createAttributeNode(ATTR_VUE_ID, value))
}

function addVueRef(node: ComponentNode, context: TransformContext) {
  // 仅配置了 ref 属性的，才需要增补 vue-ref
  if (!findProp(node, 'ref')) {
    return
  }
  return addStaticClass(
    node,
    // vue-ref-in-for
    // vue-ref
    isInVFor(context.currentScope) ? CLASS_VUE_REF_IN_FOR : CLASS_VUE_REF
  )
}

function isInVFor(scope: CodegenScope) {
  let parent: CodegenScope | null = scope
  while (parent) {
    if (isVForScope(parent) && !isScopedSlotVFor(parent)) {
      return true
    }
    parent = parent.parent
  }
  return false
}
