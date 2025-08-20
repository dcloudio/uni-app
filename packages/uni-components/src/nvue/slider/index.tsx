import {
  type ExtractPropTypes,
  type Ref,
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
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
import { type UniFormCtx, uniFormKey } from '../../components/form'
import { sliderProps } from '../../components/slider'

const slierStyles: NVueComponentStyles = [
  {
    'uni-slider': {
      '': {
        flex: 1,
        flexDirection: 'column',
      },
    },
    'uni-slider-wrapper': {
      '': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'uni-slider-tap-area': {
      '': {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '14',
        paddingBottom: '14',
      },
    },
    'uni-slider-handle-wrapper': {
      '': {
        position: 'relative',
        flex: 1,
        backgroundColor: '#e9e9e9',
        height: '2',
        borderRadius: '5',
        marginRight: '14',
        marginLeft: '14',
      },
    },
    'uni-slider-track': {
      '': {
        height: '2',
        borderRadius: '6',
        backgroundColor: '#007aff',
      },
    },
    'uni-slider-thumb': {
      '': {
        position: 'absolute',
        top: '1',
        width: '28',
        height: '28',
        borderRadius: 50,
        boxShadow: '0 0 4px #ebebeb',
      },
    },
    'uni-slider-value': {
      '': {
        color: '#888888',
        fontSize: '16',
        width: '30',
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
        getComponentSize(sliderTrackRef.value!).then(({ width, left }) => {
          state.sliderLeft = left
          state.sliderWidth = width || 0
          state.sliderValue = Number(props.value)
        })
      }, 100)
    })

    return () => {
      const { showValue } = props
      const {
        trackTapStyle,
        trackStyle,
        trackActiveStyle,
        thumbStyle,
        sliderValue,
      } = state
      return (
        <div class="uni-slider" ref={sliderRef}>
          <div class="uni-slider-wrapper">
            <div
              class="uni-slider-tap-area"
              style={trackTapStyle}
              {...listeners}
            >
              <div
                class="uni-slider-handle-wrapper"
                style={trackStyle}
                ref={sliderTrackRef}
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
  const sliderLeft = ref<number>(0)
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

  const sliderThumbOffset = Number(props.blockSize) / 2

  const state = reactive({
    sliderLeft,
    sliderWidth,
    sliderValue,
    sliderThumbOffset,
    trackTapStyle: computed(() => ({
      paddingTop: sliderThumbOffset,
      paddingBottom: sliderThumbOffset,
    })),
    trackStyle: computed(() => ({
      backgroundColor: _getBgColor(),
      marginLeft: sliderThumbOffset,
      marginRight: sliderThumbOffset,
    })),
    trackActiveStyle: computed(() => ({
      backgroundColor: _getActiveColor(),
      width: _getValueWidth(),
    })),
    thumbStyle: computed(() => ({
      width: props.blockSize,
      height: props.blockSize,
      backgroundColor: props.blockColor,
      left: _getValueWidth(),
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
    x -= state.sliderThumbOffset
    if (x < 0) {
      x = 0
    }
    if (x > state.sliderWidth) {
      x = state.sliderWidth
    }

    const max = Number(props.max)
    const min = Number(props.min)
    const step = Number(props.step)
    let value: number = (x / state.sliderWidth) * (max - min)
    if (step > 0 && value > step && (value % step) / step !== 0) {
      value -= value % step
    } else {
      value = parseInt(value + '')
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
