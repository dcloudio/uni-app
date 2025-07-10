import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ExtractPropTypes, Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
  withWebEvent,
} from '../../helpers/useEvent'
import { type UniFormCtx, uniFormKey } from '../form'

const SLIDER_BLOCK_SIZE_MIN_VALUE = 12
const SLIDER_BLOCK_SIZE_MAX_VALUE = 28

const props = {
  name: {
    type: String,
    default: '',
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  value: {
    type: [Number, String],
    default: 0,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  color: {
    type: String,
    default: '#e9e9e9',
  },
  backgroundColor: {
    type: String,
    default: '#e9e9e9',
  },
  // 优先级高于 activeColor
  activeBackgroundColor: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: '#007aff',
  },
  selectedColor: {
    type: String,
    default: '#007aff',
  },
  blockColor: {
    type: String,
    default: '#ffffff',
  },
  // 优先级高于blockColor
  foreColor: {
    type: String,
    default: '',
  },
  valueColor: {
    type: String,
    default: '#888888',
  },
  blockSize: {
    type: [Number, String],
    default: 28,
  },
  showValue: {
    type: [Boolean, String],
    default: false,
  },
}

type SliderProps = ExtractPropTypes<typeof props>
type HTMLRef = Ref<HTMLElement | null>

const getValuePercentage = (value: number, min: number, max: number) => {
  return (100 * (value - min)) / (max - min) + '%'
}

export class UniSliderElement extends UniElement {
  htmlSlider: HTMLInputElement | undefined
  trackValue: HTMLElement | undefined
  thumbValue: HTMLElement | undefined
  inputValue: HTMLElement | undefined

  _initialValue: number = 0

  init() {
    this.htmlSlider = this.querySelector(
      '.uni-slider-browser-input-range'
    ) as HTMLInputElement
    this.trackValue = this.querySelector(
      '.uni-slider-track-value'
    ) as HTMLElement
    this.thumbValue = this.querySelector(
      '.uni-slider-thumb-value'
    ) as HTMLElement
    this.inputValue = this.querySelector('.uni-slider-value') as HTMLElement
    this.updateValue(this.value)
  }

  get value(): number {
    return Number(this.htmlSlider!.value)
  }
  set value(value: number) {
    this.htmlSlider!.value = value.toString()
    this.updateValue(value)
  }

  reset() {
    this.value = this._initialValue
  }

  updateValue(value: number) {
    const min = Number(this.htmlSlider!.getAttribute('min'))
    const max = Number(this.htmlSlider!.getAttribute('max'))
    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }
    const percentage = getValuePercentage(value, min, max)
    this.trackValue!.style.width = percentage
    this.thumbValue!.style.left = percentage
    this.inputValue!.innerText = value.toString()
  }
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Slider',
  props,
  emits: ['changing', 'change'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-slider',
    class: UniSliderElement,
  },
  //#endif
  setup(props, { emit }) {
    const sliderRef: HTMLRef = ref(null)
    const sliderValueRef: HTMLRef = ref(null)
    let uniSliderElement: UniSliderElement | undefined

    watch(
      () => props.value,
      (val) => {
        uniSliderElement!.value = Number(val)
      }
    )

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(sliderRef, emit)

    const state = useSliderState(props)
    const { _onInput, _onChange } = useSliderLoader(props, sliderRef, trigger)

    onMounted(() => {
      uniSliderElement = sliderRef.value as UniSliderElement
      uniSliderElement._initialValue = props.value as number
      uniSliderElement.init()
      uniSliderElement.attachVmProps(props)
    })

    return () => {
      const {
        setTrackBgColor,
        setActiveColor,
        setThumbStyle,
        thumbTrackStyle,
        setValueStyle,
      } = state

      return (
        <uni-slider ref={sliderRef}>
          <div class="uni-slider-wrapper">
            <div class="uni-slider-input">
              <div style={setTrackBgColor.value} class="uni-slider-track">
                <div
                  style={setActiveColor.value}
                  class="uni-slider-track-value"
                />
              </div>
              <div style={thumbTrackStyle.value} class="uni-slider-thumb-track">
                <div
                  style={setThumbStyle.value}
                  class="uni-slider-thumb-value"
                />
              </div>
              <input
                class="uni-slider-browser-input-range"
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onInput={withWebEvent(_onInput)}
                onChange={withWebEvent(_onChange)}
              ></input>
            </div>
            <span
              v-show={props.showValue}
              ref={sliderValueRef}
              style={setValueStyle.value}
              class="uni-slider-value"
            ></span>
          </div>
        </uni-slider>
      )
    }
  },
})

function useSliderState(props: SliderProps) {
  const _getBgColor = () => {
    return props.backgroundColor !== '#e9e9e9'
      ? props.backgroundColor
      : props.color !== '#007aff'
      ? props.color
      : '#007aff'
  }
  const _getActiveColor = () => {
    const activeColor = props.activeBackgroundColor || props.activeColor
    return activeColor !== '#007aff'
      ? activeColor
      : props.selectedColor !== '#e9e9e9'
      ? props.selectedColor
      : '#e9e9e9'
  }
  const _getBlockSizeString = () => {
    const blockSize = Math.min(
      Math.max(Number(props.blockSize), SLIDER_BLOCK_SIZE_MIN_VALUE),
      SLIDER_BLOCK_SIZE_MAX_VALUE
    )
    return blockSize + 'px'
  }

  const state = {
    setTrackBgColor: computed(() => ({
      backgroundColor: _getBgColor(),
    })),
    setActiveColor: computed(() => ({
      backgroundColor: _getActiveColor(),
    })),
    thumbTrackStyle: computed(() => ({
      marginRight: _getBlockSizeString(),
    })),
    setThumbStyle: computed(() => ({
      width: _getBlockSizeString(),
      height: _getBlockSizeString(),
      backgroundColor: props.foreColor || props.blockColor,
    })),
    setValueStyle: computed(() => ({
      color: props.valueColor,
    })),
  }

  return state
}

function useSliderLoader(
  props: SliderProps,
  sliderRef: HTMLRef,
  trigger: CustomEventTrigger
) {
  const _onInput = (event: Event) => {
    if (props.disabled) {
      return
    }
    const valueNumber = Number((event.target as HTMLInputElement).value)
    ;(sliderRef.value as UniSliderElement).updateValue(valueNumber)
    trigger('changing', event, {
      value: valueNumber,
    })
  }

  const _onChange = (event: Event) => {
    if (props.disabled) {
      return
    }
    const valueNumber = Number((event.target as HTMLInputElement).value)
    ;(sliderRef.value as UniSliderElement).updateValue(valueNumber)
    trigger('change', event, {
      value: valueNumber,
    })
  }

  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  if (!!uniForm) {
    const field = {
      reset: () => {
        ;(sliderRef.value as UniSliderElement).reset()
      },
      submit: () => {
        const data: [string, any] = ['', null]
        const value = (sliderRef.value as UniSliderElement).value
        if (props.name !== '') {
          data[0] = props.name
          data[1] = value
        }
        return data
      },
    }
    uniForm.addField(field)
    onBeforeUnmount(() => {
      uniForm.removeField(field)
    })
  }

  return { _onInput, _onChange }
}
