import {
  NodeTypes,
  ExpressionNode,
  createSimpleExpression,
  SourceLocation,
  SimpleExpressionNode,
  createCallExpression,
  createFunctionExpression,
  createObjectExpression,
  createObjectProperty,
  ForCodegenNode,
  RenderSlotCall,
  SlotOutletNode,
  ElementNode,
  DirectiveNode,
  ForNode,
  PlainElementNode,
  createVNodeCall,
  VNodeCall,
  ForRenderListExpression,
  BlockCodegenNode,
  ForIteratorExpression,
  ConstantTypes,
  // createBlockStatement,
  // createCompoundExpression
} from '@vue/compiler-core'
import { createCompilerError, ErrorCodes } from '../errors'
import {
  getInnerRange,
  findProp,
  isTemplateNode,
  isSlotOutlet,
  injectProp,
  getVNodeBlockHelper,
  getVNodeHelper,
  // findDir
} from '@vue/compiler-core'
import {
  RENDER_LIST,
  OPEN_BLOCK,
  FRAGMENT,
  // IS_MEMO_SAME
} from '../runtimeHelpers'
import { processExpression } from './transformExpression'
// import { validateBrowserExpression } from '../validateExpression'
import { PatchFlags, PatchFlagNames } from '@vue/shared'
import {
  TransformContext,
  createStructuralDirectiveTransform,
} from '../transform'

