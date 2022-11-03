import { existsSync, readFileSync, statSync } from 'fs'
import { basename, dirname, join, relative } from 'path'
import {
  BasicSourceMapConsumer,
  IndexedSourceMapConsumer,
  NullableMappedPosition,
  NullablePosition,
  SourceMapConsumer,
} from 'source-map'
import { isWindows } from './shared'

const EXTNAME = {
  kotlin: '.kt',
  swift: '.swift',
}

const PLATFORM_DIR = {
  kotlin: 'app-android',
  swift: 'app-ios',
}

export function resolveUtsPluginSourceMapFile(
  target: 'kotlin' | 'swift',
  filename: string,
  inputDir: string,
  outputDir: string
) {
  const pluginDir = resolvePluginDir(inputDir, outputDir, filename)
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

function resolvePluginDir(
  inputDir: string,
  outputDir: string,
  filename: string
) {
  // 目标文件是编译后 kt 或 swift
  if (filename.startsWith(outputDir)) {
    const relativePath = relative(outputDir, filename)
    // uni_modules/test-uts
    if (relativePath.startsWith('uni_modules')) {
      return join(inputDir, join(relativePath, '../../..'))
    }
    // utssdk/test-uts
    return join(inputDir, join(relativePath, '../..'))
  } else if (filename.startsWith(inputDir)) {
    let parent = dirname(filename)
    const utssdkDir = join(inputDir, 'utssdk')
    const uniModulesDir = join(inputDir, 'uni_modules')
    while (parent) {
      const dir = dirname(parent)
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

interface PositionFor {
  sourceMapFile: string
  filename: string
  line: number
  column: number
}

const consumers: Record<
  string,
  { time: number; consumer: BasicSourceMapConsumer | IndexedSourceMapConsumer }
> = {}

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
}: PositionFor): Promise<NullablePosition> {
  return resolveSourceMapConsumer(sourceMapFile).then((consumer) => {
    return consumer.generatedPositionFor({
      source: isWindows ? `\\\\?\\` : '' + filename,
      line,
      column,
    })
  })
}

/**
 * 根据生成后的文件名、行号、列号，返回源码文件、行号、列号（根据 kt|swift 文件返回 uts 文件）
 * @param generatedPosition
 * @returns
 */
export function originalPositionFor(
  generatedPosition: PositionFor
): Promise<NullableMappedPosition> {
  return resolveSourceMapConsumer(generatedPosition.sourceMapFile).then(
    (consumer) => {
      return consumer.originalPositionFor({
        line: generatedPosition.line,
        column: generatedPosition.column,
      })
    }
  )
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
