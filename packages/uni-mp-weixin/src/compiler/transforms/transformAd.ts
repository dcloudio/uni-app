import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  findProp,
  RootNode,
  ElementTypes,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'

const AD_COMPONENTS: Array<string> = [
  'uniad',
  'ad-rewarded-video',
  'ad-fullscreen-video',
  'ad-interstitial',
]

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
  if (AD_COMPONENTS.indexOf(node.tag) > -1) {
    process.env.UNI_MP_UNIAD = true
  }
}
