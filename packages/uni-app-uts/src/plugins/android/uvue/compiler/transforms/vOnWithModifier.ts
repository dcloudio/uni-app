import { capitalize, makeMap } from '@vue/shared'
import {
  type ExpressionNode,
  type SourceLocation,
  createCallExpression,
  createCompoundExpression,
  createObjectProperty,
  createSimpleExpression,
  isStaticExp,
} from '@vue/compiler-core'
import { transformOn as baseTransform } from './vOn'
import { V_ON_WITH_MODIFIERS } from '../runtimeHelpers'
import type { DirectiveTransform, TransformContext } from '../transform'
import { createCompilerError } from '../errors'

const isEventOptionModifier = /*#__PURE__*/ makeMap(`passive,once,capture`)
const isNonKeyModifier = /*#__PURE__*/ makeMap(
  // event propagation management
  `stop,prevent,self,` +
    // system modifiers + exact
    `ctrl,shift,alt,meta,exact,` +
    // mouse
    `middle`
)
// left & right could be mouse or key modifiers based on event type
const maybeKeyModifier = /*#__PURE__*/ makeMap('left,right')

const resolveModifiers = (
  key: ExpressionNode,
  modifiers: string[],
  context: TransformContext,
  loc: SourceLocation
) => {
  const keyModifiers: string[] = []
  const nonKeyModifiers: string[] = []
  const eventOptionModifiers: string[] = []

  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i]

    if (isEventOptionModifier(modifier)) {
      // eventOptionModifiers: modifiers for addEventListener() options,
      // e.g. .passive & .capture
      if (modifier !== 'once') {
        onModifierWarn(modifier, context, loc)
      } else {
        eventOptionModifiers.push(modifier)
      }
    } else {
      // runtimeModifiers: modifiers that needs runtime guards
      if (maybeKeyModifier(modifier)) {
        onModifierWarn(modifier, context, loc)
      } else {
        if (isNonKeyModifier(modifier)) {
          if (modifier !== 'stop' && modifier !== 'prevent') {
            onModifierWarn(modifier, context, loc)
          } else {
            nonKeyModifiers.push(modifier)
          }
        } else {
          onModifierWarn(modifier, context, loc)
        }
      }
    }
  }

  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers,
  }
}

export const transformOn: DirectiveTransform = (dir, node, context) => {
  return baseTransform(dir, node, context, (baseResult) => {
    const { modifiers } = dir
    if (!modifiers.length) return baseResult

    let { key, value: handlerExp } = baseResult.props[0]
    const { nonKeyModifiers, eventOptionModifiers } = resolveModifiers(
      key,
      modifiers,
      context,
      dir.loc
    )

    if (nonKeyModifiers.length) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
        handlerExp,
        JSON.stringify(nonKeyModifiers),
      ])
    }

    if (eventOptionModifiers.length) {
      const modifierPostfix = eventOptionModifiers.map(capitalize).join('')
      key = isStaticExp(key)
        ? createSimpleExpression(`${key.content}${modifierPostfix}`, true)
        : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`])
    }

    return {
      props: [createObjectProperty(key, handlerExp)],
    }
  })
}

function onModifierWarn(
  modifier: string,
  context: TransformContext,
  loc: SourceLocation
) {
  context.onWarn(
    createCompilerError(100, loc, {
      100: '.' + modifier + ' is not supported',
    })
  )
}
