export interface UtsParserConfig {
  /**
   * Defaults to `false`.
   */
  tsx?: boolean
  /**
   * Defaults to `false`.
   */
  decorators?: boolean
  /**
   * Defaults to `false`
   */
  dynamicImport?: boolean
}

export type UtsParseOptions = UtsParserConfig & {
  filename?: string
  comments?: boolean
}

export type InputKotlinOptions = UtsParseOptions & {
  root: string
  filename: string
  namespace?: string
}

export type OutputKotlinOptions = {
  outDir: string
  imports?: string[]
  sourceMap: boolean | string
  inlineSourcesContent?: boolean
}
export interface UtsKotlinOptions {
  input: InputKotlinOptions
  output: OutputKotlinOptions
}

export type InputSwiftOptions = UtsParseOptions & {
  root: string
  filename: string
}

export type OutputSwiftOptions = OutputKotlinOptions

export interface UtsSwiftOptions {
  input: InputSwiftOptions
  output: OutputSwiftOptions
}

export interface UtsResult {
  filename?: string
  time?: number
  error?: Error
}
