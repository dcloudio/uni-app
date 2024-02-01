import { defineBuiltInComponent } from '@dcloudio/uni-components'
/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import {
  onMounted,
  getCurrentInstance,
  computed,
  ref,
  watchEffect,
  StyleValue,
} from 'vue'

import { $dispatch } from '../../utils'
import {
  CHECKBOX_NAME,
  CHECKBOX_ROOT_ELEMENT,
  UniCheckboxElement,
  checkboxProps,
} from './model'
import { styles } from './style'
import { onUnload } from '@dcloudio/uni-app'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: CHECKBOX_NAME,
  rootElement: {
    name: CHECKBOX_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxElement,
  },
  props: checkboxProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    // data
    const icon = '\uEA08'

    const instance = getCurrentInstance()

    const checkboxChecked = ref(props.checked)
    const checkboxValue = ref('')

    const setCheckboxChecked = (checked: boolean) => {
      checkboxChecked.value = checked
    }

    watchEffect(() => {
      checkboxChecked.value = props.checked
    })

    watchEffect(() => {
      checkboxValue.value = props.value.toString()
    })

    // styles
    const iconStyle = computed(() => {
      if (props.disabled) {
        return Object.assign({}, styles['uni-icon'])
      }

      const color = props.iconColor.length > 0 ? props.iconColor : props.color
      return Object.assign({}, styles['uni-icon'], { color })
    })

    const checkInputStyle = computed(() => {
      const style = checkboxChecked.value
        ? checkedStyle.value
        : uncheckedStyle.value
      return Object.assign(
        {},
        styles['uni-checkbox-input'],
        style
      ) as StyleValue
    })

    const checkedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: '#e1e1e1',
          borderColor: '#d1d1d1',
        }
      }

      return {
        backgroundColor: props.activeBackgroundColor,
        borderColor: props.activeBorderColor,
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

    onMounted(() => {
      const ctx = instance?.proxy
      $dispatch(
        ctx,
        'CheckboxGroup',
        '_checkboxGroupUpdateHandler',
        {
          setCheckboxChecked,
          name: checkboxValue.value,
          checked: checkboxChecked.value,
        },
        'add'
      )
    })

    onUnload(() => {
      const ctx = instance?.proxy
      $dispatch(
        ctx,
        'CheckboxGroup',
        '_checkboxGroupUpdateHandler',
        {
          setCheckboxChecked,
          name: checkboxValue.value,
          checked: checkboxChecked.value,
        },
        'remove'
      )
    })

    const _onClick = ($event: PointerEvent) => {
      if (props.disabled) return
      emit('click', $event)
      checkboxChecked.value = !checkboxChecked.value

      const ctx = instance?.proxy
      $dispatch(ctx, 'CheckboxGroup', '_changeHandler', {
        name: checkboxValue.value,
        checked: checkboxChecked.value,
        setCheckboxChecked,
      })
    }

    return () => {
      return (
        <uni-checkbox-element
          dataUncType="uni-checkbox"
          onClick={_onClick}
          class="uni-checkbox"
          style={styles['uni-checkbox']}
        >
          <view class="uni-checkbox-input" style={checkInputStyle.value}>
            {checkboxChecked.value ? (
              <text class="uni-icon" style={iconStyle.value}>
                {icon}
              </text>
            ) : null}
          </view>
          {slots.default?.()}
        </uni-checkbox-element>
      )
    }
  },
})
