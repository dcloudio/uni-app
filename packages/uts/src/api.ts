import { resolve } from 'path'
import type {
  UtsBundleOptions,
  UtsOptions,
  UtsParseOptions,
  UtsResult,
} from './types'
import { normalizePath } from './utils'

const bindingsOverride = process.env['UTS_BINARY_PATH']
const bindings = !!bindingsOverride
  ? require(resolve(bindingsOverride))
  : require('./binding').default

function resolveOptions(options: UtsOptions) {
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
  } else if (
    output.sourceMap === false ||
    typeof output.sourceMap === 'undefined'
  ) {
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
  output.logFilename = !!output.logFilename
  output.noColor = !!output.noColor

  return options
}

export function parse(source: string, options: UtsParseOptions = {}) {
  options.noColor = !!options.noColor
  return bindings
    .parse(source, toBuffer(options))
    .then((res: string) => JSON.parse(res))
}

export function toKotlin(options: UtsOptions): Promise<UtsResult> {
  const kotlinOptions = resolveOptions(options)
  if (!kotlinOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toKotlin(toBuffer(kotlinOptions))
    .then((res: string) => JSON.parse(res))
}

export function bundleKotlin(options: UtsBundleOptions): Promise<UtsResult> {
  const bundleOptions = resolveOptions(options)
  if (!bundleOptions) {
    return Promise.resolve({})
  }
  return bindings
    .bundleKotlin(toBuffer(bundleOptions))
    .then((res: string) => JSON.parse(res))
}

export function toSwift(options: UtsOptions): Promise<UtsResult> {
  const swiftOptions = resolveOptions(options)
  if (!swiftOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toSwift(toBuffer(swiftOptions))
    .then((res: string) => JSON.parse(res))
}

export function bundleSwift(options: UtsBundleOptions): Promise<UtsResult> {
  const bundleOptions = resolveOptions(options)
  if (!bundleOptions) {
    return Promise.resolve({})
  }
  return bindings
    .bundleSwift(toBuffer(bundleOptions))
    .then((res: string) => JSON.parse(res))
}

function toBuffer(t: any): Buffer {
  return Buffer.from(JSON.stringify(t))
}
