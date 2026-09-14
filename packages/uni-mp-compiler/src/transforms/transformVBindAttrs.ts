import { parseExpression } from '@babel/parser'
import {
  type Expression,
  isFunction,
  isTSAsExpression,
  isTSNonNullExpression,
} from '@babel/types'
import {
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  type SimpleExpressionNode,
  isMemberExpression,
  isStaticArgOf,
} from '@vue/compiler-core'
import {
  createBindDirectiveNode,
  createOnDirectiveNode,
  isAttributeNode,
  isDirectiveNode,
  isPlainElementNode,
} from '@dcloudio/uni-cli-shared'
import type { NodeTransform, TransformContext } from '../transform'

const V_BIND_ATTRS = '$attrs'

export const transformVBindAttrs: NodeTransform = (node, context) => {
  // 仅在 uni-app-x 微信/支付宝小程序下兜底处理原生节点的 v-bind="$attrs"，
  // 这样可以避免误伤 uni-app 以及 uni-app-x 的其他平台。
  if (!supportVBindAttrs(context) || !isPlainElementNode(node)) {
    return
  }

  const { props } = node
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    if (!isVBindAttrsDirective(prop)) {
      continue
    }

    const attrsExp = (prop.exp as SimpleExpressionNode).content
    const newProps: DirectiveNode[] = []

    // class/style/click 需要尽量保留原有声明顺序，避免覆盖规则变化。
    mergeBindProp(props, 'class', `${attrsExp}.class`, i, newProps)
    mergeBindProp(props, 'style', `${attrsExp}.style`, i, newProps)
    mergeOnProp(props, 'click', `${attrsExp}.onClick`, i, newProps, context)

    // id 与现有逻辑保持一致：只在后面没有显式 id 时补充，
    // 这样可以继续复用“后写覆盖前写”的规则。
    if (!hasFollowingId(props, i)) {
      newProps.push(createBindDirectiveNode('id', `${attrsExp}.id`))
    }

    props.splice(i, 1, ...newProps)
    i += newProps.length - 1
  }
}

function supportVBindAttrs(context: TransformContext) {
  return (
    context.isX &&
    (process.env.UNI_PLATFORM === 'mp-weixin' ||
      process.env.UNI_PLATFORM === 'mp-alipay')
  )
}

function isVBindAttrsDirective(
  prop: ElementNode['props'][number]
): prop is DirectiveNode {
  return (
    isDirectiveNode(prop) &&
    prop.name === 'bind' &&
    !prop.arg &&
    prop.modifiers.length === 0 &&
    prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION &&
    prop.exp.content === V_BIND_ATTRS
  )
}

function mergeBindProp(
  props: ElementNode['props'],
  name: string,
  attrsExp: string,
  vBindIndex: number,
  newProps: DirectiveNode[]
) {
  const propIndex = props.findIndex(
    (prop) =>
      isDirectiveNode(prop) &&
      prop.name === 'bind' &&
      isStaticArgOf(prop.arg, name)
  )

  if (propIndex < 0) {
    newProps.push(createBindDirectiveNode(name, attrsExp))
    return
  }

  const prop = props[propIndex] as DirectiveNode
  if (prop.exp?.type !== NodeTypes.SIMPLE_EXPRESSION) {
    return
  }

  prop.exp.content =
    propIndex < vBindIndex
      ? `[${prop.exp.content}, ${attrsExp}]`
      : `[${attrsExp}, ${prop.exp.content}]`
}

function mergeOnProp(
  props: ElementNode['props'],
  name: string,
  attrsExp: string,
  vBindIndex: number,
  newProps: DirectiveNode[],
  context: TransformContext
) {
  const propIndex = props.findIndex(
    (prop) =>
      isDirectiveNode(prop) &&
      prop.name === 'on' &&
      isStaticArgOf(prop.arg, name)
  )

  if (propIndex < 0) {
    newProps.push(createOnDirectiveNode(name, attrsExp))
    return
  }

  const prop = props[propIndex] as DirectiveNode
  if (prop.exp?.type !== NodeTypes.SIMPLE_EXPRESSION) {
    return
  }

  const localHandler = normalizeLocalHandler(prop.exp.content, context)
  // Keep the merged handler as an expression value. transformOn must not wrap
  // this in an arrow function, because the MP runtime does not execute an
  // array returned from an event callback.
  prop.exp.content =
    propIndex < vBindIndex
      ? `(${attrsExp} ? [].concat((${localHandler}) || [], ${attrsExp}) : ${localHandler})`
      : `(${attrsExp} ? [].concat(${attrsExp}, (${localHandler}) || []) : ${localHandler})`
  ;(
    prop.exp as SimpleExpressionNode & { __uniMergedEvent?: boolean }
  ).__uniMergedEvent = true
}

function normalizeLocalHandler(
  handler: string,
  context: TransformContext
): string {
  if (!handler.trim()) {
    return '() => {}'
  }
  if (
    isMemberExpression(handler, context as any) ||
    isFunctionExpression(handler, context)
  ) {
    return handler
  }

  const eventParam = context.isTS ? '($event: any)' : '($event)'
  const body = handler.includes(';') ? `{${handler}}` : `(${handler})`
  return `${eventParam} => ${body}`
}

function isFunctionExpression(
  content: string,
  context: TransformContext
): boolean {
  try {
    let expression: Expression = parseExpression(content, {
      plugins: context.expressionPlugins,
    })
    while (isTSAsExpression(expression) || isTSNonNullExpression(expression)) {
      expression = expression.expression
    }
    return isFunction(expression)
  } catch {
    return false
  }
}

function hasFollowingId(props: ElementNode['props'], index: number) {
  return props.slice(index + 1).some((prop) => {
    return (
      (isAttributeNode(prop) && prop.name === 'id') ||
      (isDirectiveNode(prop) &&
        prop.name === 'bind' &&
        isStaticArgOf(prop.arg, 'id'))
    )
  })
}
