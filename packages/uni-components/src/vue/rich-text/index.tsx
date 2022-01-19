import { onMounted, ref, watch, getCurrentInstance } from 'vue'
import {
  defineBuiltInComponent,
  useCustomEvent,
  EmitEvent,
} from '@dcloudio/uni-components'
import parseHtml from './html-parser'
import parseNodes from './nodes-parser'

const props = {
  nodes: {
    type: [Array, String],
    default: function () {
      return []
    },
  },
}

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
  ],
  setup(props, { emit, attrs }) {
    const vm = getCurrentInstance()
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const hasItemClick = !!attrs.onItemclick

    function triggerItemClick(e: Event, detail = {}) {
      trigger('itemclick', e, detail)
    }

    function _renderNodes(nodes: string | unknown[]) {
      if (typeof nodes === 'string') {
        nodes = parseHtml(nodes)
      }
      const nodeList = parseNodes(
        nodes,
        document.createDocumentFragment(),
        (vm && (vm.root.type as any)).__scopeId || '',
        hasItemClick && triggerItemClick
      )
      rootRef.value!.firstElementChild!.innerHTML = ''
      rootRef.value!.firstElementChild!.appendChild(nodeList)
    }

    watch(
      () => props.nodes,
      (value) => {
        _renderNodes(value)
      }
    )

    onMounted(() => {
      _renderNodes(props.nodes)
    })

    return () => {
      return (
        <uni-rich-text ref={rootRef}>
          <div />
        </uni-rich-text>
      )
    }
  },
})
