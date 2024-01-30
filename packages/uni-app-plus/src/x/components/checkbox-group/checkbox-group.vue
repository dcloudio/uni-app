<template>
  <uni-checkbox-group-element ref="uniCheckboxGroupElementRef">
    <slot></slot>
  </uni-checkbox-group-element>
</template>
<script lang="ts">
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
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  getCurrentInstance,
  onMounted,
  defineExpose,
  ref,
} from 'vue'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: CHECKBOX_GROUP_NAME,
  rootElement: {
    name: CHECKBOX_GROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxGroupElement,
  },
  props: checkboxGroupProps,
  emits: ['change'],
  setup(props, { emit }) {
    // data
    const $checkboxList = ref<ComponentPublicInstance[]>([])
    const uniCheckboxGroupElementRef = ref<UniCheckboxGroupElement | null>(null)

    let instance: ComponentInternalInstance | null = null
    instance = getCurrentInstance()

    const _checkboxGroupUpdateHandler = (
      vm: ComponentPublicInstance,
      type: string
    ) => {
      if (type == 'add') {
        $checkboxList.value.push(vm)
      } else {
        const index = $checkboxList.value.indexOf(vm)
        if (index !== -1) {
          $checkboxList.value.splice(index, 1)
        }
      }
    }
    const _changeHandler = () => {
      emit('change', new UniCheckboxGroupChangeEvent(_getValue()))
    }

    // 目前不能用
    defineExpose({
      _checkboxGroupUpdateHandler,
      _changeHandler,
    })

    const _getValue = () => {
      let valueArray: string[] = []
      $checkboxList.value.forEach((vm) => {
        const data = vm.$data as any
        if (data.get('checkboxChecked') as boolean) {
          valueArray.push(data.get('checkboxValue') as string)
        }
      })
      return valueArray
    }
    const _setValue = (valueArray: string[]) => {
      $checkboxList.value.forEach((vm) => {
        const data = vm.$data as any
        const value = data.get('checkboxValue') as string
        if (valueArray.indexOf(value) !== -1) {
          data.set('checkboxChecked', true)
        } else {
          data.set('checkboxChecked', false)
        }
      })
    }

    onMounted(() => {
      if (instance === null) return

      instance.$waitNativeRender(() => {
        if (!uniCheckboxGroupElementRef.value) return

        uniCheckboxGroupElementRef.value._getValue = _getValue
        uniCheckboxGroupElementRef.value._setValue = _setValue
        uniCheckboxGroupElementRef.value._initialValue = _getValue()
        // $dispatch(this, 'Form', 'formControlUpdate', this.$uniCheckboxGroupElement, 'add')
      })
    })

    return {
      _checkboxGroupUpdateHandler,
      _changeHandler,
    }
  },
})
</script>
