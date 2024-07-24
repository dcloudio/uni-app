import {
  type ExtractPropTypes,
  type Ref,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { type CustomEventTrigger, useCustomEvent } from '../../helpers/useEvent'
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
    default: false,
  },
}

type ImageProps = ExtractPropTypes<typeof props>
type ImageState = ReturnType<typeof useImageState>
type FixSize = ReturnType<typeof useImageSize>['fixSize']
type FixMode = [
  'offsetWidth' | 'offsetHeight',
  'height' | 'width',
  (value: number, ratio: number) => number
]

const FIX_MODES: Record<string, FixMode> = {
  widthFix: ['offsetWidth', 'height', (value, ratio) => value / ratio],
  heightFix: ['offsetHeight', 'width', (value, ratio) => value * ratio],
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

export class UniImageElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Image',
  props,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-image',
    class: UniImageElement,
  },
  //#endif
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const state = useImageState(rootRef, props)
    const trigger = useCustomEvent(rootRef, emit)
    const { fixSize } = useImageSize(rootRef, props, state)
    useImageLoader(state, props, rootRef, fixSize, trigger)
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniImageElement
      Object.defineProperty(rootElement, 'src', {
        get() {
          return (rootElement.querySelector('img') as HTMLImageElement).src
        },
        set(value) {
          rootElement.querySelector(
            'div'
          )!.style.backgroundImage = `url("${value}")`
          ;(rootElement.querySelector('img') as HTMLImageElement).src = value
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-image ref={rootRef}>
          <div style={state.modeStyle} />
          {FIX_MODES[props.mode as keyof typeof FIX_MODES] ? (
            <ResizeSensor onResize={fixSize} />
          ) : (
            <span></span>
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
    return `background-image:${
      imgSrc.value ? 'url("' + imgSrc.value + '")' : 'none'
    };background-position:${position};background-size:${size};`
  })
  const state = reactive({
    rootEl: rootRef,
    src: computed(() => (props.src ? getRealPath(props.src) : '')),
    origWidth: 0,
    origHeight: 0,
    origStyle: { width: '', height: '' },
    modeStyle: modeStyleRef,
    imgSrc,
  })
  onMounted(() => {
    const rootEl = rootRef.value!
    state.origWidth = rootEl.clientWidth || 0
    state.origHeight = rootEl.clientHeight || 0
  })
  return state
}

function useImageLoader(
  state: ImageState,
  props: ImageProps,
  rootRef: Ref<HTMLElement | null>,
  fixSize: FixSize,
  trigger: CustomEventTrigger
) {
  let img: HTMLImageElement | null
  let draggableImg: HTMLImageElement | null
  const setState = (width = 0, height = 0, imgSrc = '') => {
    state.origWidth = width
    state.origHeight = height
    state.imgSrc = imgSrc
  }
  const loadImage = (src: string) => {
    if (!src) {
      resetImage()
      setState()
      // 与微信小程序保持一致，保留之前样式
      // resetSize()
      return
    }
    img = img || new Image()
    img.onload = (evt) => {
      const { width, height } = img!
      setState(width, height, src)
      nextTick(() => {
        fixSize()
      })
      img!.draggable = props.draggable
      if (draggableImg) {
        draggableImg.remove()
      }
      draggableImg = img
      rootRef.value!.appendChild(img!)

      resetImage()
      trigger('load', evt, {
        width,
        height,
      })
    }
    img.onerror = (evt) => {
      setState()
      resetImage()
      trigger('error', evt as Event, {
        errMsg: `GET ${state.src} 404 (Not Found)`,
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
  watch(
    () => state.imgSrc,
    (value) => {
      if (!value && draggableImg) {
        draggableImg.remove()
        draggableImg = null
      }
    }
  )
  onMounted(() => loadImage(state.src))
  onBeforeUnmount(() => resetImage())
}

const isChrome = __NODE_JS__ ? false : navigator.vendor === 'Google Inc.'
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
    const value = rootEl[names[0]]
    if (value) {
      rootEl.style[names[1]] = fixNumber(names[2](value, ratio)) + 'px'
    }
    if (__PLATFORM__ === 'app') {
      window.dispatchEvent(new CustomEvent('updateview'))
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
