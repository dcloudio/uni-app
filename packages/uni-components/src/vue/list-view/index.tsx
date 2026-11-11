import {
  computed,
  nextTick,
  onActivated,
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
import { type EmitEvent, useCustomEvent } from '../../helpers/useEvent'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import ResizeSensor from '../resize-sensor/index'
import type {
  ListItemStatus,
  StickyHeaderStatus,
  StickySectionStatus,
} from './types'
import { debounce } from '@dcloudio/uni-shared'
import Refresher from '../refresher'
import { RefreshStateEnum, type RefresherState } from '../refresher/types'
import { useRefresher } from '../refresher/useRefresher'

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
  scrollIntoView: {
    type: String,
    default: '',
  },
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

    useRefresher({
      props,
      state,
      scrollElement: containerRef,
      isVertical,
      trigger,
      emit: emit as SetupContext['emit'],
      onNativeTouchMove(event, dx, dy) {
        if (!isVertical.value || Math.abs(dx) > Math.abs(dy)) return
        const element = containerRef.value!
        const position = element.scrollTop
        const max = element.scrollHeight - element.offsetHeight
        if ((dy > 0 && position > 0) || (dy < 0 && position < max)) {
          event.stopPropagation()
        }
      },
    })

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
    watch(
      () => props.scrollIntoView,
      (val) => {
        _scrollIntoViewChanged(val)
      }
    )

    function _scrollIntoViewChanged(val: string) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.error(`id error: scroll-into-view=${val}`)
          return
        }
        let element = containerRef.value!.querySelector('#' + val)
        if (element) {
          let mainRect = containerRef.value!.getBoundingClientRect()
          let elRect = element.getBoundingClientRect()
          if (!isVertical.value) {
            let left = elRect.left - mainRect.left
            let scrollLeft = containerRef.value!.scrollLeft
            let x = scrollLeft + left
            containerRef.value!.scrollLeft = x
          }
          if (isVertical.value) {
            let top = elRect.top - mainRect.top
            let scrollTop = containerRef.value!.scrollTop
            let y = scrollTop + top
            containerRef.value!.scrollTop = y
          }
        }
      }
    }

    let lastScrollLeft = 0
    let lastScrollTop = 0
    onActivated(() => {
      if (containerRef.value) {
        containerRef.value.scrollLeft = lastScrollLeft
        containerRef.value.scrollTop = lastScrollTop
        resetContainerSize()
      }
    })

    onMounted(() => {
      resetContainerSize()
      let lastScrollOffset = 0
      containerRef.value!.addEventListener('scroll', function ($event) {
        const target = $event.target as HTMLElement
        if (isHTMlElement(target)) {
          lastScrollLeft = target.scrollLeft
          lastScrollTop = target.scrollTop
        }
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
          : props.direction === 'all'
          ? 'overflow: auto;'
          : isVertical.value
          ? 'overflow: hidden auto;'
          : 'overflow: auto hidden;'
      }scroll-behavior: ${props.scrollWithAnimation ? 'smooth' : 'auto'};`
    })
    const visibleStyle = computed(() => {
      return `${isVertical.value ? 'width' : 'height'}: 100%;`
    })
    const placeholderHeadStyle = computed(() => {
      return `${isVertical.value ? 'height' : 'width'}: ${
        state.headPlaceholderSize
      }px;`
    })
    const placeholderTailStyle = computed(() => {
      return `${isVertical.value ? 'height' : 'width'}: ${
        state.tailPlaceholderSize
      }px;`
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
            <div class="uni-list-view-content">
              <div style={placeholderHeadStyle.value}></div>
              {visibleVNode}
              <div style={placeholderTailStyle.value}></div>
            </div>
          </div>
          <ResizeSensor initial={true} onResize={onResize} />
        </uni-list-view>
      )
    }
  },
})

interface State extends RefresherState {
  defaultItemSize: number
  defaultItemSizeUpdated: boolean
  defaultHeaderSize: number
  defaultHeaderSizeUpdated: boolean
  totalSize: number
  headPlaceholderSize: number
  tailPlaceholderSize: number
  visibleSize: number
  containerSize: number
  cacheScreenCount: number
  loadScreenThreshold: number
  lastRenderOffsetMin: number
  lastRenderOffsetMax: number
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
    headPlaceholderSize: 0,
    tailPlaceholderSize: 0,
    visibleSize: 0,
    containerSize: 0,
    cacheScreenCount: 10,
    loadScreenThreshold: 8,
    refresherHeight: 0,
    refreshState: RefreshStateEnum.Idle,
    lastRenderOffsetMin: 0,
    lastRenderOffsetMax: 0,
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
  const rearrangeOffsetMin = state.lastRenderOffsetMin + loadScreenThresholdSize
  const rearrangeOffsetMax = state.lastRenderOffsetMax - loadScreenThresholdSize
  return offset < rearrangeOffsetMin || offset > rearrangeOffsetMax
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
  state.lastRenderOffsetMin = offsetMin
  state.lastRenderOffsetMax = offsetMax
  let tempTotalSize = 0
  let tempVisibleSize = 0
  let tempHeadPlaceholderSize = 0
  let tempTailPlaceholderSize = 0
  let start = false,
    end = false
  function callback(child: VNode) {
    const childType = child.component?.type.name
    const status = child.component?.exposed?.__listViewChildStatus
    if (childType === 'StickySection') {
      const { headSize, tailSize, headPlaceholderSize, tailPlaceholderSize } =
        status as StickySectionStatus
      tempTotalSize += headSize.value
      let tempTailPlaceholderSizeOfSection = 0
      let tempHeadPlaceholderSizeOfSection = 0
      traverseStickySection(child, (child: VNode) => {
        const childType = child.component?.type.name
        const status = child.component?.exposed?.__listViewChildStatus
        if (childType === 'StickyHeader') {
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

          if (start && !end) {
            tempVisibleSize += itemSize
            status.visible.value = true
          } else if (start && end) {
            status.visible.value = false
            tempTailPlaceholderSizeOfSection += itemSize
          } else {
            status.visible.value = false
            tempHeadPlaceholderSizeOfSection += itemSize
          }
          if (!end && tempTotalSize >= offsetMax) {
            end = true
          }
        }
      })
      tempVisibleSize +=
        tempHeadPlaceholderSizeOfSection + tempTailPlaceholderSizeOfSection
      tempTotalSize += tailSize.value
      headPlaceholderSize.value = tempHeadPlaceholderSizeOfSection
      tailPlaceholderSize.value = tempTailPlaceholderSizeOfSection
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
        tempHeadPlaceholderSize += itemSize
      } else if (start && end) {
        tempTailPlaceholderSize += itemSize
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
  state.headPlaceholderSize = tempHeadPlaceholderSize
  state.tailPlaceholderSize = tempTailPlaceholderSize
}
