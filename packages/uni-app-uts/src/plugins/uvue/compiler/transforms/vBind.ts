import { DirectiveTransform } from '../transform'
import {
  createObjectProperty,
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
} from '@vue/compiler-core'
import { createCompilerError, ErrorCodes } from '../errors'
import { camelize } from '@vue/shared'
import { CAMELIZE } from '@vue/compiler-core'
import { OBJECT_EXP, objectStringToMapString } from '../utils'
import { isString } from '@vue/shared'

// v-bind without arg is handled directly in ./transformElements.ts due to it affecting
// codegen for the entire props object. This transform here is only for v-bind
// *with* args.
export const transformBind: DirectiveTransform = (dir, _node, context) => {
  const { exp, modifiers, loc } = dir
  const arg = dir.arg!

  if (arg.type !== NodeTypes.SIMPLE_EXPRESSION) {
    arg.children.unshift(`(`)
    arg.children.push(`) || ""`)
  } else if (!arg.isStatic) {
    arg.content = `${arg.content} !== null ? ${arg.content} : ""`
  }

  // .sync is replaced by v-model:arg
  if (modifiers.includes('camel')) {
    if (arg.type === NodeTypes.SIMPLE_EXPRESSION) {
      if (arg.isStatic) {
        arg.content = camelize(arg.content)
      } else {
        arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`
      }
    } else {
      arg.children.unshift(`${context.helperString(CAMELIZE)}(`)
      arg.children.push(`)`)
    }
  }

  if (!false) {
    if (modifiers.includes('prop')) {
      injectPrefix(arg, '.')
    }
    if (modifiers.includes('attr')) {
      injectPrefix(arg, '^')
    }
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

  if ((exp as any).content && OBJECT_EXP.test((exp as any).content)) {
    ;(exp as any).content = objectStringToMapString((exp as any).content)
  } else if ((exp as any).children) {
    // {'opacity': count > 0.3 ? 1: count * 3, 'color': 'red'} to map
    // TODO: 考虑更多边缘情况
    if (
      isString((exp as any).children[0]) &&
      (exp as any).children[0].startsWith('{') &&
      isString((exp as any).children[(exp as any).children.length - 1]) &&
      (exp as any).children[(exp as any).children.length - 1].endsWith('}')
    ) {
      let str = ''
      ;(exp as any).children.forEach(
        (child: ExpressionNode | string, index: number) => {
          if (isString(child)) {
            str += child
          } else {
            str += (child as any).content
          }
        }
      )
      ;(exp as any).children = [str]
    }
    ;(exp as any).children.forEach(
      (child: ExpressionNode | string, index: number) => {
        if (isString(child) && OBJECT_EXP.test(child)) {
          ;(exp as any).children[index] = objectStringToMapString(child)
        }
      }
    )
  }

  return {
    props: [createObjectProperty(arg, exp)],
  }
}

const injectPrefix = (arg: ExpressionNode, prefix: string) => {
  if (arg.type === NodeTypes.SIMPLE_EXPRESSION) {
    if (arg.isStatic) {
      arg.content = prefix + arg.content
    } else {
      arg.content = `\`${prefix}\${${arg.content}}\``
    }
  } else {
    arg.children.unshift(`'${prefix}' + (`)
    arg.children.push(`)`)
  }
}
