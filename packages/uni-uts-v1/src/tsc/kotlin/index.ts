import fs from 'fs-extra'
import path from 'path'
import { sync } from 'fast-glob'
import type tsTypes from 'typescript'
import {
  type RawSourceMap,
  SourceMapConsumer,
  SourceMapGenerator,
} from 'source-map-js'
import { normalizePath } from '../../shared'
import { originalPositionForSync } from '../../sourceMap'

export interface UTS2KotlinOptions {
  typescript?: typeof import('typescript')
  inputDir: string
  cacheDir: string
  outputDir: string
  hxLanguageServiceDir?: string
  tsconfig?: string
  rootFiles?: string[]
  compilerOptions?: tsTypes.CompilerOptions
  normalizeFileName: (str: string) => string
}

export interface TransformOptions {
  transformArguments?: {
    shouldTransform(symbol: tsTypes.Symbol): boolean
  }
  transformReturnType?: {
    shouldTransform(node: tsTypes.Node, type: tsTypes.Type): boolean
  }
}

export declare class WatchProgramHelper {
  watch(timeout?: number): void
  wait(): Promise<void>
}

const RETURN_ANY_HOOKS = [
  'onBeforeMount',
  'onMounted',
  'onBeforeUpdate',
  'onUpdated',
  'onBeforeUnmount',
  'onUnmounted',
  'onServerPrefetch',
]

export function runUTS2Kotlin(
  mode: 'development' | 'production',
  options: UTS2KotlinOptions
): {
  watcher?: WatchProgramHelper
} {
  const pluginPath = process.env.UNI_HBUILDERX_PLUGINS
    ? process.env.UNI_HBUILDERX_PLUGINS
    : path.resolve(process.cwd(), '../')

  const hbxLanguageServicePath = path.resolve(
    pluginPath,
    'hbuilderx-language-services/builtin-dts'
  )
  const commonTypesPath = path.resolve(__dirname, '../../../lib/tsconfig')
  const utsCommonTypesPath = path.resolve(__dirname, '../../../lib/uts/types')
  const utsKotlinTypesPath = path.resolve(
    __dirname,
    '../../../lib/kotlin/types'
  )

  const rootFiles: string[] = [
    path.resolve(
      hbxLanguageServicePath,
      'uniappx/node_modules/@dcloudio/uni-app-x/types/shim-uts-basic.d.ts'
    ),
    path.resolve(commonTypesPath, 'global.d.ts'),
    path.resolve(utsKotlinTypesPath, 'global.d.ts'),
    path.resolve(utsCommonTypesPath, 'index.d.ts'),
    path.resolve(hbxLanguageServicePath, 'uts-types/common/index.d.ts'),
    ...resolvePlatformDeclarationFiles(hbxLanguageServicePath, 'app-android'),
    // path.resolve(hbxLanguageServicePath, 'common/HBuilderX.d.ts'),
    path.resolve(
      pluginPath,
      'uniapp-cli-vite/node_modules/@dcloudio/types/hbuilder-x/HBuilderX.d.ts'
    ),
    path.resolve(
      hbxLanguageServicePath,
      'uniappx/node_modules/@dcloudio/uni-app-x/types/index.d.ts'
    ),
    path.resolve(
      hbxLanguageServicePath,
      'uniappx/node_modules/@vue/global.d.ts'
    ),
  ]
  rootFiles.push(path.resolve(options.inputDir, 'main.uts.ts'))

  const vueRuntimeDts = [
    path.resolve(
      pluginPath,
      'uniapp-cli-vite/node_modules/@vue/runtime-core/dist/runtime-core.d.ts'
    ),
  ]

  const ts = require('../../../lib/typescript') as typeof tsTypes
  const compilerOptions: tsTypes.CompilerOptions = {
    rootDir: options.inputDir,
    baseUrl: options.inputDir,
    outDir: options.outputDir,
    noLib: true,
    noImplicitAny: false,
    useDefineForClassFields: false,
    sourceMap: process.env.NODE_ENV === 'development',
    inlineSources: true,
    noEmitOnError: false,
    skipLibCheck: true,
    resolveJsonModule: false, // 目前 json 文件会被 vite 提前处理，已经变成了标准的 ts 文件
    typeRoots: [],
    paths: {
      '@dcloudio/uni-runtime': [
        path.resolve(
          utsKotlinTypesPath,
          '@dcloudio/uni-runtime/dist/uni-runtime.d.ts'
        ),
      ],
      '@vue/reactivity': [
        path.resolve(
          hbxLanguageServicePath,
          'uniappx/node_modules/@vue/reactivity/dist/reactivity.d.ts'
        ),
      ],
      '@vue/runtime-core': vueRuntimeDts,
      vue: vueRuntimeDts,
    },
  }

  type RunDevOptions = Required<
    UTS2KotlinOptions & {
      originalPositionForSync?: typeof originalPositionForSync
      sourceMapCallback?: (
        id: string,
        map: string,
        writeFile: (fileName: string, text: string) => void
      ) => boolean | undefined
      callback(
        files: string[],
        program: tsTypes.SemanticDiagnosticsBuilderProgram
      ): void
      transformOptions: TransformOptions
    }
  >

  return require('../../../lib/kotlin').compile(mode, {
    typescript: ts,
    inputDir: options.inputDir,
    cacheDir: options.cacheDir,
    rootFiles,
    hxLanguageServiceDir: hbxLanguageServicePath,
    compilerOptions,
    originalPositionForSync,
    normalizeFileName: options.normalizeFileName,
    sourceMapCallback: (fileName, text, writeFile) => {
      const relativeFileName = normalizePath(
        path.relative(options.outputDir, fileName)
      )

      if (fileName.endsWith('.uvue.map') || fileName.endsWith('.vue.map')) {
        const sourceMapFilename = path.resolve(
          options.inputDir,
          relativeFileName.replace('.map', '.ts.map')
        )
        if (fs.existsSync(sourceMapFilename)) {
          // 合并sourcemap
          const sourceMap = fs.readFileSync(sourceMapFilename, 'utf8')
          text = merge(sourceMap, text)
        }
      }
      writeFile(fileName, normalizeSourceMap(text))
      return true
    },
    transformOptions: {
      transformArguments: {
        shouldTransform(symbol) {
          if (symbol.name === 'data' || symbol.name === 'setup') {
            const decls = symbol.getDeclarations()
            // 如果是 vue 中的 data/setup 函数，不补充参数列表
            if (decls && decls.length) {
              if (
                decls.find((d) =>
                  d.getSourceFile().fileName.includes('runtime-core.d.ts')
                )
              ) {
                return false
              }
            }
          }
          return true
        },
      },
      transformReturnType: {
        shouldTransform(node, _type) {
          if (node.parent && ts.isCallExpression(node.parent)) {
            const decl = node.parent.expression
            if (ts.isIdentifier(decl)) {
              if (RETURN_ANY_HOOKS.includes(decl.text)) {
                return false
              }
            }
          }
          return true
        },
      },
    },
  } as RunDevOptions)
}

