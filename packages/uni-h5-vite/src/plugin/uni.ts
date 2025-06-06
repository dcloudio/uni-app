import {
  type UniVitePlugin,
  transformH5BuiltInComponents,
  transformMatchMedia,
  transformPageHead,
  transformRefresherSlot,
  transformTapToClick,
  transformUniH5Jsx,
} from '@dcloudio/uni-cli-shared'
import {
  UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS,
  isH5CustomElement,
  isH5NativeTag,
} from '@dcloudio/uni-shared'
import type { CompilerOptions } from '@vue/compiler-core'
import { transformCustomElement } from './transforms/transformCustomElement'

function realIsH5CustomElement(tag: string) {
  // TODO isH5CustomElement目前被多个平台引用，重构比较麻烦
  if (
    process.env.UNI_APP_X === 'true' &&
    UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS.includes(tag)
  ) {
    return true
  }
  return isH5CustomElement(tag, process.env.UNI_APP_X === 'true')
}

const nodeTransforms = [
  transformRefresherSlot,
  transformH5BuiltInComponents,
  transformTapToClick,
  transformMatchMedia,
  transformPageHead,
]

if (process.env.UNI_APP_X === 'true') {
  nodeTransforms.push(transformCustomElement)
}

export const compilerOptions: CompilerOptions = {
  isNativeTag: isH5NativeTag,
  isCustomElement: realIsH5CustomElement,
  nodeTransforms,
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
