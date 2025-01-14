import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import type {
  ComputedRef,
  ExtractPropTypes,
  Ref,
  SetupContext,
  VNode,
} from 'vue'
import { UniElement } from '../../helpers/UniElement'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useEvent'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import ResizeSensor from '../resize-sensor/index'
import type {
  ListItemStatus,
  StickyHeaderStatus,
  StickySectionStatus,
} from './types'
import { debounce } from '@dcloudio/uni-shared'
import Refresher from '../refresher'
import type { RefreshState } from '../refresher/types'

export function isHTMlElement(node: Node | null): node is HTMLElement {
  return !!(node && node.nodeType === 1)
}

function getChildren(root: VNode): VNode[] {
  const children: VNode[] = []
  if (root) {
    walk(root, children)
  }
  return children
}

const ChildType = ['ListItem', 'StickySection', 'StickyHeader']

function walk(vnode: VNode, children: VNode[]) {
  if (
    vnode.component &&
    vnode.component.type &&
    vnode.component.type.name &&
    ChildType.includes(vnode.component.type.name)
  ) {
    children.push(vnode)
  } else if (vnode.component) {
    walk(vnode.component.subTree, children)
  } else if (vnode.shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
    const vnodes = vnode.children as VNode[]
    for (let i = 0; i < vnodes.length; i++) {
      walk(vnodes[i], children)
    }
  }
}

// 遍历子节点
function traverseListView(
  visibleVNode: VNode,
  callback: (child: VNode) => void
) {
  const children = getChildren(visibleVNode)
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    callback(child) // list-item or sticky-header or sticky-section
  }
}
function traverseStickySection(
  stickySectionVNode: VNode,
  callback: (child: VNode) => void
) {
  const children = getChildren(stickySectionVNode.component!.subTree)
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    callback(child) // list-item or sticky-header
  }
}

const props = {
  direction: {
    type: String,
    default: 'vertical',
    validator: (val: string) => {
      return ['none', 'vertical', 'horizontal'].includes(val)
    },
  },
  showScrollbar: {
    type: [Boolean, String],
    default: true,
  },
  upperThreshold: {
    type: [Number, String],
    default: 50,
  },
  lowerThreshold: {
    type: [Number, String],
    default: 50,
  },
  scrollTop: {
    type: [Number, String],
    default: 0,
  },
  scrollLeft: {
    type: [Number, String],
    default: 0,
  },
  // 暂不支持
  // scrollIntoView: {
  //   type: String,
  //   default: '',
  // },
  scrollWithAnimation: {
    type: [Boolean, String],
    default: false,
  },
  refresherEnabled: {
    type: [Boolean, String],
    default: false,
  },
  refresherThreshold: {
    type: Number,
    default: 45,
  },
  refresherDefaultStyle: {
    type: String,
    default: 'black',
  },
  refresherBackground: {
    type: String,
    default: __X__ ? 'transparent' : '#fff',
  },
  refresherTriggered: {
    type: [Boolean, String],
    default: false,
  },
}

type Props = ExtractPropTypes<typeof props>

