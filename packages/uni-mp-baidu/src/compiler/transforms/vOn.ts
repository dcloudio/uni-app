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
  ComponentNode,
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
  const value = res.props[0].value as ExpressionNode
  res.props[0].value = createCustomEventExpr()
  addEventOpts(arg.content, value, node)
  return res
}

export function createCustomEventExpr() {
  return createSimpleExpression('__e', true)
}

export function addEventOpts(
  event: string,
  value: ExpressionNode,
  node: ComponentNode
) {
  const opts = findProp(node, ATTR_DATA_EVENT_OPTS, true) as DirectiveNode
  if (!opts) {
    node.props.push(createDataEventOptsProp(event, value))
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
