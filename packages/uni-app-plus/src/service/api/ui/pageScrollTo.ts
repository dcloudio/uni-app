import {
  API_PAGE_SCROLL_TO,
  type API_TYPE_PAGE_SCROLL_TO,
  PageScrollToOptions,
  PageScrollToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPageVm, getPageIdByVm } from '@dcloudio/uni-core'

export const pageScrollTo = defineAsyncApi<API_TYPE_PAGE_SCROLL_TO>(
  API_PAGE_SCROLL_TO,
  (options, { resolve }) => {
    const pageId = getPageIdByVm(getCurrentPageVm()!)!
    UniServiceJSBridge.invokeViewMethod(
      API_PAGE_SCROLL_TO,
      options,
      pageId,
      resolve
    )
  },
  PageScrollToProtocol,
  PageScrollToOptions
)
