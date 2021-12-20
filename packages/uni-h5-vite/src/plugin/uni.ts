import {
  transformH5BuiltInComponents,
  transformMatchMedia,
  transformPageHead,
  transformTapToClick,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'
import { isH5NativeTag, isH5CustomElement } from '@dcloudio/uni-shared'
import { CompilerOptions } from '@vue/compiler-core'

export const compilerOptions: CompilerOptions = {
  isNativeTag: isH5NativeTag,
  isCustomElement: isH5CustomElement,
  nodeTransforms: [
    transformH5BuiltInComponents,
    transformTapToClick,
    transformMatchMedia,
    transformPageHead,
  ],
}

export function createUni(): UniVitePlugin['uni'] {
  return {
    copyOptions: {
      assets: ['hybrid/html'],
    },
    compilerOptions,
  }
}
