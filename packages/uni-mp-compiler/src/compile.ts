import fs from 'fs'
import { baseParse } from '@vue/compiler-core'
import { extend, isString } from '@vue/shared'
import { hash, parseFilterNames } from '@dcloudio/uni-cli-shared'
import { generate } from './codegen'
import type { CodegenRootNode, CompilerOptions } from './options'
import {
  type DirectiveTransform,
  type NodeTransform,
  transform,
} from './transform'
import { transformExpression } from './transforms/transformExpression'
import { transformIdentifier } from './transforms/transformIdentifier'
import { transformIf } from './transforms/vIf'
import { transformFor } from './transforms/vFor'
import { generate as genTemplate } from './template/codegen'
import { transformOn } from './transforms/vOn'
import { transformElement } from './transforms/transformElement'
import { transformBind } from './transforms/vBind'
import { transformComponent } from './transforms/transformComponent'
import { transformSlot } from './transforms/vSlot'
import { transformRoot } from './transforms/transformRoot'
import { transformTag } from './transforms/transformTag'
import { transformHtml } from './transforms/vHtml'
import { transformText } from './transforms/vText'
import { transformAttr } from './transforms/transformAttr'
import { FILTER_MODULE_NAME } from './transforms/utils'

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
  // order is important
  const nodeTransforms = [
    transformRoot,
    transformAttr,
    transformTag,
    transformHtml,
    transformText,
    transformIf,
    transformFor,
    transformSlot,
  ]
  if (!skipTransformIdentifier) {
    nodeTransforms.push(transformIdentifier)
  }
  nodeTransforms.push(transformElement)
  nodeTransforms.push(transformComponent)
  if (prefixIdentifiers) {
    nodeTransforms.push(transformExpression)
  }
  return [
    nodeTransforms,
    { on: transformOn as unknown as DirectiveTransform, bind: transformBind },
  ]
}

export function baseCompile(template: string, options: CompilerOptions = {}) {
  const prefixIdentifiers =
    options.prefixIdentifiers === true || options.mode === 'module'
  const ast = (
    isString(template)
      ? baseParse(template, { ...options, parseMode: 'html' })
      : template
  ) as CodegenRootNode
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset({
    prefixIdentifiers,
    skipTransformIdentifier: options.skipTransformIdentifier === true,
  })
  options.hashId = genHashId(options)

  if (options.filename) {
    if (!options.filters && options.miniProgram?.filter) {
      options.filters = parseFilters(
        options.miniProgram.filter.lang,
        options.filename
      )
      if (options.isX) {
        options.filters.push(FILTER_MODULE_NAME)
      }
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
        bindingComponents: context.bindingComponents,
      }),
      options
    ),
    { ast }
  )
  if (options.filename && options.miniProgram?.emitFile) {
    const {
      class: clazz,
      directive,
      emitFile,
      event,
      slot,
      lazyElement,
      component,
      checkPropName,
    } = options.miniProgram
    genTemplate(ast, {
      class: clazz,
      scopeId: options.scopeId,
      filename: options.filename,
      directive,
      emitFile,
      event,
      slot,
      lazyElement,
      component,
      isBuiltInComponent: context.isBuiltInComponent,
      isMiniProgramComponent: context.isMiniProgramComponent,
      checkPropName,
      autoImportFilters: context.autoImportFilters,
      filter: options.miniProgram?.filter,
    })
  }

  return result
}

function genHashId(options: CompilerOptions) {
  if (options.hashId) {
    return options.hashId
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
