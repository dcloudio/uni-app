/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  CHECKBOX_GROUP_NAME,
  CHECKBOX_GROUP_ROOT_ELEMENT,
  UniCheckboxGroupChangeEvent,
  UniCheckboxGroupElement,
  checkboxGroupProps,
} from './model'
import type { CheckboxInfo } from './model'
import { camelize, getCurrentInstance, onMounted, ref, renderSlot } from 'vue'
import { initUniCustomEvent } from '../../utils'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: CHECKBOX_GROUP_NAME,
  rootElement: {
    name: CHECKBOX_GROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxGroupElement,
  },
  props: checkboxGroupProps,
  emits: ['change'],
  setup(props, { emit, expose, slots }) {
    // data
    const $checkboxList = ref<CheckboxInfo[]>([])

    const uniCheckboxGroupElementRef = ref<UniCheckboxGroupElement>()

    const instance = getCurrentInstance()

    /**
     * 子 checkbox mounted 触发
     */
    const _checkboxGroupUpdateHandler = (info: CheckboxInfo, type: string) => {
      if (type == 'add') {
        $checkboxList.value.push(info)
      } else {
        const index = $checkboxList.value.findIndex((i) => i.name === info.name)
        if (index !== -1) {
          $checkboxList.value.splice(index, 1)
        }
      }
    }

    /**
     * checkbox change 触发
     */
    const _changeHandler = (info: CheckboxInfo) => {
      // 设置状态
      $checkboxList.value.forEach((i) => {
        if (i.name === info.name) {
          i.checked = info.checked
        }
      })
      emit(
        'change',
        initUniCustomEvent(
          uniCheckboxGroupElementRef.value!,
          new UniCheckboxGroupChangeEvent(_getValue())
        )
      )
    }

    const _getValue = () => {
      let valueArray: string[] = []
      $checkboxList.value.forEach((info) => {
        if (info.checked) {
          valueArray.push(info.name)
        }
      })
      return valueArray
    }
    const _setValue = (valueArray: string[]) => {
      $checkboxList.value.forEach((info) => {
        info.setCheckboxChecked(valueArray.includes(info.name))
      })
    }

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (!instance) return

        if (!uniCheckboxGroupElementRef.value) return

        uniCheckboxGroupElementRef.value._getValue = _getValue
        uniCheckboxGroupElementRef.value._setValue = _setValue
        uniCheckboxGroupElementRef.value._initialValue = _getValue()
        uniCheckboxGroupElementRef.value._getAttribute = (
          key: string
        ): string | null => {
          const keyString = camelize(key) as keyof typeof props
          return props[keyString] !== null
            ? props[keyString]?.toString() ?? null
            : null
        }
      })
    })

    expose({
      _checkboxGroupUpdateHandler,
      _changeHandler,
      _getValue,
      _setValue,
    })

    return () => {
      return (
        <uni-checkbox-group-element ref={uniCheckboxGroupElementRef}>
          {renderSlot(slots, 'default')}
        </uni-checkbox-group-element>
      )
    }
  },
})

export { UniCheckboxGroupChangeEvent, UniCheckboxGroupElement }
