import {
  transformMatchMedia,
  transformPageHead,
  transformTapToClick,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'
import { isH5NativeTag, isH5CustomElement } from '@dcloudio/uni-shared'

export function createUni(): UniVitePlugin['uni'] {
  return {
    copyOptions: {
      assets: ['hybrid/html'],
    },
    compilerOptions: {
      isNativeTag: isH5NativeTag,
      isCustomElement: isH5CustomElement,
      nodeTransforms: [
        transformTapToClick,
        transformMatchMedia,
        transformPageHead,
      ],
    },
  }
}
