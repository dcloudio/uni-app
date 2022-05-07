import { isElementNode, findJsonFile } from '@dcloudio/uni-cli-shared'
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

import uniadAppJson from '../uniad.app.json'

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
    uniadAppJson(findJsonFile('app'))
  }
}
