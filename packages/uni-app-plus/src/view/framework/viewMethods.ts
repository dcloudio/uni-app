import {
  API_LOAD_FONT_FACE,
  API_PAGE_SCROLL_TO,
  SelectorQueryRequest,
} from '@dcloudio/uni-api'
import {
  subscribeViewMethod,
  registerViewMethod,
  getCurrentPageId,
} from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'
import { requestComponentInfo } from '../../../../uni-h5/src/platform'

import { loadFontFace } from './dom/font'
import { onPageReady, pageScrollTo } from './dom/page'

const pageVm = { $el: document.body } as ComponentPublicInstance

function wrapperViewMethod(fn: (...args: any[]) => void) {
  return (...args: any[]) => {
    onPageReady(() => {
      fn.apply(null, args)
    })
  }
}

export function initViewMethods() {
  const pageId = getCurrentPageId()
  subscribeViewMethod(pageId)
  registerViewMethod<{ reqs: Array<SelectorQueryRequest> }>(
    pageId,
    'requestComponentInfo',
    wrapperViewMethod((args, publish) => {
      requestComponentInfo(pageVm, args.reqs, publish)
    })
  )
  registerViewMethod(
    pageId,
    API_PAGE_SCROLL_TO,
    wrapperViewMethod(pageScrollTo)
  )
  registerViewMethod(
    pageId,
    API_LOAD_FONT_FACE,
    wrapperViewMethod(loadFontFace)
  )
}
