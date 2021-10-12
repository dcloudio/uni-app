import { baseParse } from '@vue/compiler-core'

import { isString, extend } from '@vue/shared'
import { generate } from './codegen'
import { CompilerOptions } from './options'
import { DirectiveTransform, NodeTransform, transform } from './transform'
import { transformExpression } from './transforms/transformExpression'
import { transformIdentifier } from './transforms/transformIdentifier'
import { transformIf } from './transforms/vIf'
import { transformFor } from './transforms/vFor'
import { generate as genTemplate } from './template/codegen'
import { transformOn } from './transforms/vOn'
import { transformElement } from './transforms/transformElement'

export type TransformPreset = [
  NodeTransform[],
  Record<string, DirectiveTransform>
]

export function getBaseTransformPreset({
  prefixIdentifiers,
  skipTransformIdentifier,
}: {
  prefixIdentifiers: boolean
  skipTransformIdentifier: boolean
}): TransformPreset {
  const nodeTransforms = [transformIf, transformFor]
  if (!skipTransformIdentifier) {
    nodeTransforms.push(transformIdentifier)
  }
  nodeTransforms.push(transformElement)
  if (prefixIdentifiers) {
    nodeTransforms.push(transformExpression)
  }
  return [nodeTransforms, { on: transformOn }]
}

export function baseCompile(template: string, options: CompilerOptions = {}) {
  const prefixIdentifiers =
    options.prefixIdentifiers === true || options.mode === 'module'
  const ast = isString(template) ? baseParse(template, options) : template
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset({
    prefixIdentifiers,
    skipTransformIdentifier: options.skipTransformIdentifier === true,
  })
  const context = transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [...nodeTransforms, ...(options.nodeTransforms || [])],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
      ),
    })
  )
  const result = extend(generate(context.scope, options), { ast })
  if (options.filename && options.miniProgram?.emitFile) {
    genTemplate(ast, {
      filename: options.filename,
      emitFile: options.miniProgram.emitFile,
    })
  }

  return result
}
