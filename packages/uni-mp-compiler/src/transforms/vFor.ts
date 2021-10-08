import {
  createCompilerError,
  createSimpleExpression,
  ErrorCodes,
  ExpressionNode,
  getInnerRange,
  SimpleExpressionNode,
  SourceLocation,
  createStructuralDirectiveTransform,
  ElementTypes,
  ElementNode,
} from '@vue/compiler-core'
import { createObjectProperty, createVForCallExpression } from '../ast'
import { NodeTransform, TransformContext } from '../transform'
import { processExpression } from './transformExpression'

export interface VForOptions {
  source: string
  value: string
  key: string
  index: string
}
export type ForElementNode = ElementNode & {
  vFor: VForOptions
}
export function isForElementNode(node: unknown): node is ForElementNode {
  return !!(node as ForElementNode).vFor
}
export const transformFor = createStructuralDirectiveTransform(
  'for',
  (node, dir, _context) => {
    const context = _context as unknown as TransformContext
    if (!dir.exp) {
      context.onError(
        createCompilerError(ErrorCodes.X_V_FOR_NO_EXPRESSION, dir.loc)
      )
      return
    }
    const parseResult = parseForExpression(
      dir.exp as SimpleExpressionNode,
      context as unknown as TransformContext
    )

    if (!parseResult) {
      context.onError(
        createCompilerError(ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION, dir.loc)
      )
      return
    }
    parseResult.tagType = node.tagType
    const { addIdentifiers, removeIdentifiers } = context
    const { source, value, key, index } = parseResult
    if (context.prefixIdentifiers) {
      value && addIdentifiers(value)
      key && addIdentifiers(key)
      index && addIdentifiers(index)
    }
    const vForData = {
      value: value ? (value as SimpleExpressionNode).content : '',
      key: key ? (key as SimpleExpressionNode).content : '',
      index: index ? (index as SimpleExpressionNode).content : '',
    }
    const { currentScope: parentScope, popScope } = context
    const vForScope = context.addVForScope({
      source: (source as SimpleExpressionNode).content,
      ...vForData,
    })
    return () => {
      if (context.prefixIdentifiers) {
        value && removeIdentifiers(value)
        key && removeIdentifiers(key)
        index && removeIdentifiers(index)
      }
      const id = parentScope.id.next()
      ;(node as ForElementNode).vFor = {
        source: id,
        ...vForData,
      }
      parentScope.properties.push(
        createObjectProperty(id, createVForCallExpression(vForScope))
      )
      popScope()
    }
  }
) as unknown as NodeTransform

const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/
const stripParensRE = /^\(|\)$/g

export interface ForParseResult {
  source: ExpressionNode
  value: ExpressionNode | undefined
  key: ExpressionNode | undefined
  index: ExpressionNode | undefined
  tagType: ElementTypes
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
    tagType: ElementTypes.ELEMENT,
  }
  if (context.prefixIdentifiers) {
    result.source = processExpression(
      result.source as SimpleExpressionNode,
      context
    )
  }

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
      if (context.prefixIdentifiers) {
        result.key = processExpression(result.key, context, true)
      }
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
        if (context.prefixIdentifiers) {
          result.index = processExpression(result.index, context, true)
        }
      }
    }
  }

  if (valueContent) {
    result.value = createAliasExpression(loc, valueContent, trimmedOffset)
    if (context.prefixIdentifiers) {
      result.value = processExpression(result.value, context, true)
    }
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
