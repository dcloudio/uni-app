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
