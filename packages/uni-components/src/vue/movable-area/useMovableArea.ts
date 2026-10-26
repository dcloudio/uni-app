import {
  type Ref,
  type SetupContext,
  onMounted,
  provide,
  reactive,
  ref,
} from 'vue'
import { withWebEvent } from '../../helpers/useEvent'
import { useAttrs } from '../../helpers/useAttrs'
import { disableScrollBounce, initScrollBounce } from '../../helpers/scroll'
//#if _X_VAPOR_
import { useMovableAreaChildren as useVaporChildren } from './children-vapor'
//#else
import { useMovableAreaChildren as useVDomChildren } from './children-vdom'
//#endif
import type { Props } from '../../components/movableArea'

// prettier-ignore
const useMovableAreaChildren =
//#if _X_VAPOR_
  useVaporChildren
//#else
useVDomChildren
//#endif

type _TouchEvent = '_onTouchstart' | '_onTouchmove' | '_onTouchend'
export interface MovableViewContext {
  rootRef: Ref<HTMLElement | null>
  setParent: Function
  _endScale: Function
  _setScale: Function
}
export type AddMovableViewContext = (context: MovableViewContext) => void
export type RemoveMovableViewContext = (context: MovableViewContext) => void

export function useMovableArea(props: Props, slots: SetupContext['slots']) {
  const rootRef: Ref<HTMLElement | null> = ref(null)
  const _isMounted = ref(false)
  let { setContexts, events: movableAreaEvents } = useMovableAreaState(
    props,
    rootRef
  )
  const { $listeners, $attrs, $excludeAttrs } = useAttrs()
  const _listeners = $listeners.value
  let events = ['onTouchstart', 'onTouchmove', 'onTouchend']
  events.forEach((event) => {
    let existing = (_listeners as any)[event]
    let ours = movableAreaEvents[`_${event}` as _TouchEvent]
    ;(_listeners as any)[event] = existing
      ? [].concat(existing, ours as any)
      : ours
  })

  onMounted(() => {
    movableAreaEvents._resize()
    initScrollBounce()
    _isMounted.value = true
  })

  const renderChildren = useMovableAreaChildren(rootRef, slots, setContexts)
  provide('_isMounted', _isMounted)
  provide('movableAreaRootRef', rootRef)

  return {
    rootRef,
    renderChildren,
    movableAreaEvents,
    $attrs,
    $excludeAttrs,
    _listeners,
  }
}

type GapV = {
  x: number | null
  y: number | null
}

function calc(e: GapV) {
  return Math.sqrt(e.x! * e.x! + e.y! * e.y!)
}

function useMovableAreaState(props: Props, rootRef: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)
  const gapV: GapV = reactive({
    x: null,
    y: null,
  })
  const pinchStartLen = ref<number | null>(null)
  let _scaleMovableView: MovableViewContext | null = null
  let movableViewContexts: MovableViewContext[] = []

  function _updateScale(e: number) {
    if (e && e !== 1) {
      if (props.scaleArea) {
        movableViewContexts.forEach(function (item) {
          item._setScale(e)
        })
      } else {
        if (_scaleMovableView) {
          _scaleMovableView._setScale(e)
        }
      }
    }
  }
  function _find(target: TouchEvent['target'], items = movableViewContexts) {
    let root = rootRef.value

    function get(
      node: EventTarget | HTMLElement | null
    ): MovableViewContext | null {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (node === item.rootRef.value) {
          return item
        }
      }
      if (node === root || node === document.body || node === document) {
        return null
      }
      return get((node as HTMLElement).parentNode)
    }
    return get(target)
  }
  const _onTouchstart = withWebEvent((t: TouchEvent) => {
    disableScrollBounce({
      disable: true,
    })
    let i = t.touches
    if (i) {
      if (i.length > 1) {
        let r = {
          x: i[1].pageX - i[0].pageX,
          y: i[1].pageY - i[0].pageY,
        }
        pinchStartLen.value = calc(r)
        gapV.x = r.x
        gapV.y = r.y
        if (!props.scaleArea) {
          let touch0 = _find(i[0].target)
          let touch1 = _find(i[1].target)
          _scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null
        }
      }
    }
  })
  const _onTouchmove = withWebEvent((t: TouchEvent) => {
    let n = t.touches
    if (n) {
      if (n.length > 1) {
        t.preventDefault()
        let i = {
          x: n[1].pageX - n[0].pageX,
          y: n[1].pageY - n[0].pageY,
        }
        if (gapV.x !== null && pinchStartLen.value && pinchStartLen.value > 0) {
          let r = calc(i) / pinchStartLen.value
          _updateScale(r)
        }
        gapV.x = i.x
        gapV.y = i.y
      }
    }
  })
  const _onTouchend = withWebEvent((e: TouchEvent) => {
    disableScrollBounce({
      disable: false,
    })
    let t = e.touches
    if (!(t && t.length)) {
      if (e.changedTouches) {
        gapV.x = 0
        gapV.y = 0
        pinchStartLen.value = null
        if (props.scaleArea) {
          movableViewContexts.forEach(function (item) {
            item._endScale()
          })
        } else {
          if (_scaleMovableView) {
            _scaleMovableView._endScale()
          }
        }
      }
    }
  })
  function _resize() {
    _getWH()
    movableViewContexts.forEach(function (item, index) {
      item.setParent()
    })
  }
  function _getWH() {
    let style = window.getComputedStyle(rootRef.value!)
    let rect = rootRef.value!.getBoundingClientRect()
    width.value =
      rect.width -
      ['Left', 'Right'].reduce(function (all, item) {
        const LEFT = ('border' + item + 'Width') as keyof CSSStyleDeclaration
        const RIGHT = ('padding' + item) as keyof CSSStyleDeclaration
        return (
          all +
          parseFloat(style[LEFT] as unknown as string) +
          parseFloat(style[RIGHT] as unknown as string)
        )
      }, 0)
    height.value =
      rect.height -
      ['Top', 'Bottom'].reduce(function (all, item) {
        const TOP = ('border' + item + 'Width') as keyof CSSStyleDeclaration
        const BOTTOM = ('padding' + item) as keyof CSSStyleDeclaration
        return (
          all +
          parseFloat(style[TOP] as unknown as string) +
          parseFloat(style[BOTTOM] as unknown as string)
        )
      }, 0)
  }

  provide('movableAreaWidth', width)
  provide('movableAreaHeight', height)

  return {
    setContexts(contexts: MovableViewContext[]) {
      movableViewContexts = contexts
    },
    events: {
      _onTouchstart,
      _onTouchmove,
      _onTouchend,
      _resize,
    },
  }
}
