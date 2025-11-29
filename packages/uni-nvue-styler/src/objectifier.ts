import {
  type Container,
  type Declaration,
  type Document,
  type Message,
  type Node,
  type Root,
  Warning,
} from 'postcss'
import { extend, hasOwn } from '@vue/shared'
import { COMBINATORS_RE } from './utils'

interface ObjectifierOptions {
  trim: boolean
  parseMessages: Message[]
  visitor?: (
    node: Declaration,
    context: ObjectifierContext
  ) => { name: string; value: string } | false
}
export interface ObjectifierContext {
  'FONT-FACE': Record<string, unknown>[]
  TRANSITION: Record<string, Record<string, unknown>>
  messages: Message[]
  warn: (node: Node, message: string) => void
}

export function objectifier(
  node: Root | Document | Container | null,
  options: ObjectifierOptions
) {
  return objectifierWithMessages(node, options).obj
}

export function objectifierWithMessages(
  node: Root | Document | Container | null,
  options: ObjectifierOptions
) {
  if (!node) {
    return { obj: {}, messages: [] }
  }
  const parseMessages = options.parseMessages || []
  function isInParseMessages(node: Node) {
    return parseMessages.some((message) => message.node.source === node.source)
  }
  const context: ObjectifierContext = {
    'FONT-FACE': [],
    TRANSITION: {},
    messages: [],
    warn(node, message) {
      // 如果parse阶段已经有该节点的错误，则不再添加
      if (!isInParseMessages(node)) {
        context.messages.push(new Warning(message, { node }))
      }
    },
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
  return { obj: result, messages: context.messages }
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
      let name = child.prop
      let value = child.value
      if (options.visitor) {
        const result = options.visitor(child, context)
        if (!result) {
          return
        }
        name = result.name
        value = result.value
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
  let curSelector = res[2]
  // 恢复 ::part(xxx)
  if (parentSelector.includes('-_part__')) {
    parentSelector = parentSelector.replace(/-_part__(.+)_-/g, '::part($1)')
  }
  if (curSelector.includes('-_part__')) {
    curSelector = curSelector.replace(/-_part__(.+)_-/g, '::part($1)')
  }
  // .a.b => a.b
  const dotIndex = curSelector.lastIndexOf('.')
  if (dotIndex > 0) {
    parentSelector += curSelector.substring(0, dotIndex)
    curSelector = curSelector.substring(dotIndex)
  }
  const curSelectorIsClass = curSelector.indexOf('.') === 0
  if (curSelectorIsClass) {
    curSelector = curSelector.substring(1)
  }

  const pseudoElementIndex = curSelector.indexOf('::')
  if (pseudoElementIndex > -1) {
    // TODO 目前仅支持::part作为最后个Selector Component使用
    // ::part(xxx).xxx 是否支持？
    // ::part(xxx):active 保留原样？
    const partSelector = curSelector.slice(pseudoElementIndex)
    const baseSelector =
      (curSelectorIsClass ? '.' : '') +
      curSelector.substring(0, pseudoElementIndex)
    curSelector = partSelector
    parentSelector += baseSelector
  } else {
    const pseudoIndex = curSelector.indexOf(':')
    if (pseudoIndex > -1) {
      const pseudoClass = curSelector.slice(pseudoIndex)
      curSelector = curSelector.slice(0, pseudoIndex)
      Object.keys(body).forEach(function (name) {
        body[name + pseudoClass] = body[name]
        delete body[name]
      })
    }
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
