import path from 'path'
import fsExtra from 'fs-extra'
import { normalizePath } from '../shared'

export interface StandaloneSourceMapContext {
  sourceRoot: string
  tempSourceDir: string
  inputDir: string
}

interface SourceMapLike {
  sources?: unknown
  [key: string]: unknown
}

type ReadFileSync = typeof import('fs')['readFileSync']

/**
 * standalone 会先把真实源码复制到临时插件壳里。这里把 sourcemap 中的临时
 * __src__ 路径还原成调用方传入的真实源码路径，供后续 native 编译错误定位。
 */
export function rewriteStandaloneSourceMapSources(
  sourceMapFile: string,
  context: StandaloneSourceMapContext
) {
  if (!context.sourceRoot || !context.tempSourceDir || !context.inputDir) {
    return
  }
  if (!fsExtra.existsSync(sourceMapFile)) {
    return
  }

  try {
    const sourceMap = fsExtra.readJSONSync(sourceMapFile) as SourceMapLike
    if (!Array.isArray(sourceMap.sources)) {
      return
    }

    const changed = rewriteSourceMapSources(
      sourceMap,
      context.sourceRoot,
      context.tempSourceDir,
      context.inputDir
    )

    if (changed) {
      fsExtra.writeJSONSync(sourceMapFile, sourceMap)
    }
  } catch (e) {}
}

export function installStandaloneSourceMapReadPatch(
  context: StandaloneSourceMapContext
) {
  if (!context.sourceRoot || !context.tempSourceDir || !context.inputDir) {
    return () => {}
  }

  // 只在 standalone 编译期间临时改写 sourcemap 内容，避免侵入 kotlin/swift 编译链路。
  const fs = require('fs') as typeof import('fs')
  const originalReadFileSync = fs.readFileSync
  const patchedReadFileSync = function readFileSyncWithStandaloneSourceMap(
    ...args: Parameters<ReadFileSync>
  ) {
    const content = originalReadFileSync.apply(fs, args as any) as
      | string
      | Buffer
    return rewriteSourceMapContent(
      args[0],
      content,
      context.sourceRoot,
      context.tempSourceDir,
      context.inputDir
    ) as ReturnType<ReadFileSync>
  } as ReadFileSync
  fs.readFileSync = patchedReadFileSync

  return () => {
    if (fs.readFileSync === patchedReadFileSync) {
      fs.readFileSync = originalReadFileSync
    }
  }
}

function rewriteSourceMapContent(
  file: unknown,
  content: string | Buffer,
  sourceRoot: string,
  tempSourceDir: string,
  inputDir: string
) {
  if (typeof file !== 'string' || !file.endsWith('.map')) {
    return content
  }
  const isBuffer = Buffer.isBuffer(content)
  const text = isBuffer ? content.toString('utf8') : content
  let sourceMap: SourceMapLike
  try {
    sourceMap = JSON.parse(text)
  } catch (e) {
    return content
  }
  if (
    !rewriteSourceMapSources(sourceMap, sourceRoot, tempSourceDir, inputDir)
  ) {
    return content
  }
  const rewritten = JSON.stringify(sourceMap)
  return isBuffer ? Buffer.from(rewritten) : rewritten
}

function rewriteSourceMapSources(
  sourceMap: SourceMapLike,
  sourceRoot: string,
  tempSourceDir: string,
  inputDir: string
) {
  if (!Array.isArray(sourceMap.sources)) {
    return false
  }
  let changed = false
  sourceMap.sources = sourceMap.sources.map((source) => {
    if (typeof source !== 'string') {
      return source
    }
    const originalSource = resolveOriginalSource(
      source,
      sourceRoot,
      tempSourceDir,
      inputDir
    )
    if (originalSource) {
      changed = true
      return originalSource
    }
    return source
  })
  return changed
}

function resolveOriginalSource(
  source: string,
  sourceRoot: string,
  tempSourceDir: string,
  inputDir: string
) {
  const tempSourceFile = path.isAbsolute(source)
    ? source
    : path.resolve(inputDir, source)
  const relativeSource = path.relative(tempSourceDir, tempSourceFile)
  if (
    !relativeSource ||
    relativeSource.startsWith('..') ||
    path.isAbsolute(relativeSource)
  ) {
    return
  }
  return normalizePath(path.resolve(sourceRoot, relativeSource))
}
