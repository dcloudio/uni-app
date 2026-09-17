import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
import { createBackgroundColorStyle, withBackgroundColor } from './utils'

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
  },
  backgroundColor: {
    type: String,
  },
  // 优先级高于 activeColor
  activeBackgroundColor: {
    type: String,
  },
  activeColor: {
    type: String,
  },
  selectedColor: {
    type: String,
  },
  blockColor: {
    type: String,
  },
  // 优先级高于blockColor
  foreColor: {
    type: String,
  },
  valueColor: {
    type: String,
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
              <div style={setTrackBgColor()} class="uni-slider-track">
                <div style={setActiveColor()} class="uni-slider-track-value" />
              </div>
              <div style={thumbTrackStyle()} class="uni-slider-thumb-track">
                <div style={setThumbStyle()} class="uni-slider-thumb-value" />
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
              style={setValueStyle()}
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
    const backgroundColor = props.backgroundColor
    const color = props.color
    if (backgroundColor && backgroundColor !== '#e9e9e9') {
      return backgroundColor
    }
    if (color && color !== '#007aff') return color
    return backgroundColor || color
  }
  const _getActiveColor = () => {
    const activeColor = props.activeBackgroundColor || props.activeColor
    const selectedColor = props.selectedColor
    if (activeColor && activeColor !== '#007aff') return activeColor
    if (selectedColor && selectedColor !== '#e9e9e9') {
      return selectedColor
    }
    return activeColor || selectedColor
  }
  const _getBlockColor = () => {
    return props.foreColor || props.blockColor
  }
  const _getBlockSizeString = () => {
    const blockSize = Math.min(
      Math.max(Number(props.blockSize), SLIDER_BLOCK_SIZE_MIN_VALUE),
      SLIDER_BLOCK_SIZE_MAX_VALUE
    )
    return blockSize + 'px'
  }

  return {
    setTrackBgColor: () => createBackgroundColorStyle(_getBgColor()),
    setActiveColor: () => createBackgroundColorStyle(_getActiveColor()),
    thumbTrackStyle: () => ({
      marginRight: _getBlockSizeString(),
    }),
    setThumbStyle: () =>
      withBackgroundColor(
        {
          width: _getBlockSizeString(),
          height: _getBlockSizeString(),
        },
        _getBlockColor()
      ),
    setValueStyle: () =>
      props.valueColor ? { color: props.valueColor } : undefined,
  }
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
