import { hasOwn } from '@vue/shared'
import { existsSync, readFileSync, statSync } from 'fs'
import { basename, dirname, extname, join, relative, resolve } from 'path'
import {
  type BasicSourceMapConsumer,
  type IndexedSourceMapConsumer,
  type NullableMappedPosition,
  type NullablePosition,
  SourceMapConsumer,
} from 'source-map'

import {
  type MappedPosition,
  SourceMapConsumer as SourceMapConsumerSync,
} from 'source-map-js'
import { kotlinDir } from './kotlin'
import { resolveUniAppXSourceMapPath } from './utils'
import { kotlinSrcDir } from './uvue'

const EXTNAME = {
  kotlin: '.kt',
  swift: '.swift',
}

const PLATFORM_DIR = {
  kotlin: 'app-android',
  swift: 'app-ios',
}

export function resolveUniAppXSourceMapFile(
  target: 'kotlin', // | 'swift',
  filename: string,
  inputDir: string,
  outputDir: string,
  cacheDir?: string
) {
  if (cacheDir) {
    process.env.UNI_APP_X_CACHE_DIR = cacheDir
  }
  if (!process.env.UNI_APP_X_CACHE_DIR) {
    throw 'UNI_APP_X_CACHE_DIR is not set'
  }
  if (target !== 'kotlin') {
    throw `only support kotlin, but got ${target}`
  }
  inputDir = normalizePath(inputDir)
  outputDir = normalizePath(outputDir)
  filename = normalizePath(filename)
  const kotlinRootOutDir = kotlinDir(outputDir)
  const kotlinSrcOutDir = kotlinSrcDir(kotlinRootOutDir)
  // 如果是源文件，比如uvue,vue,uts等，则需要转换为kt文件路径
  const isSrcFile = filename.startsWith(inputDir)
  if (isSrcFile) {
    const fileExtname = extname(filename)
    filename = normalizePath(
      resolve(
        kotlinSrcOutDir,
        relative(filename, inputDir).replace(fileExtname, EXTNAME[target])
      )
    )
  }
  // 文件是 kt 或 swift
  if (extname(filename) === EXTNAME[target]) {
    const relativeFileName = relative(kotlinSrcOutDir, filename)
    return resolveSourceMapFile(
      relativeFileName,
      resolveUniAppXSourceMapPath(kotlinDir(outputDir))
    )
  }
  if (isSrcFile) {
    return resolveSourceMapFile(
      'index.kt',
      resolveUniAppXSourceMapPath(kotlinDir(outputDir))
    )
  }

  function resolveSourceMapFile(
    relativeFileName: string,
    sourceMapDir: string
  ) {
    const sourceMapFile = resolve(sourceMapDir, relativeFileName + '.map')
    if (existsSync(sourceMapFile)) {
      return sourceMapFile
    }
  }
}

export function resolveUTSPluginSourceMapFile(
  target: 'kotlin' | 'swift',
  filename: string,
  inputDir: string,
  outputDir: string
) {
  inputDir = normalizePath(inputDir)
  outputDir = normalizePath(outputDir)
  filename = normalizePath(filename)
  const pluginDir = resolvePluginDir(inputDir, outputDir, filename)
  if (!pluginDir) {
    throw `plugin dir not found`
  }
  const is_uni_modules = basename(dirname(pluginDir)) === 'uni_modules'
  const sourceMapFile = join(
    join(outputDir, '../.sourcemap/app'),
    relative(inputDir, pluginDir),
    is_uni_modules ? 'utssdk' : '',
    PLATFORM_DIR[target],
    `index${EXTNAME[target]}.map`
  )
  if (!existsSync(sourceMapFile)) {
    throw `${sourceMapFile} not found`
  }
  return sourceMapFile
}
// 兼容旧版本
export const resolveUtsPluginSourceMapFile = resolveUTSPluginSourceMapFile

function resolvePluginDir(
  inputDir: string,
  outputDir: string,
  filename: string
) {
  // 目标文件是编译后 kt 或 swift
  if (filename.startsWith(outputDir)) {
    const relativePath = relative(outputDir, filename)
    const hasSrc = normalizePath(relativePath).includes('/src/')
    // uni_modules/test-uts
    if (relativePath.startsWith('uni_modules')) {
      return join(
        inputDir,
        join(relativePath, hasSrc ? '../../../..' : '../../..')
      )
    }
    // utssdk/test-uts
    return join(inputDir, join(relativePath, hasSrc ? '../../..' : '../..'))
  } else if (filename.startsWith(inputDir)) {
    let parent = dirname(filename)
    const utssdkDir = normalizePath(join(inputDir, 'utssdk'))
    const uniModulesDir = normalizePath(join(inputDir, 'uni_modules'))
    while (parent) {
      const dir = dirname(parent)
      if (parent === dir) {
        // windows 上边会剩下一个盘符
        return
      }
      if (dir === utssdkDir || dir === uniModulesDir) {
        return parent
      }
      parent = dir
    }
    throw `${filename} is not a uts plugin file`
  } else {
    throw `${filename} is not in ${inputDir} or ${outputDir}`
  }
}

const enum BIAS {
  GREATEST_LOWER_BOUND = 1,
  LEAST_UPPER_BOUND = 2,
}

interface PositionFor {
  sourceMapFile: string
  filename: string
  line: number
  column: number
  withSourceContent?: boolean
}

