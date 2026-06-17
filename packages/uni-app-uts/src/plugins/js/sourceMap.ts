import path from 'path'
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
}: {
  file: string
  sourceMap: string
  bundle: Record<string, any>
  inputDir: string
  outputDir: string
  cacheDir: string
  keepSourceMapInBundle: boolean
  useCacheSourceMapUrl: boolean
}) {
  const source = JSON.parse(sourceMap)
  const newSourceMapFileName = path.resolve(cacheDir, 'sourcemap', file)
  source.sourceRoot = useCacheSourceMapUrl
    ? resolveAppServiceSourceMapSourceRoot(newSourceMapFileName, inputDir)
    : normalizePath(inputDir)
  fs.outputFileSync(newSourceMapFileName, JSON.stringify(source))
  if (!keepSourceMapInBundle) {
    const jsFile = file.replace(/\.map$/, '')
    const outputChunk = bundle[jsFile]
    if (useCacheSourceMapUrl && outputChunk?.type === 'chunk') {
      outputChunk.code = rewriteAppServiceSourceMappingURL(
        outputChunk.code,
        resolveAppServiceSourceMapUrl(outputDir, jsFile, newSourceMapFileName)
      )
    }
    delete bundle[file]
  }
  return newSourceMapFileName
}
