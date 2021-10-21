import type { Plugin } from 'vite'
import type { EmittedAsset } from 'rollup'
import type { ParserOptions } from '@vue/compiler-core'
import type { CompilerOptions, TemplateCompiler } from '@vue/compiler-sfc'
import { UniViteCopyPluginOptions } from './plugins/copy'

export interface CopyOptions {
  /**
   * 静态资源，配置的目录，在 uni_modules 中同样支持
   */
  assets?: string[]
  targets?: UniViteCopyPluginOptions['targets']
}

interface UniVitePluginUniOptions {
  compiler?: TemplateCompiler
  compilerOptions?: {
    miniProgram?: {
      emitFile?: (emittedFile: EmittedAsset) => string
    }
    isNativeTag: ParserOptions['isNativeTag']
    isCustomElement: ParserOptions['isCustomElement']
    directiveTransforms?: CompilerOptions['directiveTransforms']
    nodeTransforms?: CompilerOptions['nodeTransforms']
  }
  transformEvent?: Record<string, string>
  copyOptions?: CopyOptions | (() => CopyOptions)
}
export interface UniVitePlugin extends Plugin {
  uni?: UniVitePluginUniOptions
}

export * from './utils'
export * from './plugins'
export * from './features'