export const transformFor = createStructuralDirectiveTransform(
  'for',
  (node, dir, context) => {
    const { helper, removeHelper } = context
    return processFor(node, dir, context, (forNode) => {
      // create the loop render function expression now, and add the
      // iterator on exit after all children have been traversed
      const renderExp = createCallExpression(helper(RENDER_LIST), [
        forNode.source,
      ]) as ForRenderListExpression
      const isTemplate = isTemplateNode(node)
      // const memo = findDir(node, 'memo')
      const keyProp = findProp(node, `key`)
      const keyExp =
        keyProp &&
        (keyProp.type === NodeTypes.ATTRIBUTE
          ? createSimpleExpression(keyProp.value!.content, true)
          : keyProp.exp!)
      const keyProperty = keyProp ? createObjectProperty(`key`, keyExp!) : null

      // if (!__BROWSER__ && isTemplate) {
      if (isTemplate) {
        // #2085 / #5288 process :key and v-memo expressions need to be
        // processed on `<template v-for>`. In this case the node is discarded
        // and never traversed so its binding expressions won't be processed
        // by the normal transforms.
        // if (memo) {
        //   memo.exp = processExpression(
        //     memo.exp! as SimpleExpressionNode,
        //     context
        //   )
        // }
        if (keyProperty && keyProp!.type !== NodeTypes.ATTRIBUTE) {
          keyProperty.value = processExpression(
            keyProperty.value as SimpleExpressionNode,
            context
          )
        }
      }

      const isStableFragment =
        forNode.source.type === NodeTypes.SIMPLE_EXPRESSION &&
        forNode.source.constType > ConstantTypes.NOT_CONSTANT
      const fragmentFlag = isStableFragment
        ? PatchFlags.STABLE_FRAGMENT
        : keyProp
        ? PatchFlags.KEYED_FRAGMENT
        : PatchFlags.UNKEYED_FRAGMENT

      forNode.codegenNode = createVNodeCall(
        context as any,
        helper(FRAGMENT),
        undefined,
        renderExp,
        fragmentFlag +
          // (__DEV__ ? ` /* ${PatchFlagNames[fragmentFlag]} */` : ``),
          ` /* ${PatchFlagNames[fragmentFlag]} */`,
        undefined,
        undefined,
        true /* isBlock */,
        !isStableFragment /* disableTracking */,
        false /* isComponent */,
        node.loc
      ) as ForCodegenNode

      return () => {
        // finish the codegen now that all children have been traversed
        let childBlock: BlockCodegenNode
        const { children } = forNode

        // check <template v-for> key placement
        // if ((__DEV__ || !__BROWSER__) && isTemplate) {
        if (isTemplate) {
          node.children.some((c) => {
            if (c.type === NodeTypes.ELEMENT) {
              const key = findProp(c, 'key')
              if (key) {
                context.onError(
                  createCompilerError(
                    ErrorCodes.X_V_FOR_TEMPLATE_KEY_PLACEMENT,
                    key.loc
                  )
                )
                return true
              }
            }
          })
        }

        const needFragmentWrapper =
          children.length !== 1 || children[0].type !== NodeTypes.ELEMENT
        const slotOutlet = isSlotOutlet(node)
          ? node
          : isTemplate &&
            node.children.length === 1 &&
            isSlotOutlet(node.children[0])
          ? (node.children[0] as SlotOutletNode) // api-extractor somehow fails to infer this
          : null

        if (slotOutlet) {
          // <slot v-for="..."> or <template v-for="..."><slot/></template>
          childBlock = slotOutlet.codegenNode as RenderSlotCall
          if (isTemplate && keyProperty) {
            // <template v-for="..." :key="..."><slot/></template>
            // we need to inject the key to the renderSlot() call.
            // the props for renderSlot is passed as the 3rd argument.
            injectProp(childBlock, keyProperty, context as any)
          }
        } else if (needFragmentWrapper) {
          // <template v-for="..."> with text or multi-elements
          // should generate a fragment block for each loop
          childBlock = createVNodeCall(
            context as any,
            helper(FRAGMENT),
            keyProperty ? createObjectExpression([keyProperty]) : undefined,
            node.children,
            PatchFlags.STABLE_FRAGMENT +
              // (__DEV__
              //   ? ` /* ${PatchFlagNames[PatchFlags.STABLE_FRAGMENT]} */`
              //   : ``),
              ` /* ${PatchFlagNames[PatchFlags.STABLE_FRAGMENT]} */`,
            undefined,
            undefined,
            true,
            undefined,
            false /* isComponent */
          )
        } else {
          // Normal element v-for. Directly use the child's codegenNode
          // but mark it as a block.
          childBlock = (children[0] as PlainElementNode)
            .codegenNode as VNodeCall
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context as any)
          }
          if (childBlock.isBlock !== !isStableFragment) {
            if (childBlock.isBlock) {
              // switch from block to vnode
              removeHelper(OPEN_BLOCK)
              removeHelper(getVNodeBlockHelper(false, childBlock.isComponent))
            } else {
              // switch from vnode to block
              removeHelper(getVNodeHelper(false, childBlock.isComponent))
            }
          }
          childBlock.isBlock = !isStableFragment
          if (childBlock.isBlock) {
            helper(OPEN_BLOCK)
            helper(getVNodeBlockHelper(false, childBlock.isComponent))
          } else {
            helper(getVNodeHelper(false, childBlock.isComponent))
          }
        }

        // if (memo) {
        //   const loop = createFunctionExpression(
        //     createForLoopParams(forNode.parseResult, [
        //       createSimpleExpression(`_cached`)
        //     ])
        //   )
        //   loop.body = createBlockStatement([
        //     createCompoundExpression([`const _memo = (`, memo.exp!, `)`]),
        //     createCompoundExpression([
        //       `if (_cached`,
        //       ...(keyExp ? [` && _cached.key === `, keyExp] : []),
        //       ` && ${context.helperString(
        //         IS_MEMO_SAME
        //       )}(_cached, _memo)) return _cached`
        //     ]),
        //     createCompoundExpression([`const _item = `, childBlock as any]),
        //     createSimpleExpression(`_item.memo = _memo`),
        //     createSimpleExpression(`return _item`)
        //   ])
        //   renderExp.arguments.push(
        //     loop as ForIteratorExpression,
        //     createSimpleExpression(`_cache`),
        //     createSimpleExpression(String(context.cached++))
        //   )
        // } else {
        renderExp.arguments.push(
          createFunctionExpression(
            createForLoopParams(forNode.parseResult),
            childBlock,
            true /* force newline */
          ) as ForIteratorExpression
        )
        // }
      }
    })
  }
)

// target-agnostic transform used for both Client and SSR
export function processFor(
  node: ElementNode,
  dir: DirectiveNode,
  context: TransformContext,
  processCodegen?: (forNode: ForNode) => (() => void) | undefined
) {
  if (!dir.exp) {
    context.onError(
      createCompilerError(ErrorCodes.X_V_FOR_NO_EXPRESSION, dir.loc)
    )
    return
  }

  const parseResult = parseForExpression(
    // can only be simple expression because vFor transform is applied
    // before expression transform.
    dir.exp as SimpleExpressionNode,
    context
  )

  if (!parseResult) {
    context.onError(
      createCompilerError(ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION, dir.loc)
    )
    return
  }

  const { addIdentifiers, removeIdentifiers, scopes } = context
  const { source, value, key, index } = parseResult

  if (key === undefined) {
    parseResult.key = {
      constType: 2,
      content: '_',
      isStatic: false,
      loc: value?.loc!,
      type: 4,
    }
  }

  if (index === undefined) {
    parseResult.index = {
      constType: 2,
      content: '_',
      isStatic: false,
      loc: value?.loc!,
      type: 4,
    }
  }

  const forNode: ForNode = {
    type: NodeTypes.FOR,
    loc: dir.loc,
    source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index,
    parseResult,
    children: isTemplateNode(node) ? node.children : [node],
  }

  context.replaceNode(forNode)

  // bookkeeping
  scopes.vFor++
  // if (!__BROWSER__ && context.prefixIdentifiers) {
  if (context.prefixIdentifiers) {
    // scope management
    // inject identifiers to context
    value && addIdentifiers(value)
    key && addIdentifiers(key)
    index && addIdentifiers(index)
  }

  const onExit = processCodegen && processCodegen(forNode)

  return () => {
    scopes.vFor--
    // if (!__BROWSER__ && context.prefixIdentifiers) {
    if (context.prefixIdentifiers) {
      value && removeIdentifiers(value)
      key && removeIdentifiers(key)
      index && removeIdentifiers(index)
    }
    if (onExit) onExit()
  }
}

