import {
  API_SET_NAVIGATION_BAR_TITLE,
  type API_TYPE_SET_NAVIGATION_BAR_TITLE,
  SetNavigationBarTitleProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'

export const setNavigationBarTitle =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_TITLE>(
    API_SET_NAVIGATION_BAR_TITLE,
    (options, { resolve, reject }) => {
      const page = (getCurrentPage() as unknown as UniPage).vm
      if (page == null) {
        reject('page is not ready')
        return
      }

      const appPage = page.$nativePage

      appPage!.updateStyle(
        new Map<string, any | null>([['navigationBarTitleText', options.title]])
      )
      resolve()
    },
    SetNavigationBarTitleProtocol
  )
