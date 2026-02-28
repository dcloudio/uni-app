<template>
  <view
    v-if="overlay && showPageContainer"
    class="uni-page-container-overlay"
    :style="[overlayStyleMap, overlayStyle]"
    @click="onClickOverlay"
    @touchmove.prevent.stop
  ></view>
  <view
    v-if="showPageContainer"
    class="uni-page-container-popup"
    :class="popupClasses"
    :style="[innerStyleMap, customStyle]"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchCancel"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { onBackPress } from '@dcloudio/uni-app'
import { UniPageContainerElement } from './element'

defineOptions({
  name: 'page-container',
  rootElement: {
    name: 'uni-page-container',
    class: UniPageContainerElement,
  },
})

type PageContainerPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

interface PageContainerProps {
  show?: boolean
  duration?: number
  zIndex?: number
  overlay?: boolean
  round?: boolean
  position?: PageContainerPosition
  customStyle?: string
  overlayStyle?: string
  closeOnSlideDown?: boolean
}

const props = withDefaults(defineProps<PageContainerProps>(), {
  show: false,
  duration: 300,
  zIndex: 100,
  overlay: true,
  round: false,
  position: 'bottom',
  customStyle: '',
  overlayStyle: '',
  closeOnSlideDown: false,
})

const emits = defineEmits<{
  beforeenter: []
  enter: []
  afterenter: []
  beforeleave: []
  leave: []
  afterleave: []
  clickoverlay: [event: Event]
}>()

const showPageContainer = ref(false)
const isAnimating = ref(false)
const transitionTimer = ref<any>(null)
const isEntered = ref(false)

// 触摸相关状态（用于滑动关闭）
let touchStartX = 0
let touchStartY = 0
let touchStartTime = 0
let isDragging = false
const MAX_SLIDER_DISTANCE = 100
const MIN_SLIDER_VELOCITY = 0.3
const translateValue = ref<number>(0)

const overlayStyleMap = computed(() => {
  const styleObj: Record<string, string | number> = {
    'z-index': props.zIndex,
    'transition-duration': props.duration + 'ms',
  }
  if (isEntered.value) {
    styleObj['opacity'] = '1'
    styleObj['pointer-events'] = 'auto'
  }
  return styleObj
})

const innerStyleMap = computed(() => {
  const styleObj: Record<string, string | number> = {
    'z-index': props.zIndex + 1,
    'transition-duration': props.duration + 'ms',
  }
  // 滑动拖动时的 transform
  if (translateValue.value != 0 && isDragging) {
    let transformValue = ''
    switch (props.position) {
      case 'bottom':
      case 'top':
        transformValue = `translateY(${translateValue.value}px)`
        break
      case 'left':
      case 'right':
        transformValue = `translateX(${translateValue.value}px)`
        break
    }
    if (transformValue != '') {
      styleObj['transform'] = transformValue
      styleObj['transition'] = 'none'
    }
  } else if (translateValue.value != 0 && !isDragging) {
    // 回弹动画
    styleObj['transition'] = `transform ${props.duration}ms ease`
  }
  return styleObj
})

const popupClasses = computed(() => {
  const classes: string[] = []
  if (props.position != null) {
    classes.push(`uni-page-container-popup-${props.position}`)
  }
  if (props.round) {
    classes.push('uni-page-container-popup-round')
  }
  // 始终添加 enter 类，拖动时通过 style 覆盖 transform
  if (isEntered.value) {
    classes.push('uni-page-container-popup-enter')
  }
  return classes
})

function clearTransitionTimer() {
  if (transitionTimer.value != null) {
    clearTimeout(transitionTimer.value as number)
    transitionTimer.value = null
  }
}

// 动画结束处理
function onAnimationEnd(type: 'enter' | 'leave') {
  isAnimating.value = false

  clearTransitionTimer()

  if (type == 'enter') {
    emits('afterenter')
  } else if (type == 'leave') {
    showPageContainer.value = false
    emits('afterleave')
  }
}

// 监听动画结束
function listenTransitionEnd(type: 'enter' | 'leave') {
  // 清除之前的定时器
  clearTransitionTimer()

  // 使用 setTimeout 作为兜底方案
  transitionTimer.value = setTimeout(() => {
    onAnimationEnd(type)
  }, props.duration)
}

