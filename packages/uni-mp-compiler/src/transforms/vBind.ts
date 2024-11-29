import { camelize } from '@vue/shared'
import {
  ErrorCodes,
  NodeTypes,
  createCompilerError,
  createObjectProperty,
  createSimpleExpression,
} from '@vue/compiler-core'
import type { DirectiveTransform } from '../transform'
import { MPErrorCodes, createMPCompilerError } from '../errors'

export const transformBind: DirectiveTransform = (dir, _node, context) => {
  const { exp, modifiers, loc } = dir
  const arg = dir.arg!

  if (arg.type !== NodeTypes.SIMPLE_EXPRESSION) {
    arg.children.unshift(`(`)
    arg.children.push(`) || ""`)
  } else if (!arg.isStatic) {
    arg.content = `${arg.content} || ""`
  }

  // .sync is replaced by v-model:arg
  if (modifiers.includes('camel')) {
    if (arg.type === NodeTypes.SIMPLE_EXPRESSION) {
      if (arg.isStatic) {
        arg.content = camelize(arg.content)
      } else {
        // arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`
      }
    } else {
      // arg.children.unshift(`${context.helperString(CAMELIZE)}(`)
      // arg.children.push(`)`)
    }
  }

  if (modifiers.includes('prop')) {
    context[context.isX ? 'onError' : 'onWarn'](
      createMPCompilerError(MPErrorCodes.X_V_BIND_MODIFIER_PROP, loc)
    )
  }
  if (modifiers.includes('attr')) {
    context[context.isX ? 'onError' : 'onWarn'](
      createMPCompilerError(MPErrorCodes.X_V_BIND_MODIFIER_ATTR, loc)
    )
  }

  if (
    !exp ||
    (exp.type === NodeTypes.SIMPLE_EXPRESSION && !exp.content.trim())
  ) {
    context.onError(createCompilerError(ErrorCodes.X_V_BIND_NO_EXPRESSION, loc))
    return {
      props: [createObjectProperty(arg, createSimpleExpression('', true, loc))],
    }
  }

  return {
    props: [createObjectProperty(arg, exp)],
  }
}
