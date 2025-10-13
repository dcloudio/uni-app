import type { Container, Document, Root } from 'postcss'
import { extend, hasOwn } from '@vue/shared'
import { COMBINATORS_RE } from './utils'
import type { DOM2_APP_PLATFORM, DOM2_APP_TARGET } from './dom2/types'
import type { PropertyProcessor } from './dom2/processors'
import { createDom2PropertyProcessors } from './dom2/propertyMap'

interface ObjectifierOptions {
  trim: boolean
  dom2?: {
    platform: DOM2_APP_PLATFORM
    target: DOM2_APP_TARGET
  }
}
interface ObjectifierContext {
  'FONT-FACE': Record<string, unknown>[]
  TRANSITION: Record<string, Record<string, unknown>>
  dom2?: {
    propertyProcessors: Record<string, PropertyProcessor>
  }
}

export function objectifier(
  node: Root | Document | Container | null,
  options: ObjectifierOptions
) {
  if (!node) {
    return {}
  }
  const context: ObjectifierContext = {
    'FONT-FACE': [],
    TRANSITION: {},
  }
  if (options.dom2) {
    context.dom2 = {
      propertyProcessors: createDom2PropertyProcessors(
        options.dom2.platform,
        options.dom2.target
      ),
    }
  }
  const result = transform(node, context, options)
  if (options.trim) {
    trimObj(result)
  }
  if (context['FONT-FACE'].length) {
    result['@FONT-FACE'] = context['FONT-FACE']
  }
  if (Object.keys(context.TRANSITION).length) {
    result['@TRANSITION'] = context.TRANSITION
  }
  return result
}

function trimObj(obj: Record<string, any>) {
  Object.keys(obj).forEach((name) => {
    const value = obj[name]
    if (Object.keys(value).length === 1 && hasOwn(value, '')) {
      obj[name] = value['']
    }
  })
}

function transform(
  node: Root | Document | Container,
  context: ObjectifierContext,
  options: ObjectifierOptions
) {
  const result: Record<string, Record<string, unknown> | unknown> = {}
  node.each((child) => {
    if (child.type === 'atrule') {
      const body = transform(child, context, options)
      if (child.name === 'font-face') {
        const fontFamily = body.fontFamily as string
        if (fontFamily && '"\''.indexOf(fontFamily[0]) > -1) {
          body.fontFamily = fontFamily.slice(1, fontFamily.length - 1)
        }
        context['FONT-FACE'].push(body)
      }
    } else if (child.type === 'rule') {
      const body = transform(child, context, options)
      child.selectors.forEach((selector) => {
        transformSelector(selector, body, result, context)
      })
    } else if (child.type === 'decl') {
      const name = context.dom2
        ? (child as any).__originalProp || child.prop
        : child.prop
      let value = child.value
      if (context.dom2) {
        const processor = context.dom2.propertyProcessors[name]
        if (processor) {
          const valueResult = processor(value, name)
          if (valueResult.error) {
            console.error(valueResult.error)
          } else {
            value = {
              toJSON() {
                return valueResult.valueCode
              },
            } as unknown as string
          }
        } else {
          console.error(`Unsupported property: ${name}`)
        }
      }
      if (child.important) {
        result['!' + name] = value
        // !important的值域优先级高，故删除非!important的值域
        delete result[name]
      } else {
        if (!hasOwn(result, '!' + name)) {
          result[name] = value
        }
      }
    }
  })
  return result
}

function transformSelector(
  selector: string,
  body: Record<string, unknown>,
  result: Record<string, unknown | Record<string, unknown>>,
  context: ObjectifierContext
) {
  const res = selector.match(COMBINATORS_RE)
  if (!res) {
    return
  }
  let parentSelector = res[1]
  let curSelector = res[2].substring(1)
  // .a.b => a.b
  const dotIndex = curSelector.indexOf('.')
  if (dotIndex > -1) {
    parentSelector += curSelector.substring(dotIndex)
    curSelector = curSelector.substring(0, dotIndex)
  }

  const pseudoIndex = curSelector.indexOf(':')
  if (pseudoIndex > -1) {
    const pseudoClass = curSelector.slice(pseudoIndex)
    curSelector = curSelector.slice(0, pseudoIndex)
    Object.keys(body).forEach(function (name) {
      body[name + pseudoClass] = body[name]
      delete body[name]
    })
  }
  transition(curSelector, body, context)
  if (!Object.keys(body).length) {
    return
  }
  result = (result[curSelector] || (result[curSelector] = {})) as Record<
    string,
    unknown
  >

  if (result[parentSelector]) {
    // clone
    result[parentSelector] = processImportant(
      extend({}, result[parentSelector], body)
    )
  } else {
    result[parentSelector] = body
  }
}

/**
 * 处理 important 属性，如果某个属性是 important，需要将非 important 的该属性移除掉
 * @param body
 */
function processImportant(body: Record<string, unknown>) {
  Object.keys(body).forEach((name) => {
    if (name.startsWith('!')) {
      delete body[name.substring(1)]
    }
  })
  return body
}

function transition(
  className: string,
  body: Record<string, unknown>,
  { TRANSITION }: ObjectifierContext
) {
  Object.keys(body).forEach((prop) => {
    if (prop.indexOf('transition') === 0 && prop !== 'transition') {
      const realProp = prop.replace('transition', '')
      TRANSITION[className] = TRANSITION[className] || {}
      TRANSITION[className][realProp[0].toLowerCase() + realProp.slice(1)] =
        body[prop]
    }
  })
}
