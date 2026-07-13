import {
  type Normalize,
  type PropertyValue,
  defaultValueReason,
  getSupportedPlatforms,
  supportedEnumReason,
} from '../utils'

export function createEnumNormalize(items: Array<string | number>): Normalize {
  return (v) => {
    const index = items.indexOf(v)
    if (index > 0) {
      return { value: v }
    }
    if (index === 0) {
      return {
        value: v,
        reason: function reason(k, v, result) {
          return defaultValueReason(k, v)
        },
      }
    }
    return {
      value: null,
      reason: function reason(k, v, result) {
        return supportedEnumReason(k, v, items)
      },
    }
  }
}

export function createEnumNormalizeWithPlatform(
  items: Array<PropertyValue>
): Normalize {
  return (v, { platform, dom2 }) => {
    const property = items.find((item) => item.name === v)
    const supportedEnum = items
      .filter((item) => {
        const supportedPlatforms = getSupportedPlatforms(
          item.uniPlatform,
          !!dom2
        )
        return supportedPlatforms.includes(platform!)
      })
      .map((item) => item.name)
    if (property) {
      const supportedPlatforms = getSupportedPlatforms(
        property.uniPlatform,
        !!dom2
      )
      // TODO 未跨平台支持的属性特殊提示
      if (!supportedPlatforms.includes(platform!)) {
        return {
          value: null,
          reason: function reason(k, v, result) {
            return supportedEnumReason(k, v, supportedEnum)
          },
        }
      }
      return { value: v }
    }
    return {
      value: null,
      reason: function reason(k, v, result) {
        return supportedEnumReason(k, v, supportedEnum)
      },
    }
  }
}