const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
// This regex doesn't cover the case if key or index aliases have destructuring,
// but those do not make sense in the first place, so this works in practice.
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g

export interface ForParseResult {
  source: ExpressionNode
  value: ExpressionNode | undefined
  key: ExpressionNode | undefined
  index: ExpressionNode | undefined
}

export function parseForExpression(
  input: SimpleExpressionNode,
  context: TransformContext
): ForParseResult | undefined {
  const loc = input.loc
  const exp = input.content
  const inMatch = exp.match(forAliasRE)
  if (!inMatch) return

  const [, LHS, RHS] = inMatch

  const result: ForParseResult = {
    source: createAliasExpression(
      loc,
      RHS.trim(),
      exp.indexOf(RHS, LHS.length)
    ),
    value: undefined,
    key: undefined,
    index: undefined,
  }
  // if (!__BROWSER__ && context.prefixIdentifiers) {
  if (context.prefixIdentifiers) {
    result.source = processExpression(
      result.source as SimpleExpressionNode,
      context
    )
  }
  // if (__DEV__ && __BROWSER__) {
  //   validateBrowserExpression(result.source as SimpleExpressionNode, context)
  // }

  let valueContent = LHS.trim().replace(stripParensRE, '').trim()
  const trimmedOffset = LHS.indexOf(valueContent)

  const iteratorMatch = valueContent.match(forIteratorRE)
  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, '').trim()

    const keyContent = iteratorMatch[1].trim()
    let keyOffset: number | undefined
    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length)
      result.key = createAliasExpression(loc, keyContent, keyOffset)
      // if (!__BROWSER__ && context.prefixIdentifiers) {
      if (context.prefixIdentifiers) {
        result.key = processExpression(result.key, context, true)
      }
      // if (__DEV__ && __BROWSER__) {
      //   validateBrowserExpression(
      //     result.key as SimpleExpressionNode,
      //     context,
      //     true
      //   )
      // }
    }

    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim()

      if (indexContent) {
        result.index = createAliasExpression(
          loc,
          indexContent,
          exp.indexOf(
            indexContent,
            result.key
              ? keyOffset! + keyContent.length
              : trimmedOffset + valueContent.length
          )
        )
        // if (!__BROWSER__ && context.prefixIdentifiers) {
        if (context.prefixIdentifiers) {
          result.index = processExpression(result.index, context, true)
        }
        // if (__DEV__ && __BROWSER__) {
        //   validateBrowserExpression(
        //     result.index as SimpleExpressionNode,
        //     context,
        //     true
        //   )
        // }
      }
    }
  }

  if (valueContent) {
    result.value = createAliasExpression(loc, valueContent, trimmedOffset)
    // if (!__BROWSER__ && context.prefixIdentifiers) {
    if (context.prefixIdentifiers) {
      result.value = processExpression(result.value, context, true)
    }
    // if (__DEV__ && __BROWSER__) {
    //   validateBrowserExpression(
    //     result.value as SimpleExpressionNode,
    //     context,
    //     true
    //   )
    // }
  }

  return result
}

function createAliasExpression(
  range: SourceLocation,
  content: string,
  offset: number
): SimpleExpressionNode {
  return createSimpleExpression(
    content,
    false,
    getInnerRange(range, offset, content.length)
  )
}

export function createForLoopParams(
  { value, key, index }: ForParseResult,
  memoArgs: ExpressionNode[] = []
): ExpressionNode[] {
  return createParamsList([value, key, index, ...memoArgs])
}

function createParamsList(
  args: (ExpressionNode | undefined)[]
): ExpressionNode[] {
  let i = args.length
  while (i--) {
    if (args[i]) break
  }
  return args
    .slice(0, i + 1)
    .map((arg, i) => arg || createSimpleExpression(`_`.repeat(i + 1), false))
}
