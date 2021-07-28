import { SelectorQueryRequest } from '@dcloudio/uni-api'
import {
  subscribeViewMethod,
  registerViewMethod,
  getCurrentPageId,
} from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'
import { requestComponentInfo } from '../../../../uni-h5/src/platform'
import { PAGE_SCROLL_TO, LOAD_FONT_FACE } from '../../constants'
import { loadFontFace } from './dom/font'
import { pageScrollTo } from './dom/page'

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
  registerViewMethod(pageId, PAGE_SCROLL_TO, pageScrollTo)
  registerViewMethod(pageId, LOAD_FONT_FACE, loadFontFace)
}
