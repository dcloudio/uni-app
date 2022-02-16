import { Container, Root, Document } from 'postcss'
import { extend } from '@vue/shared'

interface ObjectifierContext {
  'FONT-FACE': Record<string, unknown>[]
  TRANSITION: Record<string, Record<string, unknown>>
}

export function objectifier(node: Root | Document | Container | null) {
  if (!node) {
    return {}
  }
  const context: ObjectifierContext = {
    'FONT-FACE': [],
    TRANSITION: {},
  }
  const result = transform(node, context)
  if (context['FONT-FACE'].length) {
    result['@FONT-FACE'] = context['FONT-FACE']
  }
  if (Object.keys(context.TRANSITION).length) {
    result['@TRANSITION'] = context.TRANSITION
  }
  return result
}

function transform(
  node: Root | Document | Container,
  context: ObjectifierContext
) {
  const result: Record<string, Record<string, unknown> | unknown> = {}
  node.each((child) => {
    if (child.type === 'atrule') {
      const body = transform(child, context)
      const fontFamily = body.fontFamily as string
      if (fontFamily && '"\''.indexOf(fontFamily[0]) > -1) {
        body.fontFamily = fontFamily.slice(1, fontFamily.length - 1)
      }
      context['FONT-FACE'].push(body)
    } else if (child.type === 'rule') {
      const body = transform(child, context)
      child.selectors.forEach((selector) => {
        transformSelector(selector, body, result, context)
      })
    } else if (child.type === 'decl') {
      result[child.prop] = child.value
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
  let className = selector.slice(1)
  let isCombinators = false
  const lastDotIndex = className.lastIndexOf('.')
  if (lastDotIndex > 0) {
    isCombinators = true
    className = className.substring(lastDotIndex + 1)
  }
  const pseudoIndex = className.indexOf(':')
  if (pseudoIndex > -1) {
    const pseudoClass = className.slice(pseudoIndex)
    className = className.slice(0, pseudoIndex)
    Object.keys(body).forEach(function (name) {
      body[name + pseudoClass] = body[name]
      delete body[name]
    })
  }
  transition(className, body, context)
  if (isCombinators) {
    className = '.' + className
    result = (result[className] || (result[className] = {})) as Record<
      string,
      unknown
    >
    className = selector.replace(className, '').trim()
  }
  if (result[className]) {
    // clone
    result[className] = extend({}, result[className], body)
  } else {
    result[className] = body
  }
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