export class UniListViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ListView',
  props,
  emits: [
    'scroll',
    'scrolltoupper',
    'scrolltolower',
    // 有触发时机，但是由于没有原生事件暂不支持
    // 'scrollend',
    'refresherrefresh',
    'refresherrestore',
    'refresherpulling',
    'refresherabort',
    'update:refresherTriggered',
  ],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-list-view',
    class: UniListViewElement,
  },
  //#endif
  setup(props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const containerRef = ref<HTMLElement | null>(null)
    const visibleRef = ref<HTMLElement | null>(null)

    const { isVertical, state } = useListViewState(props)

    provide('__listViewIsVertical', isVertical)
    provide('__listViewDefaultItemSize', state.defaultItemSize)
    provide('__listViewDefaultHeaderSize', state.defaultHeaderSize)

    const rearrangeDebounce = debounce(
      () => {
        nextTick(() => {
          _rearrange()
        })
      },
      5,
      { clearTimeout, setTimeout }
    )
    const childStatus: ListItemStatus[] = []
    provide('__listViewRegisterItem', (status: ListItemStatus) => {
      childStatus.push(status)
      rearrangeDebounce()
    })
    provide('__listViewUnregisterItem', (status: ListItemStatus) => {
      const index = childStatus.indexOf(status)
      childStatus.splice(index, 1)
      rearrangeDebounce()
    })
    let firstItemRendered = false
    provide('__listViewFirstItemRendered', (status: ListItemStatus) => {
      if (firstItemRendered) {
        return
      }
      state.defaultItemSize = status.cachedSize
      state.defaultItemSizeUpdated = true
    })
    watch(
      () => {
        return state.defaultHeaderSize
      },
      (value) => {
        rearrangeDebounce()
      }
    )
    watch(
      () => {
        return state.defaultItemSize
      },
      () => {
        childStatus.forEach((status) => {
          if (status.cachedSizeUpdated) {
            return
          }
          status.cachedSize = state.defaultItemSize
        })
        rearrangeDebounce()
      }
    )

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    handleTouchEvent(
      isVertical,
      containerRef,
      props,
      state,
      trigger,
      emit as SetupContext['emit']
    )

    function getOffset() {
      return isVertical.value
        ? containerRef.value!.scrollTop
        : containerRef.value!.scrollLeft
    }

    function resetContainerSize() {
      const containerEl = containerRef.value!
      state.containerSize = isVertical.value
        ? containerEl.clientHeight
        : containerEl.clientWidth
      rearrangeDebounce()
    }

    watch(isVertical, () => {
      resetContainerSize()
    })

    // 用户传入的属性
    const upperThresholdNumber: ComputedRef<number> = computed(() => {
      const val = Number(props.upperThreshold)
      return isNaN(val) ? 50 : val
    })
    const lowerThresholdNumber: ComputedRef<number> = computed(() => {
      const val = Number(props.lowerThreshold)
      return isNaN(val) ? 50 : val
    })
    const scrollTopNumber = computed(() => {
      return Number(props.scrollTop) || 0
    })
    const scrollLeftNumber = computed(() => {
      return Number(props.scrollLeft) || 0
    })

    // 滚动位置变动监听
    watch(scrollTopNumber, (val) => {
      if (containerRef.value) {
        containerRef.value.scrollTop = val
      }
    })
    watch(scrollLeftNumber, (val) => {
      if (containerRef.value) {
        containerRef.value.scrollLeft = val
      }
    })

    onMounted(() => {
      resetContainerSize()
      let lastScrollOffset = 0
      containerRef.value!.addEventListener('scroll', function ($event) {
        const target = $event.target as HTMLElement
        trigger('scroll', $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: isVertical.value ? 0 : lastScrollOffset - target.scrollLeft,
          deltaY: isVertical.value ? lastScrollOffset - target.scrollTop : 0,
        })
        const currentOffset = getOffset()

        // 滚动到顶部
        const upperOffset = upperThresholdNumber.value
        if (currentOffset <= upperOffset && lastScrollOffset > upperOffset) {
          trigger('scrolltoupper', $event, {
            direction: isVertical.value ? 'top' : 'left',
          })
        }

        // 滚动到底部
        const realTotalSize = isVertical.value
          ? target.scrollHeight
          : target.scrollWidth
        const realRootSize = isVertical.value
          ? target.clientHeight
          : target.clientWidth
        const lowerOffset =
          realTotalSize - realRootSize - lowerThresholdNumber.value
        if (currentOffset >= lowerOffset && lastScrollOffset < lowerOffset) {
          trigger('scrolltolower', $event, {
            direction: isVertical.value ? 'bottom' : 'right',
          })
        }

        lastScrollOffset = currentOffset
        if (_shouldRearrange()) {
          _rearrange()
        }
      })

      //#if _X_ && !_NODE_JS_
      const rootElement = rootRef.value as UniListViewElement
      const containerElement = containerRef.value as HTMLElement
      Object.defineProperties(rootElement, {
        scrollHeight: {
          get() {
            return containerElement.scrollHeight
          },
        },
        scrollWidth: {
          get() {
            return containerElement.scrollWidth
          },
        },
        scrollLeft: {
          get() {
            return containerElement.scrollLeft
          },
          set(val) {
            containerElement.scrollLeft = val
          },
        },
        scrollTop: {
          get() {
            return containerElement.scrollTop
          },
          set(val) {
            containerElement.scrollTop = val
          },
        },
        scrollBy: {
          get() {
            return containerElement.scrollBy.bind(containerElement)
          },
        },
      })
      rootElement.attachVmProps(props)
      //#endif
    })

    function onResize() {
      childStatus.forEach((status) => {
        status.cachedSizeUpdated = false
      })
      resetContainerSize()
    }

    // 计算需要显示的item
    function _rearrange() {
      rearrange(visibleVNode!, containerRef, isVertical, state)
    }
    function _shouldRearrange() {
      return shouldRearrange(containerRef, isVertical, state)
    }

    /**
     * scroll-behavior: smooth; 自chrome61版本起支持，safari自15.4版本起支持。除safari外无兼容问题
     */
    const containerStyle = computed(() => {
      return `${
        props.direction === 'none'
          ? 'overflow: hidden;'
          : isVertical.value
          ? 'overflow-y: auto;'
          : 'overflow-x: auto;'
      }scroll-behavior: ${props.scrollWithAnimation ? 'smooth' : 'auto'};`
    })
    const contentStyle = computed(() => {
      return `position: relative; ${isVertical.value ? 'height' : 'width'}: ${
        state.totalSize
      }px;`
    })
    const visibleStyle = computed(() => {
      return `position: absolute; ${
        isVertical.value ? 'width' : 'height'
      }: 100%; ${isVertical.value ? 'top' : 'left'}: ${state.placehoderSize}px;`
    })

    let visibleVNode = null as VNode | null
    return () => {
      const {
        refresherEnabled,
        refresherBackground,
        refresherDefaultStyle,
        refresherThreshold,
      } = props
      const { refresherHeight, refreshState } = state

      const defaultSlot = slots.default && slots.default()
      visibleVNode = (
        <div
          ref={visibleRef}
          class="uni-list-view-visible"
          style={visibleStyle.value}
        >
          {defaultSlot}
        </div>
      )
      return (
        <uni-list-view ref={rootRef} class="uni-list-view">
          <div
            ref={containerRef}
            class={`uni-list-view-container ${
              props.showScrollbar === false
                ? 'uni-list-view-scrollbar-hidden'
                : ''
            }`}
            style={containerStyle.value}
          >
            {refresherEnabled ? (
              <Refresher
                refreshState={refreshState}
                refresherHeight={refresherHeight}
                refresherThreshold={refresherThreshold}
                refresherDefaultStyle={refresherDefaultStyle}
                refresherBackground={refresherBackground}
              >
                {refresherDefaultStyle == 'none'
                  ? slots.refresher && slots.refresher()
                  : null}
              </Refresher>
            ) : null}
            <div class="uni-list-view-content" style={contentStyle.value}>
              {visibleVNode}
            </div>
          </div>
          <ResizeSensor onResize={onResize} />
        </uni-list-view>
      )
    }
  },
})

