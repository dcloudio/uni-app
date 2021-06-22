import { Plugin } from 'vite'
import { ParserOptions } from '@vue/compiler-core'
export interface UniVitePlugin extends Plugin {
  uni?: {
    compilerOptions?: {
      isNativeTag: ParserOptions['isNativeTag']
      isCustomElement: ParserOptions['isCustomElement']
    }
    transformEvent?: Record<string, string>
  }
}

export * from './utils'
export * from './plugins'
export * from './features'
