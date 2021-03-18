import { ElementNode, NodeTransform } from '@vue/compiler-core'

import { CompilerOptions } from '@vue/compiler-sfc'

import { isNativeTag } from '@dcloudio/uni-shared'

const transform: NodeTransform = (node) => {
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
