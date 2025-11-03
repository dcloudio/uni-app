import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  type StyleValue,
  camelize,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  renderSlot,
  watch,
  watchEffect,
} from 'vue'
import {
  RADIO_NAME,
  RADIO_ROOT_ELEMENT,
  UniRadioElement,
  radioProps,
} from './model'
import { styleList } from './style'
import { $dispatch } from '../../utils'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: RADIO_NAME,
  rootElement: {
    name: RADIO_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioElement,
  },
  props: radioProps,
  setup(props, { slots, expose }) {
    const uniRadioElementRef = ref<UniRadioElement>()

    // style 样式
    const styleUniRadio = computed(() => styleList['uni-radio'][''])
    const styleUniRadioInput = computed(() => {
      return Object.assign(
        {},
        styleList['uni-radio-input'][''],
        radioChecked.value ? checkedStyle.value : uncheckedStyle.value
      ) as StyleValue
    })
    const styleUniRadioInputIcon = computed(() => {
      return Object.assign(
        {},
        styleList['uni-radio-input-icon'][''],
        iconStyle.value
      )
    })
    const checkedStyle = computed(() => {
      if (props.disabled) {
        // basic style
        return {
          backgroundColor: '#e1e1e1',
          borderColor: '#d1d1d1',
        }
      }
      const backgroundColor =
        props.activeBackgroundColor.length > 0
          ? props.activeBackgroundColor
          : props.color

      // 默认为选中时的背景颜色
      const borderColor =
        props.activeBorderColor.length > 0
          ? props.activeBorderColor
          : backgroundColor

      return {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }
    })
    const uncheckedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: '#e1e1e1',
          borderColor: '#d1d1d1',
        }
      }
      return {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
      }
    })
    const iconStyle = computed(() => {
      let color = ''

      if (props.foreColor.length > 0) {
        color = props.foreColor
      } else if (props.iconColor.length > 0) {
        color = props.iconColor
      }

      return {
        color: props.disabled ? '#adadad' : color,
      }
    })

    // data
    const icon = '\uEA08'
    const radioChecked = ref(props.checked)
    const radioValue = ref(props.value.toString())

    watchEffect(() => {
      radioChecked.value = props.checked
    })

    const setRadioChecked = (value: boolean) => {
      radioChecked.value = value
    }

    watchEffect(() => {
      radioValue.value = props.value.toString()
    })

    watch(
      () => radioChecked.value,
      (val) => {
        const ctx = instance?.proxy
        if (!ctx) return
        if (val) {
          // 通知 group 发生变化，需要携带当前的 name
          $dispatch(ctx, 'RadioGroup', '_changeHandler', {
            name: radioValue.value,
            checked: radioChecked.value,
            setRadioChecked,
          })
        }
      }
    )

    expose({
      radioValue,
    })

    let instance = getCurrentInstance()

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (instance === null) return

        uniRadioElementRef.value!._getAttribute = (
          key: string
        ): string | null => {
          const keyString = camelize(key) as keyof typeof props
          return props[keyString] !== null
            ? props[keyString]?.toString() ?? null
            : null
        }
      })

      // 初始化提供值
      const ctx = instance?.proxy
      $dispatch(
        ctx,
        'RadioGroup',
        '_radioGroupUpdateHandler',
        {
          name: radioValue.value,
          checked: radioChecked.value,
          setRadioChecked,
        },
        'add'
      )
    })

    onBeforeUnmount(() => {
      const ctx = instance?.proxy
      $dispatch(
        ctx,
        'RadioGroup',
        '_radioGroupUpdateHandler',
        {
          name: radioValue.value,
          checked: radioChecked.value,
          setRadioChecked,
        },
        'remove'
      )
    })

    const _onClick = () => {
      // 只允许点击一次，从不选中到选中
      if (props.disabled || radioChecked.value) return
      radioChecked.value = !radioChecked.value
    }
    return () => {
      return (
        <uni-radio-element
          dataUncType="uni-radio"
          class="uni-radio"
          style={styleUniRadio.value}
          ref={uniRadioElementRef}
          onClick={_onClick}
        >
          <view class="uni-radio-input" style={styleUniRadioInput.value}>
            <text
              class="uni-radio-input-icon"
              style={styleUniRadioInputIcon.value}
            >
              {radioChecked.value ? icon : ''}
            </text>
          </view>
          {renderSlot(slots, 'default')}
        </uni-radio-element>
      )
    }
  },
})
export { UniRadioElement }
