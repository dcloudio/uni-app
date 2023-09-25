import {
  defaultValueReason,
  getSupportedPlatforms,
  Normalize,
  supportedEnumReason,
  PropertyValue,
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
  return (v, { platform }) => {
    const property = items.find((item) => item.name === v)
    const supportedEnum = items
      .filter((item) => {
        const supportedPlatforms = getSupportedPlatforms(item.uniPlatform)
        return supportedPlatforms.includes(platform!)
      })
      .map((item) => item.name)
    if (property) {
      const supportedPlatforms = getSupportedPlatforms(property.uniPlatform)
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
