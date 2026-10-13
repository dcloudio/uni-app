import { createElementBlock, openBlock } from 'vue'

export { defineComponent } from 'vue'

export function createUnsupportedRender(name: string) {
  return () => (
    openBlock(),
    createElementBlock('uni-' + name, null, name + ' is unsupported')
  )
}
