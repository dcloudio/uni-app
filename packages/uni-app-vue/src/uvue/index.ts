export * from '../../lib/uvue.runtime.esm'
import type { ComponentCustomOptions } from 'vue'
import { defineComponent as origDefineComponent } from '../../lib/uvue.runtime.esm'

export const defineComponent = (options: any) => {
  const rootElement: ComponentCustomOptions['rootElement'] | undefined =
    options.rootElement
  if (rootElement && typeof customElements !== 'undefined') {
    customElements.define(
      rootElement.name,
      rootElement.class,
      rootElement.options
    )
  }
  return origDefineComponent(options)
}
