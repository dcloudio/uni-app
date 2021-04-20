import {
  ref,
  Ref,
  watch,
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  ExtractPropTypes,
} from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { CustomEventTrigger, useCustomEvent } from '../../helpers/useEvent'
import ResizeSensor from '../resize-sensor/index'

const props = {
  src: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'scaleToFill',
  },
  lazyLoad: {
    type: [Boolean, String],
    default: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
}

type ImageProps = ExtractPropTypes<typeof props>
type ImageState = ReturnType<typeof useImageState>
type FixSize = ReturnType<typeof useImageSize>['fixSize']
type ResetSize = ReturnType<typeof useImageSize>['resetSize']

const FIX_MODES = {
  widthFix: ['width', 'height'],
  heightFix: ['height', 'width'],
}
const IMAGE_MODES = {
  aspectFit: ['center center', 'contain'],
  aspectFill: ['center center', 'cover'],
  widthFix: [, '100% 100%'],
  heightFix: [, '100% 100%'],
  top: ['center top'],
  bottom: ['center bottom'],
  center: ['center center'],
  left: ['left center'],
  right: ['right center'],
  'top left': ['left top'],
  'top right': ['right top'],
  'bottom left': ['left bottom'],
  'bottom right': ['right bottom'],
}

export default /*#__PURE__*/ defineComponent({
  name: 'Image',
  props,
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const state = useImageState(rootRef, props)
    const trigger = useCustomEvent(rootRef, emit)
    const { fixSize, resetSize } = useImageSize(rootRef, props, state)
    useImageLoader(state, {
      trigger,
      fixSize,
      resetSize,
    })
    return () => {
      const { mode } = props
      const { imgSrc, modeStyle } = state
      return (
        <uni-image ref={rootRef}>
          <div style={modeStyle} />
          {imgSrc && <img src={imgSrc} draggable={props.draggable} />}
          {FIX_MODES[mode as keyof typeof FIX_MODES] && (
            <ResizeSensor onResize={fixSize} />
          )}
        </uni-image>
      )
    }
  },
})

function useImageState(rootRef: Ref<HTMLElement | null>, props: ImageProps) {
  const imgSrc = ref('')
  const modeStyleRef = computed(() => {
    let size = 'auto'
    let position = ''
    const opts = IMAGE_MODES[props.mode as keyof typeof IMAGE_MODES]
    if (!opts) {
      position = '0% 0%'
      size = '100% 100%'
    } else {
      opts[0] && (position = opts[0])
      opts[1] && (size = opts[1])
    }
    const srcVal = imgSrc.value
    return `background-image:${
      srcVal ? 'url("' + srcVal + '")' : 'none'
    };background-position:${position};background-size:${size};background-repeat:no-repeat;`
  })
  const state = reactive({
    rootEl: rootRef,
    src: computed(() => getRealPath(props.src)),
    origWidth: 0,
    origHeight: 0,
    origStyle: { width: '', height: '' },
    modeStyle: modeStyleRef,
    imgSrc,
  })
  onMounted(() => {
    const rootEl = rootRef.value!
    const style = rootEl!.style
    state.origWidth = Number(style.width) || 0
    state.origHeight = Number(style.height) || 0
  })
  return state
}

function useImageLoader(
  state: ImageState,
  {
    trigger,
    fixSize,
    resetSize,
  }: {
    fixSize: FixSize
    resetSize: ResetSize
    trigger: CustomEventTrigger
  }
) {
  let img: HTMLImageElement | null
  const loadImage = (src: string) => {
    if (!src) {
      resetImage()
      resetSize()
      return
    }
    if (!img) {
      img = new Image()
    }
    img.onload = (evt) => {
      const { width, height } = img!
      state.origWidth = width
      state.origHeight = height
      state.imgSrc = src
      fixSize()
      resetImage()
      trigger('load', evt, {
        width,
        height,
      })
    }
    img.onerror = (evt) => {
      const { src } = state
      state.origWidth = 0
      state.origHeight = 0
      state.imgSrc = ''
      resetImage()
      trigger('error', evt as Event, {
        errMsg: `GET ${src} 404 (Not Found)`,
      })
    }
    img.src = src
  }
  const resetImage = () => {
    if (img) {
      img.onload = null
      img.onerror = null
      img = null
    }
  }
  watch(
    () => state.src,
    (value) => loadImage(value)
  )
  onMounted(() => loadImage(state.src))
  onBeforeUnmount(() => resetImage())
}

const isChrome = navigator.vendor === 'Google Inc.'
function fixNumber(num: number) {
  // fix: 解决 Chrome 浏览器上某些情况下导致 1px 缝隙的问题
  if (isChrome && num > 10) {
    num = Math.round(num / 2) * 2
  }
  return num
}

function useImageSize(
  rootRef: Ref<HTMLElement | null>,
  props: ImageProps,
  state: ImageState
) {
  const fixSize = () => {
    const { mode } = props
    const names = FIX_MODES[mode as keyof typeof FIX_MODES]
    if (!names) {
      return
    }
    const { origWidth, origHeight } = state
    const ratio = origWidth && origHeight ? origWidth / origHeight : 0
    if (!ratio) {
      return
    }
    const rootEl = rootRef.value!
    const rect = rootEl.getBoundingClientRect()
    const value = rect[names[0] as keyof DOMRect] as number
    if (value) {
      rootEl.style[names[1] as 'height' | 'width'] =
        fixNumber(value / ratio) + 'px'
    }
  }
  const resetSize = () => {
    const { style } = rootRef.value!
    const {
      origStyle: { width, height },
    } = state
    style.width = width
    style.height = height
  }
  watch(
    () => props.mode,
    (value, oldValue) => {
      if (FIX_MODES[oldValue as keyof typeof FIX_MODES]) {
        resetSize()
      }
      if (FIX_MODES[value as keyof typeof FIX_MODES]) {
        fixSize()
      }
    }
  )
  return {
    fixSize,
    resetSize,
  }
}