function resetDragState() {
  isDragging = false
  translateValue.value = 0
}

function openContainer() {
  emits('beforeenter')
  showPageContainer.value = true
  isEntered.value = false
  // 重置拖动状态
  resetDragState()
  nextTick(() => {
    emits('enter')
    isAnimating.value = true
    // 使用双重 requestAnimationFrame 避免 duration 失效
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isEntered.value = true
        listenTransitionEnd('enter')
      })
    })
  })
}

function closeContainer() {
  if (isAnimating.value) {
    return
  }
  emits('beforeleave')
  isAnimating.value = true
  nextTick(() => {
    isEntered.value = false
    emits('leave')
    // 监听动画结束
    listenTransitionEnd('leave')
  })
}

watch(
  (): boolean => props.show,
  (newVal: boolean) => {
    if (newVal && !showPageContainer.value) {
      openContainer()
    } else if (!newVal && showPageContainer.value) {
      closeContainer()
    }
  }
)

function onClickOverlay(event: Event) {
  if (isAnimating.value) {
    return
  }
  emits('clickoverlay', event)
  nextTick(() => {
    closeContainer()
  })
}

function onTouchStart(e: TouchEvent) {
  if (!props.closeOnSlideDown) {
    return
  }

  if (e.touches.length > 0) {
    const { clientX, clientY } = e.touches[0]
    touchStartX = clientX
    touchStartY = clientY
    touchStartTime = Date.now()
    isDragging = false
  }
}

function onTouchMove(e: TouchEvent) {
  // 如果不是滑动关闭模式，阻止事件冒泡（防止滚动穿透），但允许容器内部滚动
  if (!props.closeOnSlideDown) {
    e.preventDefault()
    e.stopPropagation()
    return
  }

  if (e.touches.length > 0) {
    const { clientX, clientY } = e.touches[0]
    const deltaX = clientX - touchStartX
    const deltaY = clientY - touchStartY
    let shouldDrag = false
    let dragValue = 0

    // 根据不同的 position 判断滑动方向
    switch (props.position) {
      case 'bottom':
        // 底部弹出：向下滑动关闭
        if (deltaY > 0) {
          shouldDrag = true
          dragValue = deltaY
        }
        break
      case 'top':
        // 顶部弹出：向上滑动关闭
        if (deltaY < 0) {
          shouldDrag = true
          dragValue = deltaY
        }
        break
      case 'left':
        // 左侧弹出：向左滑动关闭
        if (deltaX < 0) {
          shouldDrag = true
          dragValue = deltaX
        }
        break
      case 'right':
        // 右侧弹出：向右滑动关闭
        if (deltaX > 0) {
          shouldDrag = true
          dragValue = deltaX
        }
        break
    }

    if (shouldDrag) {
      isDragging = true
      translateValue.value = dragValue

      // 阻止默认滚动行为
      e.preventDefault()
      e.stopPropagation()
    }
  }
}

function onTouchEnd() {
  if (!props.closeOnSlideDown) {
    return
  }

  if (isDragging) {
    const deltaTime = Date.now() - touchStartTime
    const velocity = Math.abs(translateValue.value) / deltaTime

    // 判断是否应该关闭：拖动距离超过 100px 或拖动速度较快
    if (
      Math.abs(translateValue.value) > MAX_SLIDER_DISTANCE ||
      velocity > MIN_SLIDER_VELOCITY
    ) {
      // 先重置拖动状态，避免触发回弹逻辑
      resetDragState()
      closeContainer()
    } else {
      // 回弹
      resetDragState()
    }
  }
}

function onTouchCancel() {
  if (!props.closeOnSlideDown) {
    return
  }

  // touchcancel 时重置拖动状态并回弹
  if (isDragging) {
    resetDragState()
  }
}

onBackPress(() => {
  if (showPageContainer.value) {
    closeContainer()
    return true
  }
  return false
})

onMounted(() => {
  if (props.show) {
    openContainer()
  }
})

// 组件卸载前清理
onBeforeUnmount(() => {
  clearTransitionTimer()
})
</script>
