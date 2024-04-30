import {
  API_PAGE_SCROLL_TO,
  type API_TYPE_PAGE_SCROLL_TO,
  PageScrollToOptions,
  PageScrollToProtocol,
  defineAsyncApi,
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
