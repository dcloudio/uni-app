export enum UTSTarget {
  KOTLIN = 'kotlin',
  SWIFT = 'swift',
}
export interface UTSParserConfig {
  /**
   * Defaults to `false`
   */
  allowImportWithoutSpecifiers?: boolean
  /**
   * Defaults to `false`
   */
  noGetterOrSetterProp?: boolean
}

export type UTSParseOptions = UTSParserConfig & {
  filename?: string
  comments?: boolean
  noColor?: boolean
}

export type UTSInputOptions = UTSParseOptions & {
  root: string
  pluginId?: string
  filename: string
  fileContent?: string
  fileAppendContent?: string
  paths: Record<string, string>
}

export type UTSOutputOptions = {
  outDir: string
  package: string
  imports?: string[]
  sourceMap?: boolean | string
  inlineSourcesContent?: boolean
  extname: string
  logFilename?: boolean
  noColor?: boolean
  isPlugin?: boolean
  transform?: {
    paramDefaultValue?: boolean
    constructorInvocation?: boolean
    uniExtApiPackage?: string
  }
}
export interface UTSOptions {
  input: UTSInputOptions
  output: UTSOutputOptions
}

export interface UTSResult {
  filename?: string
  deps?: string[]
  time?: number
  error?: Error
}

export interface UTSBundleOptions extends UTSOptions {}
