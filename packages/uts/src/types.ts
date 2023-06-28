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
  uniModules?: string[]
  globals?: {
    envs?: Record<string, string>
  }
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
  isX?: boolean
  isPlugin?: boolean
  split?: boolean
  transform?: {
    paramDefaultValue?: boolean
    constructorInvocation?: boolean
    uniExtApiDefaultNamespace?: string
    uniExtApiNamespaces?: Record<string, [string, string]>
    uvueClassNamePrefix?: string
    uvueClassNameOnlyBasename?: boolean
    disableReactiveObject?: boolean
  }
}
export interface UTSOptions {
  input: UTSInputOptions
  output: UTSOutputOptions
}

export interface UTSResult {
  filename?: string
  deps?: string[]
  chunks?: string[]
  changed?: string[]
  time?: number
  error?: Error
}

export interface UTSBundleOptions extends UTSOptions {}
