import { type VNode, defineComponent, provide, ref } from 'vue'
import { isArray } from '@vue/shared'
import { type EmitEvent, useCustomEvent } from '../../helpers/useNVueEvent'
import {
  type UniFormCtx,
  type UniFormFieldCtx,
  uniFormKey,
} from '../../components/form'

const NATIVE_COMPONENTS = ['u-input', 'u-textarea']

export default defineComponent({
  name: 'Form',
  emits: ['submit', 'reset'],
  setup({}, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const fields: UniFormFieldCtx[] = []

    let resetNative: Function

    provide<UniFormCtx>(uniFormKey, {
      addField(field: UniFormFieldCtx) {
        fields.push(field)
      },
      removeField(field: UniFormFieldCtx) {
        fields.splice(fields.indexOf(field), 1)
      },
      submit(evt: Event) {
        // 获取原生组件值
        let outFormData: any = {}
        resetNative && resetNative(outFormData)

        let formData = fields.reduce((res, field) => {
          if (field.submit) {
            const [name, value] = field.submit()
            name && (res[name] = value)
          }
          return res
        }, Object.create(null))

        Object.assign(outFormData, formData)

        trigger('submit', {
          value: outFormData,
        })
      },
      reset(evt: Event) {
        // 清空原生组件值
        resetNative && resetNative()

        fields.forEach((field) => field.reset && field.reset())
        trigger('reset', evt)
      },
    })

    return () => {
      const vnodes = slots.default && slots.default()
      resetNative = useResetNative(vnodes)
      return <view ref={rootRef}>{vnodes}</view>
    }
  },
})

function useResetNative(children?: VNode[]) {
  const modulePlus = weex.requireModule('plus')
  const getOrClearNativeValue = (outResult: any, nodes?: VNode[]): void => {
    ;(nodes || children || []).forEach(function (node: VNode) {
      if (
        NATIVE_COMPONENTS.indexOf(String(node.type)) >= 0 &&
        node.el &&
        node.el.attr &&
        node.el.attr.name
      ) {
        if (outResult) {
          outResult[node.el.attr.name] = modulePlus.getValue(node.el.nodeId)
        } else {
          node.el.setValue('')
        }
      }
      if (isArray(node.children) && node.children && node.children.length) {
        getOrClearNativeValue(outResult, node.children as VNode[])
      }
    })
  }

  return getOrClearNativeValue
}
