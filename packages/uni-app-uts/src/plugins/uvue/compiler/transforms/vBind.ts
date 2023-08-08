import { camelize } from '@vue/shared'
import { parseExpression } from '@babel/parser'
import type { Node } from '@babel/types'
import { CAMELIZE } from '@vue/compiler-core'
import {
  createObjectProperty,
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
} from '@vue/compiler-core'

import type { DirectiveTransform } from '../transform'
import { createCompilerError, ErrorCodes } from '../errors'

import { stringifyExpression } from './transformExpression'
import { MagicString, walk } from '@vue/compiler-sfc'

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
  // 简易处理,理论上rust中也可以处理，但为了单元测试一致性，还是在该阶段中处理
  const source = stringifyExpression(exp)
  if (source.includes('{')) {
    const s = new MagicString(source)
    const ast = parseExpression(source, {
      plugins: context.expressionPlugins,
    })
    walk(ast, {
      enter(node: Node) {
        if (node.type === 'ObjectExpression') {
          s.prependLeft(node.start!, 'utsMapOf(')
          s.prependRight(node.end!, ')')
        }
      },
    })
    return {
      props: [
        createObjectProperty(
          arg,
          createSimpleExpression(s.toString(), false, exp.loc)
        ),
      ],
    }
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
