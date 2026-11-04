<template>
  <view class="container">
    <view ref="containerRef" class="slider-track"
      <!-- #ifndef WEB -->
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @touchcancel="handleTouchCancel"
      <!-- #endif -->
      <!-- #ifdef WEB -->
      @pointerdown="handlePointerDown" @pointermove="handlePointerMove" @pointerup="handlePointerUp"
      @pointercancel="handlePointerCancel" @lostpointercapture="handlePointerCancel"
      <!-- #endif -->
    >
      <!-- 背景轨道 -->
      <view flatten ref="backgroundRef" class="slider-track-bg" :class="props.trackClass">
        <!-- 填充条(左边线) -->
        <view flatten ref="fillRef" class="slider-track-fill"
          :class="props.trackActiveClass" :style="{ transform: `scaleX(${trackActiveScaleX})` }">
        </view>
      </view>

      <!-- 滑块 -->
      <view flatten ref="handleRef" style="overflow: visible; align-self: flex-start;z-index: 2;"
        :style="{ width: '100%', transform: `translateX(${thumbTranslateX}%)` }">
        <view flatten
          <!-- #ifdef WEB -->
          :tabindex="props.disabled ? -1 : 0" role="slider" :aria-disabled="props.disabled" aria-orientation="horizontal"
          :aria-valuenow="currentValue" :aria-valuemin="Number.isFinite(props.min) ? props.min : 0" :aria-valuemax="effectiveMax"
          @keydown="handleKeyDown" @keyup="handleKeyUp" @blur="handleThumbBlur" @click="handleThumbClick"
          <!-- #endif -->
          ref="thumbRef" class="slider-handle"
          :class="props.thumbClass"
          :style="{ transform: `translateX(-${thumbTranslateX}%)` }">
        </view>
      </view>
    </view>

    <!-- 显示当前值 -->
    <text flatten v-if="props.showValue" style="width: 35px;color: #888;font-size: 14px;align-self: center;margin-left: 5px;white-space: nowrap;">
      {{ currentValue }}
    </text>
  </view>
</template>

