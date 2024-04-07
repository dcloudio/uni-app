import type { Normalize } from '../utils'

export function normalizeShorthandProperty(normalize: Normalize): Normalize {
  return (v, options) => {
    v = (v || '').toString()
    const value: ReturnType<Normalize>['value'][] = []
    const reasons: ReturnType<Normalize>['reason'][] = []
    const results = v.split(/\s+/).map((v) => normalize(v, options))
    for (let i = 0; i < results.length; ++i) {
      const res = results[i]
      if (res.value === null) {
        return res
      }
      if (res.reason) {
        reasons.push(res.reason)
      }
      value.push(res.value)
    }
    return {
      value: value.length === 1 ? value[0] : value.join(' '),
      reason: function (k, v, result) {
        return reasons.map((reason) => reason!(k, v, result)).join('\n')
      },
    }
  }
}
