import { CompilerOptions, SFCTemplateCompileOptions } from '@vue/compiler-sfc'

import { isNativeTag } from '@dcloudio/uni-shared'

import { matchMedia } from './transforms/matchMedia'
import { Options as VueOptions } from '@vitejs/plugin-vue'

export const uniVueCompilerOptions: CompilerOptions = {
  isNativeTag,
  nodeTransforms: [matchMedia],
}

export const uniVueTransformAssetUrls: SFCTemplateCompileOptions['transformAssetUrls'] =
  {
    tags: {
      audio: ['src'],
      video: ['src', 'poster'],
      img: ['src'],
      image: ['src'],
      'cover-image': ['src'],
      // h5
      'v-uni-audio': ['src'],
      'v-uni-video': ['src', 'poster'],
      'v-uni-image': ['src'],
      'v-uni-cover-image': ['src'],
      // nvue
      'u-image': ['src'],
      'u-video': ['src', 'poster'],
    },
  }

export const uniVueTemplateOptions: Partial<SFCTemplateCompileOptions> = {
  compilerOptions: uniVueCompilerOptions,
  transformAssetUrls: uniVueTransformAssetUrls,
}

export function initPluginVueOptions(vueOptions: VueOptions) {
  const templateOptions = vueOptions.template || (vueOptions.template = {})

  templateOptions.transformAssetUrls = uniVueTransformAssetUrls

  const compilerOptions =
    templateOptions.compilerOptions || (templateOptions.compilerOptions = {})
  compilerOptions.isNativeTag = isNativeTag
  if (!compilerOptions.nodeTransforms) {
    compilerOptions.nodeTransforms = []
  }
  compilerOptions.nodeTransforms.unshift(matchMedia)
  return vueOptions
}
