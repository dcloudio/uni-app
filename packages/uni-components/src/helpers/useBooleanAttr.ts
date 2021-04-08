import { isString } from '@vue/shared'
export function useBooleanAttr(
  props: Record<string, any>,
  keys: string | string[]
) {
  if (isString(keys)) {
    keys = [keys]
  }
  return keys.reduce<Record<string, boolean>>((res, key) => {
    if (props[key]) {
      res[key] = true
    }
    return res
  }, Object.create(null))
}
