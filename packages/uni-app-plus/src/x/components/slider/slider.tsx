/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  type Ref,
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from 'vue'

const SLIDER_TRACK_HEIGHT = 2
const SLIDER_THUMB_SHADOW = 4
const SLIDER_VALUE_WIDTH = 39
const SLIDER_VALUE_FONT_SIZE = 14
const SLIDER_BLOCK_SIZE_MIN_VALUE = 12
const SLIDER_BLOCK_SIZE_MAX_VALUE = 28

export const UniSliderElement = /* @__PURE__ */ (() =>
  class extends UniFormControlElement<number> {
    _initialValue: number = 0
    _value: number = 0

    constructor(data: INodeData, pageNode: PageNode) {
      super(data, pageNode)
    }

    get value(): number {
      return this._value
    }
    set value(value: number) {
      if (this._value == value) {
        return
      }
      this._value = value
      this.onValueChanged(value)
    }

    reset() {
      this.value = this._initialValue
    }

    onValueChanged = (value: number) => {}
  })()

export type UniSliderElement = InstanceType<typeof UniSliderElement>

class SliderChangeEventDetail {
  value: number = 0
  constructor(value: number) {
    this.value = value
  }
}

export const SliderChangeEvent = /* @__PURE__ */ (() =>
  class extends CustomEvent<SliderChangeEventDetail> {
    constructor(value: number) {
      super('change', {
        detail: new SliderChangeEventDetail(value),
      } as CustomEventOptions<SliderChangeEventDetail>)
    }
  })()

