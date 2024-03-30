import {
  transformH5BuiltInComponents,
  transformMatchMedia,
  transformPageHead,
  transformTapToClick,
  transformUniH5Jsx,
  UniVitePlugin,
  transformRefresherSlot,
} from '@dcloudio/uni-cli-shared'
import { isH5NativeTag, isH5CustomElement } from '@dcloudio/uni-shared'
import { CompilerOptions } from '@vue/compiler-core'

function realIsH5CustomElement(tag: string) {
  return isH5CustomElement(tag, process.env.UNI_APP_X === 'true')
}

export const compilerOptions: CompilerOptions = {
  isNativeTag: isH5NativeTag,
  isCustomElement: realIsH5CustomElement,
  nodeTransforms: [
    transformRefresherSlot,
    transformH5BuiltInComponents,
    transformTapToClick,
    transformMatchMedia,
    transformPageHead,
  ],
}

export function createUni(): UniVitePlugin['uni'] {
  return {
    copyOptions: {
      assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
    },
    compilerOptions,
    jsxOptions: {
      babelPlugins: [transformUniH5Jsx],
    },
  }
}
