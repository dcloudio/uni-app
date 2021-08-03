import { Plugin } from 'vite'
import { ParserOptions } from '@vue/compiler-core'
import { CompilerOptions, SFCTemplateCompileOptions } from '@vue/compiler-sfc'
export interface UniVitePlugin extends Plugin {
  uni?: {
    compilerOptions?: {
      isNativeTag: ParserOptions['isNativeTag']
      isCustomElement: ParserOptions['isCustomElement']
      directiveTransforms?: CompilerOptions['directiveTransforms']
    }
    transformEvent?: Record<string, string>
    transformAssetUrls?: SFCTemplateCompileOptions['transformAssetUrls']
  }
}

export * from './utils'
export * from './plugins'
export * from './features'
