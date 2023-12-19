import { extend } from '@vue/shared'
import {
  CompilerError,
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

import { CodegenResult, TemplateCompilerOptions } from './options'
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
import {
  RawSourceMap,
  SourceMapConsumer,
  SourceMapGenerator,
} from 'source-map-js'

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
  options: TemplateCompilerOptions
): CodegenResult {
  options.rootDir = options.rootDir || ''
  options.targetLanguage = options.targetLanguage || 'kotlin'

  wrapOptionsLog(template, options)

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
    onError: options.onError,
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

  const result = generate(ast, options)

  // inMap should be the map produced by ./parse.ts which is a simple line-only
  // mapping. If it is present, we need to adjust the final map and errors to
  // reflect the original line numbers.
  if (options.inMap) {
    if (options.sourceMap) {
      result.map = mapLines(options.inMap, result.map!)
    }
    // if (result.errors.length) {
    //   patchErrors(errors, source, inMap)
    // }
  }

  return result
}

function mapLines(oldMap: RawSourceMap, newMap: RawSourceMap): RawSourceMap {
  if (!oldMap) return newMap
  if (!newMap) return oldMap

  const oldMapConsumer = new SourceMapConsumer(oldMap)
  const newMapConsumer = new SourceMapConsumer(newMap)
  const mergedMapGenerator = new SourceMapGenerator()

  newMapConsumer.eachMapping((m) => {
    if (m.originalLine == null) {
      return
    }

    const origPosInOldMap = oldMapConsumer.originalPositionFor({
      line: m.originalLine,
      column: m.originalColumn,
    })

    if (origPosInOldMap.source == null) {
      return
    }

    mergedMapGenerator.addMapping({
      generated: {
        line: m.generatedLine,
        column: m.generatedColumn,
      },
      original: {
        line: origPosInOldMap.line, // map line
        // use current column, since the oldMap produced by @vue/compiler-sfc
        // does not
        column: m.originalColumn,
      },
      source: origPosInOldMap.source,
      name: origPosInOldMap.name,
    })
  })

  // source-map's type definition is incomplete
  const generator = mergedMapGenerator as any
  ;(oldMapConsumer as any).sources.forEach((sourceFile: string) => {
    generator._sources.add(sourceFile)
    const sourceContent = oldMapConsumer.sourceContentFor(sourceFile)
    if (sourceContent != null) {
      mergedMapGenerator.setSourceContent(sourceFile, sourceContent)
    }
  })

  generator._sourceRoot = oldMap.sourceRoot
  generator._file = oldMap.file
  return generator.toJSON()
}

function wrapOptionsLog(source: string, options: TemplateCompilerOptions) {
  const { onWarn, onError, inMap } = options
  if (inMap && inMap.sourcesContent?.length) {
    if (onWarn || onError) {
      const originalSource = inMap.sourcesContent![0]
      const offset = originalSource.indexOf(source)
      const lineOffset =
        originalSource.slice(0, offset).split(/\r?\n/).length - 1

      if (onWarn) {
        options.onWarn = (err: CompilerError) => {
          patchError(err, lineOffset, offset)
          onWarn(err)
        }
      }
      if (onError) {
        options.onError = (err: CompilerError) => {
          patchError(err, lineOffset, offset)
          onError(err)
        }
      }
    }
  }
}

function patchError(err: CompilerError, lineOffset: number, offset: number) {
  if (err.loc) {
    err.loc.start.line += lineOffset
    err.loc.start.offset += offset
    if (err.loc.end !== err.loc.start) {
      err.loc.end.line += lineOffset
      err.loc.end.offset += offset
    }
  }
}
