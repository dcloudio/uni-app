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
  outFilename?: string
  package: string
  imports?: string[]
  sourceMap?: boolean | string
  inlineSourcesContent?: boolean
  extname: string
  logFilename?: boolean
  noColor?: boolean
  isX?: boolean
  isApp?: boolean
  isSingleThread?: boolean
  isPlugin?: boolean
  split?: boolean
  disableSplitManifest?: boolean
  uniAppX?: {
    uvueOutDir: string
  }
  transform?: {
    paramDefaultValue?: boolean
    constructorInvocation?: boolean
    uniExtApiDefaultNamespace?: string
    uniExtApiNamespaces?: Record<string, [string, string]>
    uniExtApiDefaultParameters?: Record<string, string[]>
    uvueClassNamePrefix?: string
    uvueClassNameOnlyBasename?: boolean
    disableReactiveObject?: boolean
    reactiveObjects?: string[]
    reactiveAll?: boolean
    uniCloudObjectInfo?: { name: string; methodList: string[] }[]
    autoImports?: Record<string, [[string, string]]>
  }
}
export interface UTSOptions {
  mode?: string
  hbxVersion: string
  input: UTSInputOptions
  output: UTSOutputOptions
}

export interface UTSResult {
  filename?: string
  deps?: string[]
  chunks?: string[]
  changed?: string[]
  inject_apis?: string[]
  time?: number
  error?: Error
}

export interface UTSBundleOptions extends UTSOptions {}
