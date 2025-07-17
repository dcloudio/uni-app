import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { basename, dirname, extname, join, relative, resolve } from 'path'
import { hasOwn } from '@vue/shared'
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
import {
  parseKotlinPackageWithPluginId,
  resolveUniAppXSourceMapPath,
} from './utils'
import { kotlinSrcDir } from './uvue'
import { once, resolveSourceMapPath } from './shared'
import {
  parseFilenameByClassName,
  updateUTSKotlinSourceMapManifestCache,
} from './stacktrace/kotlin'

const EXTNAME = {
  kotlin: '.kt',
  swift: '.swift',
  arkts: '.ets',
}

const PLATFORM_DIR = {
  kotlin: 'app-android',
  swift: 'app-ios',
  arkts: 'app-harmony',
}

const uniModulesUTSPackagePrefix = 'uts.sdk.modules.'

const initUniModulesUTSKotlinSourceMapFiles = once(
  (inputDir: string, outputDir: string) => {
    const target = 'kotlin'
    const sourceMapFiles = new Map<string, string>()
    const uniModulesDir = resolve(inputDir, 'uni_modules')
    if (existsSync(uniModulesDir)) {
      readdirSync(uniModulesDir).forEach((dir) => {
        if (existsSync(join(uniModulesDir, dir, 'utssdk'))) {
          sourceMapFiles.set(
            parseKotlinPackageWithPluginId(dir, true),
            join(
              outputDir,
              '../.sourcemap/app',
              'uni_modules',
              dir,
              'utssdk',
              PLATFORM_DIR[target],
              `index${EXTNAME[target]}.map`
            )
          )
        }
      })
    }
    return sourceMapFiles
  }
)

export function resolveUTSSourceMapFile(
  target: 'kotlin', // | 'swift',
  filename: string,
  inputDir: string,
  outputDir: string,
  cacheDir?: string
) {
  if (target !== 'kotlin') {
    throw `only support kotlin, but got ${target}`
  }
  if (cacheDir) {
    process.env.UNI_APP_X_CACHE_DIR = cacheDir
  }
  if (!process.env.UNI_APP_X_CACHE_DIR) {
    throw 'UNI_APP_X_CACHE_DIR is not set'
  }
  inputDir = normalizePath(inputDir)
  outputDir = normalizePath(outputDir)
  const kotlinRootOutDir = kotlinDir(outputDir)
  const kotlinSrcOutDir = kotlinSrcDir(kotlinRootOutDir)

  if (target === 'kotlin') {
    // uts插件
    if (filename.startsWith(uniModulesUTSPackagePrefix)) {
      for (const [key, value] of initUniModulesUTSKotlinSourceMapFiles(
        inputDir,
        outputDir
      )) {
        if (filename.startsWith(key)) {
          return value
        }
      }
      throw `${filename} sourcemap not found`
      // uni-app x 主项目
    } else if (filename.startsWith('uni.')) {
      updateUTSKotlinSourceMapManifestCache(process.env.UNI_APP_X_CACHE_DIR)
      filename = resolve(
        kotlinSrcOutDir,
        parseFilenameByClassName(
          filename.replace(filename.split('.', 2).join('.') + '.', '')
        )
      )
    }
  }

  filename = normalizePath(filename)

  if (filename.includes('/utssdk/')) {
    // 大概率是插件
    return resolveUTSPluginSourceMapFile(target, filename, inputDir, outputDir)
  }

  const fileExtname = extname(filename)

  // 如果是源文件，比如uvue,vue,uts等，则需要转换为kt文件路径
  const isSrcFile =
    fileExtname !== EXTNAME[target] &&
    filename.startsWith(inputDir) &&
    !filename.startsWith(outputDir)
  if (isSrcFile) {
    filename = normalizePath(
      resolve(
        kotlinSrcOutDir,
        relative(inputDir, filename).replace(fileExtname, EXTNAME[target])
      )
    )
  }

  // 文件是 kt 或 swift
  if (extname(filename) === EXTNAME[target]) {
    const relativeFileName = relative(kotlinSrcOutDir, filename)
    const sourceMapFile = resolveSourceMapFile(
      relativeFileName,
      resolveUniAppXSourceMapPath(kotlinDir(outputDir))
    )
    if (sourceMapFile) {
      return sourceMapFile
    }
  }
  if (isSrcFile) {
    const sourceMapFile = resolveSourceMapFile(
      'index.kt',
      resolveUniAppXSourceMapPath(kotlinDir(outputDir))
    )
    if (sourceMapFile) {
      return sourceMapFile
    }
  }
  throw `${filename} sourcemap not found`

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
  target: 'kotlin' | 'swift' | 'arkts',
  filename: string,
  inputDir: string,
  outputDir: string
) {
  inputDir = normalizePath(inputDir)
  outputDir = normalizePath(outputDir)
  filename = normalizePath(filename)
  const pluginDir = resolvePluginDir(target, inputDir, outputDir, filename)
  if (!pluginDir) {
    throw `plugin dir not found`
  }
  const is_uni_modules = basename(dirname(pluginDir)) === 'uni_modules'
  if (is_uni_modules && (target === 'kotlin' || target === 'swift')) {
    // 传入的可能是混编文件，该文件路径可能是源码工程路径，也可能是copy后路径
    const extname = EXTNAME[target]
    if (extname && filename.endsWith(extname)) {
      // 重要：必须先判断输出目录，再判断源码目录
      // 如果是copy后路径，则可能是混编文件
      if (filename.startsWith(outputDir)) {
        // 不是index.kt、index.swift、index.ets。那就是混编文件
        const outputUTSSDKDir = join(
          outputDir,
          relative(inputDir, pluginDir),
          'utssdk',
          PLATFORM_DIR[target]
        )
        if (
          // 开发时目录
          filename !==
            normalizePath(join(outputUTSSDKDir, 'index' + extname)) &&
          // 发行时目录
          filename !==
            normalizePath(join(outputUTSSDKDir, 'src', 'index' + extname))
        ) {
          return normalizePath(relative(outputDir, filename)) + '.fake.map'
        }
      } else if (filename.startsWith(inputDir)) {
        // 如果是源码工程路径，则肯定是混编文件
        return normalizePath(relative(inputDir, filename)) + '.fake.map'
      }
    }
  }
  const sourceMapFile =
    target === 'arkts'
      ? join(
          outputDir,
          '../.sourcemap/app-harmony',
          relative(inputDir, pluginDir),
          is_uni_modules ? 'utssdk' : '',
          PLATFORM_DIR[target],
          `index${EXTNAME[target]}.map`
        )
      : join(
          join(outputDir, '../.sourcemap/app'),
          relative(inputDir, pluginDir),
          is_uni_modules ? 'utssdk' : '',
          PLATFORM_DIR[target],
          `index${EXTNAME[target]}.map`
        )
  if (!existsSync(sourceMapFile)) {
    throw `${sourceMapFile} not found`
  }
  if (target === 'swift' && !filename.endsWith(EXTNAME[target])) {
    // 源文件，比如 uts，需要读取sourceMapFile中是否真的存在该文件，因为可能会不合法的uts文件来换取，比如app-android里边的
    const consumer = resolveSourceMapConsumerSync(sourceMapFile)
    const source = resolveSource(consumer, filename)
    if (!source) {
      throw `${filename} not found in ${sourceMapFile}`
    }
    return sourceMapFile
  }
  return sourceMapFile
}
// 兼容旧版本
export const resolveUtsPluginSourceMapFile = resolveUTSPluginSourceMapFile

