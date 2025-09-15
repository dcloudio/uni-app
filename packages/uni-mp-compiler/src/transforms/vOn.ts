import { isDirectiveNode } from '@dcloudio/uni-cli-shared'
import {
  type DirectiveNode,
  type DirectiveTransform,
  type ElementNode,
  ElementTypes,
  ErrorCodes,
  type ExpressionNode,
  NodeTypes,
  type SimpleExpressionNode,
  TO_HANDLER_KEY,
  createCompilerError,
  createCompoundExpression,
  createObjectProperty,
  createSimpleExpression,
  findProp,
  hasScopeRef,
  isMemberExpression,
} from '@vue/compiler-core'
import { camelize, toHandlerKey } from '@vue/shared'
import { genExpr } from '..'
import { V_ON } from '../runtimeHelpers'
import type { TransformContext } from '../transform'
import type { DirectiveTransformResult } from './transformElement'
import { isBuiltInIdentifier, processExpression } from './transformExpression'
import { parseVForScope } from './vFor'
import { isFilterExpr } from './utils'

const fnExpRE =
  /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/

export interface VOnDirectiveNode extends DirectiveNode {
  // v-on without arg is handled directly in ./transformElements.ts due to it affecting
  // codegen for the entire props object. This transform here is only for v-on
  // *with* args.
  arg: ExpressionNode
  // exp is guaranteed to be a simple expression here because v-on w/ arg is
  // skipped by transformExpression as a special case.
  exp: SimpleExpressionNode | undefined
}

export const transformOn: DirectiveTransform = (
  dir,
  node,
  _context,
  augmentor
) => {
  const context = _context as unknown as TransformContext
  const { loc, modifiers, arg } = dir as VOnDirectiveNode
  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(ErrorCodes.X_V_ON_NO_EXPRESSION, loc))
  }
  let eventName: ExpressionNode
  if (arg.type === NodeTypes.SIMPLE_EXPRESSION) {
    if (arg.isStatic) {
      const rawName = arg.content
      // for all event listeners, auto convert it to camelCase. See issue #2249
      eventName = createSimpleExpression(
        toHandlerKey(camelize(rawName)),
        true,
        arg.loc
      )
    } else {
      // #2388
      eventName = createCompoundExpression([
        // `${context.helperString(TO_HANDLER_KEY)}(`,
        arg,
        // `)`,
      ])
    }
  } else {
    // already a compound expression.
    eventName = arg
    eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`)
    eventName.children.push(`)`)
  }

  // handler processing
  let exp: ExpressionNode | undefined = dir.exp as
    | SimpleExpressionNode
    | undefined
  if (exp && !exp.content.trim()) {
    exp = undefined
  }
  let shouldCache: boolean = context.cacheHandlers && !exp && !context.inVOnce
  if (exp) {
    const isMemberExp = isMemberExpression(exp.content, context as any)
    const isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content))
    const hasMultipleStatements = exp.content.includes(`;`)

    // process the expression since it's been skipped
    if (context.prefixIdentifiers) {
      isInlineStatement && context.addIdentifiers(`$event`)
      exp = dir.exp = processExpression(
        exp,
        context,
        false,
        hasMultipleStatements
      )
      isInlineStatement && context.removeIdentifiers(`$event`)
      // with scope analysis, the function is hoistable if it has no reference
      // to scope variables.
      shouldCache =
        context.cacheHandlers &&
        // unnecessary to cache inside v-once
        !context.inVOnce &&
        // runtime constants don't need to be cached
        // (this is analyzed by compileScript in SFC <script setup>)
        !(exp.type === NodeTypes.SIMPLE_EXPRESSION && exp.constType > 0) &&
        // #1541 bail if this is a member exp handler passed to a component -
        // we need to use the original function to preserve arity,
        // e.g. <transition> relies on checking cb.length to determine
        // transition end handling. Inline function is ok since its arity
        // is preserved even when cached.
        !(isMemberExp && node.tagType === ElementTypes.COMPONENT) &&
        // bail if the function references closure variables (v-for, v-slot)
        // it must be passed fresh to avoid stale values.
        !hasScopeRef(exp, context.identifiers) &&
        // wxs event
        !isFilterExpr(exp, context)
      // If the expression is optimizable and is a member expression pointing
      // to a function, turn it into invocation (and wrap in an arrow function
      // below) so that it always accesses the latest value when called - thus
      // avoiding the need to be patched.
      if (shouldCache && isMemberExp) {
        if (exp.type === NodeTypes.SIMPLE_EXPRESSION) {
          exp.content = `${exp.content} && ${exp.content}(...args)`
        } else {
          exp.children = [...exp.children, ` && `, ...exp.children, `(...args)`]
        }
      }
    }

    if (isInlineStatement || (shouldCache && isMemberExp)) {
      // wrap inline statement in a function expression
      exp = createCompoundExpression([
        `${
          isInlineStatement
            ? context.isTS
              ? `($event: any)`
              : `$event`
            : `${context.isTS ? `\n//@ts-ignore\n` : ``}(...args)`
        } => ${hasMultipleStatements ? `{` : `(`}`,
        exp,
        hasMultipleStatements ? `}` : `)`,
      ])
    }
  }

  let ret: DirectiveTransformResult = {
    props: [
      createObjectProperty(
        eventName,
        exp || createSimpleExpression(`() => {}`, false, loc)
      ),
    ],
  }

  // apply extended compiler augmentor
  if (augmentor) {
    ret = augmentor(ret)
  }
  // TODO
  if (shouldCache) {
    // cache handlers so that it's always the same handler being passed down.
    // this avoids unnecessary re-renders when users use inline handlers on
    // components.
    // ret.props[0].value = wrapper(
    //   context.cache(ret.props[0].value) as ExpressionNode,
    //   context
    // )
    ret.props[0].value = wrapperVOn(
      ret.props[0].value as ExpressionNode,
      node,
      context
    )
  } else {
    ret.props[0].value = wrapperVOn(
      ret.props[0].value as ExpressionNode,
      node,
      context
    )
  }

  // mark the key as handler for props normalization check
  ret.props.forEach((p) => (p.key.isHandlerKey = true))
  return ret
}

export function wrapperVOn(
  value: ExpressionNode,
  node: ElementNode,
  context: TransformContext
) {
  if (isBuiltInIdentifier(value)) {
    return value
  }
  // wxs event
  if (isFilterExpr(value, context)) {
    return value
  }
  const keys: string[] = []
  if (context.miniProgram.event?.key && context.inVFor) {
    let keyProp = findProp(node, 'key')
    if (!keyProp) {
      const vForScope = parseVForScope(context.currentScope)
      if (vForScope) {
        keyProp = findProp(vForScope.node, 'key')
      }
    }
    // 对 for 中的所有事件增加 key 标记，避免微信小程序不更新事件对象
    if (keyProp && isDirectiveNode(keyProp) && keyProp.exp) {
      const keyCode = genExpr(keyProp.exp)
      if (keyCode) {
        keys.push(',')
        keys.push(genExpr(keyProp.exp))
      }
    }
  }
  const newExpr = createCompoundExpression([
    `${context.helperString(V_ON)}(`,
    value,
    ...keys,
    `)`,
  ])
  // 严格限制生效范围，仅当有keys时，才保存原始事件表达式
  if (keys.length) {
    // @ts-expect-error 内部 parseVOn 时使用
    newExpr.__withoutKeysVOnExpr = createCompoundExpression([
      `${context.helperString(V_ON)}(`,
      value,
      `)`,
    ])
  }
  return newExpr
}
