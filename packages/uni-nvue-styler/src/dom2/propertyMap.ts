import type { PropertyProcessor } from './processors'
import {
  createSetStyleEnumValueProcessor,
  createSetStyleUnitValueProcessor,
} from './processors'
import type { AppCssJson, DOM2_APP_PLATFORM, DOM2_APP_TARGET } from './types'
import appCssJson from '../../lib/app-css.json'

const processorMapCache = new Map<string, Record<string, PropertyProcessor>>()

function getCacheKey(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
): string {
  return `${platform}:${target}`
}

export function createPropertyProcessors(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  const cacheKey = getCacheKey(platform, target)

  if (processorMapCache.has(cacheKey)) {
    return processorMapCache.get(cacheKey)!
  }
  const processorMap: Record<string, PropertyProcessor> = {}
  // 从JSON配置中获取所有支持的属性
  const allProperties = Object.keys(appCssJson as AppCssJson)
  allProperties.forEach((propertyName) => {
    const platformConfig = getPlatformConfig(propertyName, platform, target)
    if (platformConfig) {
      const setter = platformConfig.setter
      const propertyConfig = (appCssJson as AppCssJson)[propertyName]
      const propertyType = propertyConfig.type
      if (propertyType === 'UniCSSUnitType') {
        processorMap[propertyName] = createSetStyleUnitValueProcessor(setter)
      } else {
        processorMap[propertyName] = createSetStyleEnumValueProcessor(setter)
      }
    }
  })

  processorMapCache.set(cacheKey, processorMap)

  return processorMap
}

function getPlatformConfig(
  propertyName: string,
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  const property = (appCssJson as AppCssJson)[propertyName]
  if (!property || !property.uniPlatform) {
    return null
  }

  const specificPlatform = platform
  const generalPlatform = 'app'

  const platformConfig =
    property.uniPlatform[specificPlatform] ||
    property.uniPlatform[generalPlatform as DOM2_APP_PLATFORM]
  if (!platformConfig) {
    return null
  }

  return platformConfig[target] || null
}

export function clearProcessorsCache() {
  processorMapCache.clear()
}
