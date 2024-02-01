/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  CHECKBOX_GROUP_NAME,
  CHECKBOX_GROUP_ROOT_ELEMENT,
  // UniCheckboxGroupChangeEvent,
  checkboxGroupProps,
  UniCheckboxGroupChangeEvent,
  UniCheckboxGroupElement,
} from './model'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { $dispatch } from '../../utils'

interface CheckboxInfo {
  name: string
  checked: boolean
  setCheckboxChecked: (checked: boolean) => void
}

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
    const uniCheckboxGroupElementRef = ref<UniCheckboxGroupElement | null>(null)
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
      // set
      $checkboxList.value.forEach((i) => {
        if (i.name === info.name) {
          i.checked = info.checked
        }
      })
      emit('change', new UniCheckboxGroupChangeEvent(_getValue()))
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
        if (instance === null) return

        if (!uniCheckboxGroupElementRef.value) return

        uniCheckboxGroupElementRef.value._getValue = _getValue
        uniCheckboxGroupElementRef.value._setValue = _setValue
        uniCheckboxGroupElementRef.value._initialValue = _getValue()

        // for form
        const ctx = instance.proxy
        $dispatch(
          ctx,
          'Form',
          'formControlUpdate',
          uniCheckboxGroupElementRef,
          'add'
        )
      })
    })

    expose({
      _checkboxGroupUpdateHandler,
      _changeHandler,
    })

    return () => {
      return (
        <uni-checkbox-group-element ref="uniCheckboxGroupElementRef">
          {slots.default?.()}
        </uni-checkbox-group-element>
      )
    }
  },
})
