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
    let vm = (getCurrentInstance() as ComponentInternalInstance).proxy
    while (vm) {
      const $options = vm.$options
      const scopeId = $options.__scopeId
      if (scopeId) {
        const attrs: Record<string, string> = {}
        attrs[scopeId] = ''
        state.attrs = attrs
      }
      vm = vm.$parent
    }
  })

  return {
    state,
  }
}
