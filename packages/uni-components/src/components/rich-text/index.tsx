import { onMounted, ref, watch, getCurrentInstance } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
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
  setup(props) {
    const vm = getCurrentInstance()
    const rootRef = ref<HTMLElement | null>(null)

    function _renderNodes(nodes: string | unknown[]) {
      if (typeof nodes === 'string') {
        nodes = parseHtml(nodes)
      }
      const nodeList = parseNodes(
        nodes,
        document.createDocumentFragment(),
        (vm?.root.type as any).__scopeId || ''
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
