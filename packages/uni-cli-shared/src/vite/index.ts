import type { Plugin } from 'vite'
import type { EmittedAsset } from 'rollup'
import type { ParserOptions } from '@vue/compiler-core'
import type {
  CompilerOptions,
  SFCStyleCompileOptions,
  TemplateCompiler,
} from '@vue/compiler-sfc'
import { UniViteCopyPluginOptions } from './plugins/copy'

export const cssTarget = 'chrome53'
export interface CopyOptions {
  /**
   * 静态资源，配置的目录，在 uni_modules 中同样支持
   */
  assets?: string[]
  targets?: UniViteCopyPluginOptions['targets']
}

interface UniVitePluginUniOptions {
  compiler?: TemplateCompiler
  styleOptions?: Pick<SFCStyleCompileOptions, 'postcssPlugins'>
  compilerOptions?: {
    miniProgram?: {
      emitFile?: (emittedFile: EmittedAsset) => string
    }
    isNativeTag?: ParserOptions['isNativeTag']
    isCustomElement?: ParserOptions['isCustomElement']
    directiveTransforms?: CompilerOptions['directiveTransforms']
    nodeTransforms?: CompilerOptions['nodeTransforms']
  }
  jsxOptions?: {
    babelPlugins?: any[]
  }
  copyOptions?: CopyOptions | (() => CopyOptions)
}
export interface UniVitePlugin extends Plugin {
  uni?: UniVitePluginUniOptions
}

export * from './utils'
export * from './plugins'
export * from './features'
export * from './autoImport'
