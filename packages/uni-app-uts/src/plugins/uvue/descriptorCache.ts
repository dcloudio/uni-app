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
  targetLanguage?: 'kotlin' | 'swift' | 'javascript'
  classNamePrefix?: string
}

// compiler-sfc should be exported so it can be re-used
export interface SFCParseResult {
  descriptor: SFCDescriptor
  errors: Array<CompilerError | SyntaxError>
}

const cache = new Map<string, SFCDescriptor>()
const prevCache = new Map<string, SFCDescriptor | undefined>()

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
  const { descriptor, errors } = compiler.parse(source, {
    filename,
    sourceMap,
  })

  // ensure the path is normalized in a way that is consistent inside
  // project (relative to root) and on different systems.
  const normalizedPath = normalizePath(
    path.normalize(path.relative(root, filename))
  )
  descriptor.id = getHash(normalizedPath)

  cache.set(filename, descriptor)
  return { descriptor, errors }
}

export function getPrevDescriptor(filename: string): SFCDescriptor | undefined {
  return prevCache.get(filename)
}

export function setPrevDescriptor(
  filename: string,
  entry: SFCDescriptor
): void {
  prevCache.set(filename, entry)
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
