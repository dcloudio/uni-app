import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  ElementTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
  findProp,
} from '@vue/compiler-core'

const AD_COMPONENTS: Array<string> = [
  'uniad',
  'ad-rewarded-video',
  'ad-fullscreen-video',
  'ad-interstitial',
]

let appJsonUniadFlag = false

export function transformAd(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (!isElementNode(node)) {
    return
  }

  const adpidProp = findProp(node, 'adpid')
  if (node.tag === 'ad' && adpidProp) {
    node.tag = 'uniad'
    node.tagType = ElementTypes.COMPONENT
  }

  if (appJsonUniadFlag) {
    return
  }
  if (AD_COMPONENTS.indexOf(node.tag) > -1) {
    appJsonUniadFlag = true
    process.env.HAS_WXAD = '1'
  }
}
