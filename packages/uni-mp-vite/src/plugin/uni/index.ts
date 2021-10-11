import {
  isServiceNativeTag,
  isServiceCustomElement,
} from '@dcloudio/uni-shared'
import { EmittedFile } from 'rollup'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { TemplateCompiler } from '@vue/compiler-sfc'

import * as compiler from '@dcloudio/uni-mp-compiler'

export function uniOptions(miniProgram: {
  emitFile?: (emittedFile: EmittedFile) => string
}): UniVitePlugin['uni'] {
  return {
    compiler: compiler as TemplateCompiler,
    compilerOptions: {
      miniProgram,
      isNativeTag: isServiceNativeTag,
      isCustomElement: isServiceCustomElement,
    },
  }
}