<script setup lang="ts">
  import { FORM_KEY, LABEL_KEY, dispatchLabelClick, registerLabelTarget } from '../common.ts'
  import { UniSliderChangeEvent, UniSliderElement } from './global.ts'
  import { ActivatableChild, FormContext, LabelContext } from '../types.ts'

  defineOptions({
    name: 'slider',
    externalClasses: ['track-class', 'track-active-class', 'thumb-class'],
    rootElement: {
      name: 'uni-slider-element',
      class: UniSliderElement
    }
  })
  // Emits 定义
  const emit = defineEmits<{
    'change' : [event: UniSliderChangeEvent]
    'changing' : [event: UniSliderChangeEvent]
  }>()

  // Props 类型定义
  type SliderProps = {
    /**
     * 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    name ?: string
    /**
     * slider 最小值
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    min ?: number
    /**
     * slider 最大值
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    max ?: number
    /**
     * slider 步长，取值必须大于 0，并且可被(max - min)整除
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    step ?: number
    /**
     * slider 当前取值
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    value ?: number
    /**
     * 是否禁用
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    disabled ?: boolean
    /**
     * 是否显示当前 value
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "√",
           "unixVer": "4.11",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    showValue ?: boolean
    /** 滑块左侧已选择部分的线条颜色 */
    activeColor ?: string.ColorString
    /** 滑块左侧已选择部分的线条颜色，优先级高于 activeColor
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.33"
         },
         "android": {
           "unixVaporVer": "5.33"
         },
         "harmony": {
           "unixVaporVer": "5.33"
         }
       }
     }
    */
    activeBackgroundColor ?: string.ColorString
    /** 背景条的颜色
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.33"
         },
         "android": {
           "unixVaporVer": "5.33"
         },
         "harmony": {
           "unixVaporVer": "5.33"
         }
       }
     }
    */
    backgroundColor ?: string.ColorString
    /** 滑块的大小，取值范围为 12 到 28，单位为 px；未设置时使用 thumbClass 或默认样式
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.33"
         },
         "android": {
           "unixVaporVer": "5.33"
         },
         "harmony": {
           "unixVaporVer": "5.33"
         }
       }
     }
    */
    blockSize ?: number | null
    /** 滑块的颜色 (使用foreColor替代) */
    blockColor ?: string.ColorString
    /** 滑块的颜色
     * @uniPlatform {
       "app": {
         "ios": {
           "unixVaporVer": "5.33"
         },
         "android": {
           "unixVaporVer": "5.33"
         },
         "harmony": {
           "unixVaporVer": "5.33"
         }
       }
     }
    */
    foreColor ?: string.ColorString
    /**
     * slider 背景条样式类名
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "x",
           "unixVer": "x",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    trackClass ?: string.ClassString
    /**
     * slider 滑块左侧已选择部分的线条样式类名
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "x",
           "unixVer": "x",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    trackActiveClass ?: string.ClassString
    /**
     * slider 滑块样式类名
     * @uniPlatform {
       "app": {
         "ios": {
           "uniVer": "x",
           "unixVer": "x",
           "unixVaporVer": "5.11"
         },
         "android": {
           "unixVaporVer": "5.21"
         },
         "harmony": {
           "unixVaporVer": "5.0"
         }
       }
     }
     */
    thumbClass ?: string.ClassString
  }

  const attrs = useAttrs()
  const id = attrs.id ?? ''
  let unregisterLabelTarget: (() => void) | null = null

  // Props 定义
  const props = withDefaults(defineProps<SliderProps>(), {
    name: '',
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    disabled: false,
    showValue: false,
    activeColor: '',
    activeBackgroundColor: '',
    backgroundColor: '',
    blockSize: null,
    blockColor: '',
    foreColor: '',
    trackClass: '',
    trackActiveClass: '',
    thumbClass: ''
  })

  // Refs
  const containerRef = ref<UniElement | null>(null)
  const backgroundRef = ref<UniElement | null>(null)
  const fillRef = ref<UniElement | null>(null)
  const handleRef = ref<UniElement | null>(null)
  const thumbRef = ref<UniElement | null>(null)

  function setColor(element : UniElement | null, color : string) {
    if (element == null) return
    if (color.length > 0) {
      element.style.setProperty('background-color', color)
    } else {
      element.style.removeProperty('background-color')
    }
  }

  watchEffect(() => {
    setColor(backgroundRef.value, props.backgroundColor)
    setColor(fillRef.value, props.activeBackgroundColor.length > 0 ? props.activeBackgroundColor : props.activeColor)
    setColor(thumbRef.value, props.foreColor.length > 0 ? props.foreColor : props.blockColor)
    const blockSize = props.blockSize
    const thumbEl = thumbRef.value
    if (thumbEl != null) {
      if (blockSize != null && !isNaN(blockSize)) {
        const size = Math.min(Math.max(blockSize, 12), 28)
        thumbEl.style.setProperty('width', size + 'px')
        thumbEl.style.setProperty('height', size + 'px')
        thumbEl.style.setProperty('border-radius', size / 2 + 'px')
      } else {
        thumbEl.style.removeProperty('width')
        thumbEl.style.removeProperty('height')
        thumbEl.style.removeProperty('border-radius')
      }
    }
  })

  // 状态
  const initialValue = props.value
  const currentValue = ref(props.value)
  const isDragging = ref(false)
  // 轨道尺寸缓存
  let trackWidth = 0
  let trackLeft = 0
  let rafId = 0
  let ticking = false
  let cachedDecimalPlaces = -1 // 缓存 step 小数位数，-1表示未缓存
  let cachedStep = props.step // 缓存 step 值，便于检测变化
  let lastValue = 0 // 用于判断是否触发 change
  // #ifdef WEB
  const thumbTranslateX = ref(0)
  const trackActiveScaleX = ref(0)
  // #endif
  // #ifndef WEB
  let thumbTranslateX = 0
  let trackActiveScaleX = 0
  // #endif

  // 计算有效的最大值（考虑 step）
  const effectiveMax = computed(() : number => {
    const min = Number.isFinite(props.min) ? props.min : 0
    const max = Number.isFinite(props.max) ? props.max : min
    const step = props.step
    const range = max - min
    if (!Number.isFinite(step) || step <= 0 || range <= 0) return min
    return min + Math.floor(range / step) * step
  })

  let _activeStatus : number = 0 // 滑动判断 0:未激活 1:已激活
  let touchStartX = 0 // 触摸起始 X 坐标
  let touchStartY = 0 // 触摸起始 Y 坐标
  const TOUCH_THRESHOLD = 4 // 触摸阈值（像素）

  // #ifdef WEB
  let activePointerId = -1
  let pointerTarget : HTMLElement | null = null
  let pointerClientX = 0
  let pointerStartFocus : Element | null = null

  function releasePointerCapture() {
    const target = pointerTarget
    const pointerId = activePointerId
    activePointerId = -1
    pointerTarget = null
    pointerStartFocus = null
    if (target != null && target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId)
    }
  }
  // #endif

  function resetInteractionState() {
    if (rafId != 0) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    ticking = false
    isDragging.value = false
    lastValue = currentValue.value
    // #ifdef WEB
    releasePointerCapture()
    // #endif
  }

  function preventDefaultEvent(e : UniTouchEvent) {
    if (e.cancelable) {
      e.preventDefault()
    }
    e.stopPropagation()
  }

  // 双向线性插值函数
  function lerp(start : number, end : number, t : number) : number {
    // 限制 t 的值在 [0, 1] 范围内
    const clampedT = Math.max(0, Math.min(1, t))
    return start * (1 - clampedT) + end * clampedT
  }

  // 获取数字的小数位数
  function getDecimalPlaces(num : number) : number {
    if (num == 0) return 0
    if (cachedStep !== num || cachedDecimalPlaces == -1) {
      const str = num.toString()
      const decimalIndex = str.indexOf('.')
      if (decimalIndex == -1) cachedDecimalPlaces = 0
      cachedDecimalPlaces = str.length - decimalIndex - 1
    }
    return cachedDecimalPlaces
  }

  // 应用步进精度处理
  function applyStepPrecision(value : number) : number {
    let result = value

    if (props.step > 0) {
      result = Math.round(result / props.step) * props.step

      // 根据step的小数位数来toFixed结果
      const decimalPlaces = getDecimalPlaces(props.step)
      if (decimalPlaces > 0) {
        result = parseFloat(result.toFixed(decimalPlaces))
      }
    }

    return result
  }

  function applyVisualPosition(percentage : number, fillScale : number) {
    // #ifdef WEB
    thumbTranslateX.value = percentage * 100
    trackActiveScaleX.value = fillScale
    // #endif
    // #ifndef WEB
    const handleEl = handleRef.value
    if (handleEl != null) {
      handleEl.style.setProperty('transform', `translateX(${percentage * 100}%)`)
    } else {
      thumbTranslateX = percentage * 100
    }
    const thumbEl = thumbRef.value
    if (thumbEl != null) {
      thumbEl.style.setProperty('transform', `translateX(-${percentage * 100}%)`)
    }
    const fillEl = fillRef.value
    if (fillEl != null) {
      fillEl.style.setProperty('transform', `scaleX(${fillScale})`)
    } else {
      trackActiveScaleX = fillScale
    }
    // #endif
  }

  // 核心渲染函数：更新视觉效果
  function renderVisuals(newValue : number) {
    // 1. 边界限制（使用有效最大值）
    const min = Number.isFinite(props.min) ? props.min : 0
    const max = Number.isFinite(effectiveMax.value) ? effectiveMax.value : min
    const clampedValue = Number.isFinite(newValue) ? Math.max(min, Math.min(newValue, max)) : min
    currentValue.value = clampedValue

    // 2. 使用 value、min、max 计算比例（不依赖布局信息）
    const range = max - min
    const percentage = range > 0 ? (clampedValue - min) / range : 0

    // 3. 填充条缩放比例（减去微小值避免边界问题）
    const fillScale = percentage - 0.001

    applyVisualPosition(percentage, fillScale)

  }

  // 计算新值
  function calculateValue(clientX : number) : number {
    if (trackWidth <= 0) {
      return currentValue.value
    }

    const containerWidth = trackWidth
    const containerLeft = trackLeft
    const min = Number.isFinite(props.min) ? props.min : 0
    const max = Number.isFinite(props.max) ? props.max : min
    if (max <= min) return min

    let currentX = clientX - containerLeft

    // 边界检查
    currentX = Math.max(0, Math.min(currentX, containerWidth))

    // 计算比例
    const ratio = currentX / containerWidth

    // 使用线性插值计算实际值
    let newValue = lerp(min, max, ratio)

    // 应用步进精度处理
    newValue = applyStepPrecision(newValue)

    // 确保不超过有效最大值
    newValue = Math.max(min, Math.min(newValue, effectiveMax.value))

    return newValue
  }

  // #ifndef WEB
  // 触摸开始
  function handleTouchStart(e : UniTouchEvent) {
    if (props.disabled == true) {
      return
    }

    // 记录触摸起始位置
    if (e.touches.length > 0) {
      lastValue = currentValue.value
      // 重置激活状态
      _activeStatus = 0
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY

      // 缓存轨道尺寸
      const containerEl = containerRef.value
      if (containerEl != null) {
        const rect = containerEl.getBoundingClientRect()
        trackWidth = rect.width
        trackLeft = rect.left
      }
    }
  }

  // 触摸结束
  function handleTouchEnd(e : UniTouchEvent) {
    if (_activeStatus == 0 && e.changedTouches.length > 0) {
      const newValue = calculateValue(e.changedTouches[0].clientX)
      renderVisuals(newValue)
    }

    if (lastValue !== currentValue.value) {
      emit('change', new UniSliderChangeEvent(currentValue.value))
    }
    resetInteractionState()
  }

  function handleTouchCancel() {
    resetInteractionState()
  }

  // 触摸移动处理
  function handleTouchMove(e : UniTouchEvent) {
    if (props.disabled == true) {
      return
    }

    // 如果还未激活，判断是否超过阈值
    if (_activeStatus == 0 && e.touches.length > 0) {
      const deltaX = Math.abs(e.touches[0].clientX - touchStartX)
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY)

      // 判断是否超过阈值
      if (deltaX > TOUCH_THRESHOLD || deltaY > TOUCH_THRESHOLD) {
        // 判断是水平滑动还是垂直滑动
        if (deltaX > deltaY) {
          // 水平滑动，激活 slider
          _activeStatus = 1
        } else {
          // 垂直滑动，不激活 slider，让页面滚动
          _activeStatus = -1
          return
        }
      } else {
        // 未超过阈值，不处理
        return
      }
    }

    // 如果未激活或已判定为垂直滑动，不处理
    if (_activeStatus != 1) {
      return
    }

    preventDefaultEvent(e)

    if (ticking == false) {
      rafId = requestAnimationFrame(() => {
        if (e.touches.length > 0) {
          const newValue = calculateValue(e.touches[0].clientX)
          if (newValue === currentValue.value) {
            ticking = false
            return
          }
          renderVisuals(newValue)
          emit('changing', new UniSliderChangeEvent(currentValue.value))
        }
        ticking = false
      })
      ticking = true
    }
  }
  // #endif

  // #ifdef WEB
  function focusThumb() {
    if (props.disabled) return
    const element = thumbRef.value as HTMLElement | null
    if (element != null && element.ownerDocument.activeElement !== element) element.focus({ preventScroll: true })
  }

  function handleThumbClick(e : MouseEvent) {
    // label 和辅助技术的 click 没有 pointer 流程；指针点击已在拖动处理中完成聚焦。
    if (e.detail == 0) focusThumb()
  }

  function finishPointerInteraction(clientX : number) {
    if (props.disabled) {
      resetInteractionState()
      return
    }
    // 松开可能早于待执行的 rAF，先应用最终位置再派发 change。
    if (_activeStatus != -1) {
      const element = thumbRef.value as HTMLElement | null
      // 手势期间焦点已转给其他控件时，不在松开时将焦点抢回。
      if (element != null && element.ownerDocument.activeElement === pointerStartFocus) focusThumb()
      renderVisuals(calculateValue(clientX))
    }
    const value = currentValue.value
    const changed = lastValue !== value
    // 先结束本轮交互，避免 change 回调内开始的新交互被旧清理覆盖。
    resetInteractionState()
    if (changed) emit('change', new UniSliderChangeEvent(value))
  }

  function handlePointerMove(e : PointerEvent) {
    if (e.pointerId != activePointerId || props.disabled == true) {
      return
    }

    // 多键同时按下时，左键释放可能只有 pointermove，没有 pointerup。
    if (e.pointerType == 'mouse' && (e.buttons & 1) == 0) {
      finishPointerInteraction(e.clientX)
      return
    }

    if (_activeStatus == 0) {
      const deltaX = Math.abs(e.clientX - touchStartX)
      const deltaY = Math.abs(e.clientY - touchStartY)
      if (deltaX <= TOUCH_THRESHOLD && deltaY <= TOUCH_THRESHOLD) return
      _activeStatus = deltaX > deltaY ? 1 : -1
    }
    if (_activeStatus != 1) return

    if (e.cancelable) {
      e.preventDefault()
    }
    e.stopPropagation()
    pointerClientX = e.clientX

    if (ticking == false) {
      ticking = true
      const pointerId = activePointerId
      const frameId = requestAnimationFrame(() => {
        if (rafId != frameId) return
        rafId = 0
        ticking = false
        if (activePointerId != pointerId || props.disabled) return
        const newValue = calculateValue(pointerClientX)
        if (newValue === currentValue.value) return
        renderVisuals(newValue)
        emit('changing', new UniSliderChangeEvent(currentValue.value))
      })
      rafId = frameId
    }
  }

  function handlePointerDown(e : PointerEvent) {
    if (props.disabled == true || activePointerId != -1 || !e.isPrimary || e.button != 0) {
      return
    }

    lastValue = currentValue.value
    isDragging.value = true
    touchStartX = e.clientX
    touchStartY = e.clientY
    _activeStatus = e.pointerType == 'mouse' ? 1 : 0
    activePointerId = e.pointerId
    const thumbEl = thumbRef.value as HTMLElement | null
    pointerStartFocus = thumbEl?.ownerDocument.activeElement ?? null
    pointerTarget = e.currentTarget as HTMLElement
    // 捕获后即使指针移出轨道也能继续拖动，无需给 window 添加监听。
    pointerTarget.setPointerCapture(e.pointerId)

    // 缓存轨道尺寸
    const containerEl = containerRef.value
    if (containerEl != null) {
      const rect = containerEl.getBoundingClientRect()
      trackLeft = rect.left
      trackWidth = rect.width
    }

    if (e.pointerType == 'mouse') {
      e.preventDefault()
      focusThumb()
      renderVisuals(calculateValue(e.clientX))
    }
  }

  function handlePointerUp(e : PointerEvent) {
    if (e.pointerId != activePointerId || e.button != 0) {
      return
    }

    finishPointerInteraction(e.clientX)
  }

  function handlePointerCancel(e : PointerEvent) {
    if (e.pointerId == activePointerId) resetInteractionState()
  }
  const sliderKeys = ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End', 'PageUp', 'PageDown']
  const pressedSliderKeys = new Set<string>()

  function handleThumbBlur() {
    pressedSliderKeys.clear()
    resetInteractionState()
  }

  function getKeyboardDecimalPlaces(value : number) : number {
    const parts = value.toString().split('e')
    const fraction = parts[0].split('.')[1] ?? ''
    return Math.max(0, fraction.length - Number(parts[1] ?? '0'))
  }

  function ownsKeyboardEvent(e : KeyboardEvent) : boolean {
    const element = thumbRef.value as HTMLElement | null
    // 只处理滑块本体持有焦点时的按键，不接管其他控件、输入法或组合快捷键。
    return !props.disabled && element != null && e.target === element && e.currentTarget === element &&
      element.ownerDocument.activeElement === element && !e.defaultPrevented && !e.isComposing &&
      !e.altKey && !e.ctrlKey && !e.metaKey && sliderKeys.includes(e.key)
  }

  function handleKeyUp(e : KeyboardEvent) {
    const handled = pressedSliderKeys.delete(e.key)
    const element = thumbRef.value as HTMLElement | null
    // 与实际接管的 keydown 配对，避免修饰键松开顺序改变按键归属。
    if (handled && element != null && e.target === element && e.currentTarget === element) e.stopPropagation()
  }

  function handleKeyDown(e : KeyboardEvent) {
    if (!ownsKeyboardEvent(e)) return
    pressedSliderKeys.add(e.key)
    // 包含边界值未变化的情况，避免祖先 swiper 等组件再次响应同一按键。
    e.preventDefault()
    e.stopPropagation()
    if (isDragging.value || !Number.isFinite(props.step) || props.step <= 0) return

    const min = Number.isFinite(props.min) ? props.min : 0
    let newValue = currentValue.value

    if (e.key == 'ArrowLeft' || e.key == 'ArrowDown') {
      newValue -= props.step
    } else if (e.key == 'ArrowRight' || e.key == 'ArrowUp') {
      newValue += props.step
    } else if (e.key == 'PageUp') {
      newValue += props.step * 10
    } else if (e.key == 'PageDown') {
      newValue -= props.step * 10
    } else if (e.key == 'Home') {
      newValue = min
    } else if (e.key == 'End') {
      newValue = effectiveMax.value
    }

    // 键盘步进相对 min 对齐；同步提交，连续按键不会覆盖，失焦后也没有遗留帧。
    newValue = min + Math.round((newValue - min) / props.step) * props.step
    const precision = Math.min(100, Math.max(getKeyboardDecimalPlaces(min), getKeyboardDecimalPlaces(props.step)))
    newValue = parseFloat(newValue.toFixed(precision))
    newValue = Math.max(min, Math.min(newValue, effectiveMax.value))
    if (newValue === currentValue.value) return
    renderVisuals(newValue)
    emit('change', new UniSliderChangeEvent(currentValue.value))
  }
  // #endif

  // 窗口resize处理
  function handleResize() {
    // 清除缓存的尺寸，强制重新计算
    trackWidth = 0
    trackLeft = 0
    // 重新渲染当前值
    renderVisuals(currentValue.value)
  }

  // 初始化渲染
  renderVisuals(currentValue.value)

  onMounted(() => {
    nextTick(() => {
      // 监听 props 变化
      watch(() : number => { return props.value }, (newValue : number) => {
        // 拖动期间以组件内部值为准，避免父组件回传旧值导致滑块回跳。
        if (isDragging.value) return
        renderVisuals(newValue)
      })

      watch([
        () : number => props.min,
        () : number => props.max
      ], () => {
        renderVisuals(currentValue.value)
      })

      watch(() : number => { return props.step }, () => {
        renderVisuals(currentValue.value)
      })

      watch(() : boolean => props.showValue, () => {
        nextTick(() => setTimeout(handleResize, 10))
      })

      watch(() : boolean => props.disabled, (disabled : boolean) => {
        if (disabled) {
          resetInteractionState()
          // #ifdef WEB
          const element = thumbRef.value as HTMLElement | null
          if (element != null && element.ownerDocument.activeElement === element) element.blur()
          // #endif
        }
      })
    })

    // register with form if available
    const formCtx = inject<FormContext | null>(FORM_KEY, null)
    if (formCtx != null && props.name.length > 0) {
      formCtx.registerField({
        name: props.name,
        getValue: () => currentValue.value,
        reset: () => {
          currentValue.value = initialValue
          renderVisuals(initialValue)
        }
      })
    }
    // register with label if available
    const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)
    const target: ActivatableChild = {
      id: id.length > 0 ? id : props.name,
      activate: (event: UniPointerEvent) => {
        const element = thumbRef.value
        if (element != null) dispatchLabelClick(element, event)
      },
      getDisabled: () => props.disabled
    }
    if (labelCtx != null) {
      labelCtx.register(target)
    }
    if (id.length > 0) {
      unregisterLabelTarget = registerLabelTarget(id, target)
    }

    // #ifdef WEB
    // 监听窗口resize
    window.addEventListener('resize', handleResize)
    // #endif
  })

  // 清理
  onUnmounted(() => {
    const formCtx = inject<FormContext | null>(FORM_KEY, null)
    if (formCtx != null && props.name.length > 0) {
      formCtx.unregisterField(props.name)
    }
    const labelCtx = inject<LabelContext | null>(LABEL_KEY, null)
    if (labelCtx != null) {
      if (id.length > 0) {
        labelCtx.unregister(id)
      } else if (props.name.length > 0) {
        labelCtx.unregister(props.name)
      }
    }
    unregisterLabelTarget?.()
    unregisterLabelTarget = null
    resetInteractionState()
  })
  onBeforeUnmount(() => {
    // #ifdef WEB
    resetInteractionState()
    window.removeEventListener('resize', handleResize)
    // #endif
  })
  defineExpose({
    renderVisuals,
    getCurrentValue: (): number => currentValue.value
  })
