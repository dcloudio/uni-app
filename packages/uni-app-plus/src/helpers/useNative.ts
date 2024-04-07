import {
  type Ref,
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
} from 'vue'
import { getNavigationBarHeight } from './navigationBar'
import { getRealPath } from '../platform/getRealPath'

type Prop = 'top' | 'left' | 'width' | 'height'
export interface Position extends Record<Prop, string> {
  position: 'static' | 'absolute'
}

const onDrawKey = Symbol('onDraw')
type OnDrawCallback = (parentPosition: Position) => any
type OnDraw = (callback: OnDrawCallback) => any

function getFixed($el: HTMLElement | null) {
  let fixed
  while ($el) {
    const style = getComputedStyle($el)
    const transform = style.transform || style.webkitTransform
    fixed = transform && transform !== 'none' ? false : fixed
    fixed = style.position === 'fixed' ? true : fixed
    $el = $el.parentElement
  }
  return fixed
}

export function useNativeAttrs(props: Record<string, any>, ignore?: string[]) {
  return computed(() => {
    const object: Record<string, any> = {}
    Object.keys(props).forEach((key) => {
      if (ignore && ignore.includes(key)) {
        return
      }
      let val = props[key]
      val = key === 'src' ? getRealPath(val) : val
      object[key.replace(/[A-Z]/g, (str) => '-' + str.toLowerCase())] = val
    })
    return object
  })
}

export function useNative(rootRef: Ref<HTMLElement | null>) {
  const position: Position = reactive({
    top: '0px',
    left: '0px',
    width: '0px',
    height: '0px',
    position: 'static',
  })
  const hidden = ref(false)

  function updatePosition() {
    const el = rootRef.value as HTMLElement
    const rect = el.getBoundingClientRect()
    const keys: Prop[] = ['width', 'height']
    hidden.value = rect.width === 0 || rect.height === 0
    if (!hidden.value) {
      position.position = getFixed(el) ? 'absolute' : 'static'
      keys.push('top', 'left')
    }
    keys.forEach((key) => {
      let val = rect[key]
      val =
        key === 'top'
          ? val +
            (position.position === 'static'
              ? document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0
              : getNavigationBarHeight())
          : val
      position[key] = val + 'px'
    })
  }

  let request: null | number = null

  function requestPositionUpdate() {
    if (request) {
      cancelAnimationFrame(request)
    }
    request = requestAnimationFrame(() => {
      request = null
      updatePosition()
    })
  }

  window.addEventListener('updateview', requestPositionUpdate)

  let onDrawCallbacks: OnDrawCallback[] | null = []
  let onSelfReadyCallbacks: Array<() => void> | null = []
  function onSelfReady(callback: () => void) {
    if (onSelfReadyCallbacks) {
      onSelfReadyCallbacks.push(callback)
    } else {
      callback()
    }
  }
  /**
   * 父组件绘制完毕，开始绘制当前组件原生部分
   * @param callback
   */
  function onParentReady(callback: OnDrawCallback) {
    const onDraw: OnDraw | undefined = inject(onDrawKey)
    const newCallback: OnDrawCallback = (parentPosition) => {
      callback(parentPosition)
      onDrawCallbacks!.forEach((callback) => callback(position))
      onDrawCallbacks = null
    }
    onSelfReady(() => {
      if (onDraw) {
        onDraw(newCallback)
      } else {
        newCallback({
          top: '0px',
          left: '0px',
          width: Number.MAX_SAFE_INTEGER + 'px',
          height: Number.MAX_SAFE_INTEGER + 'px',
          position: 'static',
        })
      }
    })
  }

  const onDraw: OnDraw = function (callback: OnDrawCallback) {
    if (onDrawCallbacks) {
      onDrawCallbacks.push(callback)
    } else {
      callback(position)
    }
  }

  provide(onDrawKey, onDraw)

  onMounted(() => {
    updatePosition()
    onSelfReadyCallbacks!.forEach((callback) => callback())
    onSelfReadyCallbacks = null
  })

  onBeforeUnmount(() => {
    window.removeEventListener('updateview', requestPositionUpdate)
  })

  return {
    position,
    hidden,
    onParentReady,
  }
}