interface State {
  defaultItemSize: number
  defaultItemSizeUpdated: boolean
  defaultHeaderSize: number
  defaultHeaderSizeUpdated: boolean
  totalSize: number
  placehoderSize: number
  visibleSize: number
  containerSize: number
  cacheScreenCount: number
  loadScreenThreshold: number
  refresherHeight: number
  refreshState: RefreshState
}

function useListViewState(props: Props) {
  const isVertical = computed(() => {
    return props.direction !== 'horizontal'
  })
  const state: State = reactive({
    defaultItemSize: 40,
    defaultItemSizeUpdated: false,
    defaultHeaderSize: 40,
    defaultHeaderSizeUpdated: false,
    totalSize: 0,
    placehoderSize: 0,
    visibleSize: 0,
    containerSize: 0,
    cacheScreenCount: 10,
    loadScreenThreshold: 8,
    refresherHeight: 0,
    refreshState: '',
  })
  return {
    state,
    isVertical,
  }
}

// 根据滚动位置判断是否需要重新排列
function shouldRearrange(
  containerRef: Ref<HTMLElement | null>,
  isVertical: ComputedRef<boolean>,
  state: State
) {
  const offset = isVertical.value
    ? containerRef.value!.scrollTop
    : containerRef.value!.scrollLeft
  const loadScreenThresholdSize =
    state.containerSize * state.loadScreenThreshold
  const rearrangeOffsetMin = state.placehoderSize + loadScreenThresholdSize
  const rearrangeOffsetMax =
    state.placehoderSize + state.visibleSize - loadScreenThresholdSize
  return (
    (offset < rearrangeOffsetMin && state.placehoderSize > 0) ||
    (offset > rearrangeOffsetMax &&
      state.placehoderSize + state.visibleSize < state.totalSize)
  )
}

