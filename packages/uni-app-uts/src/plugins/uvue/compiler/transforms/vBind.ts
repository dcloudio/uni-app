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
    ;(exp as any).content = object2Map((exp as any).content)
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

function object2Map(content: string) {
  const matched = content.match(objectExp)![0]
  const keyValues = matched.replace(/\{|\}/g, '').split(',')
  let mapConstructor = 'new Map<string,any>(['

  keyValues.forEach((keyValue: string, index: number) => {
    const [key, value] = keyValue.split(':')
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
