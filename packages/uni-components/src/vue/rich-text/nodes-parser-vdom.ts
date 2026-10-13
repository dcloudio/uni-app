import { type VNode, createTextVNode, h } from 'vue'
import { extend, hasOwn, isPlainObject, isString } from '@vue/shared'
import {
  type Node,
  TAGS,
  decodeEntities,
  normalizeAttrs,
  processClickEvent,
} from './nodes-parser'

export const nodeList2VNode = /*#__PURE__*/ (
  scopeId: string,
  triggerItemClick: Function,
  nodeList?: Node[]
): Array<VNode | undefined> => {
  if (!nodeList || (Array.isArray(nodeList) && !nodeList.length)) return []

  return nodeList.map((node) => {
    if (!isPlainObject(node)) {
      return
    }
    // 存在 node.text 且 type 为空或为 'text' 时当作 text 节点处理
    if (
      (!hasOwn(node, 'type') || node.type === 'text') &&
      isString(node.text) &&
      node.text !== ''
    )
      return createTextVNode(decodeEntities(node.text || ''))
    if (!hasOwn(node, 'type') || node.type === 'node') {
      if (!isString(node.name) || !node.name) {
        return
      }
      const tagName = node.name.toLowerCase()
      //#if !_X_
      if (!hasOwn(TAGS, tagName)) {
        return
      }
      //#endif
      const nodeProps = extend(
        { [scopeId]: '' },
        processClickEvent(node, triggerItemClick),
        normalizeAttrs(tagName, node.attrs)
      )
      return h(
        node.name,
        nodeProps,
        nodeList2VNode(scopeId, triggerItemClick, node.children)
      )
    }
  })
}
