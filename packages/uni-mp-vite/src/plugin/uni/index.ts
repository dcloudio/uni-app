import { extend } from '@vue/shared'
import {
  isMiniProgramNativeTag as isNativeTag,
  createIsCustomElement,
} from '@dcloudio/uni-shared'

import {
  CopyOptions,
  UniVitePlugin,
  MiniProgramCompilerOptions,
  transformPageHead,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'
import type { TemplateCompiler } from '@vue/compiler-sfc'
import type { CompilerOptions } from '@dcloudio/uni-mp-compiler'
import * as compiler from '@dcloudio/uni-mp-compiler'

export function uniOptions({
  copyOptions,
  miniProgram,
  customElements,
  compilerOptions,
}: {
  customElements?: string[]
  copyOptions: CopyOptions
  miniProgram: MiniProgramCompilerOptions
  compilerOptions?: CompilerOptions
}): UniVitePlugin['uni'] {
  const manifest = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  const platformOptions = manifest[process.env.UNI_PLATFORM] || {}

  return {
    copyOptions,
    compiler: compiler as TemplateCompiler,
    compilerOptions: {
      root: process.env.UNI_INPUT_DIR,
      miniProgram: extend({}, miniProgram, {
        component: extend({}, miniProgram.component, {
          mergeVirtualHostAttributes:
            platformOptions.mergeVirtualHostAttributes,
        }),
      }),
      isNativeTag,
      isCustomElement: createIsCustomElement(customElements),
      ...compilerOptions,
      nodeTransforms: [
        transformPageHead,
        ...(compilerOptions?.nodeTransforms || []),
      ],
    } as any,
  }
}
