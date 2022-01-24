import { camelize, hyphenate, Normalize } from '../utils'
import { normalizeMap } from './map'

export const normalizeTransitionProperty: Normalize = (v) => {
  v = (v || '').toString()
  v = v
    .split(/\s*,\s*/)
    .map(camelize)
    .join(',')

  if (v.split(/\s*,\s*/).every((p) => !!normalizeMap[p])) {
    return { value: v }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return (
        'ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenate(k) +
        '` (only css property is valid)'
      )
    },
  }
}
