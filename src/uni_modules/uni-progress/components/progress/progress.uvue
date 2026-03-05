<template>
  <view class="uni-progress">
    <view class="uni-progress-background" :style="backgroundStyle">
      <view ref="fillRef" class="uni-progress-fill" :style="foregroundStyle"></view>
    </view>
    <text v-if="showInfo" class="uni-progress-value" :style="fontStyle">{{ percentText }}</text>
  </view>
</template>

<script lang="uts" setup>
  import { UniProgressElement } from './global.uts'

  type ActiveModeType = 'backwards' | 'forwards'

  interface ProgressProps {
    /**
     * 进度增加1%所需毫秒数
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    duration?: number;
    /**
     * 进度百分比
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    percent?: number;
    /**
     * 是否启用动画
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    active?: boolean;
    /**
     * 动画模式
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    activeMode?: ActiveModeType;
    /**
     * 未选择的进度条的颜色
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    backgroundColor?: string;
    /**
     * 进度条宽度
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    strokeWidth?: number;
    /**
     * 已选择的进度条的颜色
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    activeColor?: string;
    /**
     * 是否显示进度条值
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    showInfo?: boolean;
    /**
     * 进度条圆角
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    borderRadius?: number;
    /**
     * 进度条字体大小
     * @uniPlatform {
       "app": {
        "harmony": {
          "unixvVer": "5.0"
        }
      }
    }
    */
    fontSize?: number;
  }

  const props = withDefaults(defineProps<ProgressProps>(), {
    duration: 30,
    percent: 0,
    active: false,
    activeMode: 'backwards',
    backgroundColor: '#ebebeb',
    strokeWidth: 3,
    activeColor: '#007aff',
    showInfo: false,
    borderRadius: 0,
    fontSize: 12,
  })

  defineOptions({
    name: 'progress',
    // @ts-ignore
    rootElement: {
      class: UniProgressElement
    }
  })

  // #ifdef WEB
  class UniCustomEvent<T> {
    detail: T
    constructor(type: string, detail: T) {
      // this.type = type
      this.detail = detail
    }
  }
  // #endif

  type UniProgressActiveendEventDetail = {
    curPercent: number
  }

  class UniProgressActiveendEvent extends UniCustomEvent<UniProgressActiveendEventDetail> {
    constructor(type: string, curPercent: number) {
      super(type, { curPercent } as UniProgressActiveendEventDetail)
    }
  }

  const emit = defineEmits<{
    activeend: [event: UniProgressActiveendEvent]
  }>()

  // Ref
  const fillRef = ref<UniElement | null>(null)

  let _timerId = 0
  let _rafId = 0

  let _currentPercent = 0
  let _lastPercent = 0
  let _startPercent = 0
  let _targetPercent = 0
  let _startTime = 0

  const percentText = ref('0%')

  const backgroundStyle = computed<Map<string, string>>(() => {
    return new Map<string, string>([
      ['background-color', props.backgroundColor],
      ['height', props.strokeWidth + 'px'],
      ['border-radius', props.borderRadius + 'px']
    ])
  })

  const foregroundStyle = computed<Map<string, string>>(() => {
    return new Map<string, string>([
      ['background-color', props.activeColor]
    ])
  })

  const fontStyle = computed<Map<string, string>>(() => {
    return new Map<string, string>([
      ['font-size', props.fontSize + 'px']
    ])
  })

  watch(() => props.percent, () => {
    _animate()
  })

  onMounted(() => {
    _animate()
  })

  // 渲染视觉效果：使用 scaleX 更新填充条
  function renderVisuals(percent: number) {
    _currentPercent = percent
    // 取整显示，不显示小数位
    percentText.value = Math.round(percent) + '%'

    // 计算缩放比例 (0-100 -> 0-1)，添加最小值避免闪烁
    let scale = percent / 100
    if (scale > 0 && scale < 0.001) {
      scale = 0.001
    }

    // 直接修改 transform 属性
    const fillEl = fillRef.value
    if (fillEl != null) {
      fillEl.style.setProperty('transform', `scaleX(${scale})`)
    }
  }

  function _animate() {
    const final_percent = Math.max(0, Math.min(100, props.percent))

    if (!props.active) {
      renderVisuals(final_percent)
      return
    }

    clearTimer()

    // 设置起始和目标百分比
    _startPercent = props.activeMode == 'forwards' ? _lastPercent : 0
    _targetPercent = final_percent
    _startTime = Date.now()

    renderVisuals(_startPercent)

    // 使用 requestAnimationFrame 实现动画
    function animateFrame() {
      const currentTime = Date.now()
      const elapsed = currentTime - _startTime
      const totalDuration = props.duration * Math.abs(_targetPercent - _startPercent)

      if (elapsed >= totalDuration) {
        // 动画完成
        renderVisuals(_targetPercent)
        emit('activeend', new UniProgressActiveendEvent('activeend', _targetPercent))
        _lastPercent = _targetPercent
        _rafId = 0
      } else {
        // 计算当前进度 (线性插值)
        const progress = elapsed / totalDuration
        const currentPercent = _startPercent + (_targetPercent - _startPercent) * progress
        renderVisuals(currentPercent)

        // 继续下一帧
        _rafId = requestAnimationFrame(animateFrame)
      }
    }

    _rafId = requestAnimationFrame(animateFrame)
  }

  function clearTimer() {
    clearInterval(_timerId)
    if (_rafId != 0) {
      cancelAnimationFrame(_rafId)
      _rafId = 0
    }
  }

  onUnmounted(() => {
    clearTimer()
  })
</script>

<style>
  .uni-progress {
    flex-direction: row;
    align-items: center;
  }

  .uni-progress-background {
    flex: 1;
    flex-direction: row;
  }

  .uni-progress-fill {
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: left center;
    /* #ifdef WEB */
    will-change: transform;
    /* #endif */
  }

  .uni-progress-value {
    color: #000000;
    margin-left: 10px;
    text-align: right;
  }
</style>