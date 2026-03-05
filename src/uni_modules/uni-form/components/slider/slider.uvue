<template>
  <view style="width: 100%;flex-direction: row;box-sizing: border-box;overflow: visible;padding: 4px;">
    <view ref="containerRef"
      style="position: relative;flex: 1;align-items: center;justify-content: center;overflow: visible;cursor: pointer;"
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">

      <!-- 背景轨道 -->
      <view flatten class="slider-track-bg" :class="props.trackClass">
        <!-- 填充条(左边线) -->
        <view flatten ref="fillRef" class="slider-track-fill"
          :class="props.trackActiveClass"
          :style="{ transform: `scaleX(${trackActiveScaleX})` }" android-layer-type="hardware">
        </view>
      </view>

      <!-- 滑块 -->
      <view flatten ref="handleRef" style="overflow: visible; align-self: flex-start;z-index: 2;"
        :style="{ width: '100%', transform: `translateX(${thumbTranslateX}%)` }">
        <view flatten ref="thumbRef" class="slider-handle" :class="props.thumbClass" android-layer-type="hardware"
          :style="{ transform: `translateX(-${thumbTranslateX}%)` }"
          <!-- #ifdef WEB -->
          tabIndex="0" role="slider" :aria-valuenow="currentValue" :aria-valuemin="min" :aria-valuemax="max"
          <!-- #endif -->
          >
        </view>
      </view>
    </view>

    <!-- 显示当前值 -->
    <text v-if="props.showValue" ref="showValueRef"
      style="width: 35px;color: #888;font-size: 14px;align-self: center;margin-left: 3px;white-space: nowrap;">
      <!-- #ifndef APP -->
      {{ currentValue }}
      <!-- #endif -->
      <!-- #ifdef APP -->
      {{ initialValue }}
      <!-- #endif -->
    </text>
  </view>
</template>

