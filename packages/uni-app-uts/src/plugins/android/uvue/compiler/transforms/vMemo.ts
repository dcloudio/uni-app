import {
  ElementTypes,
  FunctionExpression,
  MemoExpression,
  NodeTypes,
  PlainElementNode,
  SourceLocation,
  WITH_MEMO,
  convertToBlock,
  createCallExpression,
  findDir,
  locStub,
} from '@vue/compiler-core'
import { NodeTransform } from '../transform'

const seen = new WeakSet()

export const transformMemo: NodeTransform = (node, context) => {
  if (node.type === NodeTypes.ELEMENT) {
    const dir = findDir(node, 'memo')
    if (!dir || seen.has(node)) {
      return
    }
    seen.add(node)
    return () => {
      const codegenNode =
        node.codegenNode ||
        (context.currentNode as PlainElementNode).codegenNode
      if (codegenNode && codegenNode.type === NodeTypes.VNODE_CALL) {
        // non-component sub tree should be turned into a block
        if (node.tagType !== ElementTypes.COMPONENT) {
          convertToBlock(codegenNode, context as any)
        }
        const fn = createFunctionExpression(undefined, codegenNode)
        ;(fn as any).returnType = 'VNode'
        node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
          dir.exp!,
          fn,
          `_cache`,
          String(context.cached++),
        ]) as MemoExpression
      }
    }
  }
}

export function createFunctionExpression(
  params: FunctionExpression['params'],
  returns: FunctionExpression['returns'] = undefined,
  newline: boolean = false,
  isSlot: boolean = false,
  loc: SourceLocation = locStub
): FunctionExpression {
  return {
    type: NodeTypes.JS_FUNCTION_EXPRESSION,
    params,
    returns,
    newline,
    isSlot,
    loc,
  }
}
