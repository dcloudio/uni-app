import { Ref, ref, reactive } from 'vue'
import { isString } from '@vue/shared'
import {
  defineBuiltInComponent,
  useCustomEvent,
  EmitEvent,
  flatVNode,
} from '@dcloudio/uni-components'
import { useCover } from '../../../helpers/useCover'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CoverView',
  emits: ['click'],
  setup(_, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    let content = reactive({ text: '' })

    useCover(rootRef, trigger, content)

    return () => {
      const defaultSlots = slots.default ? flatVNode(slots.default()) : []
      let text = ''
      defaultSlots.forEach((node) => {
        if (isString(node.children)) {
          text += node.children
        }
      })
      content.text = text
      return (
        <uni-cover-view ref={rootRef}>
          <div class="uni-cover-view">{text}</div>
        </uni-cover-view>
      )
    }
  },
})
