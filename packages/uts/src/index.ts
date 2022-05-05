import { resolve } from 'path'
import { UtsKotlinOptions, UtsResult, UtsSwiftOptions } from './types'

export * from './types'

// Allow overrides to the location of the .node binding file
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
  return bindings.toKotlin(toBuffer(options))
}

export function toSwift(options: UtsSwiftOptions): Promise<UtsResult> {
  return bindings.toSwift(toBuffer(options))
}

function toBuffer(t: any): Buffer {
  return Buffer.from(JSON.stringify(t))
}
