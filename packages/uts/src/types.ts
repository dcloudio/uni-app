export type UtsTarget =
  | 'es3'
  | 'es5'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'es2021'
  | 'es2022'

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
  /**
   * default es2022
   */
  target?: UtsTarget
}

export type InputKotlinOptions = UtsParseOptions & {
  root: string
  filename: string
  namespace?: string
}

export type OutputKotlinOptions = {
  outDir: string
  sourceMap: boolean | string
  inlineSourcesContent?: boolean
}
export interface UtsKotlinOptions {
  input: InputKotlinOptions
  output: OutputKotlinOptions
}

export type InputSwiftOptions = UtsParseOptions
export type OutputSwiftOptions = {}

export interface UtsSwiftOptions {
  input: InputSwiftOptions
  output: OutputSwiftOptions
}

export interface UtsResult {
  filename?: string
}
