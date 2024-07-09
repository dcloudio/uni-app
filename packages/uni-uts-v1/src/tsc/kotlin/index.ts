import fs from 'fs-extra'
import path from 'path'
import { extend } from '@vue/shared'
import type {
  CompilerOptions,
  SemanticDiagnosticsBuilderProgram,
} from 'typescript'
import {
  type RawSourceMap,
  SourceMapConsumer,
  SourceMapGenerator,
} from 'source-map-js'
import { createBasicUtsOptions } from '../utils/options'
import { isInHBuilderX, normalizePath } from '../../shared'

export interface UTS2KotlinOptions {
  typescript?: typeof import('typescript')
  inputDir: string
  cacheDir: string
  outputDir: string
  tsconfig?: string
  rootFiles?: string[]
  compilerOptions?: CompilerOptions
  normalizeFileName: (str: string) => string
}

export declare class WatchProgramHelper {
  watch(timeout?: number): void
  wait(): Promise<void>
}
export function runUTS2Kotlin(
  mode: 'development' | 'production',
  options: UTS2KotlinOptions
): {
  watcher?: WatchProgramHelper
} {
  const { /* check, noCache, */ tsconfig, typescript, tsconfigOverride } =
    createBasicUtsOptions(options.inputDir)

  const kotlinTypesPath = path.resolve(__dirname, '../../../lib/kotlin/types')
  const rootFiles: string[] = [path.resolve(kotlinTypesPath, 'global.d.ts')]

  ;['env.d.ts', 'shim-uni.d.ts', 'shim-dom.d.ts', 'global.d.ts'].forEach(
    (file) => {
      rootFiles.push(path.resolve(__dirname, '../../../lib/tsconfig', file))
    }
  )
  rootFiles.push(path.resolve(options.inputDir, 'main.uts.ts'))
  const pluginPath = isInHBuilderX()
    ? process.env.UNI_HBUILDERX_PLUGINS
    : path.resolve(process.cwd(), '../')
  const nodeModulesPath = path.resolve(
    pluginPath,
    'hbuilderx-language-services/builtin-dts/uniappx/node_modules'
  )
  const vueRuntimeDts = [
    path.resolve(nodeModulesPath, '@vue/runtime-core/index.d.ts'),
  ]
  extend(tsconfigOverride.compilerOptions.paths, {
    '@dcloudio/uni-runtime': [
      path.resolve(
        kotlinTypesPath,
        '@dcloudio/uni-runtime/dist/uni-runtime.d.ts'
      ),
    ],
    '@vue/reactivity': [
      path.resolve(nodeModulesPath, '@vue/reactivity/dist/reactivity.d.ts'),
    ],
    '@vue/runtime-core': vueRuntimeDts,
    vue: vueRuntimeDts,
  })

  type RunDevOptions = Required<
    UTS2KotlinOptions & {
      sourceMapCallback?: (
        id: string,
        map: string,
        writeFile: (fileName: string, text: string) => void
      ) => boolean | undefined
      callback(
        files: string[],
        program: SemanticDiagnosticsBuilderProgram
      ): void
    }
  >

  return require('../../../lib/kotlin').compile(mode, {
    typescript,
    inputDir: options.inputDir,
    cacheDir: options.cacheDir,
    tsconfig,
    rootFiles,
    compilerOptions: extend(tsconfigOverride.compilerOptions, {
      outDir: options.outputDir,
      inlineSources: true,
      lib: [],
    }),
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