function merge(oldMapStr: string, newMapStr: string) {
  if (!oldMapStr) return newMapStr
  if (!newMapStr) return oldMapStr

  const oldMap = JSON.parse(oldMapStr) as RawSourceMap
  const newMap = JSON.parse(newMapStr) as RawSourceMap
  const oldMapConsumer = new SourceMapConsumer(oldMap)
  const newMapConsumer = new SourceMapConsumer(newMap)
  const mergedMapGenerator = new SourceMapGenerator(oldMap)

  // iterate on new map and overwrite original position of new map with one of old map
  newMapConsumer.eachMapping(function (m) {
    // pass when `originalLine` is null.
    // It occurs in case that the node does not have origin in original code.
    if (m.originalLine == null) return

    const origPosInOldMap = oldMapConsumer.originalPositionFor({
      line: m.originalLine,
      column: m.originalColumn,
    })

    if (origPosInOldMap.source == null) return

    mergedMapGenerator.addMapping({
      original: {
        line: origPosInOldMap.line,
        column: origPosInOldMap.column,
      },
      generated: {
        line: m.generatedLine,
        column: m.generatedColumn,
      },
      source: origPosInOldMap.source,
      name: origPosInOldMap.name,
    })
  })

  const maps = [oldMap, newMap]
  maps.forEach(function (map, index) {
    map.sources.forEach(function (sourceFile) {
      const sourceContent = (
        index === 0 ? oldMapConsumer : newMapConsumer
      ).sourceContentFor(sourceFile)
      if (sourceContent != null) {
        mergedMapGenerator.setSourceContent(sourceFile, sourceContent)
      }
    })
  })

  return mergedMapGenerator.toString()
}

function normalizeSourceMap(text: string) {
  const sourceMap = JSON.parse(text) as RawSourceMap
  sourceMap.sources = sourceMap.sources.map((source) => {
    const parts = source.split('/.tsc/')
    source = parts[1] || parts[0]
    source = source.split('?')[0]
    return source.replace('.uts.ts', '.uts')
  })
  return JSON.stringify(sourceMap)
}

function resolvePlatformDeclarationFiles(
  hbxLanguageServicePath: string,
  platform: 'app-android' | 'app-ios'
) {
  const platformDeclarationDir = path.resolve(
    hbxLanguageServicePath,
    'uts-types',
    platform
  )
  return sync([`${platformDeclarationDir}/**/*.d.ts`], { absolute: true })
}
