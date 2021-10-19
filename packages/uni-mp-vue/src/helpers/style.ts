import { normalizeStyle, stringifyStyle as stringify } from '@vue/shared'
export function stringifyStyle(value: unknown) {
  return stringify(normalizeStyle(value))
}
