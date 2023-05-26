import { DirectiveTransform } from '../transform'
import {
  createObjectProperty,
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  ConstantTypes,
} from '@vue/compiler-core'
import { createCompilerError, ErrorCodes } from '../errors'
import { camelize, isString } from '@vue/shared'
import { CAMELIZE } from '@vue/compiler-core'

const objectExp = /\{.*\}/g

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
    arg.content = `${arg.content} || ""`
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

  if ((exp as any).content && objectExp.test((exp as any).content)) {
    ;(exp as any).content = object2Map(exp)
  } else if ((exp as any).children) {
    ;(exp as any).children.forEach(
      (child: ExpressionNode | string, index: number) => {
        if (typeof child === 'string' && objectExp.test(child)) {
          ;(exp as any).children[index] = object2Map(child)
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

function object2Map(exp: ExpressionNode | string) {
  const content = isString(exp) ? exp : (exp as SimpleExpressionNode).content
  const matched = content.match(objectExp)![0]
  const keyValues = matched.replace(/\{|\}/g, '').split(',')
  let mapConstructor = 'new Map<string, any | null>(['

  keyValues.forEach((keyValue: string, index: number) => {
    const colonIndex = keyValue.indexOf(':')
    const key = needAddQuotes(exp, keyValue)
      ? `'${keyValue.substring(0, colonIndex)}'`
      : keyValue.substring(0, colonIndex)
    const value = keyValue.substring(colonIndex + 1)
    if (key && value) {
      mapConstructor += `[${key},${value}]`
      if (index < keyValues.length - 1) {
        mapConstructor += ','
      }
    }
  })

  mapConstructor += '])'

  return content.replace(matched, mapConstructor)
}

function needAddQuotes(
  exp: ExpressionNode | string,
  keyValue: string
): boolean {
  return (
    !isString(exp) &&
    (exp as SimpleExpressionNode).constType === ConstantTypes.CAN_STRINGIFY &&
    !keyValue.startsWith("'") &&
    !keyValue.startsWith('"')
  )
}
