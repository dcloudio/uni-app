import {
  ref,
  onUnmounted,
  onMounted,
  nextTick,
  computed,
  provide,
  watch,
} from 'vue'
import type { ComputedRef, Ref, VNode, ComponentPublicInstance } from 'vue'
import { UniElement } from '../../helpers/UniElement'
import { useCustomEvent, EmitEvent } from '../../helpers/useEvent'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import ResizeSensor from '../resize-sensor/index'

export function isHTMlElement(node: Node | null): node is HTMLElement {
  return !!(node && node.nodeType === 1)
}

export type ListViewItemStatus = {
  itemId: number
  visible: Ref<boolean>
  cachedSize: number
  seen: Ref<boolean>
}

function getListItem(root: VNode): ComponentPublicInstance[] {
  const children: ComponentPublicInstance[] = []
  if (root) {
    walk(root, children)
  }
  return children
}

function walk(vnode: VNode, children: ComponentPublicInstance[]) {
  if (vnode.component) {
    children.push(vnode.component.proxy!)
  } else if (vnode.shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
    const vnodes = vnode.children as VNode[]
    for (let i = 0; i < vnodes.length; i++) {
      walk(vnodes[i], children)
    }
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
        return ['vertical', 'horizontal'].includes(val)
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
      return props.direction === 'vertical'
    })
    const defaultItemSize = 40
    const cacheScreenCount = 5
    const loadScreenThreshold = 3

    let rootSize = 0

    provide('__listViewIsVertical', isVertical)
    provide('__listViewDefaultItemSize', defaultItemSize)

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    function getOffset() {
      return isVertical.value
        ? containerRef.value!.scrollTop
        : containerRef.value!.scrollLeft
    }

    // 根据滚动位置判断是否需要重新排列
    function shouldRearrange() {
      const offset = getOffset()
      const loadScreenThresholdSize = rootSize * loadScreenThreshold
      const rearrangeOffsetMin = placehoderSize.value + loadScreenThresholdSize
      const rearrangeOffsetMax =
        placehoderSize.value + visibleSize.value - loadScreenThresholdSize
      // return (
      //   (offset > loadScreenThresholdSize && offset < rearrangeOffsetMin) ||
      //   (offset > rearrangeOffsetMax &&
      //     offset < totalSize.value - loadScreenThresholdSize)
      // )
      return offset < rearrangeOffsetMin || offset > rearrangeOffsetMax
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

    let isScrolling = false
    let renderStoped = true
    let lastCheckScrollEndOffset = 0
    function checkScrollEnd() {
      if (renderStoped) {
        return
      }
      const currentOffset = getOffset()
      if (isScrolling && lastCheckScrollEndOffset === currentOffset) {
        // 模拟scrollend
        isScrolling = false
        nextTick(() => {
          if (shouldRearrange()) {
            rearrange()
          }
        })
      }
      lastCheckScrollEndOffset = currentOffset
      requestAnimationFrame(checkScrollEnd)
    }
    onMounted(() => {
      renderStoped = false
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
        isScrolling = true
        if (shouldRearrange()) {
          rearrange()
        }
      })
      // scrollend chrome114版本起支持
      // scrollRef.value!.addEventListener('scrollend', () => {
      //   nextTick(() => {
      //     rearrange()
      //   })
      // })
      nextTick(() => {
        checkScrollEnd()
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
      })
      rootElement.attachVmProps(props)
      //#endif
    })

    onUnmounted(() => {
      renderStoped = true
    })

    // 缓存列表项状态
    const cachedItems = [] as ListViewItemStatus[]

    // 对cachedItems进行排序
    let sortTimeout: any = null
    function sortCachedItems() {
      if (sortTimeout !== null) {
        clearTimeout(sortTimeout)
        sortTimeout = null
      }
      sortTimeout = setTimeout(() => {
        const contentNode = visibleRef.value!
        if (!contentNode) {
          // TODO 热刷新的时候会进入此分支，暂未深入排查
          return
        }
        const listItemInstances = getListItem(visibleVnode!)
        const childrenIds = listItemInstances.map(
          (item) => item.$?.exposed?.itemId
        )
        cachedItems.sort((a, b) => {
          return childrenIds.indexOf(a.itemId) - childrenIds.indexOf(b.itemId)
        })
        totalSize.value = cachedItems.reduce((total, item) => {
          return total + item.cachedSize
        }, 0)
        rearrange()
      }, 1)
    }
    provide('__listViewRegisterItem', (status: ListViewItemStatus) => {
      cachedItems.push(status)
      nextTick(() => {
        sortCachedItems()
      })
    })
    provide('__listViewUnregisterItem', (status: ListViewItemStatus) => {
      const index = cachedItems.indexOf(status)
      index > -1 && cachedItems.splice(index, 1)
      nextTick(() => {
        sortCachedItems()
      })
    })

    // 列表整体刷新，谨慎使用
    function refresh() {
      cachedItems.map((item) => {
        item.seen.value = false
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
      refresh()
    }

    // 计算需要显示的item
    function rearrange() {
      const offset = isVertical.value
        ? containerRef.value!.scrollTop
        : containerRef.value!.scrollLeft
      rootSize = isVertical.value
        ? rootRef.value!.clientHeight
        : rootRef.value!.clientWidth
      if (!rootSize) {
        return
      }
      const offsetMin = Math.max(offset - rootSize * cacheScreenCount, 0)
      const offsetMax = offset + rootSize * (cacheScreenCount + 1)
      let tempTotalSize = 0
      let tempVisibleSize = 0
      let start = false,
        end = false
      for (let i = 0; i < cachedItems.length; i++) {
        const item = cachedItems[i]
        const itemSize = item.cachedSize || defaultItemSize
        const nextTotalSize = tempTotalSize + itemSize
        if (!start && nextTotalSize > offsetMin) {
          placehoderSize.value = tempTotalSize
          start = true
        }
        if (start && !end) {
          tempVisibleSize += itemSize
          item.visible.value = true
        } else {
          item.visible.value = false
        }
        if (!end && nextTotalSize >= offsetMax) {
          end = true
        }
        tempTotalSize = nextTotalSize
      }
      totalSize.value = tempTotalSize
      visibleSize.value = tempVisibleSize
    }

    /**
     * scroll-behavior: smooth; 自chrome61版本起支持，safari自15.4版本起支持。除safari外无兼容问题
     */
    const containerStyle = computed(() => {
      return `${
        isVertical.value ? 'overflow-y: auto;' : 'overflow-x: auto;'
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

    let visibleVnode = null as VNode | null
    return () => {
      const defaultSlot = slots.default && slots.default()
      visibleVnode = (
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
              {visibleVnode}
            </div>
          </div>
          <ResizeSensor onResize={onResize} />
        </uni-list-view>
      )
    }
  },
})
