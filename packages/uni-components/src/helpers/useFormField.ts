import { getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import { UniFormCtx, uniFormKey } from '../components/form'

export function useFormField(nameKey: string, valueKey: string) {
  const uniForm = inject<UniFormCtx>(
    uniFormKey,
    (false as unknown) as UniFormCtx // remove warning
  )
  if (!uniForm) {
    return
  }
  const instance = getCurrentInstance()!
  const ctx = {
    submit(): [string, any] {
      const proxy = instance.proxy
      return [(proxy as any)[nameKey], (proxy as any)[valueKey]]
    },
    reset() {
      ;(instance.proxy as any)[valueKey] = ''
    },
  }
  uniForm.addField(ctx)
  onBeforeUnmount(() => {
    uniForm.removeField(ctx)
  })
}
