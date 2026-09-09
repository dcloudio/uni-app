import { extend } from '@vue/shared'
import { type CompilerError, baseParse } from '@vue/compiler-core'

import { isAppUVueNativeTag } from '@dcloudio/uni-shared'
import {
  createTransformTag,
  createUniVueTransformAssetUrls,
  getBaseNodeTransforms,
  matchEasycom,
  transformLineBreak,
  transformTapToClick,
} from '@dcloudio/uni-cli-shared'
import { initRuntimeHelpersOnce } from './runtimeHelpers'

import type { CodegenResult, TemplateCompilerOptions } from './options'
import { generate } from './codegen'
import {
  type DirectiveTransform,
  type NodeTransform,
  transform,
} from './transform'
import { transformIf } from './transforms/vIf'
import { transformFor } from './transforms/vFor'
import { transformModel } from './transforms/vModel'
import { transformShow } from './transforms/vShow'
import { transformVText } from './transforms/vText'
import { transformInterpolation } from './transforms/transformInterpolation'
// import { transformText } from './transforms/transformText'
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
import type { RawSourceMap } from 'source-map-js'
import {
  GenMapping,
  addMapping,
  setSourceContent,
  toEncodedMap,
} from '@jridgewell/gen-mapping'
import type { EncodedSourceMap as TraceEncodedSourceMap } from '@jridgewell/trace-mapping'
import {
  TraceMap,
  eachMapping,
  originalPositionFor,
  sourceContentFor,
} from '@jridgewell/trace-mapping'
import { trackSlotScopes, trackVForSlotScopes } from './transforms/vSlot'
import { transformElement } from './transforms/transformElement'
import {
  createAssetUrlTransformWithOptions,
  normalizeOptions,
} from '../sfc/compiler/template/transformAssetUrl'
import { createSrcsetTransformWithOptions } from '../sfc/compiler/template/transformSrcset'

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
      // transformText,
      transformTapToClick,
      transformInterpolation,
      transformObjectExpression,
      transformElements,
      transformStyle,
      transformLineBreak,
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
  initRuntimeHelpersOnce()
  options.rootDir = options.rootDir || ''
  options.targetLanguage = options.targetLanguage || 'kotlin'
  options.prefixIdentifiers =
    'prefixIdentifiers' in options
      ? options.prefixIdentifiers
      : options.mode === 'module'

  wrapOptionsLog(template, options)
  const isDevX =
    process.env.UNI_HX_VERSION_DEV === 'true' &&
    process.env.UNI_APP_X === 'true'
  const isNativeTag =
    options?.isNativeTag ||
    function (tag: string) {
      if (isDevX) {
        const source = matchEasycom(tag)
        // 不能是uts插件的easycom组件
        if (source && !source.includes('?uts-proxy')) {
          return false
        }
      }
      return (
        isAppUVueNativeTag(tag) ||
        !!options.parseUTSCustomElement?.(tag, options.targetLanguage!) ||
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

  // 重要不能传入base
  const assetOptions = normalizeOptions(createUniVueTransformAssetUrls(''))

  transform(
    ast,
    extend({}, options, {
      nodeTransforms: [
        ...nodeTransforms,
        createAssetUrlTransformWithOptions(assetOptions),
        createSrcsetTransformWithOptions(assetOptions),
        ...getBaseNodeTransforms('/'),
        ...(options.nodeTransforms || []), // user transforms
        createTransformTag({ 'cover-image': 'image' }),
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

  const oldMapTracer = new TraceMap(
    oldMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap
  )
  const newMapTracer = new TraceMap(
    newMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap
  )
  const mergedMapGenerator = new GenMapping({
    file: oldMap.file ?? newMap.file,
    sourceRoot: oldMap.sourceRoot ?? newMap.sourceRoot,
  })

  // 直接在 @jridgewell/gen-mapping 上重建映射，减少 source-map-js 的解析与序列化开销。
  eachMapping(newMapTracer, (m) => {
    if (m.originalLine == null) {
      return
    }

    const origPosInOldMap = originalPositionFor(oldMapTracer, {
      line: m.originalLine,
      column: m.originalColumn ?? 0,
    })

    if (origPosInOldMap.source == null) {
      return
    }

    const mapping = {
      generated: {
        line: m.generatedLine,
        column: m.generatedColumn,
      },
      original: {
        line: origPosInOldMap.line, // map line
        // use current column, since the oldMap produced by @vue/compiler-sfc
        // does not
        column: m.originalColumn ?? 0,
      },
      source: origPosInOldMap.source!,
    }
    if (origPosInOldMap.name != null) {
      addMapping(mergedMapGenerator, { ...mapping, name: origPosInOldMap.name })
    } else {
      addMapping(mergedMapGenerator, mapping)
    }
  })

  oldMapTracer.sources.forEach((sourceFile) => {
    if (!sourceFile) {
      return
    }
    const sourceContent = sourceContentFor(oldMapTracer, sourceFile)
    if (sourceContent != null) {
      setSourceContent(mergedMapGenerator, sourceFile, sourceContent)
    }
  })

  return normalizeSourceMap(toEncodedMap(mergedMapGenerator))
}

function normalizeSourceMap(
  map: ReturnType<typeof toEncodedMap>
): RawSourceMap {
  const normalized: Record<string, any> = {
    version: map.version,
    sources: map.sources,
    names: map.names,
    mappings: map.mappings,
  }
  if (map.sourcesContent != null) {
    normalized.sourcesContent = map.sourcesContent
  }
  if (map.file != null) {
    normalized.file = map.file
  }
  if (map.sourceRoot != null) {
    normalized.sourceRoot = map.sourceRoot
  }
  if (map.ignoreList?.length) {
    normalized.ignoreList = map.ignoreList
  }
  return normalized as RawSourceMap
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
