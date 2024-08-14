import { type VNode, getCurrentInstance, h, onMounted, ref, watch } from 'vue'
import { isString } from '@vue/shared'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { nodeList2VNode } from './nodes-parser'
import { parseHtml, props } from '../../components/rich-text'
import { UniElement } from '../../helpers/UniElement'

export class UniRichTextElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'RichText',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: ['itemclick'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-rich-text',
    class: UniRichTextElement,
  },
  //#endif
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

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniRichTextElement
      rootElement.attachVmProps(props)
    })
    //#endif

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
