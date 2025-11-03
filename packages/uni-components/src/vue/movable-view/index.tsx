import {
  type Ref,
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { disableScrollBounce, initScrollBounce } from '../../helpers/scroll'
import { UniElement } from '../../helpers/UniElement'
import {
  type TouchtrackEvent,
  useTouchtrack,
} from '../../helpers/useTouchtrack'
import ResizeSensor from '../resize-sensor/index'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useEvent'
import type {
  AddMovableViewContext,
  MovableViewContext,
  RemoveMovableViewContext,
} from '../movable-area/index'
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

type RootRef = Ref<HTMLElement | null>

export class UniMovableViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'MovableView',
  props: movableViewProps,
  emits: ['change', 'scale'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-movable-view',
    class: UniMovableViewElement,
  },
  //#endif
  setup(props, { slots, emit }) {
    const rootRef: RootRef = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const { setParent } = useMovableViewState(props, trigger, rootRef)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniMovableViewElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <uni-movable-view ref={rootRef}>
          {/* @ts-expect-error */}
          <ResizeSensor onResize={setParent}></ResizeSensor>
          {slots.default && slots.default()}
        </uni-movable-view>
      )
    }
  },
})

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
function p(t: HTMLElement, n: HTMLElement): number {
  if (t === n) {
    return 0
  }
  let i = t.offsetLeft
  return t.offsetParent ? (i += p(t.offsetParent as HTMLElement, n)) : 0
}
function f(t: HTMLElement, n: HTMLElement): number {
  if (t === n) {
    return 0
  }
  let i = t.offsetTop
  return t.offsetParent ? (i += f(t.offsetParent as HTMLElement, n)) : 0
}
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
function _getPx(val: Props['x'] | Props['y']) {
  if (/\d+[ur]px$/i.test(val as string)) {
    return uni.upx2px(parseFloat(val as string))
  }
  return Number(val) || 0
}

type ReturnType_g = ReturnType<typeof g> | null
type ScaleOffset = {
  x: number
  y: number
}
type MoveDirection = 'htouchmove' | 'vtouchmove'

function useMovableViewLayout(
  rootRef: RootRef,
  _scale: Ref<number>,
  _adjustScale: (scale: number) => number
) {
  const movableAreaWidth: Ref<number> = inject('movableAreaWidth', ref(0))
  const movableAreaHeight: Ref<number> = inject('movableAreaHeight', ref(0))
  const movableAreaRootRef: RootRef = inject('movableAreaRootRef')!

  const _offset: ScaleOffset = {
    x: 0,
    y: 0,
  }
  const _scaleOffset: ScaleOffset = {
    x: 0,
    y: 0,
  }
  const width = ref(0)
  const height = ref(0)
  const minX = ref(0)
  const minY = ref(0)
  const maxX = ref(0)
  const maxY = ref(0)

  function _updateBoundary() {
    let x = 0 - _offset.x + _scaleOffset.x
    let _width =
      movableAreaWidth.value - width.value - _offset.x - _scaleOffset.x
    minX.value = Math.min(x, _width)
    maxX.value = Math.max(x, _width)
    let y = 0 - _offset.y + _scaleOffset.y
    let _height =
      movableAreaHeight.value - height.value - _offset.y - _scaleOffset.y
    minY.value = Math.min(y, _height)
    maxY.value = Math.max(y, _height)
  }
  function _updateOffset() {
    _offset.x = p(rootRef.value!, movableAreaRootRef.value!)
    _offset.y = f(rootRef.value!, movableAreaRootRef.value!)
  }
  function _updateWH(scale: number) {
    scale = scale || _scale.value
    scale = _adjustScale(scale)
    let rect = rootRef.value!.getBoundingClientRect()
    height.value = rect.height / _scale.value
    width.value = rect.width / _scale.value
    let _height = height.value * scale
    let _width = width.value * scale
    _scaleOffset.x = (_width - width.value) / 2
    _scaleOffset.y = (_height - height.value) / 2
  }

  return {
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,
  }
}

