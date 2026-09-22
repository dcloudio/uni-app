import {
  type UniVitePlugin,
  isUniAppXWebVapor,
  transformH5BuiltInComponents,
  transformMatchMedia,
  transformRefresherSlot,
  transformPageHead as transformSharedPageHead,
  transformTapToClick,
  transformUniH5Jsx,
} from '@dcloudio/uni-cli-shared'
import {
  UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS,
  isH5CustomElement,
  isH5NativeTag,
} from '@dcloudio/uni-shared'
import { transformCustomElement } from './transforms/transformCustomElement'
import { transformAttributePart } from './transforms/transformAttributePart'
import { transformPageHead as transformSsrPageHead } from './transforms/transformPageHead'

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
  transformSharedPageHead,
]

if (process.env.UNI_APP_X === 'true') {
  if (!isUniAppXWebVapor()) {
    nodeTransforms.splice(nodeTransforms.indexOf(transformMatchMedia), 1)
    nodeTransforms.push(transformCustomElement)
  }
  if (process.env.UNI_UTS_PLATFORM === 'web') {
    nodeTransforms.push(transformAttributePart)
  }
}

export const compilerOptions = {
  isNativeTag: isH5NativeTag,
  isCustomElement: realIsH5CustomElement,
  nodeTransforms,
  ssrPreTagTransforms: [transformH5BuiltInComponents, transformSsrPageHead],
} satisfies NonNullable<UniVitePlugin['uni']>['compilerOptions']

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
