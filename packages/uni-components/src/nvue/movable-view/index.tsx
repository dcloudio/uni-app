import {
  type Ref,
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { type TouchtrackEvent, useTouchtrack } from './useTouchtrack'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useNVueEvent'
import type {
  AddMovableViewContext,
  MovableViewContext,
  RemoveMovableViewContext,
  SetTouchMovableViewContext,
  TouchMovableViewContext,
  parentSize,
} from '../movable-area'
import {
  Decline,
  Friction,
  type FrictionCallback,
  type Props,
  type Record,
  STD,
  movableViewProps,
  v,
} from '../../components/movable-view'
import { getComponentSize } from '../helpers'

function g(
  friction: Friction | STD,
  execute: FrictionCallback,
  endCallback: FrictionCallback
) {
  let record: Record = {
    id: 0,
    cancelled: false,
  }
  let cancel = function (record: Record) {
    if (record && record.id) {
      cancelAnimationFrame(record.id)
    }
    if (record) {
      record.cancelled = true
    }
  }
  function fn(
    record: Record,
    friction: Friction | STD,
    execute: FrictionCallback,
    endCallback: FrictionCallback
  ) {
    if (!record || !record.cancelled) {
      execute(friction)
      let isDone = friction.done()
      if (!isDone) {
        if (!record.cancelled) {
          record.id = requestAnimationFrame(
            fn.bind(null, record, friction, execute, endCallback)
          )
        }
      }
      if (isDone && endCallback) {
        endCallback(friction)
      }
    }
  }
  fn(record, friction, execute, endCallback)
  return {
    cancel: cancel.bind(null, record),
    model: friction,
  }
}
let requesting = false
function _requestAnimationFrame(e: Function) {
  if (!requesting) {
    requesting = true
    requestAnimationFrame(function () {
      e()
      requesting = false
    })
  }
}
function requestAnimationFrame(callback: Function) {
  return setTimeout(callback, 16)
}
function cancelAnimationFrame(id: number) {
  clearTimeout(id)
}

type ReturnType_g = ReturnType<typeof g> | null
type ScaleOffset = {
  x: number
  y: number
}
type MoveDirection = 'htouchmove' | 'vtouchmove'
type Size = { width: number; height: number; top: number; left: number }
type RootRef = Ref<HTMLElement | null>

const animation = weex.requireModule('animation')

export default defineComponent({
  name: 'MovableView',
  props: movableViewProps,
  emits: ['change', 'scale'],
  styles: [
    {
      'uni-movable-view': {
        '': {
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '10px',
          height: '10px',
        },
      },
    },
  ],
  setup(props, { emit, slots }) {
    const rootRef: RootRef = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const setTouchMovableViewContext: SetTouchMovableViewContext = inject(
      'setTouchMovableViewContext',
      () => {}
    )
    const touchStart = useMovableViewState(
      props,
      trigger,
      rootRef,
      setTouchMovableViewContext
    )

    return () => {
      const attrs = {
        preventGesture: true,
      }
      return (
        <view
          ref={rootRef}
          onTouchstart={touchStart}
          class="uni-movable-view"
          style="transform-origin: center;"
          {...attrs}
        >
          {slots.default && slots.default()}
        </view>
      )
    }
  },
})

function useMovableViewState(
  props: Props,
  trigger: CustomEventTrigger,
  rootRef: RootRef,
  setTouchMovableViewContext: SetTouchMovableViewContext
) {
  const _isMounted: Ref<boolean> = inject('_isMounted', ref(false))
  const parentSize: parentSize = inject('parentSize', {
    width: ref(0),
    height: ref(0),
    top: ref(0),
    left: ref(0),
  })
  const addMovableViewContext: AddMovableViewContext = inject(
    'addMovableViewContext',
    () => {}
  )
  const removeMovableViewContext: RemoveMovableViewContext = inject(
    'removeMovableViewContext',
    () => {}
  )
  let movableViewContext: TouchMovableViewContext = {
    touchstart: () => {},
    touchmove: () => {},
    touchend: () => {},
  }
  function _getPx(val: string | number) {
    // if (/\d+[ur]px$/i.test(val)) {
    //   return uni.upx2px(parseFloat(val))
    // }
    return Number(val) || 0
  }
  function _getScaleNumber(val: number) {
    val = Number(val)
    return isNaN(val) ? 1 : val
  }
  const xSync = ref(_getPx(props.x))
  const ySync = ref(_getPx(props.y))
  const scaleValueSync = ref(_getScaleNumber(Number(props.scaleValue)))
  const width = ref(0)
  const height = ref(0)
  const minX = ref(0)
  const minY = ref(0)
  const maxX = ref(0)
  const maxY = ref(0)

  let _SFA: ReturnType_g = null
  let _FA: ReturnType_g = null
  const _offset: ScaleOffset = {
    x: 0,
    y: 0,
  }
  const _scaleOffset: ScaleOffset = {
    x: 0,
    y: 0,
  }
  let _scale = 1
  // @ts-expect-error
  let _oldScale = 1
  let _translateX = 0
  let _translateY = 0
  let _isScaling = false
  let _isTouching = false
  let __baseX: number
  let __baseY: number
  let _checkCanMove: boolean | null = null
  let _firstMoveDirection: MoveDirection | null = null
  let _rect: Size = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }
  const _declineX = new Decline()
  const _declineY = new Decline()
  const __touchInfo = {
    historyX: [0, 0],
    historyY: [0, 0],
    historyT: [0, 0],
  }

  const dampingNumber = computed(() => {
    let val = Number(props.damping)
    return isNaN(val) ? 20 : val
  })
  const frictionNumber = computed(() => {
    let val = Number(props.friction)
    return isNaN(val) || val <= 0 ? 2 : val
  })
  const scaleMinNumber = computed(() => {
    let val = Number(props.scaleMin)
    return isNaN(val) ? 0.1 : val
  })
  const scaleMaxNumber = computed(() => {
    let val = Number(props.scaleMax)
    return isNaN(val) ? 10 : val
  })
  const xMove = computed(
    () => props.direction === 'all' || props.direction === 'horizontal'
  )
  const yMove = computed(
    () => props.direction === 'all' || props.direction === 'vertical'
  )

  const _STD = new STD(
    1,
    (9 * Math.pow(dampingNumber.value, 2)) / 40,
    dampingNumber.value
  )
  const _friction = new Friction(1, frictionNumber.value)

  watch(
    () => props.x,
    (val) => {
      xSync.value = _getPx(val)
    }
  )
  watch(
    () => props.y,
    (val) => {
      ySync.value = _getPx(val)
    }
  )
  watch(
    () => props.scaleValue,
    (val) => {
      scaleValueSync.value = _getScaleNumber(Number(val))
    }
  )
  watch(xSync, _setX)
  watch(ySync, _setY)
  watch(scaleValueSync, _setScaleValue)
  watch(scaleMinNumber, _setScaleMinOrMax)
  watch(scaleMaxNumber, _setScaleMinOrMax)

  function FAandSFACancel() {
    if (_FA) {
      _FA.cancel()
    }
    if (_SFA) {
      _SFA.cancel()
    }
  }

  function _setX(val: number) {
    if (xMove.value) {
      if (val + _scaleOffset.x === _translateX) {
        return _translateX
      } else {
        if (_SFA) {
          _SFA.cancel()
        }
        _animationTo(val + _scaleOffset.x, ySync.value + _scaleOffset.y, _scale)
      }
    }
    return val
  }
  function _setY(val: number) {
    if (yMove.value) {
      if (val + _scaleOffset.y === _translateY) {
        return _translateY
      } else {
        if (_SFA) {
          _SFA.cancel()
        }
        _animationTo(xSync.value + _scaleOffset.x, val + _scaleOffset.y, _scale)
      }
    }
    return val
  }
  function _setScaleMinOrMax() {
    if (!props.scale) {
      return false
    }
    _updateScale(_scale, true)
    _updateOldScale(_scale)
  }
  function _setScaleValue(scale: number) {
    if (!props.scale) {
      return false
    }
    scale = _adjustScale(scale)
    _updateScale(scale, true)
    _updateOldScale(scale)
    return scale
  }
  function __handleTouchStart() {
    if (!_isScaling) {
      if (!props.disabled) {
        FAandSFACancel()
        __touchInfo.historyX = [0, 0]
        __touchInfo.historyY = [0, 0]
        __touchInfo.historyT = [0, 0]
        if (xMove.value) {
          __baseX = _translateX
        }
        if (yMove.value) {
          __baseY = _translateY
        }
        _checkCanMove = null
        _firstMoveDirection = null
        _isTouching = true
      }
    }
  }
  function __handleTouchMove(event: TouchtrackEvent) {
    if (!_isScaling && !props.disabled && _isTouching) {
      let x = _translateX
      let y = _translateY
      if (_firstMoveDirection === null) {
        _firstMoveDirection =
          Math.abs(event.detail.dx / event.detail.dy) > 1
            ? 'htouchmove'
            : 'vtouchmove'
      }
      if (xMove.value) {
        x = event.detail.dx + __baseX
        __touchInfo.historyX.shift()
        __touchInfo.historyX.push(x)
        if (!yMove.value && _checkCanMove === null) {
          _checkCanMove = Math.abs(event.detail.dx / event.detail.dy) < 1
        }
      }
      if (yMove.value) {
        y = event.detail.dy + __baseY
        __touchInfo.historyY.shift()
        __touchInfo.historyY.push(y)
        if (!xMove.value && _checkCanMove === null) {
          _checkCanMove = Math.abs(event.detail.dy / event.detail.dx) < 1
        }
      }
      __touchInfo.historyT.shift()
      __touchInfo.historyT.push(event.detail.timeStamp)

      if (!_checkCanMove) {
        // event.preventDefault()
        let source = 'touch'
        if (x < minX.value) {
          if (props.outOfBounds) {
            source = 'touch-out-of-bounds'
            x = minX.value - _declineX.x(minX.value - x)
          } else {
            x = minX.value
          }
        } else if (x > maxX.value) {
          if (props.outOfBounds) {
            source = 'touch-out-of-bounds'
            x = maxX.value + _declineX.x(x - maxX.value)
          } else {
            x = maxX.value
          }
        }
        if (y < minY.value) {
          if (props.outOfBounds) {
            source = 'touch-out-of-bounds'
            y = minY.value - _declineY.x(minY.value - y)
          } else {
            y = minY.value
          }
        } else {
          if (y > maxY.value) {
            if (props.outOfBounds) {
              source = 'touch-out-of-bounds'
              y = maxY.value + _declineY.x(y - maxY.value)
            } else {
              y = maxY.value
            }
          }
        }
        _requestAnimationFrame(function () {
          _setTransform(x, y, _scale, source)
        })
      }
    }
  }
  function __handleTouchEnd() {
    if (!_isScaling && !props.disabled && _isTouching) {
      _isTouching = false
      if (!_checkCanMove && !_revise('out-of-bounds') && props.inertia) {
        const xv =
          (1000 * (__touchInfo.historyX[1] - __touchInfo.historyX[0])) /
          (__touchInfo.historyT[1] - __touchInfo.historyT[0])
        const yv =
          (1000 * (__touchInfo.historyY[1] - __touchInfo.historyY[0])) /
          (__touchInfo.historyT[1] - __touchInfo.historyT[0])
        _friction.setV(xv, yv)
        _friction.setS(_translateX, _translateY)
        const x0 = _friction.delta().x
        const y0 = _friction.delta().y
        let x = x0 + _translateX
        let y = y0 + _translateY
        if (x < minX.value) {
          x = minX.value
          y = _translateY + ((minX.value - _translateX) * y0) / x0
        } else {
          if (x > maxX.value) {
            x = maxX.value
            y = _translateY + ((maxX.value - _translateX) * y0) / x0
          }
        }
        if (y < minY.value) {
          y = minY.value
          x = _translateX + ((minY.value - _translateY) * x0) / y0
        } else {
          if (y > maxY.value) {
            y = maxY.value
            x = _translateX + ((maxY.value - _translateY) * x0) / y0
          }
        }
        _friction.setEnd(x, y)
        _FA = g(
          _friction,
          function () {
            let t = _friction.s()
            let x = t.x
            let y = t.y
            _setTransform(x, y, _scale, 'friction')
          },
          function () {
            _FA!.cancel()
          }
        )
      }
    }
  }
  function _getLimitXY(x: number, y: number) {
    let outOfBounds = false
    if (x > maxX.value) {
      x = maxX.value
      outOfBounds = true
    } else {
      if (x < minX.value) {
        x = minX.value
        outOfBounds = true
      }
    }
    if (y > maxY.value) {
      y = maxY.value
      outOfBounds = true
    } else {
      if (y < minY.value) {
        y = minY.value
        outOfBounds = true
      }
    }
    return {
      x,
      y,
      outOfBounds,
    }
  }
  function _updateOffset() {
    _offset.x = _rect.left - parentSize.left.value
    _offset.y = _rect.top - parentSize.top.value
  }
  function _updateWH(scale: number) {
    scale = scale || _scale
    scale = _adjustScale(scale)
    height.value = _rect.height / _scale
    width.value = _rect.width / _scale
    let _height = height.value * scale
    let _width = width.value * scale
    _scaleOffset.x = (_width - width.value) / 2
    _scaleOffset.y = (_height - height.value) / 2
  }
  function _updateBoundary() {
    let x = 0 - _offset.x + _scaleOffset.x
    let _width =
      parentSize.width.value - width.value - _offset.x - _scaleOffset.x
    minX.value = Math.min(x, _width)
    maxX.value = Math.max(x, _width)
    let y = 0 - _offset.y + _scaleOffset.y
    let _height =
      parentSize.height.value - height.value - _offset.y - _scaleOffset.y
    minY.value = Math.min(y, _height)
    maxY.value = Math.max(y, _height)
  }
  // @ts-expect-error
  function _beginScale() {
    _isScaling = true
  }
  function _updateScale(scale: number, animat?: boolean) {
    if (props.scale) {
      scale = _adjustScale(scale)
      _updateWH(scale)
      _updateBoundary()
      const limitXY = _getLimitXY(_translateX, _translateY)
      const x = limitXY.x
      const y = limitXY.y
      if (animat) {
        _animationTo(x, y, scale, '', true, true)
      } else {
        _requestAnimationFrame(function () {
          _setTransform(x, y, scale, '', true, true)
        })
      }
    }
  }
  function _updateOldScale(scale: number) {
    _oldScale = scale
  }
  function _adjustScale(scale: number) {
    scale = Math.max(0.1, scaleMinNumber.value, scale)
    scale = Math.min(10, scaleMaxNumber.value, scale)
    return scale
  }
  function _animationTo(
    x: number,
    y: number,
    scale: number,
    source?: number | string,
    r?: boolean,
    o?: boolean
  ) {
    FAandSFACancel()
    if (!xMove.value) {
      x = _translateX
    }
    if (!yMove.value) {
      y = _translateY
    }
    if (!props.scale) {
      scale = _scale
    }
    let limitXY = _getLimitXY(x, y)
    x = limitXY.x
    y = limitXY.y
    if (!props.animation) {
      _setTransform(x, y, scale, source, r, o)
      return
    }
    _STD._springX._solution = null
    _STD._springY._solution = null
    _STD._springScale._solution = null
    _STD._springX._endPosition = _translateX
    _STD._springY._endPosition = _translateY
    _STD._springScale._endPosition = _scale
    _STD.setEnd(x, y, scale, 1)
    _SFA = g(
      _STD,
      function () {
        let data = _STD.x()
        let x = data.x
        let y = data.y
        let scale = data.scale
        _setTransform(x, y, scale, source, r, o)
      },
      function () {
        _SFA!.cancel()
      }
    )
  }
  function _revise(source: number | string) {
    let limitXY = _getLimitXY(_translateX, _translateY)
    let x = limitXY.x
    let y = limitXY.y
    let outOfBounds = limitXY.outOfBounds
    if (outOfBounds) {
      _animationTo(x, y, _scale, source)
    }
    return outOfBounds
  }
  function _setTransform(
    x: number,
    y: number,
    scale: number,
    source: string | number = '',
    r?: boolean,
    o?: boolean
  ) {
    if (!(x !== null && x.toString() !== 'NaN' && typeof x === 'number')) {
      x = _translateX || 0
    }
    if (!(y !== null && y.toString() !== 'NaN' && typeof y === 'number')) {
      y = _translateY || 0
    }
    x = Number(x.toFixed(1))
    y = Number(y.toFixed(1))
    scale = Number(scale.toFixed(1))
    if (!(_translateX === x && _translateY === y)) {
      if (!r) {
        trigger('change', {
          x: v(x, _scaleOffset.x),
          y: v(y, _scaleOffset.y),
          source: source,
        })
      }
    }
    if (!props.scale) {
      scale = _scale
    }
    scale = _adjustScale(scale)
    scale = +scale.toFixed(3)
    if (o && scale !== _scale) {
      trigger('scale', {
        x: x,
        y: y,
        scale: scale,
      })
    }
    const transform = `translate(${x}px, ${y}px) scale(${scale})`
    animation.transition(rootRef.value, {
      styles: {
        transform,
      },
      duration: 0,
      delay: 0,
    })
    _translateX = x
    _translateY = y
    _scale = scale
  }

  function _updateRect() {
    return getComponentSize(rootRef.value!).then((rect: Size) => {
      _rect = rect
    })
  }
  function setParent() {
    if (!_isMounted.value) {
      return
    }
    FAandSFACancel()
    let scale = props.scale ? scaleValueSync.value : 1
    _updateOffset()
    _updateWH(scale)
    _updateBoundary()
    _translateX = xSync.value + _scaleOffset.x
    _translateY = ySync.value + _scaleOffset.y
    let limitXY = _getLimitXY(_translateX, _translateY)
    let x = limitXY.x
    let y = limitXY.y
    _setTransform(x, y, scale, '', true)
    _updateOldScale(scale)
  }

  onMounted(() => {
    movableViewContext = useTouchtrack((event) => {
      switch (event.detail.state) {
        case 'start':
          __handleTouchStart()
          break
        case 'move':
          __handleTouchMove(event)
          break
        case 'end':
          __handleTouchEnd()
      }
    })
    setTimeout(() => {
      _updateRect().then(() => {
        setParent()
      })
    }, 100)
    _friction.reconfigure(1, frictionNumber.value)
    _STD.reconfigure(
      1,
      (9 * Math.pow(dampingNumber.value, 2)) / 40,
      dampingNumber.value
    )

    const context: MovableViewContext = {
      setParent,
    }
    addMovableViewContext(context)

    onUnmounted(() => {
      removeMovableViewContext(context)
    })
  })
  onUnmounted(() => {
    FAandSFACancel()
  })

  const touchStart = () => {
    setTouchMovableViewContext(movableViewContext)
  }

  return touchStart
}
