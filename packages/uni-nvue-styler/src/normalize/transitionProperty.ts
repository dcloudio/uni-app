import { camelize } from '@vue/shared'
import { Normalize, supportedValueWithTipsReason } from '../utils'
import { getNormalizeMap } from './map'

export const normalizeTransitionProperty: Normalize = (v, options) => {
  v = (v || '').toString()
  v = v
    .split(/\s*,\s*/)
    .map(camelize)
    .join(',')

  if (v.split(/\s*,\s*/).every((p) => !!getNormalizeMap(options)[p])) {
    return { value: v }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return supportedValueWithTipsReason(k, v, '(only css property is valid)')
    },
  }
}
