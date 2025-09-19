import { resolve } from 'path'
import type {
  ToCppCodeOptions,
  UTSBundleOptions,
  UTSOptions,
  UTSParseOptions,
  UTSResult,
} from './types'
import { normalizePath } from './utils'

const bindingsOverride = process.env['UTS_BINARY_PATH']
const bindings = !!bindingsOverride
  ? require(resolve(bindingsOverride))
  : require('./binding').default

function resolveOptions(options: UTSOptions) {
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
  if (output.extname && output.extname[0] === '.') {
    output.extname = output.extname.slice(1)
  }

  return options
}

export async function parse(source: string, options: UTSParseOptions = {}) {
  options.noColor = !!options.noColor
  return bindings
    .parse(source, toBuffer(options))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function toKotlin(options: UTSOptions): Promise<UTSResult> {
  const kotlinOptions = resolveOptions(options)
  if (!kotlinOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toKotlin(toBuffer(kotlinOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function bundleKotlin(
  options: UTSBundleOptions
): Promise<UTSResult> {
  const bundleOptions = resolveOptions(options)
  if (!bundleOptions) {
    return Promise.resolve({})
  }
  return bindings
    .bundleKotlin(toBuffer(bundleOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function toSwift(options: UTSOptions): Promise<UTSResult> {
  const swiftOptions = resolveOptions(options)
  if (!swiftOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toSwift(toBuffer(swiftOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function bundleSwift(
  options: UTSBundleOptions
): Promise<UTSResult> {
  const bundleOptions = resolveOptions(options)
  if (!bundleOptions) {
    return Promise.resolve({})
  }
  return bindings
    .bundleSwift(toBuffer(bundleOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function toArkTS(options: UTSOptions): Promise<UTSResult> {
  const arkTSOptions = resolveOptions(options)
  if (!arkTSOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toSwift(toBuffer(arkTSOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function toCpp(options: UTSOptions): Promise<UTSResult> {
  const cppOptions = resolveOptions(options)
  if (!cppOptions) {
    return Promise.resolve({})
  }
  return bindings
    .toCpp(toBuffer(cppOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

export async function toCppCode(options: ToCppCodeOptions): Promise<string> {
  if (!options.code) {
    return Promise.resolve('')
  }
  return bindings.toCppCode(toBuffer(options))
}

export async function bundleArkTS(
  options: UTSBundleOptions
): Promise<UTSResult> {
  const bundleOptions = resolveOptions(options)
  if (!bundleOptions) {
    return Promise.resolve({})
  }
  return bindings
    .bundleArkTS(toBuffer(bundleOptions))
    .then((res: string) => JSON.parse(res))
    .catch((error: Error) => {
      return { error }
    })
}

function toBuffer(t: any): Buffer {
  // 'Buffer' only refers to a type, but is being used as a value here
  return Buffer.from(JSON.stringify(t))
}
