import { isString, isSymbol } from '@vue/shared'
import {
  CodegenResult,
  CompoundExpressionNode,
  helperNameMap,
  InterpolationNode,
  NodeTypes,
  SimpleExpressionNode,
  TextNode,
  TO_DISPLAY_STRING,
} from '@vue/compiler-core'
import { default as babelGenerate } from '@babel/generator'
import { CodegenOptions, CodegenScope } from './options'
import { createObjectExpression } from './ast'

export function generate(
  scope: CodegenScope,
  options: CodegenOptions
): Omit<CodegenResult, 'ast'> {
  const isSetupInlined = !!options.inline
  // enter render function
  const functionName = `render`
  const args = ['_ctx', '_cache']
  if (options.bindingMetadata && !options.inline) {
    // binding optimization args
    args.push('$props', '$setup', '$data', '$options')
  }
  const signature = options.isTS
    ? args.map((arg) => `${arg}: any`).join(',')
    : args.join(', ')
  const codes: string[] = []
  if (isSetupInlined) {
    codes.push(`(${signature}) => {`)
  } else {
    codes.push(`function ${functionName}(${signature}) {`)
  }
  codes.push(
    `return ` +
      babelGenerate(createObjectExpression(scope.properties), {
        // concise: true,
      }).code
  )
  codes.push(`}`)

  return {
    code: codes.join('\n'),
    preamble: '',
  }
}

type CodegenNode =
  | SimpleExpressionNode
  | CompoundExpressionNode
  | InterpolationNode
  | TextNode
  | string
  | symbol

interface GenNodeContext {
  code: string
  helper(key: symbol): string
  push(code: string, node?: CodegenNode): void
}

function createGenNodeContext() {
  const context: GenNodeContext = {
    code: '',
    helper(key) {
      return `_${helperNameMap[key]}`
    },
    push(code) {
      context.code += code
    },
  }
  return context
}

export function genNode(
  node: CodegenNode | symbol | string,
  context?: GenNodeContext
) {
  if (!context) {
    context = createGenNodeContext()
  }
  if (isString(node)) {
    context.push(node)
    return context
  }
  if (isSymbol(node)) {
    context.push(context.helper(node))
    return context
  }
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break
  }
  return context
}

function genText(
  node: TextNode | SimpleExpressionNode,
  context: GenNodeContext
) {
  context.push(JSON.stringify(node.content), node)
}

function genExpression(node: SimpleExpressionNode, context: GenNodeContext) {
  const { content, isStatic } = node
  context.push(isStatic ? JSON.stringify(content) : content, node)
}

function genInterpolation(node: InterpolationNode, context: GenNodeContext) {
  const { push, helper } = context
  push(`${helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  push(`)`)
}

function genCompoundExpression(
  node: CompoundExpressionNode,
  context: GenNodeContext
) {
  for (let i = 0; i < node.children!.length; i++) {
    const child = node.children![i]
    if (isString(child)) {
      context.push(child)
    } else {
      genNode(child, context)
    }
  }
}
