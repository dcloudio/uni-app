import { type DOM2_APP_PLATFORM, DOM2_APP_TARGET } from '../types'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  getAppCssJson,
} from './utils'
import { createSetStyleUnitValueProcessor } from './unit'
import { createGenEnumCode, createSetStyleEnumValueProcessor } from './enum'
import { createSetStyleNativeColorValueProcessor, isColorType } from './color'
import { createSetStyleNumberValueProcessor, isNumberType } from './number'
import { createSetStyleStringValueProcessor, isStringType } from './string'
import {
  createSetStyleBoxShadowValueProcessor,
  isBoxShadowType,
} from './boxShadow'
import {
  createSetStyleBorderColorsValueProcessor,
  isBorderColorsType,
} from './borderColor'
import {
  createSetStyleBorderStylesValueProcessor,
  isBorderStylesType,
} from './borderStyle'
import {
  createSetStyleTextShadowValueProcessor,
  isTextShadowType,
} from './textShadow'

export type { PropertyProcessor } from './utils'
export { createSetStyleNativeColorValueProcessor } from './color'
export { createSetStyleEnumValueProcessor } from './enum'
export { createSetStyleNumberValueProcessor } from './number'
export { createSetStyleStringValueProcessor } from './string'
export { createSetStyleUnitValueProcessor } from './unit'

const processorMapCache = new Map<string, Record<string, PropertyProcessor>>()

function getCacheKey(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
): string {
  return `${platform}:${target}`
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
  const allProperties = Object.keys(getAppCssJson())
  const language = target === DOM2_APP_TARGET.ALL ? 'cpp' : 'ts'

  allProperties.forEach((propertyName) => {
    // 解析 css 文件样式表时，应该传入ALL，不需要根据target获取setter
    const targetConfig =
      target === DOM2_APP_TARGET.ALL
        ? {
            setter: 'setStyle',
          }
        : getTargetConfig(propertyName, platform, target)
    if (targetConfig) {
      const setter = targetConfig.setter
      const propertyType =
        targetConfig.type || getAppCssJson()[propertyName].type
      if (typeof propertyType === 'string') {
        const processor = createStyleValueProcessor(propertyType, setter)
        if (processor) {
          processorMap[propertyName] = processor
        }
      } else if (Array.isArray(propertyType)) {
        const processor = createCombinedStyleValueProcessor(
          propertyType,
          setter
        )
        if (processor) {
          processorMap[propertyName] = processor
        }
      }
    }
  })

  processorMapCache.set(cacheKey, processorMap)

  return processorMap

  function createCombinedStyleValueProcessor(
    propertyTypes: string[],
    setter: string
  ): PropertyProcessor | undefined {
    const processors = propertyTypes
      .map((type) => createStyleValueProcessor(type, setter))
      .filter(Boolean) as PropertyProcessor[]
    if (processors.length === 0) {
      return undefined
    }
    if (processors.length === 1) {
      return processors[0]
    }
    // 目前联合类型，一般是枚举类型联合一个基础类型或者带单位类型
    let enumProcessor: PropertyProcessor | undefined
    let baseProcessor: PropertyProcessor | undefined
    for (const processor of processors) {
      if (processor.type === PropertyProcessorType.Enum) {
        enumProcessor = processor
      } else if (
        // 目前仅支持这两种联合
        processor.type === PropertyProcessorType.Unit ||
        processor.type === PropertyProcessorType.Number
      ) {
        baseProcessor = processor
      }
    }
    if (!enumProcessor || !baseProcessor) {
      throw new Error(`Unsupported property type: ${propertyTypes.join(', ')}`)
    }
    let numberProcessor: PropertyProcessor | undefined
    let unitProcessor: PropertyProcessor | undefined
    if (baseProcessor.type === PropertyProcessorType.Number) {
      numberProcessor = createSetStyleNumberValueProcessor(setter)
    } else if (baseProcessor.type === PropertyProcessorType.Unit) {
      unitProcessor = createSetStyleUnitValueProcessor(setter, language)
    }
    return createPropertyProcessor((value, propertyName) => {
      if (numberProcessor) {
        if (/^\d+$/.test(String(value))) {
          return numberProcessor(value, propertyName)
        }
      } else if (unitProcessor) {
        const result = unitProcessor(value, propertyName)
        if (!result.error) {
          return result
        }
      }
      return enumProcessor(value, propertyName)
    }, PropertyProcessorType.Combined)
  }

  function createStyleValueProcessor(
    propertyType: string,
    setter: string
  ): PropertyProcessor | undefined {
    if (propertyType === 'UniCSSUnitValue') {
      return createSetStyleUnitValueProcessor(setter, language)
    } else if (isColorType(propertyType)) {
      return createSetStyleNativeColorValueProcessor(setter)
    } else if (isNumberType(propertyType)) {
      // 对于数字类型的属性（如flex-grow、flex-shrink、opacity、z-index），
      // 创建一个数字值处理器，直接传递数值
      return createSetStyleNumberValueProcessor(setter)
    } else if (isStringType(propertyType)) {
      return createSetStyleStringValueProcessor(setter)
    } else if (isBorderColorsType(propertyType)) {
      return createSetStyleBorderColorsValueProcessor(setter)
    } else if (isBorderStylesType(propertyType)) {
      return createSetStyleBorderStylesValueProcessor(setter, processorMap)
    } else if (isBoxShadowType(propertyType)) {
      return createSetStyleBoxShadowValueProcessor(setter)
    } else if (isTextShadowType(propertyType)) {
      return createSetStyleTextShadowValueProcessor(setter)
    } else if (propertyType) {
      return createSetStyleEnumValueProcessor(
        setter,
        createGenEnumCode(propertyType, language, platform, target)
      )
    }
  }
}

function getTargetConfig(
  propertyName: string,
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  const property = getAppCssJson()[propertyName]
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
