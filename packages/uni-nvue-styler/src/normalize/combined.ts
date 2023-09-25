import { Normalize, normalizeReasons } from '../utils'

export function createCombinedNormalize(normalizes: Normalize[]): Normalize {
  return (v, options) => {
    const reasons: ReturnType<Normalize>['reason'][] = []
    for (let i = 0; i < normalizes.length; i++) {
      const result = normalizes[i](v, options)
      if (result.value !== null) {
        return result
      }
      if (result.reason) {
        reasons.push(result.reason)
      }
    }
    return {
      value: null,
      reason(k, v, result) {
        return normalizeReasons(
          reasons.map((reason) => reason!(k, v, result)),
          k,
          v
        ).join('\n')
      },
    }
  }
}
