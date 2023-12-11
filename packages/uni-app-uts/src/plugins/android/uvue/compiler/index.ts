import { extend } from '@vue/shared'
import {
  baseParse,
  trackSlotScopes,
  trackVForSlotScopes,
  transformElement,
} from '@vue/compiler-core'

import { isAppUVueNativeTag } from '@dcloudio/uni-shared'
import {
  getBaseNodeTransforms,
  transformTapToClick,
} from '@dcloudio/uni-cli-shared'
import './runtimeHelpers'

import { CodegenResult, CompilerOptions } from './options'
import { generate } from './codegen'
import { DirectiveTransform, NodeTransform, transform } from './transform'
import { transformIf } from './transforms/vIf'
import { transformFor } from './transforms/vFor'
import { transformModel } from './transforms/vModel'
import { transformShow } from './transforms/vShow'
import { transformVText } from './transforms/vText'
import { transformInterpolation } from './transforms/transformInterpolation'
import { transformText } from './transforms/transformText'
import { transformOn } from './transforms/vOnWithModifier'
import { transformBind } from './transforms/vBind'
import { transformSlotOutlet } from './transforms/transformSlotOutlet'
import { transformObjectExpression } from './transforms/transformObjectExpression'
import { transformExpression } from './transforms/transformExpression'
import { transformElements } from './transforms/transformElements'
import { transformStyle } from './transforms/transformStyle'
import { transformVHtml } from './transforms/vHtml'
import { transformMemo } from './transforms/vMemo'
import { transformOnce } from './transforms/vOnce'

export type TransformPreset = [
  NodeTransform[],
  Record<string, DirectiveTransform>
]

export function getBaseTransformPreset(
  prefixIdentifiers?: boolean
): TransformPreset {
  return [
    [
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      // order is important
      trackVForSlotScopes,
      transformVHtml,
      transformExpression,
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText,
      transformTapToClick,
      transformInterpolation,
      transformObjectExpression,
      transformElements,
      transformStyle,
    ] as any,
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel,
      show: transformShow,
      text: transformVText,
    } as any,
  ]
}

export function compile(
  template: string,
  options: CompilerOptions
): CodegenResult {
  options.rootDir = options.rootDir || ''
  options.targetLanguage = options.targetLanguage || 'kotlin'
  const isNativeTag =
    options?.isNativeTag ||
    function (tag: string) {
      return (
        isAppUVueNativeTag(tag) ||
        !!options.parseUTSComponent?.(tag, options.targetLanguage!)
      )
    }
  const ast = baseParse(template, {
    comments: false,
    isNativeTag,
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
        ...getBaseNodeTransforms('/'),
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