<script setup lang="uts">
  import { FORM_KEY, LABEL_KEY } from '../common.uts'
  import { UniSliderChangeEvent, UniSliderElement } from './global.uts'

  type UnRegisterField = (name : string) => void
  type InjectForm = { unregisterField : UnRegisterField }
  type InjectLabel = { unregister : (id ?: string) => void }
  type SliderInFormContextField = {
    name : string,
    getValue : () => any,
    reset ?: () => void
  }
  type SliderInFormContext = {
    registerField : (field : SliderInFormContextField) => void,
    unregisterField : UnRegisterField
  }
  type LabelContextRegChild = { id ?: string, getDisabled ?: () => boolean }
  type LabelContextReg = {
    register : (child : LabelContextRegChild) => void
    unregister : (id ?: string) => void
  }

  defineOptions({
    name: 'slider',
    externalClasses: ['track-class', 'track-active-class', 'thumb-class'],
    // #ifndef APP-IOS
    rootElement: {
      name: 'uni-slider-element',
      class: UniSliderElement
    }
    // #endif
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
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    name : string
    /**
     * slider 最小值
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    min : number
    /**
     * slider 最大值
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    max : number
    /**
     * slider 步长，取值必须大于 0，并且可被(max - min)整除
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    step : number
    /**
     * slider 当前取值
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    value : number
    /**
     * 是否禁用
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    disabled : boolean
    /**
     * 是否显示当前 value
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    showValue : boolean
    /**
     * slider 背景条样式类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    trackClass : string.ClassString
    /**
     * slider 滑块左侧已选择部分的线条样式类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    trackActiveClass : string.ClassString
    /**
     * slider 滑块样式类名
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    thumbClass : string.ClassString
  }

  const attrs = useAttrs()
  const id = attrs.id

  // Props 定义
  const props = withDefaults(defineProps<SliderProps>(), {
    name: '',
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    disabled: false,
    showValue: false,
    trackClass: '',
    trackActiveClass: '',
    thumbClass: ''
  })

  // Refs
  const containerRef = ref<UniElement | null>(null)
  const fillRef = ref<UniElement | null>(null)
  const handleRef = ref<UniElement | null>(null)
  const thumbRef = ref<UniElement | null>(null)
  const showValueRef = ref<UniTextElement | null>(null)

  // 状态
  const initialValue = props.value
  const currentValue = ref(props.value)
  const isDragging = ref(false)
  // 轨道尺寸缓存
  let trackWidth = 0
  let trackLeft = 0
  let rafId = 0
  let ticking = false
  let isTouchDevice = false
  let cachedDecimalPlaces = -1 // 缓存 step 小数位数，-1表示未缓存
  let cachedStep = props.step // 缓存 step 值，便于检测变化
  let lastValue = 0 // 用于判断是否触发 change
  let thumbTranslateX = 0
  let trackActiveScaleX = 0

  // 计算有效的最大值（考虑 step）
  const effectiveMax = computed(() : number => {
    const range = props.max - props.min
    const steps = Math.floor(range / props.step)
    return props.min + steps * props.step
  })

  let _activeStatus : number = 0 // 滑动判断 0:未激活 1:已激活
  let touchStartX = 0 // 触摸起始 X 坐标
  let touchStartY = 0 // 触摸起始 Y 坐标
  const TOUCH_THRESHOLD = 4 // 触摸阈值（像素）

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

  function setTextValue() {
    const showValueEl = showValueRef.value
    if (props.showValue && showValueEl != null) {
      showValueEl.value = currentValue.value + ''
    }
  }

  // 核心渲染函数：更新视觉效果
  function renderVisuals(newValue : number) {
    // 1. 边界限制（使用有效最大值）
    const clampedValue = Math.max(props.min, Math.min(newValue, effectiveMax.value))
    currentValue.value = clampedValue

    // 2. 使用 value、min、max 计算比例（不依赖布局信息）
    const percentage = (clampedValue - props.min) / (props.max - props.min)

    // 3. 填充条缩放比例（减去微小值避免边界问题）
    const fillScale = percentage - 0.001

    // 4. 直接使用百分比修改元素的 transform 属性
    const handleEl = handleRef.value
    if (handleEl != null) {
      handleEl.style.setProperty('transform', `translateX(${percentage * 100}%)`)
    } else {
      thumbTranslateX = percentage * 100
    }

    // 5. 为 thumbRef 设置反向 transform，确保滑块不超出容器
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

    // #ifdef APP
    setTextValue()
    // #endif
  }

  // 计算新值
  function calculateValue(clientX : number) : number {
    if (trackWidth <= 0) {
      return currentValue.value
    }

    const containerWidth = trackWidth
    const containerLeft = trackLeft

    let currentX = clientX - containerLeft

    // 边界检查
    currentX = Math.max(0, Math.min(currentX, containerWidth))

    // 计算比例
    const ratio = currentX / containerWidth

    // 使用线性插值计算实际值
    let newValue = lerp(props.min, props.max, ratio)

    // 应用步进精度处理
    newValue = applyStepPrecision(newValue)

    // 确保不超过有效最大值
    newValue = Math.min(newValue, effectiveMax.value)

    return newValue
  }

  // 触摸开始
  function handleTouchStart(e : UniTouchEvent) {
    if (props.disabled == true) {
      return
    }

    // 标记为触摸设备
    isTouchDevice = true

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

    if (rafId != 0) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    ticking = false

    if (lastValue !== currentValue.value) {
      emit('change', new UniSliderChangeEvent(currentValue.value))
    }
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

  // #region Mouse End Resize	// 鼠标移动处理 (使用 rAF 优化)
  function handleMouseMove(e : MouseEvent) {
    if (isDragging.value == false || props.disabled == true) {
      return
    }

    if (e.cancelable) {
      e.preventDefault()
    }

    if (ticking == false) {
      rafId = requestAnimationFrame(() => {
        const newValue = calculateValue(e.clientX)
          if (newValue === currentValue.value) {
            ticking = false
            return
          }
        renderVisuals(newValue)
        emit('changing', new UniSliderChangeEvent(currentValue.value))
        ticking = false
      })
      ticking = true
    }
  }

  // 鼠标按下
  function handleMouseDown(e : MouseEvent) {
    if (props.disabled == true) {
      return
    }

    // 如果是触摸设备，忽略鼠标事件
    if (isTouchDevice == true) {
      return
    }

    e.preventDefault()
    isDragging.value = true

    // 缓存轨道尺寸
    const containerEl = containerRef.value
    if (containerEl != null) {
      const rect = containerEl.getBoundingClientRect()
      trackLeft = rect.left
      trackWidth = rect.width
    }

    // 立即更新到点击位置
    const newValue = calculateValue(e.clientX)
    renderVisuals(newValue)

    // #ifdef WEB
    // 绑定全局鼠标事件
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    // #endif
  }

  // 鼠标释放
  function handleMouseUp() {
    if (isDragging.value == false) {
      return
    }

    isDragging.value = false

    // 取消 rAF
    if (rafId != 0) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    ticking = false

    // 触发 change 事件
    emit('change', new UniSliderChangeEvent(currentValue.value))

    // #ifdef WEB
    // 移除全局鼠标事件
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    // #endif
  }

  // #ifdef WEB
  // 键盘事件处理
  function handleKeyDown(e : KeyboardEvent) {
    if (props.disabled == true) {
      return
    }

    let newValue = currentValue.value

    if (e.key == 'ArrowLeft' || e.key == 'ArrowDown') {
      newValue -= props.step
      e.preventDefault()
    } else if (e.key == 'ArrowRight' || e.key == 'ArrowUp') {
      newValue += props.step
      e.preventDefault()
    } else if (e.key == 'Home') {
      newValue = props.min
      e.preventDefault()
    } else if (e.key == 'End') {
      newValue = props.max
      e.preventDefault()
    } else {
      return
    }

    // 应用步进精度处理
    newValue = applyStepPrecision(newValue)

    // 键盘操作频率低，直接调用
    requestAnimationFrame(() => {
      renderVisuals(newValue)
      emit('change', new UniSliderChangeEvent(currentValue.value))
    })
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
  // #endregion

  // 初始化渲染
  renderVisuals(currentValue.value)

  onMounted(() => {
    nextTick(() => {
      // 监听 props 变化
      watch(() : number => { return props.value }, (newValue : number) => {
        if (isDragging.value == false) {
          renderVisuals(newValue)
        }
      })

      watch(() : number => { return props.min }, () => {
        renderVisuals(currentValue.value)
      })

      watch(() : number => { return props.max }, () => {
        renderVisuals(currentValue.value)
      })

      watch(() : number => { return props.step }, () => {
        renderVisuals(currentValue.value)
      })

      watch(() : boolean => props.showValue, () => {
        nextTick(() => setTimeout(handleResize, 10))
      })
    })

    // register with form if available
    const formCtx = inject<SliderInFormContext | null>(FORM_KEY, null)
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
    const labelCtx = inject<LabelContextReg | null>(LABEL_KEY, null)
    if (labelCtx != null) {
      labelCtx.register({
        id: id.length > 0 ? id : props.name,
        getDisabled: () => props.disabled
      })
    }

    // #ifdef WEB
    // 监听窗口resize
    window.addEventListener('resize', handleResize)
    // 监听鼠标按下事件
    const containerEl = containerRef.value
    if (containerEl != null) {
      containerEl.addEventListener('mousedown', handleMouseDown)
    }
    const handleEl = handleRef.value
    if (handleEl != null) {
      handleEl.addEventListener('keydown', handleKeyDown)
    }
    // #endif
  })

  // 清理
  onUnmounted(() => {
    const formCtx = inject<InjectForm | null>(FORM_KEY, null)
    if (formCtx != null && props.name.length > 0) {
      formCtx.unregisterField(props.name)
    }
    const labelCtx = inject<InjectLabel | null>(LABEL_KEY, null)
    if (labelCtx != null) {
      if (id.length > 0) {
        labelCtx.unregister(id)
      } else if (props.name.length > 0) {
        labelCtx.unregister(props.name)
      }
    }
    if (rafId != 0) {
      cancelAnimationFrame(rafId)
    }
  })
  onBeforeUnmount(() => {
    // #ifdef WEB
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('resize', handleResize)
    const containerEl = containerRef.value
    if (containerEl != null) {
      containerEl.removeEventListener('mousedown', handleMouseDown)
    }
    // #endif
  })
  defineExpose({
    renderVisuals,
  })
</script>

<style>
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
</style>
