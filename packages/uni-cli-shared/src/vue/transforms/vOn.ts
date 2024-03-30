import { customizeEvent } from '@dcloudio/uni-shared'
import {
  ExpressionNode,
  DirectiveNode,
  findProp,
  isStaticExp,
  NodeTypes,
  locStub,
  createSimpleExpression,
  createCompoundExpression,
  CompoundExpressionNode,
  DirectiveTransform,
  ElementNode,
  TransformContext,
  ElementTypes,
} from '@vue/compiler-core'
import { isUserComponent } from '../utils'
export function defaultMatch(
  name: string,
  node: ElementNode,
  context: TransformContext
) {
  return isCustomEvent(name) && isUserComponent(node, context)
}
interface CreateTransformOnOptions {
  match: typeof defaultMatch
}
/**
 * 百度、快手小程序的自定义组件，不支持动态事件绑定，故转换为静态事件 + dataset
 * @param baseTransformOn
 * @returns
 */
export function createTransformOn(
  baseTransformOn: DirectiveTransform,
  { match }: CreateTransformOnOptions = {
    match: defaultMatch,
  }
): DirectiveTransform {
  return (dir, node, context, augmentor) => {
    const res = baseTransformOn(dir, node, context, augmentor)
    const { name, arg, exp } = dir
    if (name !== 'on' || !arg || !exp || !isStaticExp(arg)) {
      return res
    }
    if (!match(arg.content, node, context)) {
      return res
    }
    const value = res.props[0].value as ExpressionNode
    res.props[0].value = createCustomEventExpr()
    addEventOpts(
      node.tagType === ElementTypes.COMPONENT
        ? customizeEvent(arg.content)
        : arg.content,
      value,
      node,
      context
    )
    return res
  }
}

export function createCustomEventExpr() {
  return createSimpleExpression('__e', true)
}

export function addEventOpts(
  event: string,
  value: ExpressionNode,
  node: ElementNode,
  context: TransformContext
) {
  const attrName =
    node.tagType === ElementTypes.COMPONENT
      ? ATTR_DATA_EVENT_OPTS
      : ATTR_DATASET_EVENT_OPTS
  const opts = findProp(node, attrName, true) as DirectiveNode
  if (!opts) {
    node.props.push(createDataEventOptsProp(attrName, event, value, context))
  } else {
    const children = (opts.exp as CompoundExpressionNode).children
    children.splice(
      children.length - 2,
      0,
      createDataEventOptsProperty(event, value)
    )
  }
}

const ATTR_DATA_EVENT_OPTS = 'eO'
export const ATTR_DATASET_EVENT_OPTS = 'data-e-o'

function createDataEventOptsProperty(event: string, exp: ExpressionNode) {
  return createCompoundExpression([`'${event}'`, ': ', exp, ','])
}

export const STRINGIFY_JSON = Symbol(`stringifyJson`)

function createDataEventOptsProp(
  name: string,
  event: string,
  exp: ExpressionNode,
  context: TransformContext
): DirectiveNode {
  const children: CompoundExpressionNode['children'] = []
  const stringify = name === ATTR_DATA_EVENT_OPTS
  if (stringify) {
    children.push(context.helperString(STRINGIFY_JSON) + '(')
  }
  children.push('{', createDataEventOptsProperty(event, exp), '}')
  if (stringify) {
    children.push(')')
  }
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'bind',
    loc: locStub,
    modifiers: [],
    arg: createSimpleExpression(name, true),
    exp: createCompoundExpression(children),
  }
}

const builtInEvents = [
  '__l', // 快手使用了该事件
  'tap',
  'longtap',
  'longpress',
  'touchstart',
  'touchmove',
  'touchcancel',
  'touchend',
  'touchforcechange',
  'transitionend',
  'animationstart',
  'animationiteration',
  'animationend',
]

function isCustomEvent(name: string) {
  return !builtInEvents.includes(name)
}
