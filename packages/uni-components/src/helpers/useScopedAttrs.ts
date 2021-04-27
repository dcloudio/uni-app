import {
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  reactive,
} from 'vue'

interface State {
  attrs: Record<string, string>
}
export function useScopedAttrs() {
  const state: State = reactive({
    attrs: {},
  })

  onMounted(() => {
    let instance = getCurrentInstance()
    while (instance) {
      const scopeId = (instance.type as any).__scopeId
      if (scopeId) {
        state.attrs[scopeId] = ''
      }
      instance = instance.__isPage ? null : instance.parent
    }
  })

  return {
    state,
  }
}
