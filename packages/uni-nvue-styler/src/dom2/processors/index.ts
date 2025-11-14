import {
  type DOM2_APP_LANGUAGE,
  type DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
} from '../types'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  getAppCssJson,
  getTargetConfig,
} from './utils'
import { createSetStyleUnitValueProcessor, isUnitType } from './unit'
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
import {
  createSetStyleTransformValueProcessor,
  isTransformType,
} from './transform'
import {
  createSetStyleTransformOriginValueProcessor,
  isTransformOriginType,
} from './transformOrigin'
import {
  createSetStyleBorderWidthValueProcessor,
  isBorderWidthType,
} from './borderWidth'
import {
  createSetStyleBackgroundImageValueProcessor,
  isBackgroundImageType,
} from './backgroundImage'

export type { PropertyProcessor } from './utils'
export { createSetStyleNativeColorValueProcessor } from './color'
export { createSetStyleEnumValueProcessor } from './enum'
export { createSetStyleNumberValueProcessor } from './number'
export { createSetStyleStringValueProcessor } from './string'
export { createSetStyleUnitValueProcessor } from './unit'

const processorMapCache = new Map<string, Record<string, PropertyProcessor>>()

function getCacheKey(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET,
  language: DOM2_APP_LANGUAGE
): string {
  return `${platform}:${target}:${language}`
}

export function createDom2PropertyProcessors(
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET,
  language: DOM2_APP_LANGUAGE
) {
  const cacheKey = getCacheKey(platform, target, language)

  if (processorMapCache.has(cacheKey)) {
    return processorMapCache.get(cacheKey)!
  }
  const processorMap: Record<string, PropertyProcessor> = {}
  // 从JSON配置中获取所有支持的属性
  const allProperties = Object.keys(getAppCssJson())

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
    const processorSet = new Set<PropertyProcessor>()
    propertyTypes.forEach((type) => {
      const processor = createStyleValueProcessor(type, setter)
      if (processor) {
        processorSet.add(processor)
      }
    })
    const processors = Array.from(processorSet)
    if (processors.length === 0) {
      return undefined
    }
    if (processors.length === 1) {
      return processors[0]
    }
    return createPropertyProcessor((value, propertyName) => {
      for (const processor of processors) {
        const result = processor(value, propertyName)
        if (!result.error) {
          return result
        }
      }
      return createValueProcessorError(value, propertyName)
    }, PropertyProcessorType.Combined)
  }

  function createStyleValueProcessor(
    propertyType: string,
    setter: string
  ): PropertyProcessor | undefined {
    if (isUnitType(propertyType)) {
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
    } else if (isBorderWidthType(propertyType)) {
      return createSetStyleBorderWidthValueProcessor(setter, language)
    } else if (isBoxShadowType(propertyType)) {
      return createSetStyleBoxShadowValueProcessor(setter)
    } else if (isTextShadowType(propertyType)) {
      return createSetStyleTextShadowValueProcessor(setter)
    } else if (isTransformType(propertyType)) {
      return createSetStyleTransformValueProcessor(setter, language)
    } else if (isTransformOriginType(propertyType)) {
      return createSetStyleTransformOriginValueProcessor(setter, language)
    } else if (isBackgroundImageType(propertyType)) {
      return createSetStyleBackgroundImageValueProcessor(setter, language)
    } else if (propertyType) {
      return createSetStyleEnumValueProcessor(
        setter,
        createGenEnumCode(propertyType, language, platform, target)
      )
    }
  }
}

export function clearProcessorsCache() {
  processorMapCache.clear()
}
