import { defineBuiltInComponent } from '@dcloudio/uni-components'
/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import {
  type StyleValue,
  camelize,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'

import { $dispatch } from '../../utils'
import {
  CHECKBOX_NAME,
  CHECKBOX_ROOT_ELEMENT,
  UniCheckboxElement,
  checkboxProps,
} from './model'
import { styles } from './style'

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

    const elementRef = ref<UniCheckboxElement | null>()

    const checkboxChecked = ref(props.checked)
    const checkboxValue = ref('')

    const setCheckboxChecked = (checked: boolean) => {
      checkboxChecked.value = checked
    }

    watchEffect(() => {
      checkboxChecked.value = props.checked
    })

    watch(
      () => checkboxChecked.value,
      (val) => {
        const ctx = instance?.proxy
        if (!ctx) return
        $dispatch(ctx, 'CheckboxGroup', '_changeHandler', {
          name: checkboxValue.value,
          checked: checkboxChecked.value,
          setCheckboxChecked,
        })
      }
    )

    watchEffect(() => {
      checkboxValue.value = props.value.toString()
    })

    // styles
    const iconStyle = computed(() => {
      if (props.disabled) {
        return Object.assign({}, styles['uni-icon'])
      }

      let color = ''

      if (props.foreColor.length > 0) {
        color = props.foreColor
      } else if (props.iconColor.length > 0) {
        color = props.iconColor
      } else {
        color = props.color
      }

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

      instance?.$waitNativeRender(() => {
        if (!instance) return
        elementRef.value = instance.proxy?.$el as UniCheckboxElement
        elementRef.value!._getAttribute = (key: string): string | null => {
          const keyString = camelize(key) as keyof typeof props
          return props[keyString] !== null
            ? props[keyString]?.toString() ?? null
            : null
        }
      })
    })

    onBeforeUnmount(() => {
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
            <text class="uni-icon" style={iconStyle.value}>
              {checkboxChecked.value ? icon : ''}
            </text>
          </view>
          {slots.default?.()}
        </uni-checkbox-element>
      )
    }
  },
})

export { UniCheckboxElement }
