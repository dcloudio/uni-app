import { isNativeTag, isCustomElement } from '@dcloudio/uni-shared'

import {
  CopyOptions,
  UniVitePlugin,
  MiniProgramCompilerOptions,
  transformPageHead,
} from '@dcloudio/uni-cli-shared'
import type { TemplateCompiler } from '@vue/compiler-sfc'
import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
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
      nodeTransforms: [
        transformPageHead,
        ...(compilerOptions?.nodeTransforms || []),
      ],
    } as any,
  }
}
