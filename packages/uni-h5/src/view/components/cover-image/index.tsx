import { type Ref, onMounted, ref } from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  type EmitEvent,
  UniElement,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { defineBuiltInComponent } from '@dcloudio/uni-components'

export class UniCoverImageElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CoverImage',
  compatConfig: {
    MODE: 3,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-cover-image',
    class: UniCoverImageElement,
  },
  //#endif
  emits: ['load', 'error'],
  setup(props, { emit }) {
    const root: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(root, emit)

    function load($event: Event) {
      trigger('load', $event)
    }
    function error($event: Event) {
      trigger('error', $event)
    }

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = root.value as UniCoverImageElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const { src } = props

      return (
        <uni-cover-image ref={root} src={src}>
          <div class="uni-cover-image">
            {src ? (
              <img src={getRealPath(src)} onLoad={load} onError={error} />
            ) : null}
          </div>
        </uni-cover-image>
      )
    }
  },
})
