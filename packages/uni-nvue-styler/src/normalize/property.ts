import { camelize } from '@vue/shared'
import { type Normalize, supportedEnumReason } from '../utils'
import { getNormalizeMap } from './map'
// 暂时无用，已经移动到 map 中
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
