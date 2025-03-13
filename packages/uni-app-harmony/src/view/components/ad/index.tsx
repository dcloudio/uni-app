import { ref } from 'vue'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import Embed from '../embed'

const props = {
  adpid: {
    type: String,
    default: '',
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Ad',
  props,
  emits: ['load', 'close', 'error'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const embedRef = ref<InstanceType<typeof Embed> | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    function onLoad(event: CustomEvent<any>) {
      trigger('load', event, event.detail)
    }
    function onClose(event: CustomEvent<any>) {
      trigger('close', event, event.detail)
    }
    function onError(event: CustomEvent<any>) {
      trigger('error', event, event.detail)
    }
    function onResize(event: CustomEvent<any>) {}
    return () => (
      <uni-ad ref={rootRef}>
        <Embed
          ref={embedRef}
          tag="ad"
          options={props}
          onLoad={onLoad}
          onClose={onClose}
          onError={onError}
          onResize={onResize}
        />
      </uni-ad>
    )
  },
})
