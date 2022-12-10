import { isString } from '@vue/shared'
export { isPlainObject, hasOwn, extend, capitalize } from '@vue/shared'
export function resolveEasycom(component: unknown, easycom: unknown) {
  return isString(component) ? easycom : component
}
