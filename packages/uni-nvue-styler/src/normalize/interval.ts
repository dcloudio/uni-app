import { type Normalize, autofixedReason, supportedEnumReason } from '../utils'

function createNormalizeInterval(allowNegative: boolean): Normalize {
  const regexp = new RegExp(`^${allowNegative ? '-?' : ''}\\d*\\.?\\d+(ms|s)?$`)
  return (v, options) => {
    v = (v || 0).toString()
    let match, num

    if ((match = v.match(regexp))) {
      const uvue = options.type === 'uvue'
      if (uvue) {
        // uvue 需要单位
        if (match[1]) {
          return { value: v }
        }
      } else {
        num = parseFloat(match[0])
        if (!match[1]) {
          return { value: parseInt(num + '') }
        }
        if (match[1] === 's') {
          num *= 1000
        }
        return {
          value: parseInt(num + ''),
          reason(k, v, result) {
            return autofixedReason(v, result)
          },
        }
      }
    }

    return {
      value: null,
      reason(k, v, result) {
        return supportedEnumReason(k, v, ['number of seconds', 'milliseconds'])
      },
    }
  }
}

export const normalizeInterval = createNormalizeInterval(false)
export const normalizeTransitionDelay = createNormalizeInterval(true)
