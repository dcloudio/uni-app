import { ref, watch, getCurrentInstance, h, VNode } from 'vue'
import { isString } from '@vue/shared'
import {
  defineBuiltInComponent,
  useCustomEvent,
  EmitEvent,
} from '@dcloudio/uni-components'
import { nodeList2VNode } from './nodes-parser'
import { props, parseHtml } from '../../components/rich-text'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'RichText',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: [
    'click',
    'touchstart',
    'touchmove',
    'touchcancel',
    'touchend',
    'longpress',
    'itemclick',
  ],
  setup(props, { emit }) {
    const vm = getCurrentInstance()
    const scopeId = (vm && vm.vnode.scopeId) || ''
    const rootRef = ref<HTMLElement | null>(null)
    const _vnode = ref<Array<VNode | undefined>>([])
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    function triggerItemClick(e: Event, detail = {}) {
      trigger('itemclick', e, detail)
    }

    function renderVNode() {
      let nodeList = props.nodes
      if (isString(nodeList)) {
        nodeList = parseHtml(props.nodes)
      }
      _vnode.value = nodeList2VNode(scopeId, triggerItemClick, nodeList as [])
    }

    watch(() => props.nodes, renderVNode, { immediate: true })

    return () =>
      h(
        'uni-rich-text',
        {
          ref: rootRef,
        },
        h('div', {}, _vnode.value)
      )
  },
})
