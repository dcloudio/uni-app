import { CompilerOptions, SFCTemplateCompileOptions } from '@vue/compiler-sfc'

import { isNativeTag } from '@dcloudio/uni-shared'

import { matchMedia } from './transforms/matchMedia'

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
