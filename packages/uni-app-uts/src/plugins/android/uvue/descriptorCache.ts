import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import type * as _compiler from '@vue/compiler-sfc'
import type { CompilerError, SFCDescriptor } from '@vue/compiler-sfc'
import { normalizePath } from '@dcloudio/uni-cli-shared'

export interface ResolvedOptions {
  compiler: typeof _compiler
  root: string
  sourceMap: boolean
  targetLanguage?: 'kotlin'
  classNamePrefix?: string
}

export function getResolvedOptions(): ResolvedOptions {
  return {
    root: process.env.UNI_INPUT_DIR,
    sourceMap: process.env.NODE_ENV === 'development',
    // eslint-disable-next-line no-restricted-globals
    compiler: require('@vue/compiler-sfc'),
    targetLanguage: process.env.UNI_UTS_TARGET_LANGUAGE as 'kotlin',
  }
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
  }
}

export function createDescriptor(
  filename: string,
  source: string,
  { root, sourceMap, compiler }: ResolvedOptions
): SFCParseResult {
  // ensure the path is normalized in a way that is consistent inside
  // project (relative to root) and on different systems.
  const normalizedPath = normalizePath(
    path.normalize(path.relative(root, filename))
  )
  // 传入normalizedPath是为了让sourcemap记录的是相对路径
  const { descriptor, errors } = compiler.parse(source, {
    filename: normalizedPath,
    sourceMap,
  })
  // 重置为绝对路径
  descriptor.filename = filename

  descriptor.id = getHash(normalizedPath)

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
      fs.readFileSync(filename, 'utf-8'),
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
