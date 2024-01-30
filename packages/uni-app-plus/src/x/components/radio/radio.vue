<template>
  <uni-radio-element
    dataUncType="uni-radio"
    class="uni-radio"
    :style="styleUniRadio"
    @click="_onClick"
  >
    <view class="uni-radio-input" :style="styleUniRadioInput">
      <text
        v-if="radioChecked"
        class="uni-radio-input-icon"
        :style="styleUniRadioInputIcon"
      >
        {{ icon }}
      </text>
    </view>
    <slot />
  </uni-radio-element>
</template>
<script lang="ts">
import { defineBuiltInComponent } from '@dcloudio/uni-components'
// import { $dispatch } from '../../utils'
import {
  watchEffect,
  ref,
  camelize,
  computed,
  onMounted,
  ComponentInternalInstance,
} from 'vue'
import {
  RADIO_NAME,
  RADIO_ROOT_ELEMENT,
  UniRadioElement,
  radioProps,
} from './model'
import { onUnmounted } from 'vue'
import { getCurrentInstance } from 'vue'
import { styleList } from './style'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: RADIO_NAME,
  rootElement: {
    name: RADIO_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioElement,
  },
  props: radioProps,
  styles: styleList,

  setup(props, { emit }) {
    const styleUniRadio = styleList['uni-radio']['']

    const styleUniRadioInput = computed(() => {
      return Object.assign(
        {},
        styleList['uni-radio-input'][''],
        radioChecked.value ? checkedStyle.value : uncheckedStyle.value
      )
    })
    const styleUniRadioInputIcon = computed(() => {
      return Object.assign(
        {},
        styleList['uni-radio-input-icon'][''],
        iconStyle.value
      )
    })

    // data
    let $uniRadioElement: null | UniRadioElement = null
    const icon = '\uEA08'
    const radioChecked = ref(props.checked)
    const radioValue = ref(props.value.toString())

    // this.radioValue = this.value.toString()

    watchEffect(() => {
      radioChecked.value = props.checked
    })

    watchEffect(() => {
      radioValue.value = props.value.toString()
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
      return {
        color: props.disabled ? '#adadad' : props.iconColor,
      }
    })

    let instance: ComponentInternalInstance | null = null

    onMounted(() => {
      instance = getCurrentInstance()

      instance?.$waitNativeRender(() => {
        if (instance === null) return
        $uniRadioElement = instance.proxy?.$el as UniRadioElement

        $uniRadioElement!._getAttribute = (key: string): string | null => {
          const keyString = camelize(key)
          // if (this.$props.has(keyString)) {
          //       const value = this.$props.get(keyString)
          //       if (value != null) {
          //         return value.toString()
          //       }
          //       return ''
          //     }
          return null
        }
      })
      // $dispatch(this, 'RadioGroup', '_radioGroupUpdateHandler', this, 'add')
    })

    onUnmounted(() => {
      // $dispatch(this, 'RadioGroup', '_radioGroupUpdateHandler', this, 'remove')
    })

    const _onClick = () => {
      if (props.disabled || radioChecked.value) return
      radioChecked.value = !radioChecked.value
      // $dispatch(this, 'RadioGroup', '_changeHandler', this)
    }
    return {
      _onClick,
      checkedStyle,
      uncheckedStyle,
      iconStyle,
      icon,
      styleUniRadio,
      radioChecked,
      styleUniRadioInput,
      styleUniRadioInputIcon,
    }
  },
})
</script>
