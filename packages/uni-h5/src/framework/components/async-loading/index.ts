import { createBlock, createVNode, defineComponent, openBlock } from 'vue'

const clazz = { class: 'uni-async-loading' }
const loadingVNode = /*#__PURE__*/ createVNode(
  'i',
  { class: 'uni-loading' },
  null,
  -1 /* HOISTED */
)

export default /*#__PURE__*/ defineComponent({
  name: 'AsyncLoading',
  render() {
    return openBlock(), createBlock('div', clazz, [loadingVNode])
  },
})
