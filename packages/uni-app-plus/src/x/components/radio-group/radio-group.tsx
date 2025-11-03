/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { camelize, getCurrentInstance, onMounted, ref, renderSlot } from 'vue'
import {
  RADIOGROUP_NAME,
  RADIOGROUP_ROOT_ELEMENT,
  RadioProps,
  UniRadioGroupChangeEvent,
  UniRadioGroupElement,
} from './model'
import type { RadioInfo } from './model'
import { initUniCustomEvent } from '../../utils'

/**
 * radio-group 组件
 */

export default /*#__PURE__*/ defineBuiltInComponent({
  name: RADIOGROUP_NAME,
  rootElement: {
    name: RADIOGROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioGroupElement,
  },
  props: RadioProps,
  emits: ['change'],
  setup(props, { emit, slots, expose }) {
    // 获取子类所有的 radio 实例
    const $radioList = ref<RadioInfo[]>([])

    const uniRadioGroupElementRef = ref<UniRadioGroupElement>()

    const instance = getCurrentInstance()

    /**
     * 子类 radio 在 mounted 时候触发 add，在卸载时候执行 remove
     * radio-group 可以存在多个
     */
    const _radioGroupUpdateHandler = (
      info: RadioInfo,
      type: 'add' | 'remove'
    ) => {
      if (type == 'add') {
        // 有相同的 name，默认都选中添加
        $radioList.value.push(info)
      } else {
        const index = $radioList.value.findIndex((i) => i.name == info.name)
        if (index !== -1) {
          $radioList.value.splice(index, 1)
        }
      }
    }

    /**
     * 当子类 radio 发生变化时候触发
     * @param name
     */
    const _changeHandler = (data: { name: string; checked: boolean }) => {
      _setValue(data.name)
      emit(
        'change',
        initUniCustomEvent(
          uniRadioGroupElementRef.value!,
          new UniRadioGroupChangeEvent(data.name)
        )
      )
    }

    /**
     * 默认值 getInitValue,，注意区分属性 _getValue
     * 查询所有 radio 的 value，如果有一个为 true，那么就返回这个值
     * @returns
     */
    const _getValue = (): string => {
      let value = ''

      $radioList.value.forEach((info) => {
        if (info.checked) {
          value = info.name
        }
      })
      return value
    }

    /**
     * 多个 radio 同时只能选择一个，所以需要设置其他 radio 为 false
     * @param name 最新值
     */
    const _setValue = (name: string) => {
      $radioList.value.forEach((info) => {
        if (info.name == name) {
          info.checked = true
          info.setRadioChecked(true)
        } else {
          info.checked = false
          info.setRadioChecked(false)
        }
      })
    }

    onMounted(() => {
      instance?.$waitNativeRender(() => {
        if (!instance) return
        if (!uniRadioGroupElementRef.value) return

        // 重写方法
        uniRadioGroupElementRef.value._getValue = _getValue
        uniRadioGroupElementRef.value._setValue = _setValue
        uniRadioGroupElementRef.value._initialValue = _getValue()
        uniRadioGroupElementRef.value._getAttribute = (
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
      _radioGroupUpdateHandler,
      _getValue,
      _setValue,
      _changeHandler,
    })

    return () => {
      return (
        <uni-radio-group-element ref={uniRadioGroupElementRef}>
          {renderSlot(slots, 'default')}
        </uni-radio-group-element>
      )
    }
  },
})
export { UniRadioGroupChangeEvent, UniRadioGroupElement }
