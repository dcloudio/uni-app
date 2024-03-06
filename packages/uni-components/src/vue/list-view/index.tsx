import {
  ref,
  onBeforeUnmount,
  onMounted,
  nextTick,
  computed,
  provide,
  watch,
} from 'vue'
import type { ComputedRef, Ref, VNode } from 'vue'
import { UniElement } from '../../helpers/UniElement'
import { useCustomEvent, EmitEvent } from '../../helpers/useEvent'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import ResizeSensor from '../resize-sensor/index'
import {
  ListItemStatus,
  StickyHeaderStatus,
  StickySectionStatus,
} from './types'
import { debounce } from '@dcloudio/uni-shared'

export function isHTMlElement(node: Node | null): node is HTMLElement {
  return !!(node && node.nodeType === 1)
}

export type ListViewItemStatus = {
  itemId: 'ListItem' | 'StickySection' | 'StickyHeader'
  visible: Ref<boolean>
  cachedSize: number
  seen: Ref<boolean>
}

function getChildren(root: VNode): VNode[] {
  const children: VNode[] = []
  if (root) {
    walk(root, children)
  }
  return children
}

function walk(vnode: VNode, children: VNode[]) {
  if (vnode.component) {
    children.push(vnode)
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

class UniListViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ListView',
  props: {
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
  },
  emits: [
    'scroll',
    'scrolltoupper',
    'scrolltolower',
    // 有触发时机，但是由于没有原生事件暂不支持
    // 'scrollend',
  ],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-list-view',
    class: UniListViewElement,
  },
  //#endif
  setup(props, { slots, expose, emit }) {
    // TODO 按照功能拆分代码
    const rootRef = ref<HTMLElement | null>(null)
    const containerRef = ref<HTMLElement | null>(null)
    const visibleRef = ref<HTMLElement | null>(null)
    const placehoderSize = ref(0)
    const visibleSize = ref(0)
    const totalSize = ref(0)
    const isVertical = computed(() => {
      return props.direction !== 'horizontal'
    })
    const defaultItemSize = 40
    const cacheScreenCount = 5
    const loadScreenThreshold = 3

    let containerSize = 0

    provide('__listViewIsVertical', isVertical)
    provide('__listViewDefaultItemSize', defaultItemSize)

    const onItemChange = debounce(
      () => {
        nextTick(() => {
          rearrange()
        })
      },
      10,
      { clearTimeout, setTimeout }
    )
    provide('__listViewRegisterItem', (status: ListViewItemStatus) => {
      onItemChange()
    })
    provide('__listViewUnregisterItem', (status: ListViewItemStatus) => {
      onItemChange()
    })

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    handleTouchEvent(isVertical, containerRef)

    function getOffset() {
      return isVertical.value
        ? containerRef.value!.scrollTop
        : containerRef.value!.scrollLeft
    }

    function resetContainerSize() {
      const containerEl = containerRef.value!
      containerSize = isVertical.value
        ? containerEl.clientHeight
        : containerEl.clientWidth
    }

    watch(isVertical, () => {
      resetContainerSize()
    })

    // 根据滚动位置判断是否需要重新排列
    function shouldRearrange() {
      const offset = getOffset()
      const loadScreenThresholdSize = containerSize * loadScreenThreshold
      const rearrangeOffsetMin = placehoderSize.value + loadScreenThresholdSize
      const rearrangeOffsetMax =
        placehoderSize.value + visibleSize.value - loadScreenThresholdSize
      return (
        (offset < rearrangeOffsetMin && placehoderSize.value > 0) ||
        (offset > rearrangeOffsetMax &&
          placehoderSize.value + visibleSize.value < totalSize.value)
      )
    }

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
        if (shouldRearrange()) {
          rearrange()
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

    // 列表整体刷新，谨慎使用
    function refresh() {
      traverseAllItems((child) => {
        const exposed = child.component!.exposed
        if (exposed?.__listViewChildStatus.seen.value) {
          exposed.__listViewChildStatus.seen.value = false
        }
      })
      nextTick(() => {
        nextTick(() => {
          rearrange()
        })
      })
    }
    expose({
      refresh,
    })

    function onResize() {
      resetContainerSize()
      refresh()
    }

    function traverseAllItems(callback: (child: VNode) => void) {
      traverseListView(visibleVNode!, (child) => {
        const childType = child.component?.type.name
        if (childType === 'StickySection') {
          traverseStickySection(child, function () {
            const childType = child.component?.type.name
            if (childType === 'ListItem') {
              callback(child)
            }
          })
        } else if (childType === 'ListItem') {
          callback(child)
        }
      })
    }

    // 计算需要显示的item
    function rearrange() {
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
      const offsetMin = Math.max(offset - containerSize * cacheScreenCount, 0)
      const offsetMax = Math.max(
        offset + containerSize * (cacheScreenCount + 1),
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
          const { cachedSize } = status as ListItemStatus
          const itemSize = cachedSize
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
          const { cachedSize } = status as StickyHeaderStatus
          tempTotalSize += cachedSize
          tempVisibleSize += cachedSize
        }
      }
      traverseListView(visibleVNode!, callback)
      totalSize.value = tempTotalSize
      visibleSize.value = tempVisibleSize
      placehoderSize.value = tempPlaceholderSize
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
        totalSize.value
      }px;`
    })
    const visibleStyle = computed(() => {
      return `position: absolute; ${
        isVertical.value ? 'width' : 'height'
      }: 100%; ${isVertical.value ? 'top' : 'left'}: ${placehoderSize.value}px;`
    })

    let visibleVNode = null as VNode | null
    return () => {
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

function handleTouchEvent(
  isVertical: ComputedRef<boolean>,
  containerRef: Ref<HTMLElement | null>
) {
  let touchStart: { x: number; y: number } | null = {
    x: 0,
    y: 0,
  }

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
    } else if (
      containerEl.scrollHeight ===
        containerEl.offsetHeight + containerEl.scrollTop &&
      y < touchStart.y
    ) {
      needStop = false
    } else {
      needStop = true
    }
    if (needStop) {
      event.stopPropagation()
    }
  }
  function __handleTouchEnd(event: TouchEvent) {
    touchStart = null
  }

  onMounted(() => {
    //兼容页面下拉刷新
    const containerEl = containerRef.value!
    containerEl.addEventListener('touchstart', __handleTouchStart)
    containerEl.addEventListener('touchmove', __handleTouchMove)
    containerEl.addEventListener('touchend', __handleTouchEnd)
  })

  onBeforeUnmount(() => {
    const containerEl = containerRef.value!
    containerEl.removeEventListener('touchstart', __handleTouchStart)
    containerEl.removeEventListener('touchmove', __handleTouchMove)
    containerEl.removeEventListener('touchend', __handleTouchEnd)
  })
}
