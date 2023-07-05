import {
  Normalize,
  supportedPropertyReason,
  getSupportedPlatforms,
  UniPlatform,
} from '../utils'

export function normalizePlatform(
  normalize: Normalize,
  uniPlatform: UniPlatform | undefined
): Normalize {
  return (v, options) => {
    const currentPlatform = options.platform!
    const supportedPlatforms = getSupportedPlatforms(uniPlatform)
    // TODO 未跨平台支持的属性特殊提示
    if (!supportedPlatforms.includes(currentPlatform)) {
      return {
        value: null,
        reason(k, v, result) {
          return supportedPropertyReason(k)
        },
      }
    }
    return normalize(v, options)
  }
}
