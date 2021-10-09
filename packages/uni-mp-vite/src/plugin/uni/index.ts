import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { TemplateCompiler } from '@vue/compiler-sfc'

import * as compiler from '@dcloudio/uni-mp-compiler'

export function uniOptions(): UniVitePlugin['uni'] {
  return {
    compiler: compiler as TemplateCompiler,
    compilerOptions: {
      isNativeTag: isServiceNativeTag,
      isCustomElement: isServiceCustomElement,
    },
  }
}
