/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  onMounted,
  getCurrentInstance,
  // computed,
  ComponentPublicInstance,
  // camelize,
  ComponentInternalInstance,
  ref,
  onUnmounted,
} from 'vue'
import {
  RADIOGROUP_NAME,
  RADIOGROUP_ROOT_ELEMENT,
  UniRadioGroupElement,
  // UniRadioGroupChangeEvent,
} from './model'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: RADIOGROUP_NAME,
  rootElement: {
    name: RADIOGROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioGroupElement,
  },
  emits: ['change'],
  setup(props, { emit, slots, expose }) {
    const $radioList = ref<ComponentPublicInstance[]>([])
    // const $uniRadioGroupElement: UniRadioGroupElement | null = null

    let instance: ComponentInternalInstance | null = null

    onMounted(() => {
      instance = getCurrentInstance()

      instance?.$waitNativeRender(() => {
        if (!instance) return

        // this.$uniRadioGroupElement = this.$el as UniRadioGroupElement
        // this.$uniRadioGroupElement!._getValue = this._getValue
        // this.$uniRadioGroupElement!._setValue = this._setValue
        // this.$uniRadioGroupElement!._initialValue = this._getValue()
        // this.$uniRadioGroupElement!._getAttribute = (
        //   key: string
        // ): string | null => {
        //   const keyString = camelize(key)
        //   if (this.$props.has(keyString)) {
        //     const value = this.$props.get(keyString)
        //     if (value != null) {
        //       return value.toString()
        //     }
        //     return ''
        //   }
        //   return null
        // }

        // $dispatch(this, 'Form', 'formControlUpdate', this.$uniRadioGroupElement, 'add')
      })
    })

    onUnmounted(() => {
      //   $dispatch(this, 'Form', 'formControlUpdate', this.$uniRadioGroupElement, 'remove')
    })

    const _radioGroupUpdateHandler = (
      vm: ComponentPublicInstance,
      type: string
    ) => {
      if (type == 'add') {
        $radioList.value.push(vm)
      } else {
        const index = $radioList.value.indexOf(vm)
        if (index !== -1) {
          $radioList.value.splice(index, 1)
        }
      }
    }

    const _getValue = (): string => {
      let value = ''
      // $radioList.value.forEach((vm, _) => {
      //   if (vm.$data.get('radioChecked') == true) {
      //     value = vm.$data.get('radioValue') as string
      //   }
      // })
      return value
    }
    const _setValue = (value: string) => {
      // $radioList.value.forEach((vm, _) => {
      //   if (vm.$data.get('radioValue') == value) {
      //     vm.$data.set('radioChecked', true)
      //   } else {
      //     vm.$data.set('radioChecked', false)
      //   }
      // })
    }

    const _changeHandler = (vm: ComponentPublicInstance) => {
      // const value = vm.$data.get('radioValue') as string
      // _setValue(value)
      // emit('change', new UniRadioGroupChangeEvent(value))
    }

    expose({
      _radioGroupUpdateHandler,
      _getValue,
      _setValue,
      _changeHandler,
    })

    return () => {
      return (
        <uni-radio-group-element>{slots.default?.()}</uni-radio-group-element>
      )
    }
  },
})
