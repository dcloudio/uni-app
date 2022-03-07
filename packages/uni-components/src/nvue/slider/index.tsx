import {
  defineComponent,
  Ref,
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  inject,
  reactive,
  ExtractPropTypes,
} from 'vue'
import {
  useCustomEvent,
  EmitEvent,
  CustomEventTrigger,
} from '../../helpers/useNVueEvent'
import { getComponentSize } from '../helpers'
import { NVueComponentStyles, createNVueTextVNode } from '../utils'
import { uniFormKey, UniFormCtx } from '../../components/form'
import { sliderProps } from '../../components/slider'

const slierStyles: NVueComponentStyles = [
  {
    'uni-slider': {
      '': {
        flex: 1,
        flexDirection: 'column',
        marginTop: '12',
        marginRight: 0,
        marginBottom: '12',
        marginLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      },
    },
    'uni-slider-wrapper': {
      '': {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '30',
      },
    },
    'uni-slider-tap-area': {
      '': {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        paddingTop: '15',
        paddingRight: 0,
        paddingBottom: '15',
        paddingLeft: 0,
      },
    },
    'uni-slider-handle-wrapper': {
      '': {
        position: 'relative',
        marginTop: 0,
        marginRight: '18',
        marginBottom: 0,
        marginLeft: '18',
        height: '2',
        borderRadius: '5',
        backgroundColor: '#e9e9e9',
        transitionProperty: 'backgroundColor',
        transitionDuration: 300,
        transitionTimingFunction: 'ease',
      },
    },
    'uni-slider-track': {
      '': {
        height: '2',
        borderRadius: '6',
        backgroundColor: '#007aff',
        transitionProperty: 'backgroundColor',
        transitionDuration: 300,
        transitionTimingFunction: 'ease',
      },
    },
    'uni-slider-thumb': {
      '': {
        position: 'absolute',
        width: '28',
        height: '28',
        borderRadius: 50,
        boxShadow: '0 0 4px #ebebeb',
        transitionProperty: 'borderColor',
        transitionDuration: 300,
        transitionTimingFunction: 'ease',
      },
    },
    'uni-slider-step': {
      '': {
        position: 'absolute',
        width: 100,
        height: '2',
        background: 'transparent',
      },
    },
    'uni-slider-value': {
      '': {
        color: '#888888',
        fontSize: '14',
        marginLeft: '14',
      },
    },
  },
]

type SliderProps = ExtractPropTypes<typeof sliderProps>
type SliderState = ReturnType<typeof useSliderState>

export default defineComponent({
  name: 'USlider',
  props: sliderProps,
  styles: slierStyles,
  setup(props, { emit }) {
    const sliderRef: Ref<HTMLElement | null> = ref(null)
    const sliderTrackRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(sliderRef, emit)

    const state = useSliderState(props)
    const listeners = useSliderListeners(props, state, trigger)
    useSliderInject(props, state)

    watch(
      () => props.value,
      (val) => {
        state.sliderValue = Number(val)
      }
    )

    onMounted(() => {
      setTimeout(() => {
        getComponentSize(sliderRef.value!).then(({ width }) => {
          state.sliderWidth = width || 0
          state.sliderValue = Number(props.value)
        })
      }, 100)
    })

    return () => {
      const { showValue } = props
      const { trackStyle, trackActiveStyle, thumbStyle, sliderValue } = state
      return (
        <div class="uni-slider" ref={sliderRef}>
          <div class="uni-slider-wrapper">
            <div class="uni-slider-tap-area" {...listeners}>
              <div
                class="uni-slider-handle-wrapper"
                ref={sliderTrackRef}
                style={trackStyle}
              >
                <div class="uni-slider-track" style={trackActiveStyle}></div>
              </div>
              <div class="uni-slider-thumb" style={thumbStyle}></div>
            </div>
            {showValue
              ? createNVueTextVNode(sliderValue + '', {
                  class: 'uni-slider-value',
                })
              : null}
          </div>
        </div>
      )
    }
  },
})

function useSliderState(props: SliderProps) {
  const sliderWidth = ref<number>(0)
  const sliderValue = ref<number>(0)

  const _getBgColor = () => {
    return props.backgroundColor !== '#e9e9e9'
      ? props.backgroundColor
      : props.color !== '#007aff'
      ? props.color
      : '#007aff'
  }
  const _getActiveColor = () => {
    return props.activeColor !== '#007aff'
      ? props.activeColor
      : props.selectedColor !== '#e9e9e9'
      ? props.selectedColor
      : '#e9e9e9'
  }
  const _getValueWidth = () => {
    const max = Number(props.max)
    const min = Number(props.min)
    return ((sliderValue.value - min) / (max - min)) * sliderWidth.value
  }

  const state = reactive({
    sliderWidth,
    sliderValue,
    trackStyle: computed(() => ({ backgroundColor: _getBgColor() })),
    trackActiveStyle: computed(() => ({
      backgroundColor: _getActiveColor(),
      width: _getValueWidth(),
    })),
    thumbStyle: computed(() => ({
      width: props.blockSize,
      height: props.blockSize,
      marginTop: -props.blockSize / 2,
      left: _getValueWidth(),
      backgroundColor: props.blockColor,
    })),
  })

  return state
}

function useSliderListeners(
  props: SliderProps,
  state: SliderState,
  trigger: CustomEventTrigger
) {
  let eventOld: any = null

  function onTrack(action: string, x: number) {
    if (!props.disabled) {
      if (action === 'move') {
        changedValue(x)
        trigger('changing', {
          value: state.sliderValue,
        })
      } else if (action === 'end') {
        changedValue(x)
        trigger('change', {
          value: state.sliderValue,
        })
      }
    }
  }

  function changedValue(x: number) {
    if (x < 0) {
      x = 0
    }
    if (x > state.sliderWidth) {
      x = state.sliderWidth
    }

    const max = Number(props.max)
    const min = Number(props.min)
    const step = Number(props.step)
    let value: number = (x / state.sliderWidth) * max - min
    if (step > 0 && value > step && (value % step) / step !== 0) {
      value -= value % step
    }

    state.sliderValue = value + min
  }

  const listeners = {
    onTouchstart(e: TouchEvent) {
      if (e.changedTouches.length === 1 && !eventOld) {
        eventOld = e
        onTrack('start', e.changedTouches[0].pageX)
      }
    },
    onTouchmove(e: TouchEvent) {
      if (e.changedTouches.length === 1 && eventOld) {
        onTrack('move', e.changedTouches[0].pageX)
      }
    },
    onTouchend(e: TouchEvent) {
      if (e.changedTouches.length === 1 && eventOld) {
        eventOld = null
        onTrack('end', e.changedTouches[0].pageX)
      }
    },
  }

  return listeners
}

function useSliderInject(props: SliderProps, state: SliderState) {
  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)

  const formField = {
    submit: () => {
      const data: [string, any] = ['', null]
      if (props.name) {
        data[0] = props.name
        data[1] = state.sliderValue
      }
      return data
    },
    reset: () => {
      state.sliderValue = Number(props.value)
    },
  }

  if (!!uniForm) {
    uniForm.addField(formField)
    onUnmounted(() => {
      uniForm.removeField(formField)
    })
  }
}
