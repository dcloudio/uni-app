import { resolve } from 'path'
import type { UtsKotlinOptions, UtsResult, UtsSwiftOptions } from './types'
import { normalizePath } from './utils'

const bindingsOverride = process.env['UTS_BINARY_PATH']
const bindings = !!bindingsOverride
  ? require(resolve(bindingsOverride))
  : require('./binding').default

export function toKotlin(options: UtsKotlinOptions): Promise<UtsResult> {
  const result = Promise.resolve({})
  const { input, output } = options
  if (!input?.root) {
    return result
  }
  if (!input?.filename) {
    return result
  }
  if (!output?.outDir) {
    return result
  }
  if (output.sourceMap === true) {
    output.sourceMap = output.outDir
  } else if (output.sourceMap === false) {
    output.sourceMap = ''
  }
  if (!output.imports) {
    // TODO
    output.imports = []
  }

  input.root = normalizePath(input.root)
  input.filename = normalizePath(input.filename)
  output.outDir = normalizePath(output.outDir)
  output.sourceMap = normalizePath(output.sourceMap)

  return bindings
    .toKotlin(toBuffer(options))
    .then((res: string) => JSON.parse(res))
}

export function toSwift(options: UtsSwiftOptions): Promise<UtsResult> {
  return bindings
    .toSwift(toBuffer(options))
    .then((res: string) => JSON.parse(res))
}

function toBuffer(t: any): Buffer {
  return Buffer.from(JSON.stringify(t))
}
