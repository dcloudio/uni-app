import { type Declaration, type Message, Warning } from 'postcss'
import {
  DOM2_APP_TARGET,
  type Dom2StaticStylePropertyValue,
  type ParseDom2StaticStyleOptions,
} from './types'
import { parseStaticStyleDeclarations } from '../parseSync'
import { createDom2PropertyProcessors } from './processors'

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

  important(decls)

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
    const processor = processors[propertyName]
    if (processor) {
      let important = false
      if (declaration.important) {
        important = true
      }
      const processed = processor(declaration.value, propertyName)
      if (processed.error) {
        messages.push(new Warning(processed.error, { node: declaration }))
      } else {
        result[propertyName] = processed
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

/**
 * 处理 important 和 非 important 权重问题，最终保留权重高的 decl，直接操作原始 decls 数组
 *
 * @param decls
 */
function important(decls: Declaration[]) {
  for (let i = decls.length - 1; i >= 0; i--) {
    const decl = decls[i]
    const prop = decl.prop

    if (decl.important) {
      // 如果是 important，删除前面所有相同属性的声明
      for (let j = i - 1; j >= 0; j--) {
        const prevProp = decls[j].prop
        if (prevProp === prop) {
          decls.splice(j, 1)
          i--
        }
      }
    } else {
      // 如果不是 important，只删除前面相同属性的非 important 声明
      for (let j = i - 1; j >= 0; j--) {
        const prevProp = decls[j].prop
        if (prevProp === prop && !decls[j].important) {
          decls.splice(j, 1)
          i-- // 删除后需要调整当前索引
        }
      }
    }
  }
}
