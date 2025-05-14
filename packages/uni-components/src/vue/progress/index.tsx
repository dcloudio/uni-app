import {
  type ExtractPropTypes,
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { rpx2px } from '@dcloudio/uni-core'

import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'

import { PROGRESS_VALUES, progressProps } from '../../components/progress'

type ProgressProps = ExtractPropTypes<typeof progressProps>
type ProgressState = ReturnType<typeof useProgressState>

export class UniProgressElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Progress',
  props: progressProps,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-progress',
    class: UniProgressElement,
  },
  //#endif
  setup(props) {
    const rootRef = ref<HTMLElement | null>(null)
    const state = useProgressState(props)

    _activeAnimation(state, props)

    watch(
      () => state.realPercent,
      (newValue, oldValue) => {
        state.strokeTimer && clearInterval(state.strokeTimer)
        state.lastPercent = oldValue || 0
        _activeAnimation(state, props)
      }
    )

    //#if _X_ && !_NODE_JS_
    let percentCache = state.currentPercent
    watch(
      () => state.currentPercent,
      (newPercent) => {
        percentCache = newPercent
      }
    )
    onMounted(() => {
      const rootElement = rootRef.value as UniProgressElement
      Object.defineProperty(rootElement, 'percent', {
        get() {
          return percentCache
        },
        set(value) {
          percentCache = value
          ;(
            rootElement.querySelector('.uni-progress-inner-bar') as HTMLElement
          ).style.width = `${value}%`
          if (props.showInfo) {
            ;(
              rootElement.querySelector('.uni-progress-info') as HTMLElement
            ).innerText = `${value}%`
          }
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      const { showInfo } = props
      const { outerBarStyle, innerBarStyle, currentPercent } = state

      return (
        <uni-progress class="uni-progress" ref={rootRef}>
          <div style={outerBarStyle} class="uni-progress-bar">
            <div style={innerBarStyle} class="uni-progress-inner-bar" />
          </div>
          {showInfo ? ( // {currentPercent}% 的写法会影响 SSR Hydration (tsx插件的问题)
            <p class="uni-progress-info">{currentPercent + '%'}</p>
          ) : (
            ''
          )}
        </uni-progress>
      )
    }
  },
})

function useProgressState(props: ProgressProps) {
  const currentPercent = ref<number>(0)

  const outerBarStyle = computed(
    () =>
      `background-color: ${props.backgroundColor}; height: ${rpx2px(
        props.strokeWidth
      )}px;`
  )
  const innerBarStyle = computed(() => {
    // 兼容下不推荐的属性，activeColor 优先级高于 color。
    const backgroundColor =
      props.color !== PROGRESS_VALUES.activeColor &&
      props.activeColor === PROGRESS_VALUES.activeColor
        ? props.color
        : props.activeColor
    return `width: ${currentPercent.value}%;background-color: ${backgroundColor}`
  })
  const realPercent = computed(() => {
    if (
      typeof props.percent === 'string' &&
      !/^-?\d*\.?\d*$/.test(props.percent)
    ) {
      return 0
    }
    // 确保最终计算时使用的是 Number 类型的值，并且在有效范围内。
    let realValue = parseFloat(props.percent as string)
    if (Number.isNaN(realValue) || realValue < 0) {
      realValue = 0
    } else if (realValue > 100) {
      realValue = 100
    }
    return realValue
  })

  const state = reactive({
    outerBarStyle,
    innerBarStyle,
    realPercent,

    currentPercent,
    strokeTimer: 0,
    lastPercent: 0,
  })
  return state
}

function _activeAnimation(state: ProgressState, props: ProgressProps) {
  if (props.active) {
    state.currentPercent =
      props.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent
    state.strokeTimer = setInterval(() => {
      if (state.currentPercent + 1 > state.realPercent) {
        state.currentPercent = state.realPercent
        state.strokeTimer && clearInterval(state.strokeTimer)
      } else {
        state.currentPercent += 1
      }
    }, parseFloat(props.duration as string)) as unknown as number
  } else {
    state.currentPercent = state.realPercent
  }
}
