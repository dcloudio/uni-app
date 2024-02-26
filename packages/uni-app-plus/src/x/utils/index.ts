import { warn } from 'vue'

export function $dispatch(
  // @ts-expect-error
  context: ComponentPublicInstance,
  componentName: string,
  eventName: string,
  ...do_not_transform_spread: any | null
) {
  let parent = context.$parent
  let name = parent?.$options?.name
  while (parent != null && (name == null || componentName != name)) {
    parent = parent.$parent
    if (parent != null) {
      name = parent?.$options?.name
    }
  }
  if (parent != null) {
    parent[eventName](...do_not_transform_spread)
  }
}

export function $dispatchParent(
  // @ts-expect-error
  context: ComponentPublicInstance,
  componentName: string,
  eventName: string,
  ...do_not_transform_spread: any | null
) {
  let parent = context.$parent
  let name = parent?.$options?.name
  if (parent !== null && (name === null || componentName === name)) {
    if (typeof parent[eventName] === 'function') {
      return parent[eventName](...do_not_transform_spread)
    } else {
      // warn
      warn(`dispatchParent: ${componentName} has no method ${eventName}`)
    }
  }
}
