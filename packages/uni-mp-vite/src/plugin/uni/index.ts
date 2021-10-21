import { isNativeTag, isCustomElement } from '@dcloudio/uni-shared'

import {
  CopyOptions,
  UniVitePlugin,
  MiniProgramCompilerOptions,
} from '@dcloudio/uni-cli-shared'
import { CompilerOptions, TemplateCompiler } from '@vue/compiler-sfc'

import * as compiler from '@dcloudio/uni-mp-compiler'

export function uniOptions({
  copyOptions,
  miniProgram,
  compilerOptions,
}: {
  copyOptions: CopyOptions
  miniProgram: MiniProgramCompilerOptions
  compilerOptions?: CompilerOptions
}): UniVitePlugin['uni'] {
  return {
    copyOptions,
    compiler: compiler as TemplateCompiler,
    compilerOptions: {
      miniProgram,
      isNativeTag,
      isCustomElement,
      ...compilerOptions,
    },
  }
}
