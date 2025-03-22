import fs from 'fs'
import { createHash } from 'crypto'
import {
  enableSourceMap,
  preUVueHtml,
  preUVueJs,
} from '@dcloudio/uni-cli-shared'
import type * as _compiler from '@vue/compiler-sfc'
import type { CompilerError, SFCDescriptor } from '@vue/compiler-sfc'
import { parseUTSRelativeFilename } from '../utils'
import { scriptIdentifier } from './sfc/script'

export interface ResolvedOptions {
  compiler: typeof _compiler
  root: string
  sourceMap: boolean
  targetLanguage?: 'kotlin'
  classNamePrefix?: string
  genDefaultAs?: string
}

export function getResolvedOptions(): ResolvedOptions {
  const options: ResolvedOptions = {
    root: process.env.UNI_INPUT_DIR,
    sourceMap: enableSourceMap(),
    // eslint-disable-next-line no-restricted-globals
    compiler: require('@vue/compiler-sfc'),
    targetLanguage: process.env.UNI_UTS_TARGET_LANGUAGE as 'kotlin',
    genDefaultAs: scriptIdentifier,
  }
  if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
    options.classNamePrefix = 'Uni'
  }
  return options
}

// compiler-sfc should be exported so it can be re-used
export interface SFCParseResult {
  descriptor: SFCDescriptor
  errors: Array<CompilerError | SyntaxError>
}

export const cache = new Map<string, SFCDescriptor>()

declare module '@vue/compiler-sfc' {
  interface SFCDescriptor {
    id: string
    relativeFilename: string
  }
}

export function createDescriptor(
  filename: string,
  source: string,
  {
    root,
    sourceMap,
    compiler,
  }: ResolvedOptions & { compiler: typeof _compiler }
): SFCParseResult {
  // ensure the path is normalized in a way that is consistent inside
  // project (relative to root) and on different systems.
  const relativeFilename = parseUTSRelativeFilename(filename, root)
  // 传入normalizedPath是为了让sourcemap记录的是相对路径
  const { descriptor, errors } = compiler.parse(source, {
    filename: relativeFilename,
    sourceMap,
  })
  descriptor.relativeFilename = relativeFilename
  // 重置为绝对路径
  descriptor.filename = filename

  descriptor.id = getHash(relativeFilename)

  cache.set(filename, descriptor)
  return { descriptor, errors }
}

export function getDescriptor(
  filename: string,
  options: ResolvedOptions,
  createIfNotFound = true
): SFCDescriptor | undefined {
  if (cache.has(filename)) {
    return cache.get(filename)!
  }
  if (createIfNotFound) {
    const { descriptor, errors } = createDescriptor(
      filename,
      preUVueJs(
        preUVueHtml(fs.readFileSync(filename, 'utf-8'), filename),
        filename
      ),
      options
    )
    if (errors.length) {
      throw errors[0]
    }
    return descriptor
  }
}

export function getSrcDescriptor(filename: string): SFCDescriptor {
  return cache.get(filename)!
}

export function setSrcDescriptor(filename: string, entry: SFCDescriptor): void {
  cache.set(filename, entry)
}

function getHash(text: string): string {
  return createHash('sha256').update(text).digest('hex').substring(0, 8)
}