export type SliderChangeEvent = InstanceType<typeof SliderChangeEvent>

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Slider',
  rootElement: {
    name: 'uni-slider-element',
    // @ts-expect-error not web element
    class: UniSliderElement,
  },
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#888888',
    },
    backgroundColor: {
      type: String,
      default: '#e9e9e9',
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
    blockSize: {
      type: Number,
      default: SLIDER_BLOCK_SIZE_MAX_VALUE,
    },
    showValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'changing'],
  setup(props, { emit }) {
    const $data = {
      $sliderElement: null as null | UniSliderElement,
      $sliderWidth: 0,
      $sliderTrackWidth: 0,
      $sliderOffsetX: 0,
      $touchStartFlag: false,
      $drawContext: null as null | DrawableContext,
    }

    function _onTouchStart(e: TouchEvent) {
      if (
        !props.disabled &&
        e.changedTouches.length === 1 &&
        !$data.$touchStartFlag
      ) {
        // touch in value area
        if (
          props.showValue == true &&
          e.changedTouches[0].screenX >
            $data.$sliderOffsetX +
              $data.$sliderTrackWidth +
              internalBlockSize.value / 2
        ) {
          return
        }
        // e.preventDefault()
        $data.$touchStartFlag = true
      }
    }
    function _onTouchMove(e: TouchEvent) {
      if (
        !props.disabled &&
        e.changedTouches.length === 1 &&
        $data.$touchStartFlag
      ) {
        // e.preventDefault()
        _onTrackInputChange(e.changedTouches[0].screenX)
        emit('changing', new SliderChangeEvent($data.$sliderElement!.value))
      }
    }
    function _onTouchEnd(e: TouchEvent) {
      if (!props.disabled && $data.$touchStartFlag) {
        $data.$touchStartFlag = false
        _onTrackInputChange(e.changedTouches[0].screenX)
        emit('change', new SliderChangeEvent($data.$sliderElement!.value))
      }
    }
    function _onTrackInputChange(x: number) {
      let px = x - $data.$sliderOffsetX
      if (px < 0) {
        px = 0
      }
      if (px > $data.$sliderTrackWidth) {
        px = $data.$sliderTrackWidth
      }

      const percentage = px / $data.$sliderTrackWidth
      let value = props.min + (props.max - props.min) * percentage
      if (percentage > 0 && percentage < 1) {
        value -= value % props.step
      }

      if (Number.isInteger(props.step)) {
        // TODO
        $data.$sliderElement!.value = parseInt(value + '')
      } else {
        const step_pair = props.step.toString().split('.')
        $data.$sliderElement!.value = parseFloat(
          value.toFixed(step_pair[1].length)
        )
        // TODO
        const value_pair = $data.$sliderElement!.value.toString().split('.')
        if (value_pair.length > 1 && parseInt(value_pair[1]) == 0) {
          $data.$sliderElement!.value = parseInt(value_pair[0])
        }
      }
    }
    function _onLayout() {
      $data.$sliderWidth = $data.$sliderElement?.offsetWidth as number
      $data.$sliderOffsetX =
        ($data.$sliderElement?.offsetLeft as number) +
        internalBlockSize.value / 2
      $data.$sliderTrackWidth = $data.$sliderWidth - internalBlockSize.value
      if (props.showValue) {
        $data.$sliderTrackWidth -= SLIDER_VALUE_WIDTH
      }
    }
    function _onRender() {
      const drawContext = $data.$drawContext!

      drawContext.reset()

      const radius = internalBlockSize.value / 2
      const center_y = SLIDER_THUMB_SHADOW + radius
      const value_width = $data.$sliderTrackWidth * _getValuePercentage()
      const thumb_center_x = value_width + radius

      // track background
      const line_bg_x = thumb_center_x + radius
      const line_bg_w =
        $data.$sliderTrackWidth - line_bg_x + internalBlockSize.value
      if (line_bg_w > 0) {
        drawContext.fillStyle = props.backgroundColor
        drawContext.fillRect(
          line_bg_x,
          center_y,
          line_bg_w,
          SLIDER_TRACK_HEIGHT
        )
      }

      // track foreground
      if (thumb_center_x > radius) {
        drawContext.fillStyle = props.activeColor
        drawContext.fillRect(0, center_y, value_width, SLIDER_TRACK_HEIGHT)
      }

      // thumb
      drawContext.fillStyle = props.blockColor
      drawContext.arc(thumb_center_x, center_y, radius, 0, 2 * Math.PI)
      drawContext.fill()

      // thumb shadow
      drawContext.lineWidth = 1
      for (let i = 0; i < SLIDER_THUMB_SHADOW; i++) {
        drawContext.strokeStyle = `rgba(100,100,100,0.0${4 - i})`
        drawContext.beginPath()
        drawContext.arc(thumb_center_x, center_y, radius + i, 0, 2 * Math.PI)
        drawContext.stroke()
      }

      // value
      if (props.showValue) {
        drawContext.font = SLIDER_VALUE_FONT_SIZE + 'px'
        drawContext.fillStyle = props.color
        drawContext.fillText(
          $data.$sliderElement!.value.toString(),
          $data.$sliderTrackWidth + internalBlockSize.value + 3,
          center_y + SLIDER_VALUE_FONT_SIZE / 2 - 1
        )
      }

      drawContext.update()
    }
    function _getValuePercentage(): number {
      let value = $data.$sliderElement!.value
      if (value < props.min) {
        value = props.min
      }
      if (value > props.max) {
        value = props.max
      }
      return (value - props.min) / (props.max - props.min)
    }
    const internalBlockSize = computed(() => {
      return Math.min(
        Math.max(props.blockSize, SLIDER_BLOCK_SIZE_MIN_VALUE),
        SLIDER_BLOCK_SIZE_MAX_VALUE
      )
    })
    const sliderHeight = computed(() => {
      return internalBlockSize.value + SLIDER_THUMB_SHADOW * 2 + 'px'
    })
    const sliderRef: Ref<UniSliderElement | null> = ref(null)
    watch(
      () => {
        return props.value
      },
      (newVal) => {
        $data.$sliderElement!.value = newVal
      }
    )
    onMounted(() => {
      const instance = getCurrentInstance()!
      instance.$waitNativeRender(() => {
        $data.$sliderElement = sliderRef.value!
        $data.$sliderElement!._initialValue = props.value
        $data.$sliderElement!._value = props.value
        $data.$sliderElement!.onValueChanged = (value: number) => {
          _onRender()
        }

        $data.$drawContext = $data.$sliderElement!.getDrawableContext()

        _onLayout()
        _onRender()

        // $dispatch(this, 'Form', 'formControlUpdate', $data.$sliderElement, 'add')
      })
      watch(
        (): any => [props.showValue, props.blockSize],
        () => {
          _onLayout()
          _onRender()
        }
      )
      watch(
        (): any => [
          props.disabled,
          props.color,
          props.backgroundColor,
          props.activeColor,
          props.selectedColor,
          props.blockColor,
        ],
        () => {
          _onRender()
        }
      )
    })
    return () => {
      return (
        <uni-slider-element
          ref={sliderRef}
          style={{ height: sliderHeight.value }}
          onTouchstart={_onTouchStart}
          onTouchmove={_onTouchMove}
          onTouchend={_onTouchEnd}
        ></uni-slider-element>
      )
    }
  },
})
