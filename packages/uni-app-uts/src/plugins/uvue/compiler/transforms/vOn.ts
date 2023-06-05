import { DirectiveTransform, DirectiveTransformResult } from '../transform'
import {
  createCompoundExpression,
  createObjectProperty,
  createSimpleExpression,
  DirectiveNode,
  ElementTypes,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  hasScopeRef,
  isMemberExpression,
  TO_HANDLER_KEY,
} from '@vue/compiler-core'
import { camelize, toHandlerKey } from '@vue/shared'
import { createCompilerError, ErrorCodes } from '../errors'
import { processExpression } from './transformExpression'

const fnExpRE =
  /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/

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
  context,
  augmentor
) => {
  const { loc, modifiers, arg } = dir as VOnDirectiveNode
  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(ErrorCodes.X_V_ON_NO_EXPRESSION, loc))
  }
  let eventName: ExpressionNode
  if (arg.type === NodeTypes.SIMPLE_EXPRESSION) {
    if (arg.isStatic) {
      let rawName = arg.content
      // TODO deprecate @vnodeXXX usage
      if (rawName.startsWith('vue:')) {
        rawName = `vnode-${rawName.slice(4)}`
      }
      const eventString =
        node.tagType !== ElementTypes.ELEMENT ||
        rawName.startsWith('vnode') ||
        !/[A-Z]/.test(rawName)
          ? // for non-element and vnode lifecycle event listeners, auto convert
            // it to camelCase. See issue #2249
            toHandlerKey(camelize(rawName))
          : // preserve case for plain element listeners that have uppercase
            // letters, as these may be custom elements' custom events
            `on:${rawName}`
      eventName = createSimpleExpression(eventString, true, arg.loc)
    } else {
      // #2388
      eventName = createCompoundExpression([
        `${context.helperString(TO_HANDLER_KEY)}(`,
        arg,
        `)`,
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
  // @ts-ignore
  let shouldCache: boolean = context.cacheHandlers && !exp && !context.inVOnce
  if (exp) {
    // @ts-ignore
    const isMemberExp = isMemberExpression(exp.content, context)
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
        // @ts-ignore
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
        !hasScopeRef(exp, context.identifiers)
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
      if (isInlineStatement && exp.loc.source.includes('$event')) {
        throw new Error(
          'Inline statement cannot use $event, please use a function expression instead.'
        )
      }
      exp = createCompoundExpression([
        `${
          isInlineStatement ? `()` : `${``}(...args)`
          // } => ${hasMultipleStatements ? `{` : `(`}`,
        } => ${`{`}`,
        exp,
        // hasMultipleStatements ? `}` : `)`
        `}`,
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

  if (shouldCache) {
    // cache handlers so that it's always the same handler being passed down.
    // this avoids unnecessary re-renders when users use inline handlers on
    // components.
    ret.props[0].value = context.cache(ret.props[0].value)
  }

  // mark the key as handler for props normalization check
  ret.props.forEach((p) => (p.key.isHandlerKey = true))
  return ret
}
