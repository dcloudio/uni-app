import {
  API_PAGE_SCROLL_TO,
  API_TYPE_PAGE_SCROLL_TO,
  defineAsyncApi,
  PageScrollToOptions,
  PageScrollToProtocol,
} from '@dcloudio/uni-api'
import { scrollTo } from '@dcloudio/uni-shared'

export const pageScrollTo = defineAsyncApi<API_TYPE_PAGE_SCROLL_TO>(
  API_PAGE_SCROLL_TO,
  ({ scrollTop, selector, duration }, { resolve }) => {
    scrollTo(selector! || scrollTop! || 0, duration!, true)
    resolve()
  },
  PageScrollToProtocol,
  PageScrollToOptions
)
