import { type defineComponent, h } from 'vue'

export type WrapperComponent = ReturnType<typeof createWrapper>

export function createWrapper(
  component: ReturnType<typeof defineComponent>,
  props: Record<string, any>
) {
  return () => h(component, props)
}