</script>

<style>
  /* #ifdef WEB */
  slider
  /* #endif */
  /* #ifndef WEB */
  .container
  /* #endif */
  {
    width: 100%;
    flex-direction: row;
    overflow: visible;
  }

  .slider-track {
    position: relative;
    flex: 1;
    align-items: center;
    justify-content: center;
    overflow: visible;
    /* #ifdef WEB */
    cursor: pointer;
    touch-action: pan-y;
    user-select: none;
    /* #endif */
  }

  .slider-track-bg {
    width: 100%;
    border-radius: 2px;
    height: 2px;
    position: absolute;
    z-index: 0;
    background-color: #e9e9e9;
  }

  .slider-track-fill {
    width: 100%;
    height: 2px;
    background-color: #007aff;
    position: absolute;
    transform-origin: left center;
    z-index: 1;
    border-radius: 2px;
    /* #ifdef WEB */
    will-change: transform;
    /* #endif */
  }

  .slider-handle {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #ffffff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    /* #ifdef WEB */
    will-change: transform;
    cursor: grab;
    /* #endif */
  }

  /* #ifdef WEB */
  .slider-handle:focus-visible {
    outline: 2px solid #007aff;
    outline-offset: 2px;
  }
  /* #endif */

  @media (prefers-color-scheme: dark) {
    .slider-track-bg {
      background-color: #393939;
    }
  }
</style>
