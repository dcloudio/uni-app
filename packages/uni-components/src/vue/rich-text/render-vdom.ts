import {
  type ExtractPropTypes,
  type Ref,
  type VNode,
  getCurrentInstance,
  h,
  shallowRef,
  watch,
} from 'vue'
import { isString } from '@vue/shared'
import type { props as richTextProps } from '../../components/rich-text'
import { parseHtml } from '../../components/rich-text'
import { nodeList2VNode } from './nodes-parser-vdom'

export function renderRichText(
  props: ExtractPropTypes<typeof richTextProps>,
  rootRef: Ref<HTMLElement | null>,
  triggerItemClick: Function
) {
  const vm = getCurrentInstance()
  const scopeId = (vm && vm.vnode.scopeId) || ''
  const vnode = shallowRef<Array<VNode | undefined>>([])
  function renderVNode() {
    let nodeList = props.nodes
    if (isString(nodeList)) {
      nodeList = parseHtml(props.nodes)
    }
    vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList as [])
  }
  watch(() => props.nodes, renderVNode, { immediate: true, deep: true })
  return () =>
    h(
      'uni-rich-text',
      {
        ref: rootRef,
        selectable: props.userSelect || props.selectable ? true : null,
      },
      h('div', {}, vnode.value)
    )
}
