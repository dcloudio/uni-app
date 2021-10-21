import fs from 'fs'
import { baseParse } from '@vue/compiler-core'
import { isString, extend } from '@vue/shared'
import { hash, parseFilterNames } from '@dcloudio/uni-cli-shared'
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
import { transformBind } from './transforms/vBind'

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
  return [nodeTransforms, { on: transformOn, bind: transformBind }]
}

export function baseCompile(template: string, options: CompilerOptions = {}) {
  const prefixIdentifiers =
    options.prefixIdentifiers === true || options.mode === 'module'
  const ast = isString(template) ? baseParse(template, options) : template
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset({
    prefixIdentifiers,
    skipTransformIdentifier: options.skipTransformIdentifier === true,
  })

  options.vueId = genVueId(options)

  if (options.filename) {
    if (options.filters && options.miniProgram?.filter) {
      options.filters = parseFilters(
        options.miniProgram.filter.lang,
        options.filename
      )
    }
  }

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
  const result = extend(
    generate(
      extend(ast, {
        scope: context.scope,
        bindingComponents: context.bindingComponents,
      }),
      options
    ),
    { ast }
  )
  if (options.filename && options.miniProgram?.emitFile) {
    genTemplate(ast, {
      scopeId: options.scopeId,
      filename: options.filename,
      directive: options.miniProgram.directive,
      emitFile: options.miniProgram.emitFile,
      slot: options.miniProgram.slot,
    })
  }

  return result
}

function genVueId(options: CompilerOptions) {
  if (options.vueId) {
    return options.vueId
  }
  if (options.scopeId) {
    return options.scopeId.replace('data-v-', '')
  }
  if (options.filename) {
    return hash(options.filename)
  }
  return ''
}

function parseFilters(lang: string, filename: string) {
  filename = filename.split('?')[0]
  if (fs.existsSync(filename)) {
    return parseFilterNames(lang as any, fs.readFileSync(filename, 'utf8'))
  }
  return []
}
