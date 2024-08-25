export enum UTSTarget {
  KOTLIN = 'kotlin',
  SWIFT = 'swift',
  ARKTS = 'arkts',
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
  externals?: string[]
  uniModules?: string[]
  globals?: {
    envs?: Record<string, string>
    vars?: Record<string, string>
  }
  parseOptions?: {
    tsx?: boolean
    noEarlyErrors?: boolean
    allowComplexUnionType?: boolean
    allowTsLitType?: boolean
  }
}

export type UTSOutputOptions = {
  outDir: string
  outFilename?: string
  package: string
  banner?: string
  footer?: string
  imports?: string[]
  sourceMap?: boolean | string
  inlineSourcesContent?: boolean
  extname: string
  logFilename?: boolean
  noColor?: boolean
  public?: boolean // only for swift
  isX?: boolean
  isApp?: boolean
  isSingleThread?: boolean
  isPlugin?: boolean
  isModule?: boolean
  isExtApi?: boolean
  split?: boolean
  disableSplitManifest?: boolean
  removeImports?: boolean
  dropImports?: string[]
  returnExportIdent?: boolean
  uniAppX?: {
    uvueOutDir: string
  }
  transform?: {
    paramDefaultValue?: boolean
    constructorInvocation?: boolean
    uniExtApiDefaultNamespace?: string
    uniExtApiNamespaces?: Record<string, [string, string]>
    uniExtApiDefaultParameters?: Record<string, string[]>
    uniExtApiProviderName?: string
    uniExtApiProviderService?: string
    uniExtApiProviderServicePlugin?: string
    uniExtApiProviders?: [string, string, string][]
    uvueClassNamePrefix?: string
    uvueClassNameOnlyBasename?: boolean
    uvueGenDefaultAs?: string
    disableReactiveObject?: boolean
    reactiveObjects?: string[]
    reactiveAll?: boolean
    uniCloudObjectInfo?: { name: string; methodList: string[] }[]
    autoImports?: Record<string, [string, string?][]>
    autoImportExternals?: Record<string, [string, string?][]>
    uniModulesArtifacts?: {
      name: string
      package: string
      scopedSlots: string[]
      declaration: string
    }[]
  }
  treeshake?: {
    manualPureFunctions?: string[]
    noSideEffects?: boolean
  }
  wrapperFunctionName?: string
  wrapperFunctionArgs?: [string, string][]
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
  scoped_slots?: string[]
  exports?: string[]
  time?: number
  error?: Error
}

export interface UTSBundleOptions extends UTSOptions {}
