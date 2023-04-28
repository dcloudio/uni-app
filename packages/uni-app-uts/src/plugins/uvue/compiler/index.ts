import { extend } from '@vue/shared'
import {
  baseParse,
  trackSlotScopes,
  trackVForSlotScopes,
  transformBind,
  transformElement,
  transformExpression,
  transformOn,
} from '@vue/compiler-core'

import './runtimeHelpers'

import { CodegenResult, CompilerOptions } from './options'
import { generate } from './codegen'
import { DirectiveTransform, NodeTransform, transform } from './transform'
import { transformIf } from './transforms/vIf'
import { transformFor } from './transforms/vFor'
import { transformModel } from './transforms/vModel'
import { transformShow } from './transforms/vShow'

export type TransformPreset = [
  NodeTransform[],
  Record<string, DirectiveTransform>
]

export function getBaseTransformPreset(
  prefixIdentifiers?: boolean
): TransformPreset {
  return [
    [
      transformIf,
      transformFor,
      // order is important
      trackVForSlotScopes,
      transformExpression,
      transformElement,
      trackSlotScopes,
    ] as any,
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel,
      show: transformShow,
    } as any,
  ]
}

export function compile(
  template: string,
  options: CompilerOptions
): CodegenResult {
  const ast = baseParse(template, {
    isCustomElement(tag) {
      return true
    },
  })
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset(
    options.prefixIdentifiers
  )

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [
        ...nodeTransforms,
        ...(options.nodeTransforms || []), // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {} // user transforms
      ),
    })
  )

  return generate(ast, options)
}