function resolvePluginDir(
  target: 'kotlin' | 'swift' | 'arkts',
  inputDir: string,
  outputDir: string,
  filename: string
) {
  if (target === 'arkts') {
    const parts = normalizePath(filename).split('/uni_modules/')
    if (parts.length > 1) {
      return join(
        inputDir,
        'uni_modules',
        parts[parts.length - 1].split('/')[0]
      )
    }
  }
  // 目标文件是编译后 kt 或 swift 或 ets
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
  consumer:
    | BasicSourceMapConsumer
    | IndexedSourceMapConsumer
    | SourceMapConsumerSync,
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
export async function generatedPositionFor({
  sourceMapFile,
  filename,
  line,
  column,
  outputDir,
  platform,
}: PositionFor & {
  outputDir?: string
  platform?: 'app-harmony' | 'app' | 'app-android' | 'app-ios'
}): Promise<
  NullablePosition & { source: string | null; relativeSource: string | null }
> {
  if (sourceMapFile.endsWith('.fake.map')) {
    const relativeSource = sourceMapFile.replace('.fake.map', '')
    return Promise.resolve({
      source: relativeSource,
      relativeSource,
      line,
      column,
      lastColumn: column,
    })
  }
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
    let relativeSource: string | null = null
    if (outputDir) {
      // 根据 sourceMapFile 和 outputDir，计算出生成后的文件路径
      const normalizedSourceMapFile = normalizePath(sourceMapFile)
      if (!platform) {
        // 默认 app，目前硬编码识别
        platform = normalizedSourceMapFile.includes('/.sourcemap/app-harmony/')
          ? 'app-harmony'
          : 'app'
      }
      const sourceMapRootDirs = [
        {
          sourceMapRootDir: normalizePath(
            resolveSourceMapPath(
              outputDir,
              platform === 'app-android' || platform === 'app-ios'
                ? 'app'
                : platform
            )
          ),
          outputDir: outputDir,
        },
      ]
      // 理论上以下逻辑需要 app-android 下生效，但目前可能没传platform，所以默认也生效
      const kotlinOutDir = kotlinDir(outputDir)
      if (kotlinOutDir) {
        sourceMapRootDirs.push({
          sourceMapRootDir: normalizePath(
            resolveUniAppXSourceMapPath(kotlinOutDir)
          ),
          outputDir: join(kotlinOutDir, 'src'),
        })
      }
      for (const { sourceMapRootDir, outputDir } of sourceMapRootDirs) {
        if (normalizedSourceMapFile.startsWith(sourceMapRootDir)) {
          relativeSource = normalizePath(
            relative(sourceMapRootDir, sourceMapFile).replace('.map', '')
          )
          source = join(outputDir, relativeSource)
          break
        }
      }
    }
    return Object.assign(res, { source, relativeSource })
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
  if (generatedPosition.sourceMapFile.endsWith('.fake.map')) {
    const relativeSource = generatedPosition.sourceMapFile.replace(
      '.fake.map',
      ''
    )
    return Promise.resolve({
      source: relativeSource,
      relativeSource,
      line: generatedPosition.line,
      column: generatedPosition.column,
      name: null,
    })
  }
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
): MappedPosition & { sourceContent?: string; sourceRoot?: string | null } {
  if (generatedPosition.sourceMapFile.endsWith('.fake.map')) {
    const relativeSource = generatedPosition.sourceMapFile.replace(
      '.fake.map',
      ''
    )
    return {
      source: relativeSource,
      line: generatedPosition.line,
      column: generatedPosition.column,
    }
  }
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
      sourceRoot: consumer.sourceRoot,
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
