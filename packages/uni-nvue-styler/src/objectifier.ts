import { AtRule, Container, Root, Document } from 'postcss'
import { extend, hasOwn, isArray } from './utils'

interface ObjectifierContext {
  TRANSITION: Record<string, Record<string, string | number>>
}

export function objectifier(
  node: Root | Document | Container,
  context: ObjectifierContext = { TRANSITION: {} }
) {
  let name: string
  const result: Record<string, Record<string, unknown> | unknown> = {}
  node.each((child) => {
    if (child.type === 'atrule') {
      name = '@' + child.name
      if (child.params) name += ' ' + child.params
      if (!hasOwn(result, name)) {
        result[name] = atRule(child)
      } else if (isArray(result[name])) {
        ;(result[name] as unknown[]).push(atRule(child))
      } else {
        result[name] = [result[name], atRule(child)]
      }
    } else if (child.type === 'rule') {
      const body = objectifier(child, context)
      child.selectors.forEach((selector) => {
        const className = selector.slice(1)
        if (result[className]) {
          // clone
          result[className] = extend({}, result[className], body)
        } else {
          result[className] = body
        }
        transition(body, context)
      })
    } else if (child.type === 'decl') {
      name = child.prop
      const value = child.value
      if (!hasOwn(result, name)) {
        result[name] = value
      } else if (isArray(result[name])) {
        ;(result[name] as unknown[]).push(value)
      } else {
        result[name] = [result[name], value]
      }
    }
  })
  return result
}

function transition(
  body: Record<string, string | number>,
  context: ObjectifierContext
) {}

function atRule(node: AtRule) {}
