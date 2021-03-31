import { ElementNode, NodeTransform } from '@vue/compiler-core'

import { CompilerOptions, SFCTemplateCompileOptions } from '@vue/compiler-sfc'

import { isNativeTag } from '@dcloudio/uni-shared'

const transform: NodeTransform = (node, ctx) => {
  if (
    process.env.UNI_PLATFORM !== 'mp-weixin' &&
    (node as ElementNode).tag === 'match-media'
  ) {
    ;(node as ElementNode).tag = 'uni-match-media'
  }
}

export const uniVueCompilerOptions: CompilerOptions = {
  isNativeTag,
  nodeTransforms: [transform],
}

export const uniVueTransformAssetUrls: SFCTemplateCompileOptions['transformAssetUrls'] = {
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
