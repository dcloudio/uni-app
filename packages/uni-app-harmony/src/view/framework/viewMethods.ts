import type { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'
import {
  API_LOAD_FONT_FACE,
  API_PAGE_SCROLL_TO,
  API_SET_PAGE_META,
  type SelectorQueryRequest,
} from '@dcloudio/uni-api'
import {
  getCurrentPageId,
  registerViewMethod,
  subscribeViewMethod,
} from '@dcloudio/uni-core'
import {
  addIntersectionObserver,
  addMediaQueryObserver,
  removeIntersectionObserver,
  removeMediaQueryObserver,
  requestComponentInfo,
  setCurrentPageMeta,
} from '../../../../uni-h5/src/platform'

import { loadFontFace } from './dom/font'
import { onPageReady, pageScrollTo } from './dom/page'

const pageVm = { $el: document.body } as ComponentPublicInstance

export function initViewMethods() {
  const pageId = getCurrentPageId()
  subscribeViewMethod(pageId, (fn: Function) => {
    return (...args: any[]) => {
      onPageReady(() => {
        fn.apply(null, args)
      })
    }
  })
  registerViewMethod<{ reqs: Array<SelectorQueryRequest> }>(
    pageId,
    'requestComponentInfo',
    (args, publish) => {
      requestComponentInfo(pageVm, args.reqs, publish)
    }
  )
  registerViewMethod(pageId, 'addIntersectionObserver', (args) => {
    addIntersectionObserver(
      extend({}, args, {
        callback(res: any) {
          UniViewJSBridge.publishHandler(args.eventName, res)
        },
      })
    )
  })
  registerViewMethod(pageId, 'removeIntersectionObserver', (args) => {
    removeIntersectionObserver(args)
  })
  registerViewMethod(pageId, 'addMediaQueryObserver', (args) => {
    addMediaQueryObserver(
      extend({}, args, {
        callback(res: any) {
          UniViewJSBridge.publishHandler(args.eventName, res)
        },
      })
    )
  })
  registerViewMethod(pageId, 'removeMediaQueryObserver', (args) => {
    removeMediaQueryObserver(args)
  })
  registerViewMethod(pageId, API_PAGE_SCROLL_TO, pageScrollTo)
  registerViewMethod(pageId, API_LOAD_FONT_FACE, loadFontFace)
  registerViewMethod(pageId, API_SET_PAGE_META, (args) => {
    setCurrentPageMeta(null, args)
  })
}
