import { type Ref, onBeforeUnmount, ref, watch } from 'vue'
import {
  type EmitEvent,
  defineBuiltInComponent,
  useContextInfo,
  useCustomEvent,
  useSubscribe,
} from '@dcloudio/uni-components'
import { useNative, useNativeAttrs } from '../../../helpers/useNative'

const props = {
  id: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'SD',
  },
  muted: {
    type: [Boolean, String],
    default: false,
  },
  enableCamera: {
    type: [Boolean, String],
    default: true,
  },
  autoFocus: {
    type: [Boolean, String],
    default: true,
  },
  beauty: {
    type: [Number, String],
    default: 0,
  },
  whiteness: {
    type: [Number, String],
    default: 0,
  },
  aspect: {
    type: [String],
    default: '3:2',
  },
  minBitrate: {
    type: [Number],
    default: 200,
  },
}

type EventName = 'statechange' | 'netstatus' | 'error'

const emits: EventName[] = ['statechange', 'netstatus', 'error']

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'LivePusher',
  props,
  emits,
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const containerRef: Ref<HTMLElement | null> = ref(null)
    const attrs = useNativeAttrs(props, ['id'])
    const { position, hidden, onParentReady } = useNative(containerRef)

    let livePusher: PlusVideoLivePusher

    onParentReady(() => {
      livePusher = new plus.video.LivePusher!(
        'livePusher' + Date.now(),
        Object.assign({}, attrs.value, position)
      )
      plus.webview.currentWebview().append(livePusher as any)

      emits.forEach((key) => {
        livePusher.addEventListener(key, (event) => {
          trigger(key, {} as Event, event.detail)
        })
      })

      watch(
        () => attrs.value,
        (attrs) => livePusher.setStyles(attrs as any),
        { deep: true }
      )
      watch(
        () => position,
        (position) => livePusher.setStyles(position),
        { deep: true }
      )
      watch(
        () => hidden.value,
        (val) => {
          // iOS 隐藏状态设置 setStyles 不生效
          if (!val) {
            livePusher.setStyles(position)
          }
        }
      )
    })

    const id = useContextInfo()
    useSubscribe(
      (type: string, data: any) => {
        if (livePusher) {
          livePusher[type as any](data)
        }
      },
      id,
      true
    )

    onBeforeUnmount(() => {
      if (livePusher) {
        livePusher.close()
      }
    })

    return () => {
      return (
        <uni-live-pusher ref={rootRef} id={props.id}>
          <div ref={containerRef} class="uni-live-pusher-container" />
        </uni-live-pusher>
      )
    }
  },
})
