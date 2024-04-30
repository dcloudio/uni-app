import { getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import { isString } from '@vue/shared'
import { type UniFormCtx, uniFormKey } from '../vue/form'

interface ValueState {
  value: string
}

export function useFormField(nameKey: string, valueKey: string): void
export function useFormField(nameKey: string, valueState: ValueState): void
export function useFormField(
  nameKey: string,
  value: string | ValueState
): void {
  const uniForm = inject<UniFormCtx>(
    uniFormKey,
    false as unknown as UniFormCtx // remove warning
  )
  if (!uniForm) {
    return
  }
  const instance = getCurrentInstance()!
  //#if _X_ && !_NODE_JS_
  const initialValue: string = isString(value)
    ? (instance.proxy as any)[value]
    : value.value
  //#endif
  const ctx = {
    submit(): [string, any] {
      const proxy = instance.proxy
      return [
        (proxy as any)[nameKey],
        isString(value) ? (proxy as any)[value] : value.value,
      ]
    },
    reset() {
      if (isString(value)) {
        //#if _X_ && !_NODE_JS_
        ;(instance.proxy as any)[value] = initialValue
        //#else
        ;(instance.proxy as any)[value] = ''
        //#endif
      } else {
        //#if _X_ && !_NODE_JS_
        value.value = initialValue
        //#else
        value.value = ''
        //#endif
      }
    },
  }
  uniForm.addField(ctx)
  onBeforeUnmount(() => {
    uniForm.removeField(ctx)
  })
}
