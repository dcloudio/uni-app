import {
  DirectiveTransform,
  isUserComponent,
  transformOn as baseTransformOn,
} from '@dcloudio/uni-mp-compiler'
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
} from '@vue/compiler-core'
/**
 * 百度小程序的自定义组件，不支持动态事件绑定，故转换为静态事件 + dataset
 * @param dir
 * @param node
 * @param context
 * @param augmentor
 * @returns
 */
export const transformOn: DirectiveTransform = (
  dir,
  node,
  context,
  augmentor
) => {
  const res = baseTransformOn(dir, node, context, augmentor)
  const { name, arg, exp } = dir
  if (
    name !== 'on' ||
    !arg ||
    !exp ||
    !isStaticExp(arg) ||
    !isCustomEvent(arg.content) ||
    !isUserComponent(node, context)
  ) {
    return res
  }
  // data-event-opts
  const opts = findProp(node, ATTR_DATA_EVENT_OPTS, true) as DirectiveNode
  const value = res.props[0].value as ExpressionNode
  res.props[0].value = createSimpleExpression('__e', true)
  if (!opts) {
    node.props.push(createDataEventOptsProp(arg.content, value))
  } else {
    const children = (opts.exp as CompoundExpressionNode).children
    children.splice(
      children.length - 2,
      0,
      createDataEventOptsProperty(arg.content, value)
    )
  }
  return res
}

const ATTR_DATA_EVENT_OPTS = 'data-e-o'

function createDataEventOptsProperty(event: string, exp: ExpressionNode) {
  return createCompoundExpression([`'${event}'`, ': ', exp, ','])
}

function createDataEventOptsProp(
  event: string,
  exp: ExpressionNode
): DirectiveNode {
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'bind',
    loc: locStub,
    modifiers: [],
    arg: createSimpleExpression(ATTR_DATA_EVENT_OPTS, true),
    exp: createCompoundExpression([
      '{',
      createDataEventOptsProperty(event, exp),
      '}',
    ]),
  }
}

const builtInEvents = [
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
