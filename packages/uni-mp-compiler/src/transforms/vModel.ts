import { camelize, isString, isSymbol } from '@vue/shared'
import {
  Property,
  transformModel as baseTransform,
  ElementTypes,
  findProp,
  NodeTypes,
  DirectiveNode,
  ElementNode,
  ExpressionNode,
  AttributeNode,
  createCompoundExpression,
  DirectiveTransform,
  TransformContext as VueTransformContext,
} from '@vue/compiler-core'
import { DOMErrorCodes, createDOMCompilerError } from '@vue/compiler-dom'

import {
  createBindDirectiveNode,
  createOnDirectiveNode,
  ATTR_DATASET_EVENT_OPTS,
} from '@dcloudio/uni-cli-shared'
import { V_ON } from '../runtimeHelpers'
import { genExpr } from '../codegen'
import { TransformContext } from '../transform'
import { DirectiveTransformResult } from './transformElement'
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
    const value = findProp(node, 'value')
    if (value) {
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

  return transformElementVModel(
    baseResult.props,
    node,
    context
  ) as unknown as DirectiveTransformResult
}

function findInputDirectiveNode(props: (AttributeNode | DirectiveNode)[]) {
  return props.find(
    (prop) =>
      prop.type === NodeTypes.DIRECTIVE &&
      prop.name === 'on' &&
      prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.content === 'input'
  ) as DirectiveNode | undefined
}

function transformElementVModel(
  props: Property[],
  node: ElementNode,
  context: TransformContext
) {
  const dirs = transformVModel(props, context, {
    binding: 'value',
    event: 'input',
    formatEventCode(code) {
      return code.replace(`= $event`, `= $event.detail.value`)
    },
  })
  if (dirs.length === 2) {
    // 快手小程序的 input v-model 被转换到 data-e-o 中，补充到 data-e-o 中
    const inputExp = findDatasetEventOpts(node)
    if (inputExp) {
      inputExp.children[2] = combineVOn(
        dirs[1].exp!,
        inputExp.children[2] as ExpressionNode,
        context
      )
      dirs.length = 1
    } else {
      const inputDir = findInputDirectiveNode(node.props)
      if (inputDir && inputDir.exp) {
        // 合并到已有的 input 事件中
        inputDir.exp = combineVOn(dirs[1].exp!, inputDir.exp, context)
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
function findDatasetEventOpts(node: ElementNode) {
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
    if (childExp.children[0] !== `'input'`) {
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
  return genExpr(exp).slice(context.helperString(V_ON).length + 1, -1)
}

function combineVOn(
  exp1: ExpressionNode,
  exp2: ExpressionNode,
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
    context
  )
}

function transformComponentVModel(
  props: Property[],
  context: TransformContext
) {
  return {
    props: transformVModel(props, context, {
      formatEventCode(code) {
        return code
      },
    }),
  }
}

function transformVModel(
  props: Property[],
  context: TransformContext,
  {
    binding,
    event,
    formatEventCode,
  }: {
    binding?: string
    event?: string
    formatEventCode: (code: string) => string
  }
) {
  if (props.length !== 2) {
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
  const vOnUpdate = createOnDirectiveNode(
    event || camelize(onUpdateArg.content.replace('onUpdate:', 'update-')),
    formatEventCode(
      genExpr(
        wrapperVOn(
          // onUpdateExpr 通常是 ExpressionNode 或者被 cache 的 ExpressionNode
          (onUpdateExpr.type === NodeTypes.JS_CACHE_EXPRESSION
            ? onUpdateExpr.value
            : onUpdateExpr) as ExpressionNode,
          context
        )
      )
    )
  )
  return [vBindModelValue, vOnUpdate]
}
