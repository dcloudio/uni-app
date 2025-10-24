import { type Message, Warning } from 'postcss'
import {
  DOM2_APP_TARGET,
  type Dom2StaticStylePropertyValue,
  type ParseDom2StaticStyleOptions,
} from './types'
import { parseStaticStyleDeclarations } from '../parseSync'
import { createDom2PropertyProcessors } from './processors'
import {
  defineStyleVariableProcessor,
  setStyleVariableProcessor,
} from './processors'
import { camelize, capitalize, extend } from '../shared'
import { shorthand } from './shorthand'
import { genCPPEnumCode } from './processors/enum'

export function parseDom2StaticStyle(
  input: string,
  options: ParseDom2StaticStyleOptions
): {
  obj: Record<string, Dom2StaticStylePropertyValue>
  code?: string
  messages: Message[]
} {
  const result: Record<string, Dom2StaticStylePropertyValue> = {}

  const { decls, messages } = parseStaticStyleDeclarations(
    input,
    extend(
      {
        type: 'uvue',
        dom2: {
          platform: options.platform,
          target: options.target,
        },
      },
      options
    )
  )

  // 根据 messages 中的信息，移除无效的 decls
  if (decls.length) {
    messages.forEach((m) => {
      if (m.type === 'warning' || m.type === 'error') {
        const index = decls.findIndex((d) => d === m.node)
        if (index !== -1) {
          decls.splice(index, 1)
        }
      }
    })
  }
  shorthand(decls, options)

  // 以下逻辑执行，很多依赖前置 parseStaticStyleDeclarations 的处理
  // 需要确保有效的属性解析声明，否则会导致错误，
  // 1. 进入到下边的属性单位（如 px 等），必须是都已经支持的
  // 2. 进入到下边的属性名和值，必须是都已经支持的
  const processors = createDom2PropertyProcessors(
    options.platform,
    options.target
  )

  for (const declaration of decls) {
    // @ts-expect-error 上一步 parseStaticStyleDeclarations 中需要把 prop 给驼峰化，单独存储 __originalProp
    const propertyName = declaration.__originalProp || declaration.prop

    // 判断key是否是定义的css变量
    if (propertyName.startsWith('--')) {
      const processed = defineStyleVariableProcessor(
        declaration.value,
        propertyName
      )
      if (processed.error) {
        messages.push(new Warning(processed.error, { node: declaration }))
      } else {
        result[propertyName] = processed
      }
    }
    // 判断value是否是css变量
    else if (
      typeof declaration.value === 'string' &&
      declaration.value.includes('var(')
    ) {
      if (!processors[propertyName]) {
        continue
      }
      const processed = setStyleVariableProcessor(
        declaration.value,
        propertyName
      )
      if (processed.error) {
        messages.push(new Warning(processed.error, { node: declaration }))
      } else {
        result[propertyName] = processed
      }
    } else {
      const processor = processors[propertyName]
      if (processor) {
        const processed = processor(declaration.value, propertyName)
        if (processed.error) {
          messages.push(new Warning(processed.error, { node: declaration }))
        } else {
          result[propertyName] = processed
        }
      }
    }
  }
  return {
    obj: result,
    messages,
    code: options.genCode ? genCode(result, options.target) : undefined,
  }
}

function genCode(
  obj: Record<string, Dom2StaticStylePropertyValue>,
  target: DOM2_APP_TARGET
): string {
  if (
    target === DOM2_APP_TARGET.DOM_C ||
    target === DOM2_APP_TARGET.NV_C ||
    target === DOM2_APP_TARGET.TXT_C
  ) {
    return `{${Object.entries(obj)
      .map(
        ([key, value]) =>
          `[${genCPPEnumCode(
            'UniCSSPropertyID',
            capitalize(camelize(key))
          )}]: ${value.valueCode}`
      )
      .join(', ')}}`
  }
  return ''
}
