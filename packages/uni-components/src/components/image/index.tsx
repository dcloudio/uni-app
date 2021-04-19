import {
  ref,
  defineComponent,
  computed,
  Ref,
  watchEffect,
  watch,
  onMounted,
  reactive,
} from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { useCustomEvent } from '../../helpers/useEvent'
import ResizeSensor from '../resize-sensor/index.vue'

export default /*#__PURE__*/ defineComponent({
  name: 'Image',
  props: {
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
  },
  setup(props, { emit }) {
    const rootRef = ref(null)
    const src = useImageSrc(props)
    const modeStyle = useImageMode(props, src)
    return () => {
      const { mode } = props
      const imgSrc = src.value
      return (
        <uni-image ref={rootRef}>
          <div ref="content" style={modeStyle.value} />
          {imgSrc && <img src={imgSrc} />}
          {(mode === 'widthFix' || mode === 'heightFix') && <ResizeSensor />}
        </uni-image>
      )
    }
  },
})

function useImageData() {
  return reactive({
    originalWidth: 0,
    originalHeight: 0,
    originalStyle: { width: '', height: '' },
    src: '',
  })
}

function loadImage(src: string) {}

function useImageSrc(props: { src: string }) {
  const src = computed(() => getRealPath(props.src))
  watch(
    () => props.src,
    () => {
      // loadImage
    }
  )
  return src
}

const IMAGE_MODES = {
  aspectFit: ['contain', 'center center'],
  aspectFill: ['cover', 'center center'],
  widthFix: ['100% 100%'],
  heightFix: ['100% 100%'],
  top: [, 'center top'],
  bottom: [, 'center bottom'],
  center: [, 'center center'],
  left: [, 'left center'],
  right: [, 'right center'],
  'top left': [, 'left top'],
  'top right': [, 'right top'],
  'bottom left': [, 'left bottom'],
  'bottom right': [, 'right bottom'],
}

function useImageMode(props: { mode: string }, rootRef: Ref, src: Ref<string>) {
  const style = computed(() => {
    let size = 'auto'
    let position = ''
    const opts = IMAGE_MODES[props.mode as keyof typeof IMAGE_MODES]
    if (opts) {
    } else {
      size = '100% 100%'
      position = '0% 0%'
    }
    const srcVal = src.value
    return `background-image:${
      srcVal ? 'url("' + srcVal + '")' : 'none'
    };background-position:${position};background-size:${size};background-repeat:no-repeat;`
  })
  const ratio = ref(0)
  const origWidth = ref(0)
  const origHeight = ref(0)
  onMounted(() => {
    const rootVal = rootRef.value as HTMLElement
    const style = rootVal.style
    origWidth.value = Number(style.width) || 0
    origHeight.value = Number(style.height) || 0
  })
  watch(
    () => props.mode,
    () => {
      // const { mode } = props
      // fixSize(rootRef.value as HTMLElement, props.mode)
      // TODO
      // resetSize()
    }
  )
  return style
}

function fixNumber(num: number) {
  // fix: 解决 Chrome 浏览器上某些情况下导致 1px 缝隙的问题
  if (typeof navigator && navigator.vendor === 'Google Inc.' && num > 10) {
    num = Math.round(num / 2) * 2
  }
  return num
}

function fixSize(el: HTMLElement, mode: string, ratio: number) {
  if (!ratio) {
    return
  }
  const rect = el.getBoundingClientRect()
  if (mode === 'widthFix') {
    const width = rect.width
    if (width) {
      el.style.height = fixNumber(width / ratio) + 'px'
    }
  } else if (mode === 'heightFix') {
    const height = rect.height
    if (height) {
      el.style.width = fixNumber(height * ratio) + 'px'
    }
  }
}

function resetSize(el: HTMLElement, width: string, height: string) {
  const style = el.style
  style.width = width
  style.height = height
}
