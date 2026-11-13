import {
  API_PAGE_SCROLL_TO,
  type API_TYPE_PAGE_SCROLL_TO,
  PageScrollToOptions,
  PageScrollToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { scrollTo } from '@dcloudio/uni-shared'
//#if _X_VAPOR_
import { getCurrentPage } from '@dcloudio/uni-core'
import { getPageBody } from '../../../helpers/pageBody'
import { normalizePageSelector } from '../../../helpers/pageSelector'

function scrollPageBodyTo(
  pageBody: HTMLElement,
  top: number,
  selector: string | undefined,
  duration: number,
  offsetTop: number = 0
) {
  if (selector) {
    const normalizedSelector = normalizePageSelector(selector)
    const element =
      normalizedSelector !== selector && pageBody.matches(normalizedSelector)
        ? pageBody
        : pageBody.querySelector(normalizedSelector)
    if (!element) {
      return
    }
    top =
      element === pageBody
        ? 0
        : element.getBoundingClientRect().top -
          pageBody.getBoundingClientRect().top -
          pageBody.clientTop +
          pageBody.scrollTop
  }
  pageBody.scrollTo({
    top: top + offsetTop,
    behavior: duration > 0 ? 'smooth' : 'instant',
  })
}
//#endif

export const pageScrollTo = defineAsyncApi<API_TYPE_PAGE_SCROLL_TO>(
  API_PAGE_SCROLL_TO,
  ({ scrollTop, selector, duration, offsetTop }, { resolve }) => {
    //#if _X_VAPOR_
    if (__VAPOR__) {
      const page = getCurrentPage() as unknown as UniPage | undefined
      const pageBody = page?.vm && getPageBody(page.vm.$)
      if (pageBody) {
        scrollPageBodyTo(
          pageBody,
          scrollTop || 0,
          selector,
          duration!,
          offsetTop
        )
      }
      resolve()
      return
    }
    //#endif
    scrollTo(selector! || scrollTop! || 0, duration!, true)
    resolve()
  },
  PageScrollToProtocol,
  PageScrollToOptions
)
