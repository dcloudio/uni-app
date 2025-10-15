import type { PropertyProcessor } from './processors'
import {
  createSetStyleEnumValueProcessor,
  createSetStyleNativeColorValueProcessor,
  createSetStyleNumberValueProcessor,
  createSetStyleUnitValueProcessor,
} from './processors'
import {
  type AppCssJson,
  type DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
} from './types'
import appCssJson from '../../lib/dom2/app-css.json'

const processorMapCache = new Map<string, Record<string, PropertyProcessor>>()

function getCacheKey(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
): string {
  return `${platform}:${target}`
}

const COLOR_TYPES = ['UniNativeColor', 'UniNativeBorderColor']

function isColorType(propertyType?: string) {
  return propertyType && COLOR_TYPES.includes(propertyType)
}

export function createDom2PropertyProcessors(
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
    // 解析 css 文件样式表时，应该传入ALL，不需要根据target获取setter
    const setter =
      target === DOM2_APP_TARGET.ALL
        ? 'setStyle'
        : getPlatformConfig(propertyName, platform, target)?.setter
    if (setter) {
      const language = target === DOM2_APP_TARGET.ALL ? 'cpp' : 'ts'
      const propertyConfig = (appCssJson as AppCssJson)[propertyName]
      // 使用根节点的type
      const propertyType = propertyConfig.type
      if (propertyType === 'UniCSSUnitValue') {
        processorMap[propertyName] = createSetStyleUnitValueProcessor(
          setter,
          language
        )
      } else if (isColorType(propertyType)) {
        processorMap[propertyName] =
          createSetStyleNativeColorValueProcessor(setter)
      } else if (propertyType === 'number') {
        // 对于数字类型的属性（如flex-grow、flex-shrink、opacity、z-index），
        // 创建一个数字值处理器，直接传递数值
        processorMap[propertyName] = createSetStyleNumberValueProcessor(setter)
      } else {
        processorMap[propertyName] = createSetStyleEnumValueProcessor(
          setter,
          language
        )
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
  // if(target === DOM2_APP_TARGET.ALL){
  //   return platformConfig
  // }

  return platformConfig[target] || null
}

export function clearProcessorsCache() {
  processorMapCache.clear()
}
