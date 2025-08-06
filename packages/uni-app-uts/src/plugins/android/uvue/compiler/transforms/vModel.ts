import { camelize } from '@vue/shared'
import {
  BindingTypes,
  ConstantTypes,
  type DirectiveNode,
  ElementTypes,
  type ExpressionNode,
  NodeTypes,
  type Property,
  type SimpleExpressionNode,
  createCompoundExpression,
  createObjectProperty,
  createSimpleExpression,
  hasScopeRef,
  isMemberExpression,
  isSimpleIdentifier,
  isStaticExp,
} from '@vue/compiler-core'
import { stringifyExpression } from './transformExpression'
import { walk } from 'estree-walker'
import type { Node } from '@babel/types'
import { parseExpression } from '@babel/parser'
import { isCompoundExpressionNode } from '@dcloudio/uni-cli-shared'

import type { DirectiveTransform } from '../transform'

import { ErrorCodes, createCompilerError } from '../errors'
import { LOOSE_TO_NUMBER, TRY_SET_REF_VALUE } from '../runtimeHelpers'

const INPUT_TAGS = ['input', 'textarea']
const AS = ' as '

export const transformModel: DirectiveTransform = (dir, node, context) => {
  const { exp, arg } = dir
  if (!exp) {
    context.onError(
      createCompilerError(ErrorCodes.X_V_MODEL_NO_EXPRESSION, dir.loc)
    )
    return createTransformProps()
  }

  let rawExp = exp.loc.source

  let expType = ''
  if (isCompoundExpressionNode(exp)) {
    if (rawExp.includes(AS)) {
      // 目前简单处理(a as string)
      rawExp = rawExp.trim()
      if (rawExp.startsWith('(') && rawExp.endsWith(')')) {
        rawExp = rawExp.slice(1, -1)
      }
      const parts = rawExp.split(AS)
      rawExp = parts[0].trim()
      expType = parts[1].trim()
      const source = stringifyExpression(exp)
      const ast = parseExpression(source, {
        plugins: context.expressionPlugins,
      })
      let str = ''
      walk(ast, {
        enter(node: Node) {
          if (node.type === 'TSAsExpression') {
            str = source.slice(node.expression.start!, node.expression.end!)
          }
        },
      })
      exp.children = [createSimpleExpression(str)]
    }
  }

  const expString =
    exp.type === NodeTypes.SIMPLE_EXPRESSION ? exp.content : rawExp

  // im SFC <script setup> inline mode, the exp may have been transformed into
  // _unref(exp)
  const bindingType = context.bindingMetadata[rawExp]

  // check props
  if (
    bindingType === BindingTypes.PROPS ||
    bindingType === BindingTypes.PROPS_ALIASED
  ) {
    context.onError(createCompilerError(ErrorCodes.X_V_MODEL_ON_PROPS, exp.loc))
    return createTransformProps()
  }

  const maybeRef =
    context.inline &&
    (bindingType === BindingTypes.SETUP_LET ||
      bindingType === BindingTypes.SETUP_REF ||
      bindingType === BindingTypes.SETUP_MAYBE_REF)

  if (
    !expString.trim() ||
    (!isMemberExpression(expString, context as any) && !maybeRef)
  ) {
    context.onError(
      createCompilerError(ErrorCodes.X_V_MODEL_MALFORMED_EXPRESSION, exp.loc)
    )
    return createTransformProps()
  }

  if (
    context.prefixIdentifiers &&
    isSimpleIdentifier(expString) &&
    context.identifiers[expString]
  ) {
    context.onError(
      createCompilerError(ErrorCodes.X_V_MODEL_ON_SCOPE_VARIABLE, exp.loc)
    )
    return createTransformProps()
  }

  const isInputElement = INPUT_TAGS.includes(node.tag)

  const propName = arg ? arg : createSimpleExpression('modelValue', true)
  let eventName = arg
    ? isStaticExp(arg)
      ? `onUpdate:${camelize(arg.content)}`
      : createCompoundExpression(['"onUpdate:" + ', arg])
    : `onUpdate:modelValue`

  if (isInputElement && eventName === 'onUpdate:modelValue') {
    eventName = getEventName(dir)
  }
  const eventType = isInputElement ? getEventParamsType(dir) : expType

  let eventValue = isInputElement ? `$event.detail.value` : `$event`

  if (withTrim(dir)) {
    eventValue = `${eventValue}.trim()`
  }
  if (withNumber(dir)) {
    eventValue = `${context.helperString(LOOSE_TO_NUMBER)}(${eventValue})`
  }

  let assignmentExp: ExpressionNode
  const eventArg = eventType ? `($event: ${eventType})` : `$event`
  if (maybeRef) {
    if (bindingType === BindingTypes.SETUP_REF) {
      // v-model used on known ref.
      assignmentExp = createCompoundExpression([
        `${eventArg} => {(`,
        createSimpleExpression(rawExp, false, exp.loc),
        `).value = ${eventValue}}`,
      ])
    } else {
      // v-model used on a potentially ref binding in <script setup> inline mode.
      // the assignment needs to check whether the binding is actually a ref.
      // 如果是 const 仅设置值：trySetRefValue(innerValue, `$event`.detail.value)
      // 如果是 let 需要执行赋值动作 innerValue = trySetRefValue(innerValue, `$event`.detail.value)
      assignmentExp = createCompoundExpression([
        `${eventArg} => {${
          bindingType === BindingTypes.SETUP_LET ? `${rawExp} = ` : ''
        }${context.helperString(TRY_SET_REF_VALUE)}(${rawExp}, ${eventValue})}`,
      ])
    }
  } else {
    assignmentExp = createCompoundExpression([
      `${eventArg} => {(`,
      exp,
      `) = ${eventValue}}`,
    ])
  }

  const props = [
    // modelValue: foo
    createObjectProperty(
      propName,
      getModelValueWithModifiers(dir, exp as SimpleExpressionNode)
    ),
    // "onUpdate:modelValue": $event => (foo = $event)
    createObjectProperty(eventName, assignmentExp),
  ]

  // cache v-model handler if applicable (when it doesn't refer any scope vars)
  if (
    context.prefixIdentifiers &&
    !context.inVOnce &&
    context.cacheHandlers &&
    !hasScopeRef(exp, context.identifiers)
  ) {
    props[1].value = context.cache(props[1].value)
  }

  // modelModifiers: { foo: true, "bar-baz": true }
  if (dir.modifiers.length && node.tagType === ElementTypes.COMPONENT) {
    const modifiers = dir.modifiers
      .map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`)
      .join(`, `)
    const modifiersKey = arg
      ? isStaticExp(arg)
        ? `${arg.content}Modifiers`
        : createCompoundExpression([arg, ' + "Modifiers"'])
      : `modelModifiers`
    props.push(
      createObjectProperty(
        modifiersKey,
        createSimpleExpression(
          `{ ${modifiers} }`,
          false,
          dir.loc,
          ConstantTypes.CAN_HOIST
        )
      )
    )
  }

  return createTransformProps(props)
}

function createTransformProps(props: Property[] = []) {
  return { props }
}

function getEventName(dir: DirectiveNode): string {
  return withLazy(dir) ? 'onBlur' : 'onInput'
}

function getEventParamsType(dir: DirectiveNode): string {
  return withLazy(dir) ? 'UniInputBlurEvent' : 'UniInputEvent'
}

function withLazy(dir: DirectiveNode): boolean {
  return dir.modifiers.includes('lazy')
}

function withNumber(dir: DirectiveNode): boolean {
  return dir.modifiers.includes('number')
}

function withTrim(dir: DirectiveNode): boolean {
  return dir.modifiers.includes('trim')
}

function getModelValueWithModifiers(
  dir: DirectiveNode,
  exp: SimpleExpressionNode
): SimpleExpressionNode {
  if (withNumber(dir)) {
    return {
      ...exp,
      content: `handleModelValueForModifierNumber(${exp.content})`,
    } as SimpleExpressionNode
  }
  return exp
}
