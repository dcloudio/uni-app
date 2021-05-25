import { isString } from '@vue/shared'

export function resolveEasycom(component: unknown, easycom: unknown) {
  return isString(component) ? easycom : component
}