function useMovableViewTransform(
  rootRef: RootRef,
  props: Props,
  _scaleOffset: ScaleOffset,
  _scale: Ref<number>,
  maxX: Ref<number>,
  maxY: Ref<number>,
  minX: Ref<number>,
  minY: Ref<number>,
  _translateX: Ref<number>,
  _translateY: Ref<number>,
  _SFA: ReturnType_g,
  _FA: ReturnType_g,
  _adjustScale: (scale: number) => number,
  trigger: CustomEventTrigger
) {
  const dampingNumber = computed(() => {
    let val = Number(props.damping)
    return isNaN(val) ? 20 : val
  })
  const xMove = computed(
    () => props.direction === 'all' || props.direction === 'horizontal'
  )
  const yMove = computed(
    () => props.direction === 'all' || props.direction === 'vertical'
  )
  const xSync = ref(_getPx(props.x))
  const ySync = ref(_getPx(props.y))
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
  watch(xSync, (val) => {
    _setX(val)
  })
  watch(ySync, (val) => {
    _setY(val)
  })

  const _STD = new STD(
    1,
    (9 * Math.pow(dampingNumber.value, 2)) / 40,
    dampingNumber.value
  )

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
  function FAandSFACancel() {
    if (_FA) {
      _FA.cancel()
    }
    if (_SFA) {
      _SFA.cancel()
    }
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
      x = _translateX.value
    }
    if (!yMove.value) {
      y = _translateY.value
    }
    if (!props.scale) {
      scale = _scale.value
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
    _STD._springX._endPosition = _translateX.value
    _STD._springY._endPosition = _translateY.value
    _STD._springScale._endPosition = _scale.value
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
  function _setTransform(
    x: number,
    y: number,
    scale: number,
    source: string | number = '',
    r?: boolean,
    o?: boolean
  ) {
    if (!(x !== null && x.toString() !== 'NaN' && typeof x === 'number')) {
      x = _translateX.value || 0
    }
    if (!(y !== null && y.toString() !== 'NaN' && typeof y === 'number')) {
      y = _translateY.value || 0
    }
    x = Number(x.toFixed(1))
    y = Number(y.toFixed(1))
    scale = Number(scale.toFixed(1))
    if (!(_translateX.value === x && _translateY.value === y)) {
      if (!r) {
        trigger('change', {} as Event, {
          x: v(x, _scaleOffset.x),
          y: v(y, _scaleOffset.y),
          source: source,
        })
      }
    }
    if (!props.scale) {
      scale = _scale.value
    }
    scale = _adjustScale(scale)
    scale = +scale.toFixed(3)
    if (o && scale !== _scale.value) {
      trigger('scale', {} as Event, {
        x: x,
        y: y,
        scale: scale,
      })
    }
    let transform =
      'translateX(' +
      x +
      'px) translateY(' +
      y +
      'px) translateZ(0px) scale(' +
      scale +
      ')'
    if (rootRef.value) {
      rootRef.value.style.transform = transform
      rootRef.value.style.webkitTransform = transform
      _translateX.value = x
      _translateY.value = y
      _scale.value = scale
    }
  }
  function _revise(source: number | string) {
    let limitXY = _getLimitXY(_translateX.value, _translateY.value)
    let x = limitXY.x
    let y = limitXY.y
    let outOfBounds = limitXY.outOfBounds
    if (outOfBounds) {
      _animationTo(x, y, _scale.value, source)
    }
    return outOfBounds
  }
  function _setX(val: number) {
    if (xMove.value) {
      if (val + _scaleOffset.x === _translateX.value) {
        return _translateX
      } else {
        if (_SFA) {
          _SFA.cancel()
        }
        _animationTo(
          val + _scaleOffset.x,
          ySync.value + _scaleOffset.y,
          _scale.value
        )
      }
    }
    return val
  }
  function _setY(val: number) {
    if (yMove.value) {
      if (val + _scaleOffset.y === _translateY.value) {
        return _translateY
      } else {
        if (_SFA) {
          _SFA.cancel()
        }
        _animationTo(
          xSync.value + _scaleOffset.x,
          val + _scaleOffset.y,
          _scale.value
        )
      }
    }
    return val
  }

  return {
    FAandSFACancel,
    _getLimitXY,
    _animationTo,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD,
  }
}

function useMovableViewInit(
  props: Props,
  rootRef: RootRef,
  trigger: CustomEventTrigger,
  _scale: Ref<number>,
  _oldScale: Ref<number>,
  _isScaling: Ref<boolean>,
  _translateX: Ref<number>,
  _translateY: Ref<number>,
  _SFA: ReturnType_g,
  _FA: ReturnType_g
) {
  const scaleMinNumber = computed(() => {
    let val = Number(props.scaleMin)
    return isNaN(val) ? 0.1 : val
  })
  const scaleMaxNumber = computed(() => {
    let val = Number(props.scaleMax)
    return isNaN(val) ? 10 : val
  })

  const scaleValueSync = ref(Number(props.scaleValue) || 1)
  watch(scaleValueSync, (val) => {
    _setScaleValue(val)
  })
  watch(scaleMinNumber, () => {
    _setScaleMinOrMax()
  })
  watch(scaleMaxNumber, () => {
    _setScaleMinOrMax()
  })
  watch(
    () => props.scaleValue,
    (val) => {
      scaleValueSync.value = Number(val) || 0
    }
  )

  const {
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,
  } = useMovableViewLayout(rootRef, _scale, _adjustScale)
  const {
    FAandSFACancel,
    _getLimitXY,
    _animationTo,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD,
  } = useMovableViewTransform(
    rootRef,
    props,
    _scaleOffset,
    _scale,
    maxX,
    maxY,
    minX,
    minY,
    _translateX,
    _translateY,
    _SFA,
    _FA,
    _adjustScale,
    trigger
  )

  function _updateScale(scale: number, animat?: boolean) {
    if (props.scale) {
      scale = _adjustScale(scale)
      _updateWH(scale)
      _updateBoundary()
      const limitXY = _getLimitXY(_translateX.value, _translateY.value)
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
  function _beginScale() {
    _isScaling.value = true
  }
  function _updateOldScale(scale: number) {
    _oldScale.value = scale
  }
  function _adjustScale(scale: number) {
    scale = Math.max(0.1, scaleMinNumber.value, scale)
    scale = Math.min(10, scaleMaxNumber.value, scale)
    return scale
  }
  function _setScaleMinOrMax() {
    if (!props.scale) {
      return false
    }
    _updateScale(_scale.value, true)
    _updateOldScale(_scale.value)
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
  function _endScale() {
    _isScaling.value = false
    _updateOldScale(_scale.value)
  }
  function _setScale(scale: number) {
    if (scale) {
      scale = _oldScale.value * scale
      _beginScale()
      _updateScale(scale)
    }
  }

  return {
    // scale
    _updateOldScale,
    _endScale,
    _setScale,
    scaleValueSync,

    // layout
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,

    // transform
    FAandSFACancel,
    _getLimitXY,
    _animationTo,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD,
  }
}

function useMovableViewState(
  props: Props,
  trigger: CustomEventTrigger,
  rootRef: RootRef
) {
  const _isMounted: Ref<boolean> = inject('_isMounted', ref(false))
  const addMovableViewContext: AddMovableViewContext = inject(
    'addMovableViewContext',
    () => {}
  )
  const removeMovableViewContext: RemoveMovableViewContext = inject(
    'removeMovableViewContext',
    () => {}
  )
  let _scale = ref(1)
  let _oldScale = ref(1)
  let _isScaling = ref(false)
  let _translateX = ref(0)
  let _translateY = ref(0)
  let _SFA: ReturnType_g = null
  let _FA: ReturnType_g = null

  let _isTouching = false
  let __baseX: number
  let __baseY: number
  let _checkCanMove: boolean | null = null
  let _firstMoveDirection: MoveDirection | null = null
  const _declineX = new Decline()
  const _declineY = new Decline()
  const __touchInfo = {
    historyX: [0, 0],
    historyY: [0, 0],
    historyT: [0, 0],
  }
  const frictionNumber = computed(() => {
    let val = Number(props.friction)
    return isNaN(val) || val <= 0 ? 2 : val
  })
  const _friction = new Friction(1, frictionNumber.value)

  watch(
    () => props.disabled,
    () => {
      __handleTouchStart()
    }
  )

  const {
    // scale
    _updateOldScale,
    _endScale,
    _setScale,
    scaleValueSync,

    // layout
    _updateBoundary,
    _updateOffset,
    _updateWH,
    _scaleOffset,
    minX,
    minY,
    maxX,
    maxY,

    // transform
    FAandSFACancel,
    _getLimitXY,
    _setTransform,
    _revise,
    dampingNumber,
    xMove,
    yMove,
    xSync,
    ySync,
    _STD,
  } = useMovableViewInit(
    props,
    rootRef,
    trigger,
    _scale,
    _oldScale,
    _isScaling,
    _translateX,
    _translateY,
    _SFA,
    _FA
  )

  function __handleTouchStart() {
    if (!_isScaling.value) {
      if (!props.disabled) {
        disableScrollBounce({
          disable: true,
        })
        FAandSFACancel()
        __touchInfo.historyX = [0, 0]
        __touchInfo.historyY = [0, 0]
        __touchInfo.historyT = [0, 0]
        if (xMove.value) {
          __baseX = _translateX.value
        }
        if (yMove.value) {
          __baseY = _translateY.value
        }
        rootRef.value!.style.willChange = 'transform'
        _checkCanMove = null
        _firstMoveDirection = null
        _isTouching = true
      }
    }
  }
  function __handleTouchMove(event: TouchtrackEvent) {
    if (!_isScaling.value && !props.disabled && _isTouching) {
      let x = _translateX.value
      let y = _translateY.value
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
        event.preventDefault()
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
          _setTransform(x, y, _scale.value, source)
        })
      }
    }
  }
  function __handleTouchEnd() {
    if (!_isScaling.value && !props.disabled && _isTouching) {
      disableScrollBounce({
        disable: false,
      })
      rootRef.value!.style.willChange = 'auto'
      _isTouching = false
      if (!_checkCanMove && !_revise('out-of-bounds') && props.inertia) {
        const xv =
          (1000 * (__touchInfo.historyX[1] - __touchInfo.historyX[0])) /
          (__touchInfo.historyT[1] - __touchInfo.historyT[0])
        const yv =
          (1000 * (__touchInfo.historyY[1] - __touchInfo.historyY[0])) /
          (__touchInfo.historyT[1] - __touchInfo.historyT[0])

        const __translateX = _translateX.value
        const __translateY = _translateY.value

        _friction.setV(xv, yv)
        _friction.setS(__translateX, __translateY)
        const x0 = _friction.delta().x
        const y0 = _friction.delta().y
        let x = x0 + __translateX
        let y = y0 + __translateY
        if (x < minX.value) {
          x = minX.value
          y = __translateY + ((minX.value - __translateX) * y0) / x0
        } else {
          if (x > maxX.value) {
            x = maxX.value
            y = __translateY + ((maxX.value - __translateX) * y0) / x0
          }
        }
        if (y < minY.value) {
          y = minY.value
          x = __translateX + ((minY.value - __translateY) * x0) / y0
        } else {
          if (y > maxY.value) {
            y = maxY.value
            x = __translateX + ((maxY.value - __translateY) * x0) / y0
          }
        }
        _friction.setEnd(x, y)
        _FA = g(
          _friction,
          function () {
            let t = _friction.s()
            let x = t.x
            let y = t.y
            _setTransform(x, y, _scale.value, 'friction')
          },
          function () {
            _FA!.cancel()
          }
        )
      }
    }

    if (!props.outOfBounds && !props.inertia) {
      FAandSFACancel()
    }
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
    let limitXY = _getLimitXY(
      xSync.value + _scaleOffset.x,
      ySync.value + _scaleOffset.y
    )
    let x = limitXY.x
    let y = limitXY.y
    _setTransform(x, y, scale, '', true)
    _updateOldScale(scale)
  }

  onMounted(() => {
    useTouchtrack(rootRef.value!, (event) => {
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
    setParent()
    _friction.reconfigure(1, frictionNumber.value)
    _STD.reconfigure(
      1,
      (9 * Math.pow(dampingNumber.value, 2)) / 40,
      dampingNumber.value
    )
    rootRef.value!.style.transformOrigin = 'center'
    initScrollBounce()

    const context: MovableViewContext = {
      rootRef,
      setParent,
      _endScale,
      _setScale,
    }
    addMovableViewContext(context)

    onUnmounted(() => {
      removeMovableViewContext(context)
    })
  })
  onUnmounted(() => {
    FAandSFACancel()
  })

  return {
    setParent,
  }
}