const consumers: Record<
  string,
  {
    time: number
    consumer:
      | BasicSourceMapConsumer
      | IndexedSourceMapConsumer
      | SourceMapConsumerSync
  }
> = {}

/**
 * 解析源码文件，目前 uts 的 sourcemap 存储的都是相对目录
 * @param consumer
 * @param filename
 * @returns
 */
function resolveSource(
  consumer: BasicSourceMapConsumer | IndexedSourceMapConsumer,
  filename: string
) {
  filename = normalizePath(filename)
  return (
    consumer.sources.find((source) => filename.endsWith(source)) || filename
  )
}

/**
 * 根据源码文件名、行号、列号，返回生成后文件、行号、列号（根据 uts 文件返回 kt|swift 文件）
 * @param originalPosition
 * @returns
 */
export function generatedPositionFor({
  sourceMapFile,
  filename,
  line,
  column,
  outputDir,
}: PositionFor & { outputDir?: string }): Promise<
  NullablePosition & { source: string | null }
> {
  return resolveSourceMapConsumer(sourceMapFile).then((consumer) => {
    const res = consumer.generatedPositionFor({
      source: resolveSource(
        consumer as BasicSourceMapConsumer | IndexedSourceMapConsumer,
        filename
      ),
      line,
      column,
      bias: column === 0 ? BIAS.LEAST_UPPER_BOUND : BIAS.GREATEST_LOWER_BOUND,
    })
    let source: string | null = null
    if (outputDir) {
      // 根据 sourceMapFile 和 outputDir，计算出生成后的文件路径
      source = join(
        outputDir,
        relative(join(outputDir, '../.sourcemap/app'), sourceMapFile)
      ).replace('.map', '')
    }
    return Object.assign(res, { source })
  })
}

/**
 * 根据生成后的文件名、行号、列号，返回源码文件、行号、列号（根据 kt|swift 文件返回 uts 文件）
 * @param generatedPosition
 * @returns
 */
export async function originalPositionFor(
  generatedPosition: Omit<PositionFor, 'filename'> & { inputDir?: string }
): Promise<NullableMappedPosition & { sourceContent?: string }> {
  return resolveSourceMapConsumer(generatedPosition.sourceMapFile).then(
    (consumer) => {
      const res = (
        consumer as BasicSourceMapConsumer | IndexedSourceMapConsumer
      ).originalPositionFor({
        line: generatedPosition.line,
        column: generatedPosition.column,
        bias:
          generatedPosition.column === 0
            ? BIAS.LEAST_UPPER_BOUND
            : BIAS.GREATEST_LOWER_BOUND,
      })
      if (
        generatedPosition.withSourceContent &&
        res.source &&
        hasOwn(res, 'line') &&
        hasOwn(res, 'column')
      ) {
        return Object.assign(res, {
          sourceContent: consumer.sourceContentFor(res.source, true),
        })
      }
      if (res.source && generatedPosition.inputDir) {
        res.source = join(generatedPosition.inputDir, res.source)
      }
      return res
    }
  )
}

/**
 * 根据生成后的文件名、行号、列号，返回源码文件、行号、列号（根据 kt|swift 文件返回 uts 文件）
 * 同步API
 * @param generatedPosition
 * @returns
 */
export function originalPositionForSync(
  generatedPosition: Omit<PositionFor, 'filename'> & { inputDir?: string }
): MappedPosition & { sourceContent?: string } {
  const consumer = resolveSourceMapConsumerSync(
    generatedPosition.sourceMapFile
  ) as SourceMapConsumerSync

  const res = consumer.originalPositionFor({
    line: generatedPosition.line,
    column: generatedPosition.column,
    bias:
      generatedPosition.column === 0
        ? BIAS.LEAST_UPPER_BOUND
        : BIAS.GREATEST_LOWER_BOUND,
  })
  if (
    generatedPosition.withSourceContent &&
    res.source &&
    hasOwn(res, 'line') &&
    hasOwn(res, 'column')
  ) {
    return Object.assign(res, {
      sourceContent: consumer.sourceContentFor(res.source, true) ?? '',
    })
  }
  if (res.source && generatedPosition.inputDir) {
    res.source = join(generatedPosition.inputDir, res.source)
  }
  return res
}

async function resolveSourceMapConsumer(sourceMapFile: string) {
  const stats = statSync(sourceMapFile)
  if (!stats.isFile()) {
    throw `${sourceMapFile} is not a file`
  }
  const cache = consumers[sourceMapFile]
  if (!cache || cache.time !== stats.mtimeMs) {
    consumers[sourceMapFile] = {
      time: stats.mtimeMs,
      consumer: await new SourceMapConsumer(
        readFileSync(sourceMapFile, 'utf8')
      ),
    }
  }
  return consumers[sourceMapFile].consumer
}

function resolveSourceMapConsumerSync(
  sourceMapFile: string
): SourceMapConsumerSync {
  const stats = statSync(sourceMapFile)
  if (!stats.isFile()) {
    throw `${sourceMapFile} is not a file`
  }
  const cache = consumers[sourceMapFile]
  if (!cache || cache.time !== stats.mtimeMs) {
    consumers[sourceMapFile] = {
      time: stats.mtimeMs,
      consumer: new SourceMapConsumerSync(
        JSON.parse(readFileSync(sourceMapFile, 'utf8'))
      ),
    }
  }
  return consumers[sourceMapFile].consumer as SourceMapConsumerSync
}

function normalizePath(path: string) {
  return path.replace(/\\/g, '/')
}
