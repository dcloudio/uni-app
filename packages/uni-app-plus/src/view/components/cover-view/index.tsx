import { type Ref, reactive, ref } from 'vue'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
  useRebuild,
} from '@dcloudio/uni-components'
import { useCover } from '../../../helpers/useCover'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CoverView',
  emits: ['click'],
  setup(_, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const textRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    let content = reactive({ text: '' })

    useCover(rootRef, trigger, content)

    useRebuild(() => {
      const node = (textRef.value as HTMLElement).childNodes[0]
      content.text = node && node instanceof Text ? node.textContent! : ''
      window.dispatchEvent(new CustomEvent('updateview'))
    })

    return () => {
      return (
        <uni-cover-view ref={rootRef}>
          <div ref={textRef} class="uni-cover-view"></div>
        </uni-cover-view>
      )
    }
  },
})
