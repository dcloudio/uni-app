import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ExtractPropTypes, Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import {
  type TouchtrackEvent,
  useTouchtrack,
} from '../../helpers/useTouchtrack'
import { UniElement } from '../../helpers/UniElement'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
  withWebEvent,
} from '../../helpers/useEvent'
import { type UniFormCtx, uniFormKey } from '../form'

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
    type: [Number, String],
    default: 28,
  },
  showValue: {
    type: [Boolean, String],
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
}

type SliderProps = ExtractPropTypes<typeof props>
type HTMLRef = Ref<HTMLElement | null>

class UniSliderElement extends UniElement {}
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
    const sliderHandleRef: HTMLRef = ref(null)
    const sliderValue = ref(Number(props.value))
    watch(
      () => props.value,
      (val) => {
        sliderValue.value = Number(val)
      }
    )

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(sliderRef, emit)

    const state = useSliderState(props, sliderValue)
    const { _onClick, _onTrack } = useSliderLoader(
      props,
      sliderValue,
      sliderRef,
      sliderValueRef,
      trigger
    )

    onMounted(() => {
      useTouchtrack(sliderHandleRef.value!, _onTrack)
    })

    //#if _X_ && !_NODE_JS_
    let sliderValueCache = ref(sliderValue.value)
    watch(
      () => sliderValue.value,
      (val) => {
        sliderValueCache.value = val
      }
    )
    onMounted(() => {
      const rootElement = sliderRef.value as UniSliderElement
      Object.defineProperty(rootElement, 'value', {
        get() {
          return sliderValueCache.value
        },
        set(val: number) {
          sliderValueCache.value = val
          const width = getValueWidth(val, props.min, props.max)
          ;(
            rootElement.querySelector('.uni-slider-track') as HTMLElement
          ).style.width = width
          ;(
            rootElement.querySelector('.uni-slider-thumb') as HTMLElement
          ).style.left = width
          ;(
            rootElement.querySelector('.uni-slider-value') as HTMLElement
          ).innerText = val.toString()
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const { setBgColor, setBlockBg, setActiveColor, setBlockStyle } = state

      return (
        <uni-slider
          ref={sliderRef}
          id={props.id}
          onClick={withWebEvent(_onClick)}
        >
          <div class="uni-slider-wrapper">
            <div class="uni-slider-tap-area">
              <div style={setBgColor.value} class="uni-slider-handle-wrapper">
                <div
                  ref={sliderHandleRef}
                  style={setBlockBg.value}
                  class="uni-slider-handle"
                />
                <div style={setBlockStyle.value} class="uni-slider-thumb" />
                <div style={setActiveColor.value} class="uni-slider-track" />
              </div>
            </div>
            <span
              v-show={props.showValue}
              ref={sliderValueRef}
              class="uni-slider-value"
            >
              {sliderValue.value}
            </span>
          </div>
          <slot />
        </uni-slider>
      )
    }
  },
})

const getValueWidth = (
  value: number,
  min: string | number,
  max: string | number
) => {
  max = Number(max)
  min = Number(min)
  return (100 * (value - min)) / (max - min) + '%'
}

function useSliderState(props: SliderProps, sliderValue: Ref<number>) {
  const _getValueWidth = () => {
    return getValueWidth(sliderValue.value, props.min, props.max)
  }
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

  const state = {
    setBgColor: computed(() => ({ backgroundColor: _getBgColor() })),
    setBlockBg: computed(() => ({ left: _getValueWidth() })),
    setActiveColor: computed(() => ({
      backgroundColor: _getActiveColor(),
      width: _getValueWidth(),
    })),
    setBlockStyle: computed(() => ({
      width: props.blockSize + 'px',
      height: props.blockSize + 'px',
      marginLeft: -props.blockSize / 2 + 'px',
      marginTop: -props.blockSize / 2 + 'px',
      left: _getValueWidth(),
      backgroundColor: props.blockColor,
    })),
  }

  return state
}

function useSliderLoader(
  props: SliderProps,
  sliderValue: Ref<number>,
  sliderRef: HTMLRef,
  sliderValueRef: HTMLRef,
  trigger: CustomEventTrigger
) {
  const _onClick = ($event: MouseEvent) => {
    if (props.disabled) {
      return
    }
    _onUserChangedValue($event)
    trigger('change', $event, {
      value: sliderValue.value,
    })
  }

  const _filterValue = (e: number) => {
    const max = Number(props.max)
    const min = Number(props.min)
    const step = Number(props.step)
    return e < min
      ? min
      : e > max
      ? max
      : computeController.mul.call(Math.round((e - min) / step), step) + min
  }

  const _onUserChangedValue = (e: MouseEvent) => {
    const max = Number(props.max)
    const min = Number(props.min)
    const sliderRightBox = sliderValueRef.value!
    const sliderRightBoxLeft = getComputedStyle(sliderRightBox, null).marginLeft
    let sliderRightBoxWidth = sliderRightBox.offsetWidth
    sliderRightBoxWidth = sliderRightBoxWidth + parseInt(sliderRightBoxLeft)
    const slider = sliderRef.value!
    const offsetWidth =
      slider.offsetWidth - (props.showValue ? sliderRightBoxWidth : 0)
    const boxLeft = slider.getBoundingClientRect().left
    const value = ((e.x - boxLeft) * (max - min)) / offsetWidth + min
    sliderValue.value = _filterValue(value)
  }

  const _onTrack = (e: TouchtrackEvent) => {
    if (!props.disabled) {
      return e.detail.state === 'move'
        ? (_onUserChangedValue({
            x: e.detail.x,
          } as MouseEvent),
          trigger('changing', e as any, {
            value: sliderValue.value,
          }),
          !1)
        : e.detail.state === 'end' &&
            trigger('change', e as any, {
              value: sliderValue.value,
            })
    }
  }

  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  if (!!uniForm) {
    const field = {
      reset: () => (sliderValue.value = Number(props.min)),
      submit: () => {
        const data: [string, any] = ['', null]
        if (props.name !== '') {
          data[0] = props.name
          data[1] = sliderValue.value
        }
        return data
      },
    }
    uniForm.addField(field)
    onBeforeUnmount(() => {
      uniForm.removeField(field)
    })
  }

  return { _onClick, _onTrack }
}

var computeController = {
  mul: function (arg: number) {
    let m = 0
    let s1 = this.toString()
    let s2 = arg.toString()
    try {
      // 获得小数位数
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      // 获得小数位数
      m += s2.split('.')[1].length
    } catch (e) {}
    // 转为十进制计算后，要除以两个数的共同小数位数
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
      Math.pow(10, m)
    )
  },
}