function rearrange(
  visibleVNode: VNode,
  containerRef: Ref<HTMLElement | null>,
  isVertical: ComputedRef<boolean>,
  state: State
) {
  if (!visibleVNode) {
    return
  }
  const containerEl = containerRef.value
  if (!containerEl) {
    return
  }
  const offset = isVertical.value
    ? containerEl.scrollTop
    : containerEl.scrollLeft
  const offsetMin = Math.max(
    offset - state.containerSize * state.cacheScreenCount,
    0
  )
  const offsetMax = Math.max(
    offset + state.containerSize * (state.cacheScreenCount + 1),
    offsetMin + 1
  )
  let tempTotalSize = 0
  let tempVisibleSize = 0
  let tempPlaceholderSize = 0
  let start = false,
    end = false
  function callback(child: VNode) {
    const childType = child.component?.type.name
    const status = child.component?.exposed?.__listViewChildStatus
    if (childType === 'StickySection') {
      const { headSize, tailSize } = status as StickySectionStatus
      tempTotalSize += headSize.value
      traverseStickySection(child, callback)
      tempTotalSize += tailSize.value
    } else if (childType === 'ListItem') {
      const { cachedSize, cachedSizeUpdated } = status as ListItemStatus
      if (
        cachedSizeUpdated &&
        cachedSize > 0 &&
        !state.defaultItemSizeUpdated
      ) {
        state.defaultItemSize = cachedSize
        state.defaultItemSizeUpdated = true
      }
      const itemSize = cachedSize || state.defaultItemSize
      tempTotalSize += itemSize
      if (!start && tempTotalSize > offsetMin) {
        start = true
      }
      if (!start) {
        tempPlaceholderSize += itemSize
      }
      if (start && !end) {
        tempVisibleSize += itemSize
        status.visible.value = true
      } else {
        status.visible.value = false
      }
      if (!end && tempTotalSize >= offsetMax) {
        end = true
      }
    } else if (childType === 'StickyHeader') {
      const { cachedSize, cachedSizeUpdated } = status as StickyHeaderStatus
      if (
        cachedSizeUpdated &&
        cachedSize > 0 &&
        !state.defaultHeaderSizeUpdated
      ) {
        state.defaultHeaderSize = cachedSize
        state.defaultHeaderSizeUpdated = true
      }
      tempTotalSize += cachedSize || state.defaultHeaderSize
      tempVisibleSize += cachedSize
    }
  }
  traverseListView(visibleVNode!, callback)
  state.totalSize = tempTotalSize
  state.visibleSize = tempVisibleSize
  state.placehoderSize = tempPlaceholderSize
}

