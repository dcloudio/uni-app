import {
  type ExtractPropTypes,
  type Ref,
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useNVueEvent'
import { getComponentSize } from '../helpers'
import { type NVueComponentStyles, createNVueTextVNode } from '../utils'
import { PROGRESS_VALUES, progressProps } from '../../components/progress'

const progressStyles: NVueComponentStyles = [
  {
    'uni-progress': {
      '': {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    'uni-progress-bar': {
      '': {
        flex: 1,
      },
    },
    'uni-progress-inner-bar': {
      '': {
        position: 'absolute',
      },
    },
    'uni-progress-info': {
      '': {
        marginLeft: '15px',
      },
    },
  },
]

type ProgressProps = ExtractPropTypes<typeof progressProps>
type ProgerssState = ReturnType<typeof useProgressState>

export default defineComponent({
  name: 'Progress',
  props: progressProps,
  styles: progressStyles,
  emits: ['activeend'],
  setup(props, { emit }) {
    const progressRef: Ref<HTMLElement | null> = ref(null)
    const progressBarRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(progressRef, emit)

    const state = useProgressState(props)

    watch(
      () => state.realPercent,
      (newValue, oldValue) => {
        state.lastPercent = oldValue || 0
        _activeAnimation(state, props, trigger)
      }
    )

    onMounted(() => {
      setTimeout(() => {
        getComponentSize(progressBarRef.value!).then(({ width }) => {
          state.progressWidth = width || 0
          _activeAnimation(state, props, trigger)
        })
      }, 50)
    })

    return () => {
      const { showInfo, fontSize } = props
      const { outerBarStyle, innerBarStyle, currentPercent } = state
      return (
        <div ref={progressRef} class="uni-progress">
          <div
            ref={progressBarRef}
            style={outerBarStyle}
            class="uni-progress-bar"
          >
            <div style={innerBarStyle} class="uni-progress-inner-bar"></div>
          </div>
          {showInfo
            ? createNVueTextVNode(currentPercent + '%', {
                class: 'uni-progress-info',
                style: {
                  fontSize,
                },
              })
            : null}
        </div>
      )
    }
  },
})

function useProgressState(props: ProgressProps) {
  const currentPercent = ref<number>(0)
  const progressWidth = ref<number>(0)

  const outerBarStyle = computed(() => ({
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    height: props.strokeWidth,
  }))
  const innerBarStyle = computed(() => {
    // 兼容下不推荐的属性，activeColor 优先级高于 color。
    // nvue 不支持百分比，宽度必须为数值。
    const backgroundColor =
      props.color !== PROGRESS_VALUES.activeColor &&
      props.activeColor === PROGRESS_VALUES.activeColor
        ? props.color
        : props.activeColor
    return {
      width: (currentPercent.value * progressWidth.value) / 100,
      height: props.strokeWidth,
      backgroundColor: backgroundColor,
      borderRadius: props.borderRadius,
    }
  })
  const realPercent = computed(() => {
    // 确保最终计算时使用的是 Number 类型的值，并且在有效范围内。
    let realValue = parseFloat(props.percent as string)
    realValue < 0 && (realValue = 0)
    realValue > 100 && (realValue = 100)
    return realValue
  })

  const state = reactive({
    outerBarStyle,
    innerBarStyle,
    realPercent,

    currentPercent,
    strokeTimer: 0,
    lastPercent: 0,
    progressWidth,
  })
  return state
}

function _activeAnimation(
  state: ProgerssState,
  props: ProgressProps,
  trigger: CustomEventTrigger
) {
  state.strokeTimer && clearInterval(state.strokeTimer)
  if (props.active) {
    state.currentPercent =
      props.activeMode === PROGRESS_VALUES.activeMode ? 0 : state.lastPercent
    state.strokeTimer = setInterval(() => {
      if (state.currentPercent + 1 > state.realPercent) {
        state.currentPercent = state.realPercent
        state.strokeTimer && clearInterval(state.strokeTimer)
        trigger('activeend', {})
      } else {
        state.currentPercent += 1
      }
    }, parseFloat(props.duration as string)) as unknown as number
  } else {
    state.currentPercent = state.realPercent
  }
}
