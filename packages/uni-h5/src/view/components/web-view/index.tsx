import {
  defineComponent,
  ref,
  onMounted,
  Ref,
  onActivated,
  onDeactivated,
  Teleport,
} from 'vue'
import { ResizeSensor, useAttrs } from '@dcloudio/uni-components'
import { getRealPath } from '@dcloudio/uni-platform'
import { updateElementStyle } from '@dcloudio/uni-shared'

const props = {
  src: {
    type: String,
    default: '',
  },
}

type RootRef = Ref<HTMLElement | null>

export default /*#__PURE__*/ defineComponent({
  inheritAttrs: false,
  name: 'WebView',
  props,
  setup(props, { attrs }) {
    const rootRef: RootRef = ref(null)
    const iframeRef: RootRef = ref(null)
    const _resize = useWebViewSize(rootRef, iframeRef)
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })

    onMounted(() => {
      _resize()
    })

    onActivated(() => {
      iframeRef.value && (iframeRef.value.style.display = 'block')
    })

    onDeactivated(() => {
      iframeRef.value && (iframeRef.value.style.display = 'none')
    })

    return () => {
      return (
        <>
          <uni-web-view
            {...$listeners.value}
            {...$excludeAttrs.value}
            ref={rootRef}
          >
            {/* @ts-ignore */}
            <ResizeSensor onResize={_resize} />
          </uni-web-view>

          <Teleport to="body">
            <iframe
              ref={iframeRef}
              src={getRealPath(props.src)}
              {...$attrs.value}
            ></iframe>
          </Teleport>
        </>
      )
    }
  },
})

function useWebViewSize(rootRef: RootRef, iframeRef: RootRef) {
  const _resize = () => {
    const { top, left, width, height } = rootRef.value!.getBoundingClientRect()

    iframeRef.value &&
      updateElementStyle(iframeRef.value, {
        position: 'absolute',
        display: 'block',
        border: '0',
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
      })
  }

  return _resize
}
