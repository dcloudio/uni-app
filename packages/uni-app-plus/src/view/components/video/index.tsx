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
  src: {
    type: String,
    default: '',
  },
  duration: {
    type: [Number, String],
    default: '',
  },
  controls: {
    type: [Boolean, String],
    default: true,
  },
  danmuList: {
    type: Array,
    default() {
      return []
    },
  },
  danmuBtn: {
    type: [Boolean, String],
    default: false,
  },
  enableDanmu: {
    type: [Boolean, String],
    default: false,
  },
  autoplay: {
    type: [Boolean, String],
    default: false,
  },
  loop: {
    type: [Boolean, String],
    default: false,
  },
  muted: {
    type: [Boolean, String],
    default: false,
  },
  objectFit: {
    type: String,
    default: 'contain',
  },
  poster: {
    type: String,
    default: '',
  },
  direction: {
    type: [String, Number],
    default: '',
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
  initialTime: {
    type: [String, Number],
    default: 0,
  },
  showFullscreenBtn: {
    type: [Boolean, String],
    default: true,
  },
  pageGesture: {
    type: [Boolean, String],
    default: false,
  },
  enableProgressGesture: {
    type: [Boolean, String],
    default: true,
  },
  vslideGesture: {
    type: [Boolean, String],
    default: false,
  },
  vslideGestureInFullscreen: {
    type: [Boolean, String],
    default: false,
  },
  showPlayBtn: {
    type: [Boolean, String],
    default: true,
  },
  showMuteBtn: {
    type: [Boolean, String],
    default: false,
  },
  enablePlayGesture: {
    type: [Boolean, String],
    default: true,
  },
  showCenterPlayBtn: {
    type: [Boolean, String],
    default: true,
  },
  showLoading: {
    type: [Boolean, String],
    default: true,
  },
  codec: {
    type: String,
    default: 'hardware',
  },
  httpCache: {
    type: [Boolean, String],
    default: false,
  },
  playStrategy: {
    type: [Number, String],
    default: 0,
  },
  header: {
    type: Object,
    default() {
      return {}
    },
  },
  advanced: {
    type: Array,
    default() {
      return []
    },
  },
  title: {
    type: String,
    default: '',
  },
  isLive: {
    type: Boolean,
    default: false,
  },
}

type EventName =
  | 'play'
  | 'pause'
  | 'ended'
  | 'timeupdate'
  | 'fullscreenchange'
  | 'fullscreenclick'
  | 'waiting'
  | 'error'

const emits: EventName[] = [
  'play',
  'pause',
  'ended',
  'timeupdate',
  'fullscreenchange',
  'fullscreenclick',
  'waiting',
  'error',
]

type Method =
  | 'play'
  | 'pause'
  | 'stop'
  | 'seek'
  | 'sendDanmu'
  | 'playbackRate'
  | 'requestFullScreen'
  | 'exitFullScreen'

const methods: Method[] = [
  'play',
  'pause',
  'stop',
  'seek',
  'sendDanmu',
  'playbackRate',
  'requestFullScreen',
  'exitFullScreen',
]

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Video',
  props,
  emits,
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const containerRef: Ref<HTMLElement | null> = ref(null)
    const attrs = useNativeAttrs(props, ['id'])
    const { position, hidden, onParentReady } = useNative(containerRef)
    const playStrategy = Number(props.isLive ? 3 : props.playStrategy)

    let video: ReturnType<typeof plus.video.createVideoPlayer>

    onParentReady(() => {
      video = plus.video.createVideoPlayer(
        'video' + Date.now(),
        Object.assign({}, attrs.value, position, {
          playStrategy: isNaN(playStrategy) ? 0 : playStrategy,
        })
      )
      plus.webview.currentWebview().append(video as any)
      if (hidden.value) {
        video.hide()
      }

      emits.forEach((key) => {
        video.addEventListener(key, (event) => {
          trigger(key, {} as Event, event.detail)
        })
      })

      watch(
        () => attrs.value,
        (attrs) => video.setStyles(attrs as any),
        { deep: true }
      )
      watch(
        () => position,
        (position) => video.setStyles(position),
        { deep: true }
      )
      watch(
        () => hidden.value,
        (val) => {
          video[val ? 'hide' : 'show']()
          // iOS 隐藏状态设置 setStyles 不生效
          if (!val) {
            video.setStyles(position)
          }
        }
      )
    })

    const id = useContextInfo()
    useSubscribe(
      (type: string, data: any) => {
        if (methods.includes(type as Method)) {
          let options
          switch (type) {
            case 'seek':
              options = data.position
              break
            case 'sendDanmu':
              options = data
              break
            case 'playbackRate':
              options = data.rate
              break
            case 'requestFullScreen':
              options = data.direction
              break
          }
          if (video) {
            video[type as Method](options)
          }
        }
      },
      id,
      true
    )

    onBeforeUnmount(() => {
      if (video) {
        video.close()
      }
    })

    return () => {
      return (
        <uni-video ref={rootRef} id={props.id}>
          <div ref={containerRef} class="uni-video-container" />
          <div class="uni-video-slot"></div>
        </uni-video>
      )
    }
  },
})