function handleTouchEvent(
  isVertical: ComputedRef<boolean>,
  containerRef: Ref<HTMLElement | null>,
  props: Props,
  state: State,
  trigger: CustomEventTrigger,
  emit: SetupContext['emit']
) {
  let beforeRefreshing = false
  let triggerAbort = false
  let toUpperNumber = 0

  type touchPoint = {
    x: number
    y: number
  }
  let touchStart: touchPoint = {
    x: 0,
    y: 0,
  }
  let touchEnd: touchPoint = {
    x: 0,
    y: props.refresherThreshold,
  }

  function _setRefreshState(_state: RefreshState) {
    if (!props.refresherEnabled) return
    switch (_state) {
      case 'refreshing':
        state.refresherHeight = props.refresherThreshold
        // 之前是刷新状态则不再触发刷新
        if (!beforeRefreshing) {
          beforeRefreshing = true
          trigger('refresherpulling', {} as Event, {
            deltaY: state.refresherHeight,
            dy: state.refresherHeight,
          })
          trigger('refresherrefresh', {} as Event, {
            dy: touchEnd.y - touchStart.y,
          })
          emit('update:refresherTriggered', true)
        }
        break
      case 'restore':
      case 'refresherabort':
        beforeRefreshing = false
        state.refresherHeight = toUpperNumber = 0
        if (_state === 'restore') {
          triggerAbort = false
          trigger('refresherrestore', {} as Event, {
            dy: touchEnd.y - touchStart.y,
          })
        }
        if (_state === 'refresherabort' && triggerAbort) {
          triggerAbort = false
          trigger('refresherabort', {} as Event, {
            dy: touchEnd.y - touchStart.y,
          })
        }
        break
    }
    state.refreshState = _state
  }

  watch(
    () => props.refresherTriggered,
    (val) => {
      if (val === true) {
        _setRefreshState('refreshing')
      } else if (val === false) {
        _setRefreshState('restore')
      }
    }
  )

  function __handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      touchStart = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      }
    }
  }
  function __handleTouchMove(event: TouchEvent) {
    const containerEl = containerRef.value!
    if (touchStart === null) return
    let x = event.touches[0].pageX
    let y = event.touches[0].pageY
    if (!isVertical.value) {
      return
    }
    let needStop = false
    if (Math.abs(touchStart.y - y) < Math.abs(touchStart.x - x)) {
      needStop = false
    } else if (containerEl.scrollTop === 0 && y > touchStart.y) {
      needStop = false
      // 刷新时，阻止页面滚动
      if (props.refresherEnabled && event.cancelable !== false)
        event.preventDefault()
    } else if (
      containerEl.scrollHeight ===
        containerEl.offsetHeight + containerEl.scrollTop &&
      y < touchStart.y
    ) {
      needStop = false
      return
    } else {
      needStop = true
    }
    if (needStop) {
      event.stopPropagation()
    }
    if (!props.refresherEnabled) {
      return
    }
    if (containerEl.scrollTop === 0 && event.touches.length === 1) {
      // 如果容器滑动到达顶端，则进入下拉状态
      _setRefreshState('pulling')
    }

    if (props.refresherEnabled && state.refreshState === 'pulling') {
      const dy = y - touchStart.y

      if (toUpperNumber === 0) {
        toUpperNumber = y
      }

      if (!beforeRefreshing) {
        state.refresherHeight = y - toUpperNumber
        // 之前为刷新状态则不再触发pulling
        if (state.refresherHeight > 0) {
          triggerAbort = true
          trigger('refresherpulling', event, {
            deltaY: dy,
            dy,
          })
        }
      } else {
        state.refresherHeight = dy + props.refresherThreshold
        // 如果之前在刷新状态，则不触发刷新中断
        triggerAbort = false
      }
    }
  }
  function __handleTouchEnd(event: TouchEvent) {
    touchEnd = {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    }
    if (state.refresherHeight >= props.refresherThreshold) {
      _setRefreshState('refreshing')
    } else {
      _setRefreshState('refresherabort')
    }
    touchStart = {
      x: 0,
      y: 0,
    }
    touchEnd = {
      x: 0,
      y: props.refresherThreshold,
    }
  }

  onMounted(() => {
    //兼容页面下拉刷新
    const containerEl = containerRef.value!
    containerEl.addEventListener('touchstart', __handleTouchStart)
    containerEl.addEventListener('touchmove', __handleTouchMove, {
      passive: false,
    })
    containerEl.addEventListener('touchend', __handleTouchEnd)
  })

  onBeforeUnmount(() => {
    const containerEl = containerRef.value!
    containerEl.removeEventListener('touchstart', __handleTouchStart)
    containerEl.removeEventListener('touchmove', __handleTouchMove)
    containerEl.removeEventListener('touchend', __handleTouchEnd)
  })
}
