import {
  type Ref,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue'

// 临时适配旧 TSX 表单组件与 uni-form 的 UVue 协议；切换对应新组件时删除。
// 注入 key 和上下文结构对应 uni-form/components/common.uts、types.uts。
interface FormContext {
  registerField(field: {
    name: string
    getValue(): string
    reset(): void
  }): void
  unregisterField(name: string): void
  submit(event?: Event): void
  reset(event?: Event): void
}

interface LabelContext {
  register(child: {
    id: string
    activate(event: Event): void
    getDisabled(): boolean
  }): void
  unregister(id: string): void
}

export function useVaporFormField(
  props: { name: string },
  state: { value: string }
) {
  const form = inject<FormContext | null>('UNI_FORM_CTX', null)
  if (!form) return
  const initialValue = state.value
  const getValue = () => state.value
  const reset = () => {
    state.value = initialValue
  }
  watch(
    () => props.name,
    (name, oldName) => {
      if (oldName) form.unregisterField(oldName)
      if (name) form.registerField({ name, getValue, reset })
    },
    { immediate: true, flush: 'sync' }
  )
  onBeforeUnmount(() => {
    if (props.name) form.unregisterField(props.name)
  })
}

export function useVaporButton(
  props: { id: string; disabled: boolean | string },
  rootRef: Ref<HTMLElement | null>
) {
  const form = inject<FormContext | null>('UNI_FORM_CTX', null)
  const label = inject<LabelContext | null>('UNI_LABEL_CTX', null)
  if (label) {
    // 新 Label 按 id 注销，无显式 id 的旧 Button 也必须能在卸载时清理。
    const fallbackId = `__uni_vapor_button_${getCurrentInstance()!.uid}`
    const child = {
      // 只注册一次，读取最新 id，不因改名改变 Label 默认激活的顺序。
      get id() {
        return props.id || fallbackId
      },
      activate() {
        const root = rootRef.value
        if (root && !props.disabled) {
          root.click()
        }
      },
      getDisabled() {
        return !!props.disabled
      },
    }
    // 与新表单控件统一注册时机，避免 Button 提前成为 Label 的默认目标。
    onMounted(() => label.register(child))
    onBeforeUnmount(() => label.unregister(child.id))
  }
  return form
}
