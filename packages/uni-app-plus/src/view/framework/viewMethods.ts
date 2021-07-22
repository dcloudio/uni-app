import { SelectorQueryRequest } from '@dcloudio/uni-api'
import {
  subscribeViewMethod,
  registerViewMethod,
  getCurrentPageId,
} from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

import { requestComponentInfo } from '../../../../uni-h5/src/platform'

const pageVm = { $el: document.body } as ComponentPublicInstance

export function initViewMethods() {
  const pageId = getCurrentPageId()
  subscribeViewMethod(pageId)
  registerViewMethod<{ reqs: Array<SelectorQueryRequest> }>(
    pageId,
    'requestComponentInfo',
    (args, publish) => {
      requestComponentInfo(pageVm, args.reqs, publish)
    }
  )
}
