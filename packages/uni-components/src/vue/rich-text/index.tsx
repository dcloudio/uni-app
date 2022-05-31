import { onMounted, ref, watch, getCurrentInstance, h, VNode } from 'vue'
import { hasOwn } from '@vue/shared'
import {
  defineBuiltInComponent,
  useCustomEvent,
  EmitEvent,
} from '@dcloudio/uni-components'
import parseNodes, { TAGS, decodeEntities } from './nodes-parser'
import { props, parseHtml } from '../../components/rich-text'
import { ssrRef } from '@dcloudio/uni-app'

interface Node {
  type: string
  text?: string
  name: string
  attrs: Object
  children: Node[]
}

function _createVNode(nodeList: Node[]): Array<VNode | undefined> {
  if (!nodeList) return []

  return nodeList.map((node) => {
    if (node.name) {
      const tagName = node.name.toLowerCase()
      if (!hasOwn(TAGS, tagName)) {
        return
      }
    }
    const isNode = !hasOwn(node, 'type') || node.type === 'node'
    return h(
      isNode ? node.name : 'span',
      node.attrs,
      isNode ? _createVNode(node.children) : decodeEntities(node.text)
    )
  })
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
    const scopeId = (vm && vm.vnode.scopeId) || ''
    const rootRef = ref<HTMLElement | null>(null)
    const nodelist = ssrRef(props.nodes, 'nodelist')
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const hasItemClick = !!attrs.onItemclick

    function triggerItemClick(e: Event, detail = {}) {
      trigger('itemclick', e, detail)
    }

    // ssr 处理
    if (__NODE_JS__) {
      if (typeof props.nodes === 'string') {
        nodelist.value = parseHtml(props.nodes)
      }
    }

    function _renderNodes(nodes: string | unknown[]) {
      if (typeof nodes === 'string') {
        nodelist.value = parseHtml(nodes)
      }
      const nodeList = parseNodes(
        nodelist.value,
        document.createDocumentFragment(),
        scopeId,
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
      _renderNodes(nodelist.value as [])
    })

    return () =>
      h(
        'uni-rich-text',
        {
          ref: rootRef,
        },
        [
          h(
            'div',
            {},
            __NODE_JS__ ? _createVNode(nodelist.value as Node[]) : []
          ),
        ]
      )
  },
})
