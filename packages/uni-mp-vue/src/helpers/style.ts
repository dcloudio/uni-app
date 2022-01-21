import { isString } from '@vue/shared'
import { normalizeStyle, stringifyStyle as stringify } from '@vue/shared'
export function stringifyStyle(value: unknown) {
  if (isString(value)) {
    return value
  }
  return stringify(normalizeStyle(value))
}
