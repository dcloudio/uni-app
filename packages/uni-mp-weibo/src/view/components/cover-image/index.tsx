import { ref } from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { useCustomEvent, EmitEvent } from '@dcloudio/uni-components'
import { defineBuiltInComponent } from '@dcloudio/uni-components'

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
  emits: ['load', 'error'],
  setup(props, { emit }) {
    const root = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(root, emit)

    function load($event: Event) {
      trigger('load', $event)
    }
    function error($event: Event) {
      trigger('error', $event)
    }

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
