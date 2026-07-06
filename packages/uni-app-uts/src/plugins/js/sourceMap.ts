import path from 'path'
import { pathToFileURL } from 'node:url'
import fs from 'fs-extra'
import { normalizePath } from '@dcloudio/uni-cli-shared'

const sourceMappingURLRE = /\/\/# sourceMappingURL=.*/

export function resolveAppServiceSourceMapUrl(
  outputDir: string,
  jsFile: string,
  sourceMapFileName: string
) {
  return normalizePath(
    path.relative(
      path.dirname(path.resolve(outputDir, jsFile)),
      sourceMapFileName
    )
  )
}

export function resolveAppServiceSourceMapFileUrl(sourceMapFileName: string) {
  return pathToFileURL(normalizePath(path.resolve(sourceMapFileName))).href
}

export function resolveAppServiceSourceMapSourceRoot(
  sourceMapFileName: string,
  inputDir: string
) {
  return (
    normalizePath(path.relative(path.dirname(sourceMapFileName), inputDir)) ||
    '.'
  )
}

export function rewriteAppServiceSourceMappingURL(
  code: string,
  sourceMapUrl: string
) {
  if (!sourceMappingURLRE.test(code)) {
    return code
  }
  return code.replace(
    sourceMappingURLRE,
    `//# sourceMappingURL=${sourceMapUrl}`
  )
}

export function writeAppServiceSourceMapToCache({
  file,
  sourceMap,
  bundle,
  inputDir,
  outputDir,
  cacheDir,
  keepSourceMapInBundle,
  useCacheSourceMapUrl,
  sourceMapUrlMode,
  sourceRootMode,
}: {
  file: string
  sourceMap: string
  bundle: Record<string, any>
  inputDir: string
  outputDir: string
  cacheDir: string
  keepSourceMapInBundle: boolean
  useCacheSourceMapUrl: boolean
  sourceMapUrlMode?: 'relative' | 'absolute'
  sourceRootMode?: 'relative' | 'absolute'
}) {
  const source = JSON.parse(sourceMap)
  const newSourceMapFileName = path.resolve(cacheDir, 'sourcemap', file)
  const resolvedSourceRootMode =
    sourceRootMode || (useCacheSourceMapUrl ? 'relative' : 'absolute')
  source.sourceRoot =
    resolvedSourceRootMode === 'relative'
      ? resolveAppServiceSourceMapSourceRoot(newSourceMapFileName, inputDir)
      : normalizePath(inputDir)
  fs.outputFileSync(newSourceMapFileName, JSON.stringify(source))
  if (!keepSourceMapInBundle) {
    const jsFile = file.replace(/\.map$/, '')
    const outputChunk = bundle[jsFile]
    if (useCacheSourceMapUrl && outputChunk?.type === 'chunk') {
      const sourceMapUrl =
        sourceMapUrlMode === 'absolute'
          ? resolveAppServiceSourceMapFileUrl(newSourceMapFileName)
          : resolveAppServiceSourceMapUrl(
              outputDir,
              jsFile,
              newSourceMapFileName
            )
      outputChunk.code = rewriteAppServiceSourceMappingURL(
        outputChunk.code,
        sourceMapUrl
      )
    }
    delete bundle[file]
  }
  return newSourceMapFileName
}
