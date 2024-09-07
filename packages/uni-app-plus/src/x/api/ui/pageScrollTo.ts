import {
  API_PAGE_SCROLL_TO,
  type API_TYPE_PAGE_SCROLL_TO,
  PageScrollToOptions,
  PageScrollToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentPublicInstance } from 'vue'

function queryElementTop(
  component: ComponentPublicInstance,
  selector: string
): number | null {
  let scrollNode = component.$el?.querySelector(selector)
  if (scrollNode != null) {
    return scrollNode.getBoundingClientRect().top
  }
  return null
}

export const pageScrollTo = defineAsyncApi<API_TYPE_PAGE_SCROLL_TO>(
  API_PAGE_SCROLL_TO,
  (options, res) => {
    const currentPage = (getCurrentPage() as unknown as UniPage).vm

    const scrollViewNode = currentPage?.$el
    if (scrollViewNode == null || scrollViewNode.tagName != 'SCROLL-VIEW') {
      res.reject('selector invalid')
      return
    }

    let top = options.scrollTop
    if (!!options.selector) {
      top = queryElementTop(currentPage!, options.selector!) as number
      if (top != null) {
        const currentScrollTop = scrollViewNode.scrollTop
        top += currentScrollTop
      }
    }

    if (top == null || top < 0) {
      res.reject('top or selector invalid')
      return
    }

    if (options.offsetTop != null) {
      top += options.offsetTop!
    }

    scrollViewNode.scrollTop = top
    res.resolve()
  },
  PageScrollToProtocol,
  PageScrollToOptions
)
