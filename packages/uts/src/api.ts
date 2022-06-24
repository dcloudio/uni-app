import { resolve } from 'path'
import type { UtsKotlinOptions, UtsResult, UtsSwiftOptions } from './types'
import { normalizePath } from './utils'

const bindingsOverride = process.env['UTS_BINARY_PATH']
const bindings = !!bindingsOverride
  ? require(resolve(bindingsOverride))
  : require('./binding').default

function resolveOptions(options: UtsKotlinOptions | UtsSwiftOptions) {
  const { input, output } = options
  if (!input?.root) {
    return
  }
  if (!input?.filename) {
    return
  }
  if (!output?.outDir) {
    return
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
  return options
}

export function toKotlin(options: UtsKotlinOptions): Promise<UtsResult> {
  const kotlinOptions = resolveOptions(options)
  if (!kotlinOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toKotlin(toBuffer(kotlinOptions))
    .then((res: string) => JSON.parse(res))
}

export function toSwift(options: UtsSwiftOptions): Promise<UtsResult> {
  const swiftOptions = resolveOptions(options)
  if (!swiftOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toSwift(toBuffer(swiftOptions))
    .then((res: string) => JSON.parse(res))
}

function toBuffer(t: any): Buffer {
  return Buffer.from(JSON.stringify(t))
}
