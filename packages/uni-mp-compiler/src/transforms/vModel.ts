import { camelize, isString, isSymbol } from '@vue/shared'
import {
  type AttributeNode,
  ConstantTypes,
  type DirectiveNode,
  type DirectiveTransform,
  type ElementNode,
  ElementTypes,
  type ExpressionNode,
  NodeTypes,
  type Property,
  type TransformContext as VueTransformContext,
  transformModel as baseTransform,
  createCompoundExpression,
  createObjectProperty,
  createSimpleExpression,
  findDir,
  findProp,
  isSimpleIdentifier,
  isStaticArgOf,
  isStaticExp,
} from '@vue/compiler-core'
import { DOMErrorCodes, createDOMCompilerError } from '@vue/compiler-dom'

import {
  ATTR_DATASET_EVENT_OPTS,
  createBindDirectiveNode,
  createOnDirectiveNode,
  isSimpleExpressionNode,
} from '@dcloudio/uni-cli-shared'
import { V_ON, WITH_MODEL_MODIFIERS } from '../runtimeHelpers'
import { genExpr } from '../codegen'
import type { TransformContext } from '../transform'
import type { DirectiveTransformResult } from './transformElement'
import { wrapperVOn } from './vOn'

export const transformModel: DirectiveTransform = (
  dir: DirectiveNode,
  node: ElementNode,
  _context: VueTransformContext
) => {
  const context = _context as unknown as TransformContext
  const baseResult = baseTransform(dir, node, _context)
  // base transform has errors OR component v-model (only need props)
  if (!baseResult.props.length || node.tagType === ElementTypes.COMPONENT) {
    return transformComponentVModel(
      baseResult.props,
      node,
      context
    ) as unknown as DirectiveTransformResult
  }

  if (dir.arg) {
    context.onError(
      createDOMCompilerError(
        DOMErrorCodes.X_V_MODEL_ARG_ON_ELEMENT,
        dir.arg.loc
      )
    )
  }

  function checkDuplicatedValue() {
    const value = findDir(node, 'bind')
    if (value && isStaticArgOf(value.arg, 'value')) {
      context.onError(
        createDOMCompilerError(
          DOMErrorCodes.X_V_MODEL_UNNECESSARY_VALUE,
          value.loc
        )
      )
    }
  }

  const { tag } = node
  if (tag === 'input' || tag === 'textarea') {
    checkDuplicatedValue()
  } else {
    context.onError(
      createDOMCompilerError(
        DOMErrorCodes.X_V_MODEL_ON_INVALID_ELEMENT,
        dir.loc
      )
    )
  }

  // 仅 uni-app-x 微信小程序将原生 input 的 .lazy 绑定到 change
  const useChangeEvent =
    tag === 'input' &&
    context.isX &&
    process.env.UNI_PLATFORM === 'mp-weixin' &&
    dir.modifiers.includes('lazy')
  // 启用 change 时，lazy 已在编译期处理；trim、number 等修饰符仍交给运行时
  const modelModifiers = useChangeEvent
    ? dir.modifiers.filter((modifier) => modifier !== 'lazy')
    : dir.modifiers

  if (modelModifiers.length) {
    const arg = dir.arg
    const modifiers = modelModifiers
      .map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`)
      .join(`, `)
    const modifiersKey = arg
      ? isStaticExp(arg)
        ? `${arg.content}Modifiers`
        : createCompoundExpression([arg, ' + "Modifiers"'])
      : `modelModifiers`
    baseResult.props.push(
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

  return transformElementVModel(
    baseResult.props,
    node,
    context,
    useChangeEvent ? 'change' : 'input'
  ) as unknown as DirectiveTransformResult
}

function findInputDirectiveNode(
  props: (AttributeNode | DirectiveNode)[],
  event: string
) {
  return props.find(
    (prop) =>
      prop.type === NodeTypes.DIRECTIVE &&
      prop.name === 'on' &&
      prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.content === event
  ) as DirectiveNode | undefined
}

function transformElementVModel(
  props: Property[],
  node: ElementNode,
  context: TransformContext,
  event: string
) {
  const dirs = transformVModel(props, node, context, {
    isComponent: false,
    binding: 'value',
    event,
    formatEventCode(code) {
      return code.replace(/=\s\$event/g, `= $event.detail.value`)
    },
  })
  if (dirs.length === 2) {
    // 按实际的模型更新事件合并，避免 .lazy 的赋值被并入用户的 @input 中。
    // 快手小程序的 input v-model 被转换到 data-e-o 中，补充到 data-e-o 中
    const inputExp = findDatasetEventOpts(node, event)
    if (inputExp) {
      inputExp.children[2] = combineVOn(
        dirs[1].exp!,
        inputExp.children[2] as ExpressionNode,
        node,
        context
      )
      dirs.length = 1
    } else {
      const inputDir = findInputDirectiveNode(node.props, event)
      if (inputDir && inputDir.exp) {
        // 合并到对应事件中，先更新 v-model，再执行用户的事件处理器
        inputDir.exp = combineVOn(dirs[1].exp!, inputDir.exp, node, context)
        dirs.length = 1
      }
    }
  }
  return { props: dirs }
}

/**
 * {
 *  "type": 7,
 *  "name": "bind",
 *  "loc": {},
 *  "modifiers": [],
 *  "arg": {
 *    "type": 4,
 *    "loc": {},
 *    "content": "data-e-o",
 *    "isStatic": true,
 *    "constType": 3
 *  },
 * "exp": {
 *  "type": 8,
 *  "loc": {},
 *  "children": ["{", {
 *   "type": 8,
 *   "loc": {},
 *   "children": ["'input'", ": ", {
 *    "type": 8,
 *    "loc": {},
 *    "children": ["_o(", {
 *     "type": 4,
 *     "content": "_ctx.input",
 *     "isStatic": false,
 *     "constType": 0,
 *     "loc": {}
 *    }, ")"]
 *   }, ","]
 *  }, "}"]
 * }
 * }
 * @param node
 * @returns
 */
function findDatasetEventOpts(node: ElementNode, event: string) {
  const eventOptsProp = findProp(
    node,
    ATTR_DATASET_EVENT_OPTS,
    true,
    false
  ) as DirectiveNode
  if (!eventOptsProp) {
    return
  }
  const { exp } = eventOptsProp
  if (exp?.type !== NodeTypes.COMPOUND_EXPRESSION) {
    return
  }
  for (let i = 0; i < exp.children.length; i++) {
    const childExp = exp.children[i]
    if (isSymbol(childExp) || isString(childExp)) {
      continue
    }
    if (childExp.type !== NodeTypes.COMPOUND_EXPRESSION) {
      continue
    }
    if (childExp.children[0] !== `'${event}'`) {
      continue
    }
    const inputExp = childExp.children[2]
    if (
      isSymbol(inputExp) ||
      isString(inputExp) ||
      inputExp.type !== NodeTypes.COMPOUND_EXPRESSION
    ) {
      continue
    }
    return childExp
  }
}

function parseVOn(exp: ExpressionNode, context: TransformContext) {
  // @ts-expect-error
  const rawVOnExpr = exp.__withoutKeysVOnExpr
  if (rawVOnExpr) {
    exp = rawVOnExpr
  }
  return genExpr(exp).slice(context.helperString(V_ON).length + 1, -1)
}

function combineVOn(
  exp1: ExpressionNode,
  exp2: ExpressionNode,
  node: ElementNode,
  context: TransformContext
) {
  return wrapperVOn(
    createCompoundExpression([
      `[`,
      parseVOn(exp1, context),
      ',',
      parseVOn(exp2, context),
      `]`,
    ]),
    node,
    context
  )
}

function transformComponentVModel(
  props: Property[],
  node: ElementNode,
  context: TransformContext
) {
  return {
    props: transformVModel(props, node, context, {
      isComponent: true,
      formatEventCode(code) {
        return code
      },
    }),
  }
}

function transformVModel(
  props: Property[],
  node: ElementNode,
  context: TransformContext,
  {
    isComponent,
    binding,
    event,
    formatEventCode,
  }: {
    isComponent: boolean
    binding?: string
    event?: string
    formatEventCode: (code: string) => string
  }
) {
  if (props.length < 2) {
    return []
  }
  const { key: modelValueArg, value: modelValeExpr } = props[0]
  const { key: onUpdateArg, value: onUpdateExpr } = props[1]

  if (modelValueArg.type !== NodeTypes.SIMPLE_EXPRESSION) {
    return []
  }
  if (
    onUpdateArg.type !== NodeTypes.SIMPLE_EXPRESSION ||
    !onUpdateArg.content.startsWith('onUpdate:')
  ) {
    return []
  }
  const vBindModelValue = createBindDirectiveNode(
    binding || modelValueArg.content,
    genExpr(modelValeExpr as ExpressionNode)
  )
  const modifiers = parseVModelModifiers(props[2])
  // onUpdateExpr 通常是 ExpressionNode 或者被 cache 的 ExpressionNode
  const vOnValue = (
    onUpdateExpr.type === NodeTypes.JS_CACHE_EXPRESSION
      ? onUpdateExpr.value
      : onUpdateExpr
  ) as ExpressionNode

  let vOnExpr: ExpressionNode | string = wrapperVOn(
    modifiers
      ? wrapperVModelModifiers(vOnValue, modifiers, context, isComponent)
      : vOnValue,
    node,
    context
  )
  // @ts-expect-error
  const rawVOnExpr = vOnExpr.__withoutKeysVOnExpr
  vOnExpr = formatEventCode(genExpr(vOnExpr))
  if (rawVOnExpr) {
    vOnExpr = createSimpleExpression(vOnExpr, false)
    // @ts-expect-error
    vOnExpr.__withoutKeysVOnExpr = formatEventCode(genExpr(rawVOnExpr))
  }
  const vOnUpdate = createOnDirectiveNode(
    event || camelize(onUpdateArg.content.replace('onUpdate:', 'update-')),
    vOnExpr
  )
  return [vBindModelValue, vOnUpdate]
}

function parseVModelModifiers(property?: Property) {
  if (
    property &&
    isSimpleExpressionNode(property.key) &&
    property.key.content.endsWith('Modifiers') &&
    isSimpleExpressionNode(property.value)
  ) {
    return property.value.content
  }
}
function wrapperVModelModifiers(
  exp: ExpressionNode,
  modifiers: string,
  context: TransformContext,
  isComponent = false
) {
  return createCompoundExpression([
    `${context.helperString(WITH_MODEL_MODIFIERS)}(`,
    exp,
    ',',
    modifiers,
    `${isComponent ? `, true` : ``}`,
    `)`,
  ])
}
