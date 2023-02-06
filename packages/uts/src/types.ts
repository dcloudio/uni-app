export enum UtsTarget {
  KOTLIN = 'kotlin',
  SWIFT = 'swift',
}
export interface UtsParserConfig {
  /**
   * Defaults to `false`
   */
  allowImportWithoutSpecifiers?: boolean
}

export type UtsParseOptions = UtsParserConfig & {
  filename?: string
  comments?: boolean
  noColor?: boolean
}

export type UtsInputOptions = UtsParseOptions & {
  root: string
  pluginId: string
  filename: string
  fileContent?: string
  fileAppendContent?: string
  paths: Record<string, string>
}

export type UtsOutputOptions = {
  outDir: string
  package: string
  imports?: string[]
  sourceMap?: boolean | string
  inlineSourcesContent?: boolean
  extname: string
  logFilename?: boolean
  noColor?: boolean
  isPlugin?: boolean
}
export interface UtsOptions {
  input: UtsInputOptions
  output: UtsOutputOptions
}

export interface UtsResult {
  filename?: string
  deps?: string[]
  time?: number
  error?: Error
}

export interface UtsBundleOptions extends UtsOptions {}
