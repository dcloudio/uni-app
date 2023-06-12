import { isFunction } from '@vue/shared'
import { Normalize } from '../utils'
import { normalizeLength } from './length'

export const normalizeShorthandLength: Normalize = (v, options) => {
  v = (v || '').toString()
  let value: unknown[] | null = []
  let reason: unknown[] = []
  const results = v.split(/\s+/).map((v) => normalizeLength(v, options))
  for (let i = 0; i < results.length; ++i) {
    const res = results[i]
    if (res.value === null) {
      return res
    }
    value.push(res.value)
    reason.push(res.reason)
  }

  return {
    value: value.join(' '),
    reason: function (k, v, result) {
      return reason
        .map(function (res) {
          if (isFunction(res)) {
            return res(k, v, result)
          }
        })
        .join('\n')
    },
  }
}
