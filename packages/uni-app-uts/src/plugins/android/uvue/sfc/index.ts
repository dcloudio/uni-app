import {
  SFCScriptCompileOptions,
  SFCStyleCompileOptions,
  SFCTemplateCompileOptions,
} from '@vue/compiler-sfc'

import type * as _compiler from '@vue/compiler-sfc'

export interface Options {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]

  isProduction?: boolean

  // options to pass on to vue/compiler-sfc
  script?: Partial<
    Pick<
      SFCScriptCompileOptions,
      'babelParserPlugins'
      // | 'globalTypeFiles'
      //   | 'propsDestructure'
      //   | 'fs'
      //   | 'hoistStatic'
    >
  > & {
    /**
     * @deprecated defineModel is now a stable feature and always enabled if
     * using Vue 3.4 or above.
     */
    defineModel?: boolean
  }
  template?: Partial<
    Pick<
      SFCTemplateCompileOptions,
      | 'compiler'
      | 'compilerOptions'
      | 'preprocessOptions'
      | 'preprocessCustomRequire'
      | 'transformAssetUrls'
    >
  >
  style?: Partial<Pick<SFCStyleCompileOptions, 'trim'>>

  /**
   * Transform Vue SFCs into custom elements.
   * - `true`: all `*.vue` imports are converted into custom elements
   * - `string | RegExp`: matched files are converted into custom elements
   *
   * @default /\.ce\.vue$/
   */
  customElement?: boolean | string | RegExp | (string | RegExp)[]

  /**
   * Use custom compiler-sfc instance. Can be used to force a specific version.
   */
  compiler?: typeof _compiler
}

export interface ResolvedOptions extends Options {
  compiler: typeof _compiler
  root: string
  sourceMap: boolean
  cssDevSourcemap?: boolean
  targetLanguage?: 'kotlin'
  className?: string
}
