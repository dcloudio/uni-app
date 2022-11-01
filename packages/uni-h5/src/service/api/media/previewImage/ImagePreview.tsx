import {
  PropType,
  onMounted,
  Ref,
  ref,
  ExtractPropTypes,
  watch,
  nextTick,
} from 'vue'
import { StyleValue } from '@vue/runtime-dom'
import { defineSystemComponent } from '@dcloudio/uni-components'
import { Swiper, SwiperItem } from '@dcloudio/uni-components'
import { usePreventScroll } from '../../../../helpers/usePreventScroll'
import ImageView from './ImageView'
import { createSvgIconVNode, ICON_PATH_CLOSE } from '@dcloudio/uni-core'

const props = {
  urls: {
    type: Array as PropType<string[]>,
    default() {
      return []
    },
  },
  current: {
    type: [Number, String],
    default: 0,
  },
}

export type Props = ExtractPropTypes<typeof props>

function getIndex(props: Props): number {
  let index =
    typeof props.current === 'number'
      ? props.current
      : props.urls.indexOf(props.current)
  index = index < 0 ? 0 : index
  return index
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'ImagePreview',
  props,
  emits: ['close'],
  setup(props, { emit }) {
    usePreventScroll()
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const indexRef = ref(getIndex(props))
    watch(
      () => props.current,
      () => (indexRef.value = getIndex(props))
    )

    let preventDefault: boolean
    onMounted(() => {
      const el = rootRef.value as HTMLElement
      const MAX_MOVE = 20
      let x = 0
      let y = 0
      el.addEventListener('mousedown', (event) => {
        preventDefault = false
        x = event.clientX
        y = event.clientY
      })
      el.addEventListener('mouseup', (event) => {
        if (
          Math.abs(event.clientX - x) > MAX_MOVE ||
          Math.abs(event.clientY - y) > MAX_MOVE
        ) {
          preventDefault = true
        }
      })
    })

    function onClick() {
      if (!preventDefault) {
        nextTick(() => {
          emit('close')
        })
      }
    }

    function onChange(event: { detail: { current: number } }) {
      indexRef.value = event.detail.current
    }

    const closeBtnStyle: StyleValue = {
      position: 'absolute',
      'box-sizing': 'border-box',
      top: '0',
      right: '0',
      width: '60px',
      height: '44px',
      padding: '6px',
      'line-height': '32px',
      'font-size': '26px',
      color: 'white',
      'text-align': 'center',
      cursor: 'pointer',
    }

    return () => {
      return (
        <div
          ref={rootRef}
          style={{
            display: 'block',
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            zIndex: 999,
            background: 'rgba(0,0,0,0.8)',
          }}
          onClick={onClick}
        >
          <Swiper
            navigation="auto"
            current={indexRef.value}
            // @ts-ignore
            onChange={onChange}
            indicator-dots={false}
            autoplay={false}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              height: '100%',
            }}
          >
            {props.urls.map((src) => (
              <SwiperItem>
                <ImageView src={src} />
              </SwiperItem>
            ))}
          </Swiper>
          <div style={closeBtnStyle}>
            {createSvgIconVNode(ICON_PATH_CLOSE, '#ffffff', 26)}
          </div>
        </div>
      )
    }
  },
})
