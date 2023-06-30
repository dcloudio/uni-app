import { extend } from '@vue/shared'
import {
  baseParse,
  CodegenResult,
  ParserOptions,
  RootNode,
} from '@vue/compiler-core'

import { baseCompile } from './compile'
import { parserOptions } from './parserOptions'
import { CompilerOptions } from './options'
export type { CompilerOptions } from './options'
export { findProp } from '@vue/compiler-core'
export type {
  DirectiveNode,
  NodeTransform,
  DirectiveTransform,
  TransformContext,
  SimpleExpressionNode,
} from '@vue/compiler-core'

export { genExpr } from './codegen'
export { rewriteExpression } from './transforms/utils'
export { isForElementNode } from './transforms/vFor'
export { transformOn } from './transforms/vOn'
export { transformModel } from './transforms/vModel'
export * from './runtimeHelpers'

export function parse(template: string, options: ParserOptions = {}): RootNode {
  return baseParse(template, extend({}, parserOptions, options))
}

export function compile(
  template: string,
  options: CompilerOptions = {}
): CodegenResult {
  return baseCompile(
    template,
    extend({}, parserOptions, options, {
      directiveTransforms: extend({}, options.directiveTransforms || {}),
    })
  )
}
