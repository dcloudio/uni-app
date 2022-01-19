import { getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import { UniFormCtx, uniFormKey } from '../vue/form'

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
  const ctx = {
    submit(): [string, any] {
      const proxy = instance.proxy
      return [
        (proxy as any)[nameKey],
        typeof value === 'string' ? (proxy as any)[value] : value.value,
      ]
    },
    reset() {
      if (typeof value === 'string') {
        ;(instance.proxy as any)[value] = ''
      } else {
        value.value = ''
      }
    },
  }
  uniForm.addField(ctx)
  onBeforeUnmount(() => {
    uniForm.removeField(ctx)
  })
}
