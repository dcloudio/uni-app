import { createBlock, createVNode, openBlock } from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
const clazz = { class: 'uni-async-loading' }
const loadingVNode = /*#__PURE__*/ createVNode(
  'i',
  { class: 'uni-loading' },
  null,
  -1 /* HOISTED */
)

export default /*#__PURE__*/ defineSystemComponent({
  name: 'AsyncLoading',
  render() {
    return openBlock(), createBlock('div', clazz, [loadingVNode])
  },
})
