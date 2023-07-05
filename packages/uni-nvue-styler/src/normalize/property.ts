import { camelize } from '@vue/shared'
import { Normalize, supportedEnumReason } from '../utils'
import { getNormalizeMap } from './map'

export const normalizeProperty: Normalize = (v, options) => {
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
      return supportedEnumReason(k, v, ['css property'])
    },
  }
}
