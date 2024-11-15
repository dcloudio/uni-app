import { extend } from '@vue/shared'
import {
  createIsCustomElement,
  isMiniProgramNativeTag,
  isMiniProgramUVueNativeTag,
} from '@dcloudio/uni-shared'

import {
  type CopyOptions,
  type MiniProgramCompilerOptions,
  type UniVitePlugin,
  parseManifestJsonOnce,
  transformPageHead,
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

  const mergeVirtualHostAttributes =
    platformOptions.mergeVirtualHostAttributes != null
      ? platformOptions.mergeVirtualHostAttributes
      : process.env.UNI_PLATFORM === 'mp-weixin' &&
        process.env.UNI_APP_X === 'true'

  return {
    copyOptions,
    compiler: compiler as TemplateCompiler,
    compilerOptions: {
      root: process.env.UNI_INPUT_DIR,
      miniProgram: extend({}, miniProgram, {
        component: extend({}, miniProgram.component, {
          mergeVirtualHostAttributes,
        }),
      }),
      isNativeTag:
        process.env.UNI_APP_X === 'true'
          ? isMiniProgramUVueNativeTag
          : isMiniProgramNativeTag,
      isCustomElement: createIsCustomElement(customElements),
      ...compilerOptions,
      nodeTransforms: [
        transformPageHead,
        ...(compilerOptions?.nodeTransforms || []),
      ],
    } as any,
  }
}
