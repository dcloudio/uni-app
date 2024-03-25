export { isPlainObject, hasOwn, extend, capitalize } from '@vue/shared'
export function resolveEasycom(component: unknown, easycom: unknown) {
  return typeof component === 'string' ? easycom : component
}
